import Image from "next/image";

interface IButton {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: any;
}

const Icon = (props: IButton) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      props.isActive && props.isActive == props.name && "bg-[2c2f32]"
    } flex justify-center items-center ${!props.disabled && "cursor-pointer"} ${
      props.styles
    }`}
    onClick={props.handleClick}
  >
    {!props.isActive ? (
      <Image src={props.imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <Image
        src={props.imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${props.isActive != props.name && "grayscale"}`}
      />
    )}
  </div>
);

export default Icon;
