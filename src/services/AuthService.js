import fetch, {setHeader} from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";
import {SUCCESS, PERSIST_KEY} from "core/globals";

export default {
  signIn: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.auth.signIn, params)
        .then(res => {
          if (res.result === SUCCESS) {
            setHeader({Authorization: `Bearer ${res.data.token}`});
            const authData = JSON.stringify({
              signedIn: true,
              user: res.data.user,
              token: res.data.token,
            });
            sessionStorage.setItem(PERSIST_KEY, authData);
            params["rememberMe"] && localStorage.setItem(PERSIST_KEY, authData);
          }
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  signUp: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.auth.signUp, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  signOut: params => {
    setHeader({Authorization: null});
    sessionStorage.removeItem(PERSIST_KEY);
    localStorage.removeItem(PERSIST_KEY);
  }
};
