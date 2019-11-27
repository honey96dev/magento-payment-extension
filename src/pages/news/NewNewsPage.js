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
import NewsService from "services/NewsService";
import {ALERT_DANGER, SUCCESS, TEXTAREA_ROWS2, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading";
import PostsService from "services/PostsService";

import "./NewNewsPage.scss";


export default ({}) => {
  const {id} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});
  const [touched, setTouched] = useState({});
  const [newsId, setNewsId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setNewsId(id);
    !id && setLoading(false);
    !id && setNewsId(undefined);
    !id && setTitle("");
    !id && setDescription("");
    !id && setUrl("");
    !!id && NewsService.get({id})
      .then(res => {
        if (res.result === SUCCESS) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setUrl(res.data.url);
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
  }, [id]);

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const deletePost = id => {
    PostsService.delete({id: modal.deleteId})
      .then(res => {
        if (res.result === SUCCESS) {
          handleGoBack();
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
          scroll.scrollToTop({
            duration: TRANSITION_TIME,
          });
        }
        setLoading(false);
        toggleModal();
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        scroll.scrollToTop({
          duration: TRANSITION_TIME,
        });
        setLoading(false);
        toggleModal();
      });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let res = await NewsService.save({id: newsId, userId: auth.user.id, title, description, url});
      !newsId && setNewsId(res.data.insertId);
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

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), deleteId: id}));
  };

  return (
    <div>
      <Helmet>
        <title>{!!newsId ? t("NEWS.ADD.MODIFY_NEWS") : t("NEWS.ADD.ADD_NEWS")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.news.all}>{t('NAVBAR.NEWS.NEWS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!newsId ? t("NEWS.ADD.MODIFY_NEWS") : t("NEWS.ADD.ADD_NEWS")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!newsId ? t("NEWS.ADD.MODIFY_NEWS") : t("NEWS.ADD.ADD_NEWS")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={12}>
                <MDBInput label={t("NEWS.TITLE")} outline value={title} onChange={e => setTitle(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {title: true}))}>
                  {touched.title && title.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("NEWS.TITLE")})}</div>}
                </MDBInput>
                <MDBInput label={t("NEWS.DESCRIPTION")} type="textarea" rows={TEXTAREA_ROWS2} outline value={description} onChange={e => setDescription(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {description: true}))}>
                  {touched.description && description.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("NEWS.DESCRIPTION")})}</div>}
                </MDBInput>
                <MDBInput label={t("NEWS.URL")} outline value={url} onChange={e => setUrl(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {url: true}))}>
                  {touched.url && !!url.length && !validators.isURL(url) && <div className="invalid-field">{!!url.length ? t("COMMON.VALIDATION.INVALID", {field: t("NEWS.URL")}) : t("COMMON.VALIDATION.REQUIRED", {field: t("NEWS.URL")})}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!title || !title.length || !description || !description.length || (!!url.length && !validators.isURL(url))}>{!!newsId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
};
