import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBMask, MDBRow, MDBView} from "mdbreact";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {DESCRIPTION_LENGTH_BREAKPOINT} from "core/globals";
import images from "core/images";

import "./PostListItem.scss";

export default ({data, detailLabel, detailLink, handleAllow, handleDelete}) => {
  const {t} = useTranslation();
  const desc = data.description.length > DESCRIPTION_LENGTH_BREAKPOINT ? data.description.substr(0, DESCRIPTION_LENGTH_BREAKPOINT) + " ..." : data.description;

  return (
    <MDBRow>
      <MDBCol lg="5" xl="4">
        <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
          {!!data.media.length && <img
            className="img-fluid post-media"
            src={data.media}
            alt=""
          />}
          {!data.media.length && <img
            className="img-fluid post-media"
            src={images.postListitem}
            alt=""
          />}
          <Link to={`${detailLink}/${data.id}`}>
            <MDBMask overlay="white-slight" />
          </Link>
        </MDBView>
      </MDBCol>
      <MDBCol lg="7" xl="8">
        <h3 className="font-weight-bold mb-3 p-0">
          <Link to={`${detailLink}/${data.id}`}>
            <strong>{data.title} {!data.allowedDate && <MDBIcon className="text-danger" icon="exclamation-circle"/>}</strong>
          </Link>
        </h3>
        <div className="infor-section">
          <p className="mr-2">
            <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
            {data.date}
          </p>
          <p className="mr-2">{data.time}</p>
          <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
          <p className="mx-2">
            <span className="mr-2"><MDBIcon icon="user"/></span>
            {data.author}
          </p>
          <p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>
          <p className="mx-2">
            <span className="mr-2"><MDBIcon icon="comments"/></span>
            {data.comments}
          </p>
        </div>
        <p className="dark-grey-text">{desc}</p>
        {/*<p>*/}
        {/*  by <a href="#!" className="font-weight-bold">Jessica Clark</a>, 19/04/2018*/}
        {/*</p>*/}
        <Link to={`${detailLink}/${data.id}`}>
          <MDBBtn size="sm" flat>
            {detailLabel}
          </MDBBtn>
        </Link>
        <MDBBtn size="sm" rounded color={!data.allowedDate.length ? "primary" : "warning"} onClick={e => !!handleAllow && handleAllow(data.id, data.title, !data.allowedDate.length)}>
          {!data.allowedDate.length ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY")}
        </MDBBtn>
        <MDBBtn size="sm" rounded color="danger" onClick={e => !!handleDelete && handleDelete(data.id, data.title)}>
          {t("COMMON.BUTTON.DELETE")}
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};
