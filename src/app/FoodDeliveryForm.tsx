import { useForm, FieldErrors } from "react-hook-form";
import TextField from "./controls/TextField";

type FoodDeliveryFormType = {
  customerName: string;
  customerField: string;
  mobile: string;
  orderNo: number;
  Email: string;
  paymentMethod: string;
  deliveryIn: number;
};

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
      <div className="row mb-2">
        <div className="col">
          <div className="form-floating">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("paymentMethod")}
            >
              <option value="">Select</option>
              <option value="online">Paid Online</option>
              <option value="COD">Cash on Delivery</option>
            </select>
            <label htmlFor="#" className="">
              Payment Method
            </label>
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div>check out details</div>
      <div>delivery address</div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
