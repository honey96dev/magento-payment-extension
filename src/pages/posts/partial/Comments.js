import React, {Fragment} from "react";
import {MDBAlert, MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./Comments.scss";

export default ({data, handleDelete}) => {
  const {t} = useTranslation();

  const _handleDelete = (postId, userId, fullName) => {
    !!handleDelete && handleDelete(postId, userId, fullName);
  };

  return (
    <Fragment>
      <MDBAlert className="mt-5 mb-3" color="primary">{!data.length ? t("POSTS.DETAIL.NO_COMMENT") : t("POSTS.DETAIL.COMMENTS")}</MDBAlert>
      {data.map((item, index) => (
        <Fragment key={index}>
          <MDBRow className="my-3 ml-5">
            <MDBCol md={10}>
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
            </MDBCol>
            <MDBCol md={2}>
              <MDBBtn type="button" size="sm" color="danger" onClick={() => _handleDelete(item.postId, item.userId, `${item.firstName} ${item.lastName}`)} rounded>{t("COMMON.BUTTON.DELETE")}</MDBBtn>
            </MDBCol>
          </MDBRow>
          {index < data.length - 1 && <hr/>}
        </Fragment>
      ))}
    </Fragment>
  );
};
