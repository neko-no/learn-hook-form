"use client";

import {
  useForm,
  FieldErrors,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import CheckoutForm from "./_components/CheckoutForm";
import DeliveryAddressForm from "./_components/DeliveryAddressForm";
import FoodDeliveryMaster from "./_components/FoodDeliveryMaster";
import SubmitButton from "../controls/SubmitButton";
// import { useRenderCount } from "../hooks/useRenderCount";

export const FoodDeliveryForm = () => {
  // const RenderCount = useRenderCount();
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
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <RenderCount /> */}
      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <SubmitButton value="Submit" isSubmitting={isSubmitting} />
    </form>
  );
};
