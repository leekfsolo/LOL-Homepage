import React, { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import ButtonGlobe from "./ButtonGlobe";

interface Props {
  title?: string;
  children?: ReactNode;
  isActive?: boolean;
  hasBorder?: boolean;
  svg?: string;
}

const ButtonNav: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const { title, svg = "", isActive = false, hasBorder = false } = props;

  const [isSvgHover, setIsSvgHover] = useState<boolean>(false);
  const [isItemHover, setIsItemHover] = useState<boolean>(false);

  const toggleSvgHover = () => setIsSvgHover(!isSvgHover);
  const toggleItemHover = () => setIsItemHover(!isItemHover);

  const className = `${styles["link-item"]}${
    isActive ? ` ${styles.active}` : ""
  }${hasBorder ? ` ${styles.hasBorder}` : ""}${
    title === "shortcut.playNow" ? ` ${styles.playBtn}` : ""
  }`;

  let renderElement = (
    <div className={className}>
      <Link to="/">{t(`${title}`)}</Link>
    </div>
  );

  if (svg === "linkOut") {
    renderElement = (
      <div
        className={className}
        onMouseEnter={toggleSvgHover}
        onMouseLeave={toggleSvgHover}
      >
        <Link to="/">{t("shortcut.map")}</Link>
        <svg
          width="11"
          height="11"
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
  }

  if (svg === "globeIcon") {
    return <ButtonGlobe />;
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={toggleItemHover}
      onMouseLeave={toggleItemHover}
    >
      {renderElement}
      {isItemHover && !isActive && title !== "shortcut.playNow" && (
        <div className={styles["link-item-underline"]}></div>
      )}
    </div>
  );
};

export default ButtonNav;
