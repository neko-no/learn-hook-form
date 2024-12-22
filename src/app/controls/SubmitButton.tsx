import React from "react";
import { Control, useFormState } from "react-hook-form";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>;
};

const SubmitButton = (prop: SubmitButtonProps) => {
  const { className = "btn-light", value, control = undefined, ...rest } = prop;

  const { isSubmitting } = useFormState({ control });
  return (
    <button
      type="submit"
      className={`btn ${className}`}
      disabled={isSubmitting === undefined ? false : isSubmitting}
      {...rest}
    >
      {isSubmitting === undefined || isSubmitting === false ? (
        value
      ) : (
        <>
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          <span role="status" className="ms-1">
            {value}
          </span>
        </>
      )}
    </button>
  );
};

export default SubmitButton;
