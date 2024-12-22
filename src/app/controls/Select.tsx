import React, { forwardRef, ForwardedRef } from "react";
import { FieldError } from "react-hook-form";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: FieldError | undefined;
  options: SelectOptionType[];
};

const Select = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { className = "", label, error, options, ...rest } = props;

    return (
      <div className="form-floating">
        <select
          className={`form-control ${className}`}
          aria-label="Default select example"
          ref={ref}
          {...rest}
        >
          {options.map((option, index) => {
            return (
              <option
                key={index}
                value={typeof option == "string" ? option : option.value}
              >
                {typeof option == "string" ? option : option.text}
              </option>
            );
          })}
        </select>
        <label>{label}</label>
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
