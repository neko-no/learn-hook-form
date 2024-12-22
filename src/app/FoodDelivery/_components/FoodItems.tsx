import TextField from "@/app/controls/TextField";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

const FoodItems = () => {
  const { register } = useFormContext<{ foodItems: FoodItemType[] }>();

  const { errors } = useFormState<{ foodItems: FoodItemType[] }>({
    name: "foodItems",
  });
  return (
    <table className="table table-borderless table-hover">
      <tbody>
        <tr>
          <td>
            <TextField
              label="Food 1"
              className="border-success"
              {...register("foodItems.0.name", {
                required: "Customer name is required.",
              })}
              error={errors.foodItems && errors.foodItems[0]?.name}
            />
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              label="Food 2"
              className="border-success"
              {...register("foodItems.1.name", {
                required: "Customer name is required.",
              })}
              // error={errors.food}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FoodItems;
