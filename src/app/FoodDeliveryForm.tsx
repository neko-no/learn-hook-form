import { useForm, SubmitErrorHandler } from "react-hook-form";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

export const FoodDeliveryForm = () => {
  // 型をジェネリクスで渡すことで，registerに意図しない値を入れないようにできる
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>();

  // registerの返却値
  // - name
  // - ref
  // - onChange
  // - onBlur
  // 以上をスプレッド構文で展開することで，簡潔に記載できる

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError: SubmitErrorHandler<FoodDeliveryFormType> = (errors) => {
    console.log("validation errors", errors);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Customer Name"
          {...register("customerName", {
            required: "Customer name is required.",
            value: "default values",
          })}
        />
        <label>Customer Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Mobile"
          {...register("mobile", {
            required: "Mobile number is required.",
          })}
        />
        <label>Mobile</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
