import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainLayout from "../../common/ui/layout/main-layout";
import { CarousselItem } from "../model";

import styles from "./Home.module.scss";

const HomePage = () => {
  const { t } = useTranslation();

  const [carousselItems, setCarousselItems] = useState<Array<CarousselItem>>([
    {
      url: "https://res.cloudinary.com/dcsi3yllr/image/upload/v1652261124/Home/hollowspun.jpg",
    },
    {
      url: "https://res.cloudinary.com/dcsi3yllr/image/upload/v1652261093/Home/in-battle-broken-splash_ulbskc.jpg",
      prev: true,
    },
    {
      url: "https://res.cloudinary.com/dcsi3yllr/image/upload/v1652261079/Home/the-unexpected-spark-splash_gut7nx.jpg",
      isActive: true,
    },
    {
      url: "https://res.cloudinary.com/dcsi3yllr/image/upload/v1652261065/Home/renata-color-splash_dgmbfa.jpg",
      next: true,
    },
    {
      url: "https://res.cloudinary.com/dcsi3yllr/image/upload/v1652261026/Home/stranger-in-the-road-splash_kygcli.jpg",
    },
  ]);

  return (
    <MainLayout>
      <div className={styles.caroussel}>
        {carousselItems.map((item) => {
          return (
            <div
              className={`${styles.caroussel__item} ${
                item.isActive ? styles.active : ""
              } ${item.prev ? styles.prev : ""} ${
                item.next ? styles.next : ""
              } `}
              style={{
                background: `url(${item.url})`,
                backgroundPosition: "50% 100%",
              }}
            ></div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default HomePage;
