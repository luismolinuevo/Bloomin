import React from "react";
import { Textarea } from "../../utils/MaterialTailwind";

export default function TextAreaWithLimit({ maxLength, label, value, onChange, ...rest }) {
  // No need for handleChange function here

  return (
    <div>
      <label className="block mb-1">{label}</label>
      <Textarea
        value={value} // Use the value provided by the parent component
        onChange={onChange} // Call onChange provided by the parent component
        maxLength={maxLength}
        className="border p-2 rounded-md"
        {...rest}
      />
      <div className="text-gray-500 text-right text-[15px]">
        {value?.length}/{maxLength}
      </div>
    </div>
  );
}
