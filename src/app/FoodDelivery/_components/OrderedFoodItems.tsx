import Select from "@/app/controls/Select";
import TextField from "@/app/controls/TextField";
import { getFoodItems } from "@/app/db";
import { roundTo2DecimalPoint } from "@/app/utils";
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

  const { register, getValues, setValue, trigger } = useFormContext<
    { gTotal: number } & {
      foodItems: OrderedFoodItemType[];
    }
  >();

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

  const selectedFoodItems: OrderedFoodItemType[] = useWatch({
    name: "foodItems",
  });
  useWatch({ name: "gTotal" });

  useEffect(() => {
    updateGTotal();
  }, [selectedFoodItems]);

  const updateGTotal = () => {
    let gTotal = 0;

    if (selectedFoodItems && selectedFoodItems.length > 0) {
      gTotal = selectedFoodItems.reduce(
        (sum, curr) => sum + curr.totalPrice,
        0
      );
    }

    setValue("gTotal", roundTo2DecimalPoint(gTotal));
  };

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
    updateRowTotalPrice(rowIndex);
  };

  const updateRowTotalPrice = (rowIndex: number) => {
    const { price, quantity } = getValues(`foodItems.${rowIndex}`);
    console.log(price, quantity);
    let totalPrice = 0;
    if (quantity && quantity > 0) totalPrice = price * quantity;
    setValue(
      `foodItems.${rowIndex}.totalPrice`,
      roundTo2DecimalPoint(totalPrice)
    );
  };

  return (
    <>
      <div className="text-start fw-bold mt-4">Ordered Food List</div>
      <table id="foodItems" className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th className="text-start">Price</th>
            <th>Quantity</th>
            <th className="text-start">T. Price</th>
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
              <td className="text-start pt-3">
                ${getValues(`foodItems.${index}.price`)}
              </td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  error={errors.foodItems && errors.foodItems[index]?.quantity}
                  className="border-success"
                  {...register(`foodItems.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: "less than 1.",
                    validate: {
                      notMoreThanStock: async (value: number) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        if (value && value > 9) return "OOS";
                        else return true;
                      },
                    },
                    min: {
                      value: 1,
                      message: "less than 1.",
                    },
                    onChange: () => {
                      updateRowTotalPrice(index);
                      trigger(`foodItems.${index}.quantity`);
                    },
                  })}
                />
              </td>
              <td className="text-start pt-3">
                ${getValues(`foodItems.${index}.totalPrice`)}
              </td>
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
        <tfoot>
          {fields && fields.length > 0 && (
            <tr className="border-top">
              <td colSpan={2}></td>
              <td>G. Toal</td>
              <td className="text-start align-middle">
                {"$" + getValues("gTotal")}
              </td>
              <td></td>
            </tr>
          )}
          {errors.foodItems?.root && (
            <tr>
              <td colSpan={5}>
                <span className="error-feedback">
                  {errors.foodItems?.root?.message}
                </span>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </>
  );
};

export default OrderedFoodItems;
