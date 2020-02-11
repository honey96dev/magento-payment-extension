import React, {Fragment, useEffect, useState} from "react";
import {MDBAlert, MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import {CSSTransition} from "react-transition-group";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {ALERT_DANGER, SUCCESS, TRANSITION_TIME, USERNAME_MAX_LENGTH} from "core/globals";
import validators from "core/validators";
import authActions from "actions/auth";
import ProfileService from "services/ProfileService";

import "./PersonalInfo.scss";

export default () => {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [editing, setEditing] = useState(false);

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  useEffect(e => {
    map2State();
  }, [auth]);

  const map2State = () => {
    setId(auth.user.id);
    setEmail(auth.user.email);
    setUsername(auth.user.username);
  };

  const handleToggleEdit = e => {
    editing && map2State();
    setEditing(!editing);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setLoading(true);
    const params = {id, email, username};
    ProfileService.save(params)
      .then(res => {
        if (res.result === SUCCESS) {
          dispatch(authActions.successSignIn(res.data));
        }
        setAlert({
          show: true,
          color: res.result,
          message: res.message,
        });
        setEditing(false);
        setLoading(false);
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="grey-text">
          <MDBRow>
            <MDBCol md={6}>
              <MDBInput id="email" name="email" type="email" label={t("AUTH.EMAIL")} disabled={!editing} outline={editing} background={!editing} containerClass="mb-0" value={email} getValue={setEmail} onBlur={() => setTouched(Object.assign({}, touched, {email: true}))}>
                {touched.email && !validators.isEmail(email) && <div className="invalid-field">
                  {email.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")}) : !validators.isEmail(email) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.EMAIL")}) : ""}
                </div>}
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput id="username" name="username" type="text" label={t("AUTH.USERNAME")} disabled={!editing} outline={editing} background={!editing} containerClass="mb-0" value={username} getValue={setUsername} onBlur={() => setTouched(Object.assign({}, touched, {username: true}))}>
                {touched.username && !validators.isUsername(username) && <div className="invalid-field">
                  {username.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.USERNAME")}) : username.length > USERNAME_MAX_LENGTH ? t("COMMON.VALIDATION.MAX_LENGTH", {field: t("AUTH.USERNAME"), length: USERNAME_MAX_LENGTH}) : !validators.isUsername(username) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.USERNAME")}) : ""}
                </div>}
              </MDBInput>
            </MDBCol>
          </MDBRow>
        </div>
        <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
          <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
        </CSSTransition>
        {!!editing && <div className="mt-4 mb-3 text-left">
          <MDBBtn type="submit" color="indigo" className="z-depth-1a" disabled={loading || !validators.isEmail(email) || !username.length || username.length > USERNAME_MAX_LENGTH || !validators.isUsername(username)}>
            {!loading && <MDBIcon icon={"save"} />}
            {!!loading && <div className="spinner-grow spinner-grow-sm" role="status"/>}
            {t("COMMON.BUTTON.SAVE")}
          </MDBBtn>
          <MDBBtn type="button" color="danger" className="z-depth-1a" onClick={handleToggleEdit}>
            <MDBIcon icon={"times"}/>{t("COMMON.BUTTON.CANCEL")}
          </MDBBtn>
        </div>}
        {!editing && <div className="mt-4 mb-3 text-left">
          <MDBBtn type="button" color="indigo" className="z-depth-1a" onClick={handleToggleEdit}>
            <MDBIcon icon={"edit"}/>{t("COMMON.BUTTON.MODIFY")}
          </MDBBtn>
        </div> }
      </form>
    </Fragment>
  );
}
