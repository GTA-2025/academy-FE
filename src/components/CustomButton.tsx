import { CustomButtonProps } from "@/types/type";
import React from "react";

const CustomButton = ({
  title,
  styles,
  action,
  Icon,
  bgVirant = "initailaPrimary-500",
  textVirant = "general-100",
  ...props
}: CustomButtonProps) => {
  return (
    <button
      onClick={action}
      className={`${styles}${bgVirant}${textVirant}`}
      {...props}
    >
      {title}
      {Icon && <Icon />}
    </button>
  );
};

export default CustomButton;
