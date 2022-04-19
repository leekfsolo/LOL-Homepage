import React, { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChampionData } from "../model";

import styles from "./Champions.module.scss";

interface Props {
  children?: ReactNode;
  champion: ChampionData;
}

const ChampionItem: FC<Props> = (props: Props) => {
  const { name, region, image, imagePosition } = props.champion;
  const { t } = useTranslation();
  const [isCardHover, setIsCardHover] = useState<boolean>(false);
  const [isInfoHover, setIsInfoHover] = useState<boolean>(false);

  const toggleCardHoverHandler = () => setIsCardHover(!isCardHover);
  const toggleInfoHoverHandler = () => setIsInfoHover(!isInfoHover);

  return (
    <li
      onMouseEnter={toggleCardHoverHandler}
      onMouseLeave={toggleCardHoverHandler}
    >
      <div
        className={`${styles.champion__item}${
          isCardHover ? ` ${styles.active}` : ""
        }`}
      >
        <div
          className={styles.champion__image}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: imagePosition,
          }}
        ></div>
        <div className={styles.champion__body}>
          <div className={styles.champion__info}>
            <h5>{name}</h5>
            <p>{region}</p>
          </div>
          <div
            className={styles.champion__moreInfo}
            onMouseEnter={toggleInfoHoverHandler}
            onMouseLeave={toggleInfoHoverHandler}
          >
            <span>{t("champion.explore")}</span>
            <span
              className={`${styles.arrow} ${isInfoHover ? styles.active : ""}`}
            >
              <span className={styles.hoverArrow}>
                <svg
                  version="1.0"
                  x="0px"
                  y="0px"
                  viewBox="0 0 162 70.28"
                  fill="#c4b998"
                  width="12.5px"
                >
                  <circle
                    fill="#c4b998"
                    cx="31.57"
                    cy="35.21"
                    r="11.57"
                  ></circle>
                  <g>
                    <polygon
                      fill="#c4b998"
                      points="124.18,70.39 118.31,64.09 149.37,35.22 118.31,6.35 124.18,0.05 162,35.22"
                    ></polygon>
                    <rect
                      x="84.61"
                      y="29.76"
                      fill="#c4b998"
                      width="65"
                      height="11.06"
                    ></rect>
                  </g>
                </svg>
              </span>
              <span className={styles.restArrow}>
                <svg
                  version="1.0"
                  x="0px"
                  y="0px"
                  viewBox="0 0 162 70.28"
                  fill="#937341"
                  width="12.5px"
                >
                  <circle
                    fill="#937341"
                    cx="31.57"
                    cy="35.21"
                    r="11.57"
                  ></circle>
                  <g>
                    <polygon
                      fill="#937341"
                      points="124.18,70.39 118.31,64.09 149.37,35.22 118.31,6.35 124.18,0.05 162,35.22"
                    ></polygon>
                    <rect
                      x="84.61"
                      y="29.76"
                      fill="#937341"
                      width="65"
                      height="11.06"
                    ></rect>
                  </g>
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChampionItem;
