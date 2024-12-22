import TextField from "@/app/controls/TextField";
import React from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";

const OrderedFoodItems = () => {
  const { register } = useFormContext<{ foodItems: OrderedFoodItemType[] }>();

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  });

  const { fields, append, move, replace, remove } = useFieldArray<{
    foodItems: OrderedFoodItemType[];
  }>({
    name: "foodItems",
  });

  const onRowAdd = () => {
    append(
      { name: "Food", quantity: 1 },
      {
        shouldFocus: true,
        focusIndex: 0,
      }
    );
  };

  const onSwapAndMove = () => {
    // swap(0, 2);
    move(0, 2);
  };

  const onUpdateAndReplace = () => {
    replace([
      { name: "Food*", quantity: 5 },
      { name: "Replace Food", quantity: 10 },
    ]);
  };

  const onRowDelete = (index: number) => {
    remove(index);
  };

  return (
    <>
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onRowAdd}
              >
                + Add
              </button>
            </th>
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
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRowDelete(index)}
                >
                  DEL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {fields.length >= 4 && (
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onSwapAndMove}
        >
          Swap and Move
        </button>
      )}
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={onUpdateAndReplace}
      >
        Update and Replace
      </button>
    </>
  );
};

export default OrderedFoodItems;
