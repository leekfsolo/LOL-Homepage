import React, { useState } from "react";
import ModalMenu from "../modals/ModalMenu";

import styles from "./Button.module.scss";

const ButtonMenu = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const showModal = () => setIsShow(true);
  const hideModal = () => setIsShow(false);

  return (
    <div className={`${styles["link-item"]} ${styles.menubar__extend}`}>
      <svg viewBox="0 0 48 48" width={48} onClick={showModal}>
        <path
          d="M0 18A18 18 0 0118 0h12a18 18 0 0118 18v12a18 18 0 01-18 18H18A18 18 0 010 30z"
          fill="gray"
          fill-opacity=".2"
        ></path>
        <path
          d="M15 18h18v2H15zm0 5h18v2H15zm0 7v-2h18v2z"
          fill="#fcfcfc"
        ></path>
      </svg>
      {isShow && <ModalMenu hideModal={hideModal} />}
    </div>
  );
};

export default ButtonMenu;
