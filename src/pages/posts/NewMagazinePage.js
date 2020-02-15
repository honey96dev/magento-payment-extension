import React, {createRef, Fragment, useEffect, useRef, useState} from "react";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol, MDBDatePicker,
  MDBInput,
  MDBRow
} from "mdbreact";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";
import dateformat from "dateformat";

import routes from "core/routes";
import {
  ALERT_DANGER,
  DATE_FORMAT_ISO,
  FILEUPLOAD_MAXSIZE1,
  SUCCESS,
  TEXTAREA_ROWS2,
  TRANSITION_TIME
} from "core/globals";
import apis from "core/apis";
import Loading from "components/Loading"
import Service from "services/PostsService";

import "./NewMagazinePage.scss";
import MDBFileupload from "mdb-react-fileupload";


export default ({}) => {
  const {questionId, id} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});
  const [touched, setTouched] = useState({});
  const [itemId, setItemId] = useState();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");

  const extensions = ["pdf"];

  const dateRef = createRef(null);
  const fileRef = useRef(null);

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setItemId(id);
    !id && setLoading(false);
    !id && setItemId(undefined);
    !id && setDate(new Date());
    !id && setTitle("");
    !id && setDescription("");
    !id && setMedia("");
    !!id && Service.getMagazine({id})
      .then(res => {
        if (res.result === SUCCESS) {
          const {date, title, description, media} = res.data;
          setDate(Date.parse(date));
          setTitle(title);
          setDescription(description);
          !!media && setMedia(`${apis.assetsBaseUrl}${media}`);
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

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let params = new FormData();
      !!itemId && params.append("id", itemId);
      params.append("date", dateformat(date, "yyyy-mm-dd"));
      params.append("title", title);
      params.append("description", description);
      !!file && params.append("file", file);
      let res = await Service.saveMagazine(params);
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
    !!dateRef.current && (dateRef.current.state.selectedDate = dateformat(new Date(), "yyyy-mm-dd"));
    setTitle("");
    setDescription("");
    setMedia("");
    !!fileRef.current && fileRef.current.resetPreview();
    setTouched({});

    history.push(routes.posts.addMagazine);
  };

  const handleGoBack = e => {
    history.goBack();
  };

  console.log(file, media)

  return (
    <div>
      <Helmet>
        <title>{!!itemId ? t("POSTS.MAGAZINES.EDIT_MAGAZINE") : t("POSTS.MAGAZINES.ADD_MAGAZINE")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.POSTS.POSTS")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={routes.posts.magazines}>{t("NAVBAR.POSTS.MAGAZINES")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!itemId ? t("POSTS.MAGAZINES.EDIT_MAGAZINE") : t("POSTS.MAGAZINES.ADD_MAGAZINE")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!itemId ? t("POSTS.MAGAZINES.EDIT_MAGAZINE") : t("POSTS.MAGAZINES.ADD_MAGAZINE")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={8}>
                <MDBRow>
                  <MDBCol md={6}>
                    <MDBDatePicker ref={dateRef} format={DATE_FORMAT_ISO} autoOk keyboard /*locale={moment.locale(t("CODE"))}*/ className="date-picker" value={date} getValue={val => setDate(val)}
                    />
                    <label className="date-picker-label">{t("POSTS.MAGAZINES.DATE")}</label>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md={12}>
                    <MDBInput label={t("POSTS.MAGAZINES.TITLE")} outline autoFocus containerClass="mb-0" value={title} onChange={e => setTitle(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {title: true}))}>
                      {touched.title && title.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.MAGAZINES.TITLE")})}</div>}
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md={12}>
                    <MDBInput label={t("POSTS.MAGAZINES.DESCRIPTION")} type="textarea" rows={TEXTAREA_ROWS2} outline value={description} onChange={e => setDescription(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {description: true}))}>
                      {touched.description && description.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.MAGAZINES.DESCRIPTION")})}</div>}
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md={4}>
                <div className="md-form">
                  <MDBFileupload
                    ref={fileRef}
                    defaultFileSrc={media} getValue={setFile} showRemove={false} maxFileSize={FILEUPLOAD_MAXSIZE1}
                    allowedFileExtensions={extensions}
                    messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")} messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                    messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")} messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                    errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILEUPLOAD_MAXSIZE1})}
                    errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: extensions.join(", ")})}/>
                </div>
              </MDBCol>
            </MDBRow>

            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!title.length || !description.length || (!media.length && !file)}>{!!itemId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
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
