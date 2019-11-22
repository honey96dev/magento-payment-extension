import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";

import "./Error.scss";

export default ({heading, message}) => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <div className="match-parent">
        <div className="top-p50 error-indicator" role="status">
          <h1 className="text-center">{heading}</h1>
          <h4 className="text-center">{message}</h4>
        </div>
      </div>
    </Fragment>
  );
}