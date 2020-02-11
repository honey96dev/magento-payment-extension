import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {
  MDBAlert,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBDatePicker,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBModalFooter,
  MDBRow,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
import {useDispatch} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {
  ALERT_DANGER,
  DATE_FORMAT_ISO,
  DEFAULT_CITY,
  DEFAULT_COMPANY,
  DEFAULT_EMAIL,
  DEFAULT_FIRST_NAME,
  DEFAULT_JOB_TITLE,
  DEFAULT_LAST_NAME,
  DEFAULT_PASSWORD,
  DEFAULT_PHONE,
  DEFAULT_SECTOR,
  DEFAULT_USERNAME,
  GENDER_FEMALE,
  GENDER_MALE,
  isDev,
  PASSWORD_MIN_LENGTH,
  SAUDI_PHONE_PREFIX,
  SUCCESS,
  TRANSITION_TIME,
  UNKNOWN_SERVER_ERROR,
  USERNAME_MAX_LENGTH
} from "core/globals";
import routes from "core/routes";
import validators from "core/validators";
import AuthService from "services/AuthService";
import auth from "actions/auth";

import "./SignUpPage.scss";

// import "moment/locale/ar";

export default (props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [email, setEmail] = useState(isDev ? DEFAULT_EMAIL : "");
  const [username, setUsername] = useState(isDev ? DEFAULT_USERNAME : "");
  const [firstName, setFirstName] = useState(isDev ? DEFAULT_FIRST_NAME : "");
  const [lastName, setLastName] = useState(isDev ? DEFAULT_LAST_NAME : "");
  const [gender, setGender] = useState(isDev ? GENDER_MALE : "");
  const [birthday, setBirthday] = useState(isDev ? new Date() : "");
  const [jobTitle, setJobTitle] = useState(isDev ? DEFAULT_JOB_TITLE : "");
  const [sector, setSector] = useState(isDev ? DEFAULT_SECTOR : "");
  const [company, setCompany] = useState(isDev ? DEFAULT_COMPANY : "");
  // const [country, setCountry] = useState("");
  const [city, setCity] = useState(isDev ? DEFAULT_CITY : "");
  const [phone, setPhone] = useState(isDev ? DEFAULT_PHONE : "");
  const [password, setPassword] = useState(isDev ? DEFAULT_PASSWORD : "");
  const [password2, setPassword2] = useState(isDev ? DEFAULT_PASSWORD : "");

  useEffect(() => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
  }, [props]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const birthdayStr = birthday.toISOString().substr(0, 10);
      const params = {email, username, firstName, lastName, gender, birthday: birthdayStr, jobTitle, sector, company, city, phone, password};
      dispatch(auth.requestSignUp(params));
      let res = await AuthService.signUp(params);
      if (res.result === SUCCESS) {
        dispatch(auth.successSignUp(res.data));
      } else {
        dispatch(auth.failureSignUp(res.message));
      }
      setAlert({
        show: true,
        color: res.result,
        message: res.message,
      });
    } catch (err) {
      dispatch(auth.failureSignUp(UNKNOWN_SERVER_ERROR));
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
      });
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("AUTH.SIGN_UP")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mb-3 h1-responsive">
                <strong>{t("AUTH.SIGN_UP")}</strong>
              </h3>
            </div>
            <div className="grey-text">
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="email" name="email" type="email" label={t("AUTH.EMAIL")} outline containerClass="mb-0" value={email} getValue={setEmail} onBlur={() => setTouched(Object.assign({}, touched, {email: true}))}>
                    {touched.email && !validators.isEmail(email) && <div className="invalid-field">
                      {email.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")}) : !validators.isEmail(email) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.EMAIL")}) : ""}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="username" name="username" type="text" label={t("AUTH.USERNAME")} outline containerClass="mb-0" value={username} getValue={setUsername} onBlur={() => setTouched(Object.assign({}, touched, {username: true}))}>
                    {touched.username && !validators.isUsername(username) && <div className="invalid-field">
                      {username.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.USERNAME")}) : username.length > USERNAME_MAX_LENGTH ? t("COMMON.VALIDATION.MAX_LENGTH", {field: t("AUTH.USERNAME"), length: USERNAME_MAX_LENGTH}) : !validators.isUsername(username) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.USERNAME")}) : ""}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="firstName" name="firstName" type="text" label={t("AUTH.FIRST_NAME")} outline containerClass="mt-3 mb-0" value={firstName} getValue={setFirstName} onBlur={() => setTouched(Object.assign({}, touched, {firstName: true}))}>
                    {touched.firstName && firstName.length === 0 && <div className="invalid-field">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.FIRST_NAME")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="lastName" name="lastName" type="text" label={t("AUTH.LAST_NAME")} outline containerClass="mt-3 mb-0" value={lastName} getValue={setLastName} onBlur={() => setTouched(Object.assign({}, touched, {lastName: true}))}>
                    {touched.lastName && lastName.length === 0 && <div className="invalid-field">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.LAST_NAME")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBSelect label={t("AUTH.GENDER")} className="mt-3 mb-0" selected={[gender]} getValue={val => setGender(val[0])} >
                    <MDBSelectInput selected={[gender]} />
                    <MDBSelectOptions>
                      <MDBSelectOption value={GENDER_MALE} checked={gender === GENDER_MALE}>{t("COMMON.GENDER.MALE")}</MDBSelectOption>
                      <MDBSelectOption value={GENDER_FEMALE} checked={gender === GENDER_FEMALE}>{t("COMMON.GENDER.FEMALE")}</MDBSelectOption>
                    </MDBSelectOptions>
                  </MDBSelect>
                  {!!gender && gender.length === 0 && <div className="invalid-field">
                    {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.GENDER")})}
                  </div> }
                </MDBCol>
                <MDBCol md={6}>
                  <MDBDatePicker format={DATE_FORMAT_ISO}  autoOk /*locale={moment.locale(t("CODE"))}*/ className="date-picker" value={birthday} getValue={val => setBirthday(val)}
                                 // TextFieldComponent={<MDBInput label={t("AUTH.BIRTHDAY")}/>}
                  />
                  <label className="date-picker-label">{t("AUTH.BIRTHDAY")}</label>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="jobTitle" name="jobTitle" type="text" label={t("AUTH.JOB_TITLE")} outline containerClass="mt-3 mb-0" value={jobTitle} getValue={setJobTitle} onBlur={() => setTouched(Object.assign({}, touched, {jobTitle: true}))}>
                    {touched.jobTitle && jobTitle.length === 0 && <div className="invalid-field">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.JOB_TITLE")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="sector" name="sector" type="text" label={t("AUTH.SECTOR")} outline containerClass="mt-3 mb-0" value={sector} getValue={setSector} onBlur={() => setTouched(Object.assign({}, touched, {sector: true}))}>
                    {touched.sector && sector.length === 0 && <div className="invalid-field">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.SECTOR")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="company" name="company" type="text" label={t("AUTH.COMPANY")} outline containerClass="mt-3 mb-0" value={company} getValue={setCompany} onBlur={() => setTouched(Object.assign({}, touched, {company: true}))}>
                    {touched.company && company.length === 0 && <div className="invalid-field">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.COMPANY")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="city" name="city" type="text" label={t("AUTH.CITY")} outline containerClass="mt-3 mb-0" value={city} getValue={setCity} onBlur={() => setTouched(Object.assign({}, touched, {city: true}))}>
                    {touched.city && city.length === 0 && <div className="invalid-field">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.CITY")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                {/*<MDBCol md={6}>{t("AUTH.PHONE")}</MDBCol>*/}
                <MDBCol md={12}>
                  <MDBInputGroup
                    material
                    type="text"
                    // outline
                    prepend={<Fragment><span className="input-group-text md-addon">{t("AUTH.PHONE")}</span><span className="input-group-text md-addon">{SAUDI_PHONE_PREFIX}</span></Fragment>}
                    // inputs={
                    //   <MDBInput id="phone" name="phone" containerClass="mt-0 mb-0" value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => setTouched(Object.assign({}, touched, {phone: true}))}/>}
                    containerClassName="mt-3 mb-4 ltr-force"
                    className="mt-0 mb-0" value={phone} getValue={setPhone} onBlur={() => setTouched(Object.assign({}, touched, {phone: true}))}>
                    {(phone.length === 0 || !validators.isPhoneNumber(SAUDI_PHONE_PREFIX + phone)) && <div className="invalid-field">
                      {!phone.length ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PHONE")}) : t("COMMON.VALIDATION.INVALID", {field: t("AUTH.PHONE")})}
                    </div>}
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="password" name="password" label={t("AUTH.PASSWORD")} type="password" outline containerClass="mt-3" value={password} getValue={setPassword} onBlur={() => setTouched(Object.assign({}, touched, {password: true}))}>
                    {touched.password && password.length < PASSWORD_MIN_LENGTH && <div
                      className="invalid-field">{password.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PASSWORD")}) : t("COMMON.VALIDATION.MIN_LENGTH", {
                      field: t("AUTH.PASSWORD"),
                      length: PASSWORD_MIN_LENGTH
                    })}</div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="password2" name="password2" label={t("AUTH.PASSWORD2")} type="password" outline containerClass="mt-3" value={password2} getValue={setPassword2} onBlur={() => setTouched(Object.assign({}, touched, {password2: true}))}>
                    {touched.password2 && (password2.length < PASSWORD_MIN_LENGTH || password2 !== password) && <div
                      className="invalid-field">{password2.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PASSWORD2")}) : password2.length < PASSWORD_MIN_LENGTH ? t("COMMON.VALIDATION.MIN_LENGTH", {
                      field: t("AUTH.PASSWORD2"),
                      length: PASSWORD_MIN_LENGTH
                    }) : t("COMMON.VALIDATION.NOT_SAME", {field: t("AUTH.PASSWORD")})}</div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
            </div>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <div className="text-center mt-4 mb-3 mx-5">
              <MDBBtn type="submit" color="indigo" rounded className="full-width z-depth-1a" disabled={loading || !validators.isEmail(email) || !username.length || username.length > USERNAME_MAX_LENGTH || !validators.isUsername(username) || !firstName.length || !lastName.length || !gender.length || !jobTitle.length || !sector.length || !company.length || !city.length || !phone.length || !password.length || password.length < PASSWORD_MIN_LENGTH || password2 !== password || password.length < PASSWORD_MIN_LENGTH }>
                {!loading && <MDBIcon icon={"user-plus"} />}
                {!!loading && <div className="spinner-grow spinner-grow-sm" role="status"/>}
                {t("AUTH.SIGN_UP")}
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
        <MDBModalFooter className="mx-5 pt-3 mb-1">
          <p className="font-small grey-text d-flex justify-content-end">
            {t("AUTH.ALREADY_REGISTERED")}
            <Link to={routes.auth.signIn} className="blue-text ml-1">{t("AUTH.SIGN_IN")}</Link>
          </p>
        </MDBModalFooter>
      </MDBCard>
    </Fragment>
  );
};
