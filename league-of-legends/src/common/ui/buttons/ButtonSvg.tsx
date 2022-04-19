import React, { FC } from "react";
import ButtonGlobe from "./ButtonGlobe";
import ButtonMenu from "./ButtonMenu";

interface Props {
  svg: string;
}

const ButtonSvg: FC<Props> = (props: Props) => {
  const { svg = "close" } = props;

  let renderElement = (
    <svg viewBox="0 0 48 48">
      <path
        d="M0 18A18 18 0 0118 0h12a18 18 0 0118 18v12a18 18 0 01-18 18H18A18 18 0 010 30z"
        fill="gray"
        fill-opacity=".2"
      ></path>
      <path
        d="M31 18.41L29.59 17 24 22.59 18.4 17l-1.41 1.41L22.58 24l-5.59 5.59L18.4 31l5.59-5.59L29.58 31l1.41-1.41L25.4 24z"
        fill="#fcfcfc"
      ></path>
    </svg>
  );

  if (svg === "globeIcon") {
    renderElement = <ButtonGlobe />;
  }

  if (svg === "menubar") {
    renderElement = <ButtonMenu />;
  }

  return renderElement;
};

export default ButtonSvg;
