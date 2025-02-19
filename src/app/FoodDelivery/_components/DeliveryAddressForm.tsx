"use client";

import TextField from "@/app/controls/TextField";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

const DeliveryAddressForm = () => {
  // const RenderCount = useRenderCount();
  const { register } = useFormContext<{
    address: DeliveryAddressFormType;
  }>();

  const { errors } = useFormState<{ address: DeliveryAddressFormType }>({
    name: [
      "address.streetAddress",
      "address.city",
      "address.landmark",
      "address.state",
    ],
  });

  return (
    <>
      {/* <RenderCount /> */}
      <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            error={errors.address?.streetAddress}
            {...register("address.streetAddress", {
              required: "This field is required.",
            })}
          />
        </div>
        <div className="col">
          <TextField
            label="City"
            error={errors.address?.city}
            {...register("address.city", {
              required: "This field is required.",
            })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Landmark"
            error={errors.address?.landmark}
            {...register("address.landmark")}
          />
        </div>
        <div className="col">
          <TextField
            label="State"
            error={errors.address?.state}
            {...register("address.state")}
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryAddressForm;
