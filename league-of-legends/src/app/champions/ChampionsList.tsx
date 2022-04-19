import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ChampionData, RegionData } from "../model";
import ChampionItem from "./ChampionItem";

import styles from "./Champions.module.scss";

interface Props {
  children?: ReactNode;
  data: Array<ChampionData>;
  sortedOption: string;
}

const ChampionsList: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const { data, sortedOption = "AZ" } = props;
  let renderedChampionsTotal = 0;

  const renderedRegionSection = (total: number) => {
    const renderedData = data
      .slice(renderedChampionsTotal, renderedChampionsTotal + total)
      .map((champion, index) => {
        return <ChampionItem key={index} champion={champion} />;
      });

    renderedChampionsTotal += total;

    return renderedData;
  };

  if (sortedOption === "Region") {
    const regions: Array<RegionData> = [];
    let lastIndex = 0;

    data.forEach((champion) => {
      if (regions.length === 0) {
        regions.push({ name: champion.region, total: 1 });
      } else {
        if (regions[lastIndex].name === champion.region)
          regions[lastIndex].total++;
        else {
          regions.push({ name: champion.region, total: 1 });
          lastIndex++;
        }
      }
    });

    return (
      <div className={styles.region__wrapper}>
        {regions.map((region) => {
          return (
            <section className={styles.region__section}>
              <div className={styles.region__header}>
                <span>
                  <img
                    src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649844694/Decoration/lqb2rwvsnmiywur2sk7s.png"
                    alt=""
                    style={{ transform: "rotate(180deg)" }}
                  />
                </span>
                <span className={styles.region__title}>{region.name}</span>
                <span>
                  <img
                    src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649844686/Decoration/orjpvgdkhizqssmg3wa5.png"
                    alt=""
                  />
                </span>
              </div>
              <div className={styles.region__subHeader}>
                <span>
                  {region.total} {t("region.subHeader.championsFound")}
                </span>
              </div>
              <ul className={styles.champion__list}>
                {renderedRegionSection(region.total)}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <ul className={styles.champion__list}>
      {data.map((champion, index) => (
        <ChampionItem key={index} champion={champion} />
      ))}
    </ul>
  );
};

export default ChampionsList;
