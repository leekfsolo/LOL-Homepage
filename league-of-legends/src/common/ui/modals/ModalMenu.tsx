import React, { FC, ReactNode, useContext } from "react";
import { createPortal } from "react-dom";
import MenuContext from "../../../context/menu-context/context";
import ButtonDropDown from "../buttons/ButtonDropDown";
import ButtonNav from "../buttons/ButtonNav";

import styles from "./Modal.module.scss";

interface Props {
  hideModal: () => void;
  children?: ReactNode;
  styleName: string;
}

const ModalMenu: FC<Props> = (props: Props) => {
  const { hideModal, styleName } = props;
  const menuCtx = useContext(MenuContext);

  const modal_overlay = document.getElementById("modal");
  const renderElement = (
    <div className={`${styles.menu} ${styles[styleName]}`}>
      <div className={styles.menu__header}>
        <ButtonNav svg="close" onClick={hideModal} />
      </div>
      <div className={styles.menu__content}>
        {menuCtx.items.map((elem, index) => {
          if (elem.items) {
            return (
              <ButtonDropDown
                title={elem.title}
                items={elem.items}
                key={index}
                responsive={true}
              />
            );
          } else {
            if (elem.title === "shortcut.map")
              return <ButtonNav title="map" svg="linkOut" key={index} />;
            else
              return (
                <ButtonNav title={elem.title} key={index} url={elem.url} />
              );
          }
        })}
      </div>
      <div className={styles.menu__auth}>
        <ButtonNav title="sign in" isActive />
        <ButtonNav title="shortcut.playNow" />
      </div>
    </div>
  );

  if (modal_overlay) return createPortal(renderElement, modal_overlay);

  return <></>;
};

export default ModalMenu;
