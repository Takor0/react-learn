import React from "react";
import "../styles/CInput.scss";

export interface Option {
  label: string;
  value: string;
}

export interface CInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "select";
  options?: Option[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const CInput: React.FC<CInputProps> = (props) => {
  const { type = "text", options, onChange, ...rest } = props;

  if (type === "select") {
    return (
      <select
        className="cinput cinput--select"
        {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return <input onChange={onChange} className="cinput" type={type} {...rest} />;
};

export default CInput;
