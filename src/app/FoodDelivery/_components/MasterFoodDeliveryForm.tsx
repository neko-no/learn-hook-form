"use client";

import TextField from "@/app/controls/TextField";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

const MasterFoodDeliveryForm = () => {
  const { register } = useFormContext<MasterFoodDeliveryFormType>();

  const { errors } = useFormState<MasterFoodDeliveryFormType>({
    name: ["orderNo", "customerName", "mobile", "Email", "customerField"],
  });

  return (
    <>
      <input type="hidden" {...register("orderId")} />
      <input type="hidden" {...register("placedOn")} />
      <div className="row mb-2">
        <div className="col">
          <TextField
            label="#Order No."
            {...register("orderNo", {
              required: "orderNo is required.",
            })}
            error={errors.orderNo}
          />
        </div>
        <div className="col">
          <TextField
            label="Mobile"
            {...register("mobile", {
              minLength: {
                value: 10,
                message: "Must be 10 digits.",
              },
              maxLength: {
                value: 10,
                message: "Must be 10 digits.",
              },
              required: "This field is required.",
            })}
            error={errors.mobile}
          />
        </div>
        <div className="col">
          <TextField
            label="Custom Field"
            className="border-success"
            {...register("customerField", {
              required: "Customer name is required.",
            })}
            error={errors.customerField}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="col">
            <TextField
              label="Customer Name"
              className="border-success"
              {...register("customerName", {
                required: "Customer name is required.",
              })}
              error={errors.customerName}
            />
          </div>
        </div>
        <div className="col">
          <TextField
            type="email"
            label="Email"
            className="border-success"
            {...register("Email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Incorrect email format.",
              },
              validate: {
                notFake: (value) => {
                  return value != "email@gmail.com" || "This email is blocked.";
                },
                notFromBlackLostedDomain: (value, values) => {
                  return (
                    values.customerName == "admin" ||
                    value != "" ||
                    "This form is required"
                  );
                },
              },
            })}
            error={errors.Email}
          />
        </div>
      </div>
    </>
  );
};

export default MasterFoodDeliveryForm;
