import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  packages: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.packages, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  savePackage: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.savePackage, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deletePackage: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.deletePackage, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getPackage: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.getPackage, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  questions: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.questions, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveQuestion: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.saveQuestion, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteQuestion: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.deleteQuestion, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getQuestion: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.getQuestion, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  answers: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.answers, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveAnswer: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.saveAnswer, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteAnswer: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.deleteAnswer, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getAnswer: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.getAnswer, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  result: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.result, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }
};
