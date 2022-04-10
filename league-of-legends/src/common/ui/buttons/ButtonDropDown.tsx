import React, { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface Props {
  children?: ReactNode;
  title: string;
  items: Array<string>;
}

const ButtonDropDown: FC<Props> = (props: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleDropDown = () => setIsShow(!isShow);
  const { title, items } = props;
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.dropDown}
        onMouseEnter={toggleDropDown}
        onMouseLeave={toggleDropDown}
      >
        <div className={styles.dropDown__Btn}>
          {title}
          <svg
            width="10"
            height="5"
            viewBox="0 0 8 5"
            fill={isShow ? "#f9f9f9" : "#7E7E7E"}
          >
            <path d="M.707 1.707l2.586 2.586a1 1 0 001.414 0l2.586-2.586C7.923 1.077 7.477 0 6.586 0H1.414C.524 0 .077 1.077.707 1.707z"></path>
          </svg>
        </div>
        {isShow && (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <Link to="/">{item}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ButtonDropDown;
