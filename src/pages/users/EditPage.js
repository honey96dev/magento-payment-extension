import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBDatePicker,
  MDBInput,
  MDBRow,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";
import {sprintf} from "sprintf-js";

import {
  ALERT_DANGER,
  DATE_FORMAT_ISO,
  GENDER_FEMALE,
  GENDER_MALE,
  PHONE_PREFIX_BAHRAIN,
  PHONE_PREFIX_KUWAIT,
  PHONE_PREFIX_OMAN, PHONE_PREFIX_QATAR,
  PHONE_PREFIX_SAUDI_ARABIA,
  PHONE_PREFIX_UAE,
  SUCCESS,
  TRANSITION_TIME,
  USERNAME_MAX_LENGTH
} from "core/globals";
import routes from "core/routes";
import validators from "core/validators";
import Loading from "components/Loading";
import Service from "services/UsersService";

import "./EditPage.scss";

export default () => {
  const {id, scope, page} = useParams();
  const history = useHistory();
  const {t} = useTranslation();

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState();
  const [jobTitle, setJobTitle] = useState("");
  const [sector, setSector] = useState("");
  const [company, setCompany] = useState("");
  // const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(e => {
    setLoading(true);
    Service.get({id})
      .then(res => {
        if (res.result === SUCCESS) {
          setEmail(res.data.email);
          setUsername(res.data.username);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setFatherName(res.data.fatherName);
          setGender(res.data.gender);
          setBirthday(new Date(res.data.birthday));
          setJobTitle(res.data.jobTitle);
          setSector(res.data.sector);
          setCompany(res.data.company);
          setCity(res.data.city);
          setCountryCode(res.data.countryCode);
          setPhone(res.data.phone);

          setAlert({
            ...alert,
            show: false,
          })
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
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  }, [id, scope, page]);

  const handleSubmit = e => {
    e.preventDefault();

    const birthday1 = birthday ? sprintf("%04d-%02d-%02d", birthday.getFullYear(), birthday.getMonth() + 1, birthday.getDate()) : "";

    setLoading(true);
    setAlert({
      ...alert,
      show: false,
    });
    const params = {
      id,
      email,
      username,
      firstName,
      fatherName,
      lastName,
      gender,
      birthday: birthday1,
      jobTitle,
      sector,
      company,
      city,
      countryCode,
      phone
    };
    Service.save(params)
      .then(res => {
        setAlert({
          show: true,
          color: res.result,
          message: res.message,
        });
        setLoading(false);
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  };

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("USERS.EDIT.EDIT")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.USERS.USERS')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link
          to={`${routes.users.list}/${scope}`}>{scope === "all" ? t('NAVBAR.USERS.LIST') : t("NAVBAR.USERS.NEW_LIST")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('USERS.EDIT.EDIT')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && <form onSubmit={handleSubmit}>
        <div className="grey-text">
          <MDBRow>
            <MDBCol md={6}>
              <MDBInput id="email" name="email" type="email" label={t("AUTH.EMAIL")} outline containerClass="mb-0"
                        value={email} getValue={setEmail}
                        onBlur={() => setTouched(Object.assign({}, touched, {email: true}))}>
                {touched.email && !validators.isEmail(email) && <div className="text-left invalid-field">
                  {email.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")}) : !validators.isEmail(email) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.EMAIL")}) : ""}
                </div>}
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="username" name="username" type="text" label={t("AUTH.USERNAME")} outline
                        containerClass="mb-0" value={username} getValue={setUsername}
                        onBlur={() => setTouched(Object.assign({}, touched, {username: true}))}>
                {touched.username && !validators.isUsername(username) && <div className="text-left invalid-field">
                  {username.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.USERNAME")}) : username.length > USERNAME_MAX_LENGTH ? t('COMMON.VALIDATION.MAX_LENGTH', {
                    field: t('AUTH.USERNAME'),
                    length: USERNAME_MAX_LENGTH
                  }) : !validators.isUsername(username) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.USERNAME")}) : ""}
                </div>}
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md={6}>
              <MDBInput id="firstName" name="firstName" type="text" label={t("AUTH.FIRST_NAME")} outline
                        containerClass="mt-3 mb-0" value={firstName} getValue={setFirstName}
                        onBlur={() => setTouched(Object.assign({}, touched, {firstName: true}))}>
                {touched.firstName && firstName.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.FIRST_NAME")})}
                </div>}
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="fatherName" name="fatherName" type="text" label={t("AUTH.FATHER_NAME")} outline
                        containerClass="mt-3 mb-0" value={fatherName} getValue={setFatherName}
                        onBlur={() => setTouched(Object.assign({}, touched, {fatherName: true}))}>
                {touched.fatherName && fatherName.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.FATHER_NAME")})}
                </div>}
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="lastName" name="lastName" type="text" label={t("AUTH.LAST_NAME")} outline
                        containerClass="mt-3 mb-0" value={lastName} getValue={setLastName}
                        onBlur={() => setTouched(Object.assign({}, touched, {lastName: true}))}>
                {touched.lastName && lastName.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.LAST_NAME")})}
                </div>}
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md={6}>
              {!!gender.length && <MDBSelect label={t('AUTH.GENDER')} className="mt-3 mb-0" selected={[gender]}
                         getValue={val => setGender(val[0])}>
                <MDBSelectInput selected={[gender]}/>
                <MDBSelectOptions>
                  <MDBSelectOption value={GENDER_MALE}
                                   checked={gender === GENDER_MALE}>{t("COMMON.GENDER.MALE")}</MDBSelectOption>
                  <MDBSelectOption value={GENDER_FEMALE}
                                   checked={gender === GENDER_FEMALE}>{t("COMMON.GENDER.FEMALE")}</MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>}
              {!!gender && gender.length === 0 && <div className="text-left invalid-field">
                {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.GENDER")})}
              </div>}
            </MDBCol>
            <MDBCol md={6}>
              <Fragment>
                <MDBDatePicker format={DATE_FORMAT_ISO} autoOk keyboard className="date-picker" value={birthday}
                               getValue={val => setBirthday(val)}/>
                <label className="date-picker-label">{t("AUTH.BIRTHDAY")}</label>
              </Fragment>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md={6}>
              <MDBInput id="jobTitle" name="jobTitle" type="text" label={t("AUTH.JOB_TITLE")} outline
                        containerClass="mt-3 mb-0" value={jobTitle} getValue={setJobTitle}
                        onBlur={() => setTouched(Object.assign({}, touched, {jobTitle: true}))}>
                {touched.jobTitle && jobTitle.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.JOB_TITLE")})}
                </div>}
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="sector" name="sector" type="text" label={t("AUTH.SECTOR")} outline
                        containerClass="mt-3 mb-0" value={sector} getValue={setSector}
                        onBlur={() => setTouched(Object.assign({}, touched, {sector: true}))}>
                {touched.sector && sector.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.SECTOR")})}
                </div>}
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md={6}>
              <MDBInput id="company" name="company" type="text" label={t("AUTH.COMPANY")} outline
                        containerClass="mt-3 mb-0" value={company} getValue={setCompany}
                        onBlur={() => setTouched(Object.assign({}, touched, {company: true}))}>
                {touched.company && company.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.COMPANY")})}
                </div>}
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="city" name="city" type="text" label={t("AUTH.CITY")} outline containerClass="mt-3 mb-0"
                        value={city} getValue={setCity}
                        onBlur={() => setTouched(Object.assign({}, touched, {city: true}))}>
                {touched.city && city.length === 0 && <div className="text-left invalid-field">
                  {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.CITY")})}
                </div>}
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md={6}>
              {!!countryCode.length && <MDBSelect label={t('AUTH.COUNTRY_CODE')} className="mt-3 mb-0" selected={[countryCode]}
                         getValue={val => setCountryCode(val[0])}>
                <MDBSelectInput selected={[countryCode]}/>
                <MDBSelectOptions>
                  <MDBSelectOption value={PHONE_PREFIX_BAHRAIN}
                                   checked={countryCode === PHONE_PREFIX_BAHRAIN}>{PHONE_PREFIX_BAHRAIN} - {t("COMMON.GCC_COUNTRIES.BAHRAIN")}</MDBSelectOption>
                  <MDBSelectOption value={PHONE_PREFIX_KUWAIT}
                                   checked={countryCode === PHONE_PREFIX_KUWAIT}>{PHONE_PREFIX_KUWAIT} - {t("COMMON.GCC_COUNTRIES.KUWAIT")}</MDBSelectOption>
                  <MDBSelectOption value={PHONE_PREFIX_OMAN}
                                   checked={countryCode === PHONE_PREFIX_OMAN}>{PHONE_PREFIX_OMAN} - {t("COMMON.GCC_COUNTRIES.OMAN")}</MDBSelectOption>
                  <MDBSelectOption value={PHONE_PREFIX_QATAR} checked={countryCode === PHONE_PREFIX_QATAR}>{PHONE_PREFIX_QATAR} - {t("COMMON.GCC_COUNTRIES.QATAR")}</MDBSelectOption>
                  <MDBSelectOption value={PHONE_PREFIX_SAUDI_ARABIA}
                                   checked={countryCode === PHONE_PREFIX_SAUDI_ARABIA}>{PHONE_PREFIX_SAUDI_ARABIA} - {t("COMMON.GCC_COUNTRIES.SAUDI_ARABIA")}</MDBSelectOption>
                  <MDBSelectOption value={PHONE_PREFIX_UAE}
                                   checked={countryCode === PHONE_PREFIX_UAE}>{PHONE_PREFIX_UAE} - {t("COMMON.GCC_COUNTRIES.UAE")}</MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>}
              {!!countryCode && countryCode.length === 0 && <div className="text-left invalid-field">
                {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.COUNTRY_CODE")})}
              </div>}
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="phone" name="phone" type="text" label={t("AUTH.PHONE")} outline containerClass="mt-3 mb-0" value={phone} getValue={setPhone}
                        onBlur={() => setTouched(Object.assign({}, touched, {phone: true}))}>
                {(!!countryCode.length || touched.phone) && (phone.length === 0 || !validators.isPhoneNumber(`${countryCode}${phone}`)) &&
                <div className="text-left invalid-field">
                  {!phone.length ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PHONE")}) : t("COMMON.VALIDATION.INVALID", {field: t("AUTH.PHONE")})}
                </div>}
              </MDBInput>
            </MDBCol>
          </MDBRow>
        </div>
        <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
          <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
        </CSSTransition>
        <div className="mt-4 mb-3 text-left">
          <MDBBtn type="submit" size="sm" color="indigo" className="z-depth-1a"
                  disabled={loading || !validators.isEmail(email) || !username.length || username.length > USERNAME_MAX_LENGTH || !validators.isUsername(username) || !firstName.length || !fatherName.length || !lastName.length || !gender.length || !jobTitle.length || !sector.length || !company.length || !city.length || !countryCode.length || !phone.length || !validators.isPhoneNumber(`${countryCode}${phone}`)}>
            {t("COMMON.BUTTON.SAVE")}
          </MDBBtn>
          <MDBBtn type="button" size="sm" color="warning" className="z-depth-1a" onClick={handleGoBack}>
            {t("COMMON.BUTTON.BACK")}
          </MDBBtn>
        </div>
      </form>}
    </Fragment>
  );
}