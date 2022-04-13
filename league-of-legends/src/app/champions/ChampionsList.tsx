import React from "react";

import styles from "./Champions.module.scss";

const ChampionsList = () => {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionHeader__hero}>
        <img
          width={18}
          src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649672470/Decoration/content_type_icon_champion__3nwJQ_ufjw1c.png"
          alt="hero"
        />
      </div>
      <div className={styles.sectionHeader__context}>
        <span>
          <img
            src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649844686/Decoration/orjpvgdkhizqssmg3wa5.png"
            alt=""
          />
          <span className={styles.diamondLeft}></span>
        </span>
        <span className={styles.sectionHeader__title}>Champions</span>
        <span>
          <img
            src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649844694/Decoration/lqb2rwvsnmiywur2sk7s.png"
            alt=""
          />
          <span className={styles.diamondRight}></span>
        </span>
      </div>
    </div>
  );
};

export default ChampionsList;
