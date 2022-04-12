import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainLayout from "../../common/ui/layout/main-layout";
import { sortingType } from "../models/enum";

import styles from "./Champions.module.scss";

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
        <div className={`${styles.wrapper} d-none d-md-flex`}>
          <div className={styles.search}>
            <div className={styles.searchBar}>
              <img
                width="16"
                src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649672470/Decoration/content_type_icon_champion__3nwJQ_ufjw1c.png"
                alt="champions"
              />
              <input type="text" placeholder={t("filter.findChampion")} />
            </div>
            <div
              className={`${styles.searchSorting}${
                isShowSorting ? ` ${styles.active}` : ""
              } d-none d-lg-flex`}
              onClick={() => setIsShowSorting(!isShowSorting)}
            >
              <div className={styles.searchSortingWrapper}>
                <img
                  src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649672500/Decoration/ivzggvnufi8wcljikxdq.png"
                  alt="sorting"
                />
                <p>
                  {t("filter.sort")}{" "}
                  <span className={styles.searchSortingType}>
                    {" "}
                    : {t(activeSorting.title)}
                  </span>
                </p>
              </div>
              <ul className={styles.sortingTypeList}>
                {sortingTypeList.map((sortingType, index) => (
                  <li
                    key={index}
                    onClick={() => swapSortingType(sortingType.title)}
                  >
                    {t(sortingType.title)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.background}></div>
      </div>
    </MainLayout>
  );
};

export default ChampionsPage;
