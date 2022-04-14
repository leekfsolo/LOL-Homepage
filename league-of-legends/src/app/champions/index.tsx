import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../../common/ui/layout/main-layout";
import { ChampionData, SortingType } from "../models/enum";

import styles from "./Champions.module.scss";
import ChampionsList from "./ChampionsList";
import FilterBar from "./FilterBar";
import SectionHeader from "./SectionHeader";

const databaseUrl = "http://127.0.0.1:8000/champions/";

const ChampionsPage = () => {
  const [isShowSorting, setIsShowSorting] = useState<boolean>(false);
  const [data, setData] = useState<Array<ChampionData>>([]);
  const [filteredValue, setFilteredValue] = useState<string>("");
  const [sortingTypeList, setSortingTypeList] = useState<Array<SortingType>>([
    { title: "filter.sortTypeAZ", isActive: true },
    { title: "filter.sortTypeNewest", isActive: false },
    { title: "filter.sortTypeRegion", isActive: false },
  ]);

  const swapSortingType = (sortingType: string) => {
    const list = sortingTypeList.map((st) => {
      st.isActive = st.title === sortingType;
      return st;
    });

    setSortingTypeList(list);
  };

  const activeSorting = sortingTypeList.filter(
    (sortingType) => sortingType.isActive
  )[0];

  useEffect(() => {
    const fetchData = async () => {
      const championsData = await axios.get(databaseUrl);
      const filteredData = championsData.data.filter(
        (champion: ChampionData) =>
          champion.name.toLowerCase().indexOf(filteredValue.toLowerCase()) === 0
      );

      setData(filteredData);
    };

    fetchData();
  }, [filteredValue]);

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
        <ChampionsList data={data} />
      </div>
    </MainLayout>
  );
};

export default ChampionsPage;
