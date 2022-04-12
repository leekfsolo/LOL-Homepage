import React from "react";
import MainLayout from "../../common/ui/layout/main-layout";

import styles from "./Champions.module.scss";

const ChampionsPage = () => {
  return (
    <MainLayout>
      <div className={styles.champions}>
        <div className={`${styles.search} d-none d-md-flex`}>
          <div className={styles.searchBar}>
            <img
              width="16"
              src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649672470/Decoration/content_type_icon_champion__3nwJQ_ufjw1c.png"
              alt="champions"
            />
            <input type="text" placeholder="Find a champion" />
          </div>
          <div className={`${styles.searchSorting} d-none d-lg-flex`}>
            <img
              width="16"
              src="https://res.cloudinary.com/dcsi3yllr/image/upload/v1649672500/Decoration/ivzggvnufi8wcljikxdq.png"
              alt="sorting"
            />
            <p>
              sorting by{" "}
              <span className={styles.searchSortingType}> : a-z</span>
            </p>
          </div>
        </div>
        <div className={styles.background}></div>
      </div>
    </MainLayout>
  );
};

export default ChampionsPage;
