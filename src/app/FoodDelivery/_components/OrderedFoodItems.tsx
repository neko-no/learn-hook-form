import TextField from "@/app/controls/TextField";
import React from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";

const OrderedFoodItems = () => {
  const { register } = useFormContext<{ foodItems: OrderedFoodItemType[] }>();

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  });

  const { fields } = useFieldArray<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  });
  return (
    <table className="table table-borderless table-hover">
      <thead>
        <tr>
          <th>Food</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <tr key={field.id}>
            <td>
              <TextField
                className="border-success"
                {...register(`foodItems.${index}.name` as const, {
                  required: "This field is required.",
                })}
                error={errors.foodItems && errors.foodItems[index]?.name}
              />
            </td>
            <td>
              <TextField
                type="number"
                min={0}
                className="border-success"
                {...register(`foodItems.${index}.quantity` as const)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderedFoodItems;
