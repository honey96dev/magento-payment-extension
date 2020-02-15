import fetch, {setHeader} from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";
import {SUCCESS} from "core/globals";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  save: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.save, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  delete: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.delete, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  get: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.get, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  commentList: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.commentList, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteComment: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.deleteComment, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  post2Topics: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.post2Topics, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  allow: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.allow, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  count: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.count, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  topics: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.topics, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveTopic: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.saveTopic, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteTopic: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.deleteTopic, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getTopic: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.getTopic, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  magazines: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.magazines, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveMagazine: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.saveMagazine, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteMagazine: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.deleteMagazine, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getMagazine: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.getMagazine, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
