"use client";

import { useForm } from "react-hook-form";

const page = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="App container my-8 bg-white">
      <h1 className="text-center mb-8 text-lg">ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
        <div>
          <label htmlFor="email" className="mr-2">
            Email
          </label>
          <input id="email" {...register("email")} className="border" />
        </div>
        <div>
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            className="border"
          />
        </div>
        <button className="border block mx-auto" type="submit">
          ログイン
        </button>
      </form>
    </div>
  );
};

export default page;
