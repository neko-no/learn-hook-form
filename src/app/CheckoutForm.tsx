import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "./controls/Select";

const paymentOptions: SelectOptionType[] = [
  { value: "", text: "Select" },
  { value: "online", text: "Paid Online" },
  { value: "COD", text: "Cash on Delivery" },
];

const deliveryInOptions: SelectOptionType[] = [
  { value: 0, text: "Select" },
  { value: 30, text: "Half an Hour" },
  { value: 60, text: "1 Hour" },
  { value: 120, text: "2 Hour" },
  { value: 180, text: "3 Hour" },
];

const CheckoutForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  return (
    <>
      <div className="text-start fw-bold mt-4 mb-2">Checkout Details</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            label="Payment Method"
            {...register("paymentMethod", {
              required: "This field is required",
            })}
            options={paymentOptions}
            error={errors.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            label="Delivery Within"
            {...register("deliveryIn", {
              required: "This field is required",
            })}
            options={deliveryInOptions}
            error={errors.deliveryIn}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
