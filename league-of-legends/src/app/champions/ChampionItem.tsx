import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import styles from "./Champions.module.scss";

const ChampionItem = () => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);

  const toggleHoverHandler = () => setIsHover(!isHover);

  return (
    <li onMouseEnter={toggleHoverHandler} onMouseLeave={toggleHoverHandler}>
      <div
        className={`${styles.champion__item}${
          isHover ? ` ${styles.active}` : ""
        }`}
      >
        <div className={styles.champion__image}></div>
        <div
          className={`${styles.champion__body}${
            isHover ? ` ${styles.active}` : ""
          }`}
        >
          <div className={styles.champion__info}>
            <h5>Aatrox</h5>
            <p>Runeterra</p>
          </div>
          <div className={styles.champion__moreInfo}>
            <span>{t("champion.explore")}</span>
            <span className={styles.arrow}>
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
