"use client";

import React, { useEffect } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import Select from "../../controls/Select";

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
  const { register } = useFormContext<CheckoutFormType>();

  const paymentMethod = useWatch<CheckoutFormType>({ name: "paymentMethod" });

  useEffect(() => {
    if (paymentMethod === "online") alert("please verify the transaction.");
  }, [paymentMethod]);

  const { errors } = useFormState<CheckoutFormType>({
    name: ["paymentMethod", "deliveryIn"],
  });

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
              valueAsNumber: true,
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
