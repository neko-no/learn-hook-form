"use client";

import {
  useForm,
  FieldErrors,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import CheckoutForm from "./_components/CheckoutForm";
import DeliveryAddressForm from "./_components/DeliveryAddressForm";
import SubmitButton from "../controls/SubmitButton";
import OrderedFoodItems from "./_components/OrderedFoodItems";
import MasterFoodDeliveryForm from "./_components/MasterFoodDeliveryForm";
import { createOrder, fetchLastOrder } from "../db";
import FormLoader from "../controls/FormLoader";

const id = 1;

const defaultValues: FoodDeliveryFormType = {
  orderId: 0,
  customerField: "",
  customerName: "First Customer",
  mobile: "000-0000",
  orderNo: 123131312,
  Email: "Json@json.com",
  placedOn: new Date(),
  gTotal: 0,
  paymentMethod: "",
  deliveryIn: 0,
  foodItems: [{ foodId: 0, price: 0, totalPrice: 0, quantity: 0 }],
  address: {
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
  },
};

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: async () => {
        if (id === 0) return new Promise((resolve) => resolve(defaultValues));
        else {
          const tempOrder = await fetchLastOrder();
          return new Promise((resolve) =>
            resolve(tempOrder != null ? tempOrder : defaultValues)
          );
        }
      },
    });

  const { handleSubmit, control, getValues } = methods;

  // registerの返却値
  // - name
  // - ref
  // - onChange
  // - onBlur
  // 以上をスプレッド構文で展開することで，簡潔に記載できる

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    formData.orderId = 1;
    formData.placedOn = new Date();
    createOrder(formData);
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  const onDemo = () => {
    getValues("foodItems.0.foodId");
    console.log(typeof getValues("foodItems.0.foodId"));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormLoader control={control} />
      <FormProvider {...methods}>
        <MasterFoodDeliveryForm />
        <OrderedFoodItems />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <SubmitButton value="Submit" control={control} />
      <button className="btn btn-secondary ms-2" onClick={onDemo} type="button">
        Demo
      </button>
    </form>
  );
};
