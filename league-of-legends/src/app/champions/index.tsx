import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../../common/ui/layout/main-layout";
import { SortedOption } from "../../context/enum";
import { ChampionData, SortingType } from "../model";

import styles from "./Champions.module.scss";
import ChampionsList from "./ChampionsList";
import FilterBar from "./FilterBar";
import SectionHeader from "./SectionHeader";

const databaseUrl = "http://127.0.0.1:8000/champions/";

const ChampionsPage = () => {
  const [isShowSorting, setIsShowSorting] = useState<boolean>(false);
  const [data, setData] = useState<Array<ChampionData>>([]);
  const [filteredValue, setFilteredValue] = useState<string>("");
  const [sortedOption, setSortedOption] = useState<string>(SortedOption.AZ);
  const [sortingTypeList, setSortingTypeList] = useState<Array<SortingType>>([
    { title: "filter.sortTypeAZ", isActive: true },
    { title: "filter.sortTypeNewest", isActive: false },
    { title: "filter.sortTypeRegion", isActive: false },
  ]);

  const swapSortingType = (sortingType: string) => {
    const prefixTitleLength = "filter.sortType".length;
    const sortOption = sortingType.slice(prefixTitleLength);
    const list = sortingTypeList.map((st) => {
      st.isActive = st.title === sortingType;
      return st;
    });

    setSortingTypeList(list);
    setSortedOption(sortOption);
  };

  const activeSorting = sortingTypeList.filter(
    (sortingType) => sortingType.isActive
  )[0];

  useEffect(() => {
    const fetchData = async () => {
      const championsData = await axios.get(databaseUrl);

      const sortedDataByOption = championsData.data.sort(
        (item1: ChampionData, item2: ChampionData) => {
          if (sortedOption === "AZ") {
            return item1.name.localeCompare(item2.name);
          } else if (sortedOption === "Region") {
            return item1.region.localeCompare(item2.region);
          } else {
            const date1 = new Date(item1.release_date);
            const date2 = new Date(item2.release_date);
            return date2.getTime() - date1.getTime();
          }
        }
      );

      const filteredDataByValue = sortedDataByOption.filter(
        (champion: ChampionData) =>
          champion.name.toLowerCase().indexOf(filteredValue.toLowerCase()) === 0
      );

      setData(filteredDataByValue);
    };

    fetchData();
  }, [filteredValue, sortedOption]);

  return (
    <MainLayout>
      <div className={styles.champions}>
        <FilterBar
          isShowSorting={isShowSorting}
          setIsShowSorting={setIsShowSorting}
          swapSortingType={swapSortingType}
          activeSorting={activeSorting}
          sortingTypeList={sortingTypeList}
          setFilteredValue={setFilteredValue}
        />
        <div className={styles.background}></div>
        <SectionHeader />
        <ChampionsList data={data} sortedOption={sortedOption} />
      </div>
    </MainLayout>
  );
};

export default ChampionsPage;
