import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import ButtonNav from "../buttons/ButtonNav";

import styles from "./Modal.module.scss";

interface Props {
  hideModal: () => void;
  children?: ReactNode;
}

const ModalMenu: FC<Props> = (props: Props) => {
  const { hideModal } = props;

  const modal_overlay = document.getElementById("modal");
  const renderElement = (
    <div className={styles.modal__menu}>
      <ButtonNav svg="globeIcon" />
    </div>
  );

  if (modal_overlay) return createPortal(renderElement, modal_overlay);

  return <></>;
};

export default ModalMenu;
