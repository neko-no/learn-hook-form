import React from "react";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

const SubmitButton = (prop: SubmitButtonProps) => {
  const {
    isSubmitting = undefined,
    className = "btn-light",
    value,
    ...rest
  } = prop;
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
