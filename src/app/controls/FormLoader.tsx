import React from "react";
import { useFormState } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormLoader = (props: any) => {
  const { control } = props;

  const { isLoading } = useFormState({ control });
  return isLoading == false || <div className="loader"></div>;
};

export default FormLoader;
