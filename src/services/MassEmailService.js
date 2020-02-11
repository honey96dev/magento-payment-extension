import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  send: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.massEmail.send, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
