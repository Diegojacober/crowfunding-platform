import React from "react";

interface ICustomButton {
  btnType: React.HTMLInputTypeAttribute;
  title: string;
  handleClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  styles: string;
}

function CustomButton(props: ICustomButton) {
  return (
    <input
      type={props.btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] min-h-52px px-4 rounded-[10px] ${props.styles}`}
      onClick={props.handleClick}
      value={props.title}
    />
  );
}

export default CustomButton;
