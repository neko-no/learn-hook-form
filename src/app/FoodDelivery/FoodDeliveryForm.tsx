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

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: {
        customerName: "First Customer",
        mobile: "000-0000",
        orderNo: 123131312,
        Email: "Json@json.com",
        paymentMethod: "",
        deliveryIn: 0,
        foodItems: [{ foodId: 0, price: 0, totalPrice: 0, quantity: 0 }],
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    });

  const { handleSubmit, control } = methods;

  // registerの返却値
  // - name
  // - ref
  // - onChange
  // - onBlur
  // 以上をスプレッド構文で展開することで，簡潔に記載できる

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  const onDemo = () => {};

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
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
