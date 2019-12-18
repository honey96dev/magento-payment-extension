import React from "react";
import axios from "axios";
import {DELETE, GET, PATCH, POST, PUT} from "apis/constants";
import apis from "core/apis";
import authActions from "actions/auth";
import AuthService from "services/AuthService";
import store from "core/store";

let CancelToken = axios.CancelToken;

let cancel = () => {
};
export const cancelRequest = () => {
  return cancel;
};

const getQueryString = (params) => {
  let esc = encodeURIComponent;
  return (
    "?" +
    Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&")
  );
};

const getJsonBody = (params) => {
  return params;
};

const signOutOn401 = (err) => {
  if (!!err && !!err.response && err.response.status === 401) {
    store.dispatch(authActions.signOut());
    AuthService.signOut();
  }
};

export const setBaseUrl = (value) => {
  axios.defaults.baseURL = apis.baseUrl;
};

export const setHeader = (params) => {
  Object.entries(params).forEach(([key, value]) => {
    axios.defaults.headers.common[key] = value;
  });
};
export default (requestType, resourceURL, parameters, headers) => {
  // Object.entries(headers).forEach(([key, value]) => {
  //   axios.defaults.headers.common[key] = value;
  // });

  switch (requestType) {
    case GET:
      return new Promise((resolve, reject) => {
        const queryString = getQueryString(parameters);
        axios
          .get(resourceURL + queryString, {
            cancelToken: new CancelToken(c => {
              cancel = c;
            }),
            headers: headers,
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            signOutOn401(error);
            reject(error);
          });
      });

    case POST:
      return new Promise((resolve, reject) => {
        const jsonBody = getJsonBody(parameters);
        axios
          .post(resourceURL, jsonBody, {
            cancelToken: new CancelToken(c => {
              cancel = c;
            }),
            headers: headers,
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            signOutOn401(error);
            reject(error);
          });
      });

    case PUT:
      return new Promise((resolve, reject) => {
        const jsonBody = getJsonBody(parameters);
        axios
          .put(resourceURL, jsonBody, {
            cancelToken: new CancelToken(c => {
              cancel = c;
            }),
            headers: headers,
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            signOutOn401(error);
            reject(error);
          });
      });

    case PATCH:
      return new Promise((resolve, reject) => {
        const jsonBody = getJsonBody(parameters);
        axios
          .patch(resourceURL, jsonBody, {
            cancelToken: new CancelToken(c => {
              cancel = c;
            }),
            headers: headers,
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            signOutOn401(error);
            reject(error);
          });
      });

    case DELETE:
      return new Promise((resolve, reject) => {
        const queryString = getQueryString(parameters);
        axios
          .delete(resourceURL + queryString, {
            cancelToken: new CancelToken(c => {
              cancel = c;
            }),
            headers: headers,
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            signOutOn401(error);
            reject(error);
          });
      });

    default:
      break;
  }
};
