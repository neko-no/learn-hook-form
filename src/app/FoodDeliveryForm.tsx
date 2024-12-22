import { useForm, FieldErrors } from "react-hook-form";
import TextField from "./controls/TextField";
import Select from "./controls/Select";

type FoodDeliveryFormType = {
  customerName: string;
  customerField: string;
  mobile: string;
  orderNo: number;
  Email: string;
  paymentMethod: string;
  deliveryIn: number;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

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

export const FoodDeliveryForm = () => {
  // 型をジェネリクスで渡すことで，registerに意図しない値を入れないようにできる
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      customerName: "First Customer",
      mobile: "000-0000",
      orderNo: 123131312,
      Email: "Json@json.com",
      paymentMethod: "",
      deliveryIn: 0,
      streetAddress: "",
      landmark: "",
      city: "",
      state: "",
    },
  });

  // registerの返却値
  // - name
  // - ref
  // - onChange
  // - onBlur
  // 以上をスプレッド構文で展開することで，簡潔に記載できる

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
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
      <div>list of ordered food items</div>
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
      <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            error={errors.streetAddress}
            {...register("streetAddress", {
              required: "This field is required.",
            })}
          />
        </div>
        <div className="col">
          <TextField
            label="City"
            error={errors.city}
            {...register("city", {
              required: "This field is required.",
            })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Landmark"
            error={errors.landmark}
            {...register("landmark")}
          />
        </div>
        <div className="col">
          <TextField
            label="State"
            error={errors.state}
            {...register("state")}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
