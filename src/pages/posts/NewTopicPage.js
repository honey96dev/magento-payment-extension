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
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading"
import Service from "services/PostsService";

import "./NewTopicPage.scss";


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
  const [topic, setTopic] = useState("");

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setItemId(id);
    !id && setLoading(false);
    !id && setItemId(undefined);
    !id && setTopic("");
    !!id && Service.getTopic({id})
      .then(res => {
        if (res.result === SUCCESS) {
          setTopic(res.data.topic);
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
      let res = await Service.saveTopic({id: itemId, topic});
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

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{!!itemId ? t("POSTS.TOPICS.EDIT_TOPIC") : t("POSTS.TOPICS.ADD_TOPIC")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.POSTS.POSTS")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={routes.posts.topics}>{t("NAVBAR.POSTS.TOPICS")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!itemId ? t("POSTS.TOPICS.EDIT_TOPIC") : t("POSTS.TOPICS.ADD_TOPIC")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!itemId ? t("POSTS.TOPICS.EDIT_TOPIC") : t("POSTS.TOPICS.ADD_TOPIC")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={12}>
                <MDBInput label={t("POSTS.TOPICS.TOPIC")} outline autoFocus value={topic} onChange={e => setTopic(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {topic: true}))}>
                  {touched.topic && topic.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.TOPICS.TOPIC")})}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!topic || !topic.length}>{!!itemId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
};
