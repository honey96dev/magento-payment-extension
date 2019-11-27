import React, {Fragment} from "react";
import {MDBAlert, MDBIcon} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./Comments.scss";

export default ({data}) => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <MDBAlert className="mt-5 mb-3" color="primary">{!data.length ? t("POSTS.DETAIL.NO_COMMENT") : t("POSTS.DETAIL.COMMENTS")}</MDBAlert>
      {data.map((item, index) => (
        <div key={index} className="my-3 ml-5">
          <div className="infor-section text-left">
            <p className="mr-2 mb-0">
              <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
              {item.date}
            </p>
            <p className="mr-2 mb-0">{item.time}</p>
            <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
            <p className="mx-2 mb-0">
              <span className="mr-2"><MDBIcon icon="user"/></span>
              {`${item.firstName} ${item.lastName}`}
            </p>
          </div>
          <div className="text-left">
            {item.comment}
          </div>
          {index < data.length - 1 && <hr/>}
        </div>
      ))}
    </Fragment>
  );
};
