import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {CSSTransition} from "react-transition-group";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow
} from "mdbreact";
import {Formik, ErrorMessage} from "formik";

import {
  ALERT_DANGER, ERROR_REQUIRED,
  isDev,
  SUCCESS,
  TEXTAREA_ROWS1,
  TRANSITION_TIME
} from "core/globals";
import validators from "core/validators";
import Service from "services/MassEmailService";

import "./MainPage.scss";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import routes from "../../core/routes";

export default () => {
  const {t} = useTranslation();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const initialValues = {
    name: `${auth.user.role}`,
    // name: `${auth.user.firstName} ${auth.user.lastName}`,
    subject: "",
    message: "",
  };

  useEffect(e => {
  }, [t]);

  const validateForm = ({name, subject, message}) => {
    const errors = {};
    if (!name.length) {
      errors["name"] = ERROR_REQUIRED;
    }

    if (!subject.length) {
      errors["subject"] = ERROR_REQUIRED;
    }

    if (!message.length) {
      errors["message"] = ERROR_REQUIRED;
    }

    return errors;
  };

  const handleSubmit = ({name, subject, message}, {setSubmitting}) => {
    // e.preventDefault();

    setLoading(true);
    setSubmitting(true);
    Service.send({name, subject, message})
      .then(res => {
        if (res.result === SUCCESS) {

        }
        setAlert({
          show: true,
          color: res.result,
          message: res.message,
        });
        setLoading(false);
        setSubmitting(false);
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
        setLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.MASS_EMAIL.MASS_EMAIL")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.MASS_EMAIL.MASS_EMAIL")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t("NAVBAR.MASS_EMAIL.MAIN")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBRow className="mt-5">
        <MDBCol lg={3} md={0}/>
        <MDBCol lg={6} md={12}>
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={(values, helpers) => handleSubmit(values, helpers)}
          >
            {({values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
              <form onSubmit={handleSubmit}>
                <div className="grey-text">
                  <MDBRow>
                    <MDBCol md={12}>
                      <MDBInput id="name" name="name" type="text" label={t("MASS_EMAIL.MAIN.NAME")} outline value={values.name}
                                onChange={handleChange} onBlur={handleBlur}>
                        {touched.name && errors.name === ERROR_REQUIRED && <div className="invalid-field">
                          {t("COMMON.VALIDATION.REQUIRED", {field: t("MASS_EMAIL.MAIN.NAME")})}
                        </div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md={12}>
                      <MDBInput id="subject" name="subject" type="text" label={t("MASS_EMAIL.MAIN.SUBJECT")} outline value={values.subject}
                                onChange={handleChange} onBlur={handleBlur}>
                        {touched.subject && errors.subject === ERROR_REQUIRED && <div className="invalid-field">
                          {t("COMMON.VALIDATION.REQUIRED", {field: t("MASS_EMAIL.MAIN.SUBJECT")})}
                        </div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md={12}>
                      <MDBInput id="message" name="message" type="textarea" rows={TEXTAREA_ROWS1} label={t("MASS_EMAIL.MAIN.MESSAGE")} outline value={values.message}
                                onChange={handleChange} onBlur={handleBlur}>
                        {touched.message && errors.message === ERROR_REQUIRED && <div className="invalid-field">
                          {t("COMMON.VALIDATION.REQUIRED", {field: t("MASS_EMAIL.MAIN.MESSAGE")})}
                        </div>}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                </div>
                <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
                  <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
                </CSSTransition>
                <div className="text-left mb-3">
                  <MDBBtn type="submit" color="indigo" rounded className="z-depth-1a"
                          disabled={loading || isSubmitting || (!!errors && !!Object.keys(errors).length)}>
                    {t("COMMON.BUTTON.SEND")}
                  </MDBBtn>
                </div>
              </form>
            )}
          </Formik>
        </MDBCol>
        <MDBCol lg={3} md={12}/>
      </MDBRow>
    </Fragment>
  );
}
