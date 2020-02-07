import React, {Fragment, useEffect, useRef, useState} from "react";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";
import MDBFileupload from "mdb-react-fileupload";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";
import {sprintf} from "sprintf-js";
import apis from "core/apis";
import {ALERT_DANGER, FILEUPLOAD_MAXSIZE1, PROJECT_SCOPE, SUCCESS, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading";
import Service from "services/AboutService";

import "./AboutUsPage.scss";


export default ({}) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});
  const [touched, setTouched] = useState({});
  const [brochureName, setBrochureName] = useState("");
  const [originBrochure, setOriginBrochure] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [originVideo, setOriginVideo] = useState("");
  const [video, setVideo] = useState(null);

  const videoExts = ["mp4", " m4a", " m4v", " f4v", " f4a", " m4b", " m4r", " f4b", " mov", " 3gp", " 3gp2", " 3g2", " 3gpp", " 3gpp2", " webm"];
  const brochureExts = ["jpg", "pdf"];

  const brochureRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    Service.loadAboutUs()
      .then(res => {
        if (res.result === SUCCESS) {
          const data = res.data;
          !!data["brochure"].length && setBrochureName((data["brochure"].startsWith("http://") || data["brochure"].startsWith("https://")) ? data["brochure"] : sprintf("%s%s", apis.assetsBaseUrl, data["brochure"]));
          !!data["video"].length && setVideoName((data["video"].startsWith("http://") || data["video"].startsWith("https://")) ? data["video"] : sprintf("%s%s", apis.assetsBaseUrl, data["video"]));
          setOriginBrochure(data.originBrochure);
          setOriginVideo(data.originVideo);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  }, []);

  const handleSubmitBrochure = async e => {
    e.preventDefault();

    try {
      let params = new FormData();
      params.append("scope", PROJECT_SCOPE);
      params.append("brochure", brochure);
      params.append("originBrochure", brochureRef.current.state.fileName);
      let res = await Service.saveAboutUsBrochure(params);
      setOriginBrochure(res.data.originBrochure);
      setAlert({
        show: true,
        color: res.result,
        message: res.message,
      });
    } catch (err) {
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
      });
    }
  };

  const handleSubmitVideo = async e => {
    e.preventDefault();

    try {
      let params = new FormData();
      params.append("scope", PROJECT_SCOPE);
      params.append("video", video);
      params.append("originVideo", videoRef.current.state.fileName);
      let res = await Service.saveAboutUsVideo(params);
      setOriginVideo(res.data.originVideo);
      setAlert({
        show: true,
        color: res.result,
        message: res.message,
      });
    } catch (err) {
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
      });
    }
  };

  const handleGoBack = e => {
    history.goBack();
  };

  console.log(brochureRef)

  return (
    <div>
      <Helmet>
        <title>{t("NAVBAR.ABOUT.US")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.ABOUT.ABOUT')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t("NAVBAR.ABOUT.US")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <div className="text-center">
            <h3 className="dark-grey-text mt-3 mb-0">
              <strong>{t("NAVBAR.ABOUT.US")}</strong>
            </h3>
          </div>
          {/*<Fragment>*/}
          {/*  <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>*/}
          {/*</Fragment>*/}
          <MDBRow>
            <MDBCol md={6}>
              <h5 className="text-center mb-4">{t("ABOUT.US.BROCHURE")}</h5>
              {!!originBrochure.length && <p className="text-left mb-2">{t("ABOUT.US.ORIGIN_BROCHURE")}: <span>{originBrochure}</span></p>}
            </MDBCol>
            <MDBCol md={6}>
              <h5 className="text-center mb-4">{t("ABOUT.US.VIDEO")}</h5>
              {!!originVideo.length && <p className="text-left mb-2">{t("ABOUT.US.ORIGIN_VIDEO")}: <span>{originVideo}</span></p>}
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md={6}>
              <div className="md-form mt-2">
                <MDBFileupload ref={brochureRef} defaultFileSrc={brochureName} getValue={setBrochure} showRemove={false} maxFileSize={FILEUPLOAD_MAXSIZE1} allowedFileExtensions={brochureExts}
                               messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")} messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                               messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")} messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                               errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILEUPLOAD_MAXSIZE1})}
                               errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: brochureExts.join(", ")})} />
              </div>
              <Fragment>
                <MDBBtn type="submit" color="indigo" size="sm" disabled={!brochure} onClick={handleSubmitBrochure}>{t("COMMON.BUTTON.SAVE")}</MDBBtn>
              </Fragment>
            </MDBCol>
            <MDBCol md={6}>
              <div className="md-form mt-2">
                <MDBFileupload ref={videoRef} defaultFileSrc={videoName} getValue={setVideo} showRemove={false} maxFileSize={FILEUPLOAD_MAXSIZE1} allowedFileExtensions={videoExts}
                               messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")} messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                               messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")} messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                               errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILEUPLOAD_MAXSIZE1})}
                               errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: videoExts.join(", ")})} />
              </div>
              <Fragment>
                <MDBBtn type="submit" color="indigo" size="sm" disabled={!video} onClick={handleSubmitVideo}>{t("COMMON.BUTTON.SAVE")}</MDBBtn>
              </Fragment>
            </MDBCol>
          </MDBRow>
          <CSSTransition in={alert.show} classNames="mt-4 fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCardBody>
      </MDBCard>}
    </div>
  )
};
