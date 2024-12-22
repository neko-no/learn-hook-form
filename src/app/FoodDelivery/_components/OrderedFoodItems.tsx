import Select from "@/app/controls/Select";
import TextField from "@/app/controls/TextField";
import { getFoodItems } from "@/app/db";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

const OrderedFoodItems = () => {
  const [foodList, setFoodList] = useState<FoodType[]>([]);
  const [foodOptions, setFoodOptions] = useState<SelectOptionType[]>([]);

  useEffect(() => {
    const tmpList: FoodType[] = getFoodItems();
    const tmpOptions: SelectOptionType[] = tmpList.map((x) => ({
      value: x.foodId,
      text: x.name,
    }));

    setFoodList(tmpList);
    setFoodOptions([{ value: 0, text: "Select" }, ...tmpOptions]);
  }, []);

  const { register, getValues, setValue } = useFormContext<{
    foodItems: OrderedFoodItemType[];
  }>();

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  });

  const { fields, append, remove } = useFieldArray<{
    foodItems: OrderedFoodItemType[];
  }>({
    name: "foodItems",
    rules: {
      required: {
        value: true,
        message: "Food Items required.",
      },
    },
  });

  useWatch<{ foodItems: OrderedFoodItemType[] }>({ name: "foodItems" });

  const onRowAdd = () => {
    append(
      { foodId: 0, price: 0, totalPrice: 0, quantity: 0 },
      {
        shouldFocus: true,
        focusIndex: 0,
      }
    );
  };

  const onRowDelete = (index: number) => {
    remove(index);
  };

  const onFoodChange = (
    e: ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
    const foodId = parseInt(e.target.value);
    let price: number;

    if (foodId == 0) price = 0;
    else price = foodList.find((x) => x.foodId === foodId)?.price || 0;

    setValue(`foodItems.${rowIndex}.price`, price);
  };
  return (
    <>
      <div className="text-start fw-bold mt-4">Ordered Food List</div>
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
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
                <Select
                  options={foodOptions}
                  error={errors.foodItems && errors.foodItems[index]?.foodId}
                  {...register(`foodItems.${index}.foodId` as const, {
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Select food",
                    },
                    onChange: (e) => {
                      onFoodChange(e, index);
                    },
                  })}
                />{" "}
              </td>
              <td>${getValues(`foodItems.${index}.foodId`)}</td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  error={errors.foodItems && errors.foodItems[index]?.quantity}
                  className="border-success"
                  {...register(`foodItems.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: "less than 1.",
                    min: {
                      value: 1,
                      message: "less than 1.",
                    },
                  })}
                />
              </td>
              <td>total price</td>
              <td>
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onRowDelete(index)}
                  >
                    DEL
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {errors.foodItems?.root && (
          <tfoot>
            <tr>
              <td colSpan={5}>
                <span className="error-feedback">
                  {errors.foodItems?.root?.message}
                </span>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
};

export default OrderedFoodItems;
