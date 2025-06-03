import { ChangeEvent } from "react";

interface IconInputProps {
  icon: string;
  isSelected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IconInput = ({ icon, onChange, isSelected }: IconInputProps) => {
  return (
    <div>
      <label
        htmlFor={`icon-${icon}`}
        className="size-10 bg-icon-input has-checked:bg-icon-selected select-none rounded-lg flex justify-center items-center cursor-pointer"
      >
        <input
          checked={isSelected}
          onChange={onChange}
          type="radio"
          name="icon"
          value={icon}
          id={`icon-${icon}`}
          hidden
        />
        {icon}
      </label>
    </div>
  );
};

export default IconInput;
