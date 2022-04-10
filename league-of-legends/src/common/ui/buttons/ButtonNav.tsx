import React, { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface Props {
  title?: string;
  children?: ReactNode;
  isActive?: boolean;
  hasBorder?: boolean;
  svg?: string;
}

const ButtonNav: FC<Props> = (props: Props) => {
  const { title, svg = "", isActive = false, hasBorder = false } = props;

  const [isSvgHover, setIsSvgHover] = useState<boolean>(false);
  const [isItemHover, setIsItemHover] = useState<boolean>(false);

  const toggleSvgHover = () => setIsSvgHover(!isSvgHover);
  const toggleItemHover = () => setIsItemHover(!isItemHover);

  const className = `${styles["link-item"]}${
    isActive ? ` ${styles.active}` : ""
  }${hasBorder ? ` ${styles.hasBorder}` : ""}${
    title === "Play Now" ? ` ${styles.playBtn}` : ""
  }`;

  let renderElement = (
    <div className={className}>
      <Link to="/">{title}</Link>
    </div>
  );

  if (svg === "linkOut") {
    renderElement = (
      <div
        className={className}
        onMouseEnter={toggleSvgHover}
        onMouseLeave={toggleSvgHover}
      >
        <Link to="/">Map</Link>
        <svg
          width="11"
          height="11"
          viewBox="0 0 16 16"
          className="ms-1"
          fill={isSvgHover ? "#f9f9f9" : "#737373"}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.916 4.158c0-.277-.116-.55-.32-.753a1.073 1.073 0 00-.752-.32H3.428l.144 2h5.93l-6.803 6.803 1.414 1.414L10.916 6.5v5.928l2 .144V4.158z"
          ></path>
        </svg>
      </div>
    );
  }

  if (svg === "globeIcon") {
    return (
      <div className={`${className} ${styles.icon}`}>
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
            fill="#E8E8E8"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={toggleItemHover}
      onMouseLeave={toggleItemHover}
    >
      {renderElement}
      {isItemHover && !isActive && title !== "Play Now" && (
        <div className={styles["link-item-underline"]}></div>
      )}
    </div>
  );
};

export default ButtonNav;
