import React, { ChangeEventHandler } from "react";

interface IFormField<T> {
  labelName: string;
  inputType?: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: T;
  handleChange: any;
  isTextArea?: boolean;
}

function FormField<T extends string | number | undefined>({
  labelName,
  handleChange,
  inputType,
  placeholder,
  value,
  isTextArea,
}: IFormField<T>) {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}

      {isTextArea ? (
        <textarea
          required
          value={value}
          rows={13}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-3 py-[15px] sm:px-[25px] pc-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          type={inputType}
          value={value}
          onChange={handleChange}
          step={"0.1"}
          placeholder={placeholder}
          className="pl-3 py-[15px] sm:px-[25px] pc-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
}

export default FormField;
