import React, { forwardRef, ForwardedRef } from "react";
import { FieldError } from "react-hook-form";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError | undefined;
};

const TextField = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { type = "text", className = "", label, error, ...rest } = props;

    return (
      <div className={label ? "form-floating" : ""}>
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          ref={ref}
          {...rest}
        />
        {label && <label>{label}</label>}
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
