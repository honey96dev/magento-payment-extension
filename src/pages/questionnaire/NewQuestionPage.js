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
  MDBRow, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions
} from "mdbreact";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import routes from "core/routes";
import {
  ALERT_DANGER,
  DESCRIPTION_LENGTH_BREAKPOINT2, GENDER_FEMALE,
  GENDER_MALE, isDev, PREFIX_CHECKBOX, PREFIX_INPUT,
  SUCCESS,
  TEXTAREA_ROWS1,
  TRANSITION_TIME
} from "core/globals";
import Loading from "components/Loading"
import Service from "services/QuestionnaireService";

import "./NewQuestionPage.scss";


export default ({}) => {
  const {packageId, id, page, page2, page3} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [touched, setTouched] = useState({});
  const [itemId, setItemId] = useState();
  const [packageName, setPackageName] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState(isDev ? PREFIX_CHECKBOX : "");

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setItemId(id);
    !id && setLoading(false);
    !id && setItemId(undefined);
    !id && setQuestion("");
    !id && setType(isDev ? PREFIX_CHECKBOX : "");
    !!packageId && Service.getPackage({id: packageId})
      .then(res => {
        if (res.result === SUCCESS) {
          setPackageName(res.data.name);
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
    !!id && Service.getQuestion({id})
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
      let res = await Service.saveQuestion({id: itemId, userId: auth.user.id, packageId, question, type});
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
    setQuestion("");
    setType(isDev ? PREFIX_CHECKBOX : "");
    setTouched({});

    // console.log("packageId", packageId)
    history.push(`${routes.questionnaire.addQuestion}/${packageId}/${page || 1}/${page2 || 1}`);
  };

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{!!itemId ? t("QUESTIONNAIRE.ADD_QUESTION.MODIFY_QUESTION") : t("QUESTIONNAIRE.ADD_QUESTION.ADD_QUESTION")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.questionnaire.packages}/${page2 || 1}`}>{t("NAVBAR.QUESTIONNAIRE.PACKAGES")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.questionnaire.questions}/${packageId}/${page || 1}/${page2 || 1}`}>{t("NAVBAR.QUESTIONNAIRE.QUESTIONS")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{!!itemId ? t("QUESTIONNAIRE.ADD_QUESTION.MODIFY_QUESTION") : t("QUESTIONNAIRE.ADD_QUESTION.ADD_QUESTION")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{!!itemId ? t("QUESTIONNAIRE.ADD_QUESTION.MODIFY_QUESTION") : t("QUESTIONNAIRE.ADD_QUESTION.ADD_QUESTION")}</strong>
              </h3>
              <p className="text-left"><span className="font-weight-bold">{t("QUESTIONNAIRE.PACKAGE")}: </span>{packageName}</p>
            </div>
            <MDBRow>
              <MDBCol md={12}>
                <MDBInput label={t("QUESTIONNAIRE.QUESTION")} type="textarea" rows={TEXTAREA_ROWS1} maxLength={DESCRIPTION_LENGTH_BREAKPOINT2} outline autoFocus value={question} onChange={e => setQuestion(e.target.value)} onBlur={e => setTouched(Object.assign({}, touched, {question: true}))}>
                  {touched.question && question.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("QUESTIONNAIRE.QUESTION")})}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-5">
              <MDBCol md={4}>
                <MDBSelect label={t("QUESTIONNAIRE.TYPE")} className="mt-3 mb-0" selected={[type]} getValue={val => setType(val[0])} >
                  <MDBSelectInput selected={[type]} />
                  <MDBSelectOptions>
                    <MDBSelectOption value={PREFIX_CHECKBOX} checked={type === PREFIX_CHECKBOX}>{t("QUESTIONNAIRE.ADD_QUESTION.CHECKBOX")}</MDBSelectOption>
                    <MDBSelectOption value={PREFIX_INPUT} checked={type === PREFIX_INPUT}>{t("QUESTIONNAIRE.ADD_QUESTION.INPUT")}</MDBSelectOption>
                  </MDBSelectOptions>
                </MDBSelect>
                {!!type && type.length === 0 && <div className="invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("QUESTIONNAIRE.TYPE")})}
                </div> }
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!question || !question.length || !type.length}>{!!itemId ? t("COMMON.BUTTON.MODIFY") : t("COMMON.BUTTON.ADD")}</MDBBtn>
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
