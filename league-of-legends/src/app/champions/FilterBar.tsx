import React, { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SortingType } from "../model";

import styles from "./Champions.module.scss";

type Props = {
  isShowSorting: boolean;
  setIsShowSorting: (isShowSorting: boolean) => void;
  activeSorting: SortingType;
  swapSortingType: (sortingType: string) => void;
  sortingTypeList: Array<SortingType>;
  setFilteredValue: (value: string) => void;
};

const FilterBar: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const {
    isShowSorting,
    setIsShowSorting,
    activeSorting,
    swapSortingType,
    sortingTypeList,
    setFilteredValue,
  } = props;

  const inputRef = useRef<any>();

  const filterChampion = () => {
    const value = inputRef.current.value;

    setFilteredValue(value);
  };

  return (
    <div className={`${styles.wrapper} d-none d-md-flex`}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <img
            width="16"
            src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649672470/Decoration/content_type_icon_champion__3nwJQ_ufjw1c.png"
            alt="champions"
          />
          <input
            type="text"
            placeholder={t("filter.findChampion")}
            ref={inputRef}
            onInput={filterChampion}
          />
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
  );
};

export default FilterBar;
