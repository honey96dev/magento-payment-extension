import fetch, {setHeader} from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";
import {SUCCESS} from "core/globals";

export default {
  signIn: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.auth.signIn, params)
        .then(res => {
          if (res.result === SUCCESS) {
            setHeader({Authorization: `Bearer ${res.data.token}`});
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
  }
};
