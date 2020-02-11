import React, {useRef} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBMask, MDBRow, MDBView} from "mdbreact";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {DESCRIPTION_LENGTH_BREAKPOINT} from "core/globals";

import "./VideoListItem.scss";

export default ({id, date, time, author, url, title, isFile, detailLabel, detailLink, handleDelete}) => {
  const {t} = useTranslation();
  const videoRef = useRef();

  const makeEmbedUrl = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const result = (match && match[2].length === 11)
      ? `//www.youtube.com/embed/${match[2]}`
      : url;

    return result;
  };

  const play = e => {
    videoRef.current.play();
  };

  const pause = e => {
    videoRef.current.pause();
  };

  return (
    <MDBRow>
      <MDBCol lg="5" xl="4">
        {!!isFile && <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4" onMouseEnter={play} onMouseLeave={pause}>
          <video ref={videoRef} className="video-fluid post-media" loop>
            <source src={url} />
          </video>
          <Link to={`${detailLink}/${id}`}>
            <MDBMask overlay="white-slight" />
          </Link>
        </MDBView>}
        {!isFile && <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
          <iframe className="video-fluid post-media2" src={makeEmbedUrl(url)} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen={true}/>
          <Link to={`${detailLink}/${id}`}>
            <MDBMask overlay="white-slight" />
          </Link>
        </MDBView>}
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
          {/*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*/}
          {/*<p className="mx-2">*/}
          {/*  <span className="mr-2"><MDBIcon icon="user"/></span>*/}
          {/*  {author}*/}
          {/*</p>*/}
          {/*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*/}
          {/*<p className="mx-2">*/}
          {/*  <span className="mr-2"><MDBIcon icon="comments"/></span>*/}
          {/*  {comments}*/}
          {/*</p>*/}
        </div>
        {/*<p>*/}
        {/*  by <a href="#!" className="font-weight-bold">Jessica Clark</a>, 19/04/2018*/}
        {/*</p>*/}
        <div>
          <Link to={`${detailLink}/${id}`}>
            <MDBBtn size="sm" rounded color="indigo">
              {detailLabel}
            </MDBBtn>
          </Link>
          <MDBBtn size="sm" rounded color="danger" onClick={e => !!handleDelete && handleDelete(id, title)}>
            {t("COMMON.BUTTON.DELETE")}
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBRow>
  );
};
