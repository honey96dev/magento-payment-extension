import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBMask, MDBRow, MDBView} from "mdbreact";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {DESCRIPTION_LENGTH_BREAKPOINT} from "core/globals";

import "./PostListItem.scss";

export default ({id, date, time, author, comments, media, title, description, detailLabel, detailLink, handleDelete}) => {
  const {t} = useTranslation();
  const desc = description.length > DESCRIPTION_LENGTH_BREAKPOINT ? description.substr(0, DESCRIPTION_LENGTH_BREAKPOINT) + " ..." : description;

  return (
    <MDBRow>
      <MDBCol lg="5" xl="4">
        <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
          <img
            className="img-fluid post-media"
            src={media}
            alt=""
          />
          <Link to={`${detailLink}/${id}`}>
            <MDBMask overlay="white-slight" />
          </Link>
        </MDBView>
      </MDBCol>
      <MDBCol lg="7" xl="8">
        <h3 className="font-weight-bold mb-3 p-0">
          <Link to={`${detailLink}/${id}`}>
            <strong>{title}</strong>
          </Link>
        </h3>
        <div className="infor-section">
          <p className="mr-2">
            <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
            {date}
          </p>
          <p className="mr-2">{time}</p>
          <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
          <p className="mx-2">
            <span className="mr-2"><MDBIcon icon="user"/></span>
            {author}
          </p>
          <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
          <p className="mx-2">
            <span className="mr-2"><MDBIcon icon="comments"/></span>
            {comments}
          </p>
        </div>
        <p className="dark-grey-text">{desc}</p>
        {/*<p>*/}
        {/*  by <a href="#!" className="font-weight-bold">Jessica Clark</a>, 19/04/2018*/}
        {/*</p>*/}
        <Link to={`${detailLink}/${id}`}>
          <MDBBtn size="sm" color="indigo">
            {detailLabel}
          </MDBBtn>
        </Link>
        <MDBBtn size="sm" color="danger" onClick={e => !!handleDelete && handleDelete(id, title)}>
          {t("COMMON.BUTTON.DELETE")}
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};
