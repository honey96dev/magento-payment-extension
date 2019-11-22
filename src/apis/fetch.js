import axios from "axios";
import {DELETE, GET, PATCH, POST, PUT} from "./constants";
import apis from "../core/apis";

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
            reject(error);
          });
      });

    default:
      break;
  }
};
