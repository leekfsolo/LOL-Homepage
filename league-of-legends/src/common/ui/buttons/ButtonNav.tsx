import React, { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import ButtonMenu from "./ButtonMenu";

interface Props {
  url?: string;
  title?: string;
  svg?: string;
  isActive?: boolean;
  underline?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const ButtonNav: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const {
    title = "",
    url = "/",
    svg = "",
    isActive = false,
    underline = false,
    onClick = () => {},
  } = props;

  const [isSvgHover, setIsSvgHover] = useState<boolean>(false);
  const [isItemHover, setIsItemHover] = useState<boolean>(false);

  const toggleSvgHover = () => setIsSvgHover(!isSvgHover);
  const showItem = () => setIsItemHover(true);
  const hideItem = () => setIsItemHover(false);

  const isPlayBtn = title === "shortcut.playNow";

  const className = `${styles["link-item"]}${
    isActive ? ` ${styles.active}` : ""
  }${isPlayBtn ? ` ${styles.playBtn}` : ""}`;

  let renderElement = (
    <div
      className={`${className} ${isActive || isPlayBtn ? styles.authBtn : ""}`}
    >
      <Link to={url}>{t(title)}</Link>
    </div>
  );

  if (svg === "linkOut") {
    renderElement = (
      <div
        className={className}
        onMouseEnter={toggleSvgHover}
        onMouseLeave={toggleSvgHover}
      >
        <Link to={url}>{t("shortcut.map")}</Link>
        <svg
          width="11"
          viewBox="0 0 16 16"
          className="ms-1"
          fill={isSvgHover ? "#f9f9f9" : "#737373"}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.916 4.158c0-.277-.116-.55-.32-.753a1.073 1.073 0 00-.752-.32H3.428l.144 2h5.93l-6.803 6.803 1.414 1.414L10.916 6.5v5.928l2 .144V4.158z"
          ></path>
        </svg>
      </div>
    );
  } else if (svg === "close") {
    renderElement = (
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        <svg viewBox="0 0 48 48" width={48} height={48}>
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
      </div>
    );
  } else if (svg === "menubar") {
    renderElement = <ButtonMenu />;
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={showItem}
      onMouseLeave={hideItem}
    >
      {renderElement}
      {underline && isItemHover && (
        <div className={styles["link-item-underline"]}></div>
      )}
    </div>
  );
};

export default ButtonNav;
