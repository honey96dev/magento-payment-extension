import React, {Fragment, useEffect, useState} from "react";
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
import validators from "core/validators";
import {ALERT_DANGER, DATE_FORMAT_ISO, SUCCESS, TEXTAREA_ROWS0, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading"
import VoteService from "services/VoteService";

import "./NewQuestionPage.scss";


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
  const [question, setQuestion] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setItemId(id);
    !id && setLoading(false);
    !id && setItemId(undefined);
    !id && setQuestion("");
    !id && setStartDate(new Date());
    !id && setEndDate(new Date());
    !!id && VoteService.getQuestion({id})
      .then(res => {
        if (res.result === SUCCESS) {
          setQuestion(res.data.question);
          setStartDate(res.data.startDate);
          setEndDate(res.data.endDate);
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

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let res = await VoteService.saveQuestion({id: itemId, userId: auth.user.id, question, startDate: dateformat(startDate, "yyyy-mm-dd"), endDate: dateformat(endDate, "yyyy-mm-dd")});
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
        <title>{!!itemId ? t("VOTE.ADD_QUESTION.MODIFY_QUESTION") : t("VOTE.ADD_QUESTION.ADD_QUESTION")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.VOTE.VOTE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={routes.vote.questions}>{t('NAVBAR.VOTE.QUESTIONS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!itemId ? t("VOTE.ADD_QUESTION.MODIFY_QUESTION") : t("VOTE.ADD_QUESTION.ADD_QUESTION")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!itemId ? t("VOTE.ADD_QUESTION.MODIFY_QUESTION") : t("VOTE.ADD_QUESTION.ADD_QUESTION")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={12}>
                <MDBInput label={t("VOTE.QUESTION")} type="textarea" rows={TEXTAREA_ROWS0} outline value={question} onChange={e => setQuestion(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {question: true}))}>
                  {touched.question && question.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("VOTE.QUESTION")})}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md={6}>
                <MDBDatePicker format={DATE_FORMAT_ISO}  autoOk /*locale={moment.locale(t("CODE"))}*/ className="date-picker" value={startDate} getValue={val => setStartDate(val)}
                />
                <label className="date-picker-label">{t("VOTE.START_DATE")}</label>
              </MDBCol>
              <MDBCol md={6}>
                <MDBDatePicker format={DATE_FORMAT_ISO}  autoOk /*locale={moment.locale(t("CODE"))}*/ className="date-picker" value={endDate} getValue={val => setEndDate(val)}
                />
                <label className="date-picker-label">{t("VOTE.END_DATE")}</label>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!question || !question.length}>{!!itemId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
};
