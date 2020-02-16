import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  save: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.save, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  delete: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.delete, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  get: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.get, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  count: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.count, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  sections: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.sections, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveSection: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.saveSection, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteSection: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.deleteSection, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getSection: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.video.getSection, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
