import React, { FC } from "react";

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

export const CloseIcon: FC<CloseIconProps> = ({
  width = "20",
  height = "20",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.625 4.375L4.375 15.625"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.625 15.625L4.375 4.375"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
