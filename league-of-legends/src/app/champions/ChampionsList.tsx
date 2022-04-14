import { FC, ReactNode } from "react";
import { ChampionData } from "../models/enum";
import ChampionItem from "./ChampionItem";

import styles from "./Champions.module.scss";

interface Props {
  children?: ReactNode;
  data: Array<ChampionData>;
}

const ChampionsList: FC<Props> = (props: Props) => {
  const { data } = props;

  return (
    <ul className={styles.champion__list}>
      {data.map((champion, index) => (
        <ChampionItem key={index} champion={champion} />
      ))}
    </ul>
  );
};

export default ChampionsList;
