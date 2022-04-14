import React, { useEffect, useState } from "react";
import axios from "axios";
import ChampionItem from "./ChampionItem";

import styles from "./Champions.module.scss";
import { championData } from "../models/enum";

const ChampionsList = () => {
  const databaseUrl = "http://127.0.0.1:8000/champions/";
  const [data, setData] = useState<Array<championData>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const championsData = await axios.get(databaseUrl);

      setData(championsData.data);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <ul className={styles.champion__list}>
      {data.map((champion, index) => (
        <ChampionItem key={index} champion={champion} />
      ))}
    </ul>
  );
};

export default ChampionsList;
