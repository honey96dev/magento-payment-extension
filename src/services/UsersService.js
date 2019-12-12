import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  allow: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.allow, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  delete: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.delete, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  get: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.get, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  save: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.save, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  count: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.count, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  countPerGender: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.countPerGender, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  singInHistory: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.users.singInHistory, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
