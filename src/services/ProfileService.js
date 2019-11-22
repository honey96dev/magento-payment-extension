import fetch, {setHeader} from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";
import {SUCCESS} from "core/globals";

export default {
  save: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.profile.save, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  changePassword: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.profile.changePassword, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
