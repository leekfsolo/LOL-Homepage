import React, { useEffect, useState } from "react";
import axios from "axios";
import ChampionItem from "./ChampionItem";

import styles from "./Champions.module.scss";
import { championData } from "../models/enum";

require("dotenv").config();

const ChampionsList = () => {
  const databaseUrl = process.env.DATABASE_URL || "";
  const [data, setData] = useState<Array<championData>>([]);

  useEffect(() => {
    const championsData = axios.get(databaseUrl);

    console.log(championsData);
  }, []);

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
