import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log("errors: ", errors);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("data: ", data);
      })}
    >
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        {...register("name", { required: "Please Input your Name" })}
        placeholder="Input your Name"
      />
      {errors.name && errors.name.message}
      <input type="submit" />
    </form>
  );
}

export default App;
