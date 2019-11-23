import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdbreact";

import "./PostDetail.scss";

export default ({data, comments}) => {
  const {t} = useTranslation();
  return (
    <Fragment>
      <h3 className="font-weight-bold my-3 p-0 text-center">
        <strong>{data.title}</strong>
      </h3>
      <div className="infor-section text-left">
        <p className="mr-2">
          <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
          {data.date}
        </p>
        <p className="mr-2">{data.time}</p>
        <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
        <p className="mx-2">
          <span className="mr-2"><MDBIcon icon="user"/></span>
          {`${data.firstName} ${data.lastName}`}
        </p>
        <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
        <p className="mx-2">
          <span className="mr-2"><MDBIcon icon="comments"/></span>
          {comments}
        </p>
      </div>
      <div className="text-center">
        <img src={data.media} className="post-detail-media view overlay rounded z-depth-1-half mb-4"/>
      </div>
      <div>
        <div className="text-left">
          {data.description}
        </div>
      </div>
    </Fragment>
  );
}
