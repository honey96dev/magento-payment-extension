import React, {Fragment, useEffect, useState} from "react";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBDatePicker,
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
import {ALERT_DANGER, DATE_FORMAT_ISO, SUCCESS, TEXTAREA_ROWS0, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading"
import VoteService from "services/VoteService";

import "./NewAnswerPage.scss";


export default ({}) => {
  const {questionId, packageId, id, page, page2, page3} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});
  const [touched, setTouched] = useState({});
  const [itemId, setItemId] = useState();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setItemId(id);
    !id && setLoading(false);
    !id && setItemId(undefined);
    !id && setAnswer("");
    !!questionId && VoteService.getQuestion({id: questionId})
      .then(res => {
        if (res.result === SUCCESS) {
          setQuestion(res.data.question);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
      });
    !!id && VoteService.getAnswer({id})
      .then(res => {
        if (res.result === SUCCESS) {
          setAnswer(res.data.answer);
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
      let res = await VoteService.saveAnswer({id: itemId, userId: auth.user.id, questionId, answer});
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
    setAnswer("");
    setTouched({});

    history.push(`${routes.vote.addAnswer}/${questionId}/${packageId}/${page || 1}/${page2 || 1}/${page3 || 1}`);
  };

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{!!itemId ? t("VOTE.ADD_ANSWER.MODIFY_ANSWER") : t("VOTE.ADD_ANSWER.ADD_ANSWER")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.VOTE.VOTE")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.packages}/${page3 || 1}`}>{t("NAVBAR.VOTE.PACKAGES")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.questions}/${packageId}/${page2 || 1}/${page3 || 1}`}>{t("NAVBAR.VOTE.QUESTIONS")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.answers}/${questionId}/${packageId}/${page || 1}/${page2 || 1}/${page3 || 1}`}>{t("VOTE.ANSWERS.ANSWERS")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!itemId ? t("VOTE.ADD_ANSWER.MODIFY_ANSWER") : t("VOTE.ADD_ANSWER.ADD_ANSWER")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!itemId ? t("VOTE.ADD_ANSWER.MODIFY_ANSWER") : t("VOTE.ADD_ANSWER.ADD_ANSWER")}</strong>
              </h3>
              <p className="text-left"><span className="font-weight-bold">{t("VOTE.QUESTION")}: </span>{question}</p>
            </div>
            <MDBRow>
              <MDBCol md={12}>
                <MDBInput label={t("VOTE.ANSWERS.ANSWER")} outline autoFocus value={answer} onChange={e => setAnswer(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {answer: true}))}>
                  {touched.answer && answer.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("VOTE.ANSWERS.ANSWER")})}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!answer || !answer.length}>{!!itemId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
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
