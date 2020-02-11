import React, {Fragment, useRef} from "react";
import {useTranslation} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import IdleTimer from "react-idle-timer";

import Router from "components/Router";
import {setBaseUrl, setHeader} from "apis/fetch";
import apis from "core/apis";
import i18n from "core/i18n";
import {IDLE_TIME_LIMIT, IDLE_TIME_LIMIT2, isDev, PERSIST_KEY, TRANSITION_TIME} from "core/globals";
import authAction from "actions/auth";

setBaseUrl(apis.baseUrl);
setHeader({lang: i18n.language});

export default () => {
  const {t} = useTranslation();
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  let idleTimer = useRef();

  const onActive = e => {
    // console.log("user is active", e);
    // console.log("time remaining", idleTimer.getRemainingTime());
  };

  const onAction = e => {
    // console.log("user did something", e);
  };

  const onIdle = e => {
    // console.log("user is idle", e);
    // console.log("last active", idleTimer.getLastActiveTime());
    dispatch(authAction.signOut());
  };

  sessionStorage.setItem(PERSIST_KEY, JSON.stringify({
    signedIn: auth.signedIn,
    user: auth.user,
    token: auth.token,
  }));

  setHeader({Authorization: `Bearer ${auth.token}`});
  const direction = t("DIRECTION");
  return (
    <Fragment>
      <IdleTimer
        ref={ref => idleTimer = ref}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={TRANSITION_TIME}
        timeout={isDev ? IDLE_TIME_LIMIT2 : IDLE_TIME_LIMIT}/>
      <BrowserRouter>
        <div dir={direction} className={direction === "rtl" ? "rtl-content" : ""}>
          <Router/>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

