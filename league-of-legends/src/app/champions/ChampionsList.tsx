import React from "react";
import ChampionItem from "./ChampionItem";

import styles from "./Champions.module.scss";

const ChampionsList = () => {
  return (
    <ul className={styles.champion__list}>
      <ChampionItem />
      <ChampionItem />
      <ChampionItem />
      <ChampionItem />
      <ChampionItem />
      <ChampionItem />
    </ul>
  );
};

export default ChampionsList;
