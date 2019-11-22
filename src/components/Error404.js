import React from "react";
import {useTranslation} from "react-i18next";

import Error from "./partial/Error";

import "./Error404.scss";

export default (props) => {

  const {t} = useTranslation();

  return (
    <div className="loading-page">
      <Error heading={404} message={t("COMMON.ERROR.ERROR_404")} />
    </div>
  );
}
