import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";

import "./Topics.scss";


export default ({topics}) => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <h4>{t("POSTS.TOPICS.RELATED_TOPICS")}</h4>
      {topics.map((item, index) => (
        <div key={index} className="my-2">
          <h6>{item.topic}</h6>
        </div>
      ))}
    </Fragment>
  )
}
