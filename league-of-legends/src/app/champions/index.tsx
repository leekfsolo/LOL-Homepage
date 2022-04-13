import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainLayout from "../../common/ui/layout/main-layout";
import { sortingType } from "../models/enum";

import styles from "./Champions.module.scss";
import ChampionsList from "./ChampionsList";
import FilterBar from "./FilterBar";

const ChampionsPage = () => {
  const { t } = useTranslation();
  const [isShowSorting, setIsShowSorting] = useState<boolean>(false);

  const [sortingTypeList, setSortingTypeList] = useState<Array<sortingType>>([
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

  return (
    <MainLayout>
      <div className={styles.champions}>
        <FilterBar
          isShowSorting={isShowSorting}
          setIsShowSorting={setIsShowSorting}
          swapSortingType={swapSortingType}
          activeSorting={activeSorting}
          sortingTypeList={sortingTypeList}
        />
        <div className={styles.background}></div>
        <ChampionsList />
      </div>
    </MainLayout>
  );
};

export default ChampionsPage;
