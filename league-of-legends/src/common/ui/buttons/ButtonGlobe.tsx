import React, { useCallback, useEffect, useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/i18n";
import { localeItem, ScopeKey, ScopeValue } from "../../utils/i18n/enum";
import styles from "./Button.module.scss";

const ButtonGlobe = () => {
  const { t } = useTranslation();
  const langBtnRef = useRef<any>();
  const [localeList, setLocaleList] = useState<Array<localeItem>>([
    {
      locale: "locale.english",
      code: "en",
      isActive: true,
    },
    {
      locale: "locale.vietnamese",
      code: "vn",
      isActive: false,
    },
    {
      locale: "locale.korean",
      code: "kr",
      isActive: false,
    },
  ]);
  const lang = localStorage.getItem(ScopeKey.LANG);

  const swapLanguage = useCallback((locale: string = "en") => {
    let lang = ScopeValue.ENG;

    if (locale === "vn") lang = ScopeValue.VIE;
    if (locale === "kr") lang = ScopeValue.KOR;

    localStorage.setItem(ScopeKey.LANG, lang);
    i18n.changeLanguage(lang);

    // if locale list shows when have changed language, hide it
    if (document.querySelector("div[role='tooltip']")) {
      langBtnRef.current.click();
    }

    const newLocaleList = localeList.map((elem) => {
      elem.isActive = locale === elem.code;
      return elem;
    });
    setLocaleList(newLocaleList);
  }, []);

  useEffect(() => {
    if (lang) swapLanguage(lang);
  }, [lang, swapLanguage]);

  const popoverLanguange = (
    <Popover>
      <div className={styles.localeList}>
        {localeList.map((lc, index) => {
          if (lc.isActive)
            return (
              <p
                className={styles.chosenLocale}
                onClick={swapLanguage.bind(this, lc.code)}
                key={index}
              >
                {t(lc.locale)}
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 11 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect
                      x="2.10889"
                      y="7.03003"
                      width="10"
                      height="2"
                      transform="rotate(-44.6688 2.10889 7.03003)"
                    ></rect>
                    <rect
                      x="1.42236"
                      y="3.48999"
                      width="5"
                      height="2"
                      transform="rotate(45.3312 1.42236 3.48999)"
                    ></rect>
                  </g>
                </svg>
              </p>
            );
          else
            return (
              <p onClick={swapLanguage.bind(this, lc.code)} key={index}>
                {t(lc.locale)}
              </p>
            );
        })}
      </div>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popoverLanguange}
      rootClose
    >
      <div className={`${styles["link-item"]} ${styles.icon}`} ref={langBtnRef}>
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            d="M7.992 0C3.576 0 0 3.584 0 8s3.576 8 7.992 8C12.416 16 16 12.416 16 8s-3.584-8-8.008-8zm5.544 4.8h-2.36c-.256-1-.624-1.96-1.104-2.848A6.424 6.424 0 0113.536 4.8zM8 1.632A11.27 11.27 0 019.528 4.8H6.472A11.27 11.27 0 018 1.632zM1.808 9.6A6.594 6.594 0 011.6 8c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 004.4 8c0 .544.048 1.072.112 1.6H1.808zm.656 1.6h2.36c.256 1 .624 1.96 1.104 2.848A6.39 6.39 0 012.464 11.2zm2.36-6.4h-2.36a6.39 6.39 0 013.464-2.848A12.52 12.52 0 004.824 4.8zM8 14.368A11.27 11.27 0 016.472 11.2h3.056A11.27 11.27 0 018 14.368zM9.872 9.6H6.128A11.77 11.77 0 016 8c0-.544.056-1.08.128-1.6h3.744C9.944 6.92 10 7.456 10 8s-.056 1.072-.128 1.6zm.2 4.448a12.52 12.52 0 001.104-2.848h2.36a6.424 6.424 0 01-3.464 2.848zM11.488 9.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6h-2.704z"
            fill="#E8E8E8"
          ></path>
        </svg>
      </div>
    </OverlayTrigger>
  );
};

export default ButtonGlobe;
