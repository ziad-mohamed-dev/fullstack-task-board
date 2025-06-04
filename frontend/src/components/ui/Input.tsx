import { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMsg?: string;
}

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  errorMsg,
  type,
}: InputProps) => {
  const generatedId = useId();

  return (
    <div className="flex flex-col gap-1 group relative">
      <label
        htmlFor={generatedId}
        className="group-has-focus:text-input-focus text-label-size text-label"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={generatedId}
        className="input"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {errorMsg && (
        <p className="text-sm text-text-error absolute -bottom-4.5">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default Input;
