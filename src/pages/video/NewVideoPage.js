import React, {Fragment, useEffect, useState} from "react";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow
} from "mdbreact";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import routes from "core/routes";
import validators from "core/validators";
import VideoService from "services/VideoService";
import {ALERT_DANGER, SUCCESS, TEXTAREA_ROWS2, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading";

import "./NewVideoPage.scss";


export default ({}) => {
  const {id} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});
  const [touched, setTouched] = useState({});
  const [itemId, setItemId] = useState();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isFile, setIsFile] = useState(false);

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setItemId(id);
    !id && setLoading(false);
    !id && setItemId(undefined);
    !id && setTitle("");
    !id && setUrl("");
    !id && setIsFile(false);
    !!id && VideoService.get({id})
      .then(res => {
        if (res.result === SUCCESS) {
          setTitle(res.data.title);
          setUrl(res.data.url);
          setIsFile(res.data.isFile);
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
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
        setLoading(false);
      });
  }, [id]);

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let res = await VideoService.save({id: itemId, userId: auth.user.id, title, url, isFile});
      !itemId && setItemId(res.data.insertId);
      setAlert({
        show: true,
        color: res.result,
        message: res.message,
      });
    } catch (err) {
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
      });
    }
  };

  const handleNew = e => {
    setAlert({});
    setItemId(undefined);
    setTitle("");
    setUrl("");
    setIsFile(false);
    setTouched({});

    history.push(routes.video.add);
  };

  const handleGoBack = e => {
    history.goBack();
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), deleteId: id}));
  };

  return (
    <div>
      <Helmet>
        <title>{!!itemId ? t("VIDEO.ADD.MODIFY_VIDEO") : t("VIDEO.ADD.ADD_VIDEO")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.video.all}>{t("NAVBAR.VIDEO.VIDEO")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!itemId ? t("VIDEO.ADD.MODIFY_VIDEO") : t("VIDEO.ADD.ADD_VIDEO")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!itemId ? t("VIDEO.ADD.MODIFY_VIDEO") : t("VIDEO.ADD.ADD_VIDEO")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={12}>
                <MDBInput label={t("VIDEO.TITLE")} outline autoFocus value={title} onChange={e => setTitle(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {title: true}))}>
                  {touched.title && title.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("VIDEO.TITLE")})}</div>}
                </MDBInput>
                <MDBInput label={t("VIDEO.URL")} outline value={url} onChange={e => setUrl(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {url: true}))}>
                  {touched.url && !validators.isURL(url) && <div className="invalid-field">{!!url.length ? t("COMMON.VALIDATION.INVALID", {field: t("VIDEO.URL")}) : t("COMMON.VALIDATION.REQUIRED", {field: t("VIDEO.URL")})}</div>}
                </MDBInput>
                <div className="my-4">
                  <MDBInput label={t("VIDEO.IS_FILE")} type="checkbox" filled id="isFile" checked={isFile} onClick={e => setIsFile(!isFile)} />
                </div>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!title || !title.length || !url || !validators.isURL(url)}>{!!itemId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
              <MDBBtn type="button" color="primary" size="sm" disabled={!!loading}
                      onClick={handleNew}>{t("COMMON.BUTTON.NEW")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
};
