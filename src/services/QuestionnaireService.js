import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  packages: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.packages, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  savePackage: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.savePackage, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deletePackage: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.deletePackage, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getPackage: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.getPackage, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  questions: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.questions, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveQuestion: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.saveQuestion, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteQuestion: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.deleteQuestion, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getQuestion: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.getQuestion, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  answers: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.answers, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  saveAnswer: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.saveAnswer, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  deleteAnswer: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.deleteAnswer, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  getAnswer: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.getAnswer, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  result: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.result, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  publish: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.publish, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  count: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.count, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  attachments: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.attachments, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  downloadAttachment: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.downloadAttachment, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  downloadResult: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.questionnaire.downloadResult, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
