import { useForm, FieldErrors } from "react-hook-form";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
  orderNo: number;
  Email: string;
};

export const FoodDeliveryForm = () => {
  // 型をジェネリクスで渡すことで，registerに意図しない値を入れないようにできる
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      customerName: "First Customer",
      mobile: "000-0000",
      orderNo: 123131312,
      Email: "Json@json.com",
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
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="#Order No."
              {...register("orderNo", {
                required: "Customer name is required.",
              })}
            />
            <label>#Order No.</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
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
            />
            <label>Mobile</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              {...register("customerName", {
                required: "Customer name is required.",
              })}
            />
            <label>Customer Name</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("Email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Incorrect email format.",
                },
              })}
            />
            <label>Email</label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
