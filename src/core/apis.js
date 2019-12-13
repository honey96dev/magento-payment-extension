import {isDev} from "core/globals";

export default {
  baseUrl: isDev ? "http://localhost:8080/admin/api/" : "/api/",
  assetsBaseUrl: isDev ? "http://localhost:8080/admin/assets/" : "/assets/",
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
  profile: {
    save: "profile/save",
    changePassword: "profile/change-password",
  },
  posts: {
    list: "posts/list",
    save: "posts/save",
    delete: "posts/delete",
    get: "posts/get",
    commentList: "posts/comment-list",
    post2Topics: "posts/post2topics",
    allow: "posts/allow",
    count: "posts/count",
    topics: "posts/topics",
    saveTopic: "posts/save-topic",
    deleteTopic: "posts/delete-topic",
    getTopic: "posts/get-topic",
  },
  news: {
    list: "news/list",
    save: "news/save",
    delete: "news/delete",
    get: "news/get",
    count: "news/count",
  },
  video: {
    list: "video/list",
    save: "video/save",
    delete: "video/delete",
    get: "video/get",
    count: "video/count",
  },
  questionnaire: {
    packages: "questionnaire/packages",
    savePackage: "questionnaire/save-package",
    deletePackage: "questionnaire/delete-package",
    getPackage: "questionnaire/get-package",
    questions: "questionnaire/questions",
    saveQuestion: "questionnaire/save-question",
    deleteQuestion: "questionnaire/delete-question",
    getQuestion: "questionnaire/get-question",
    answers: "questionnaire/answers",
    saveAnswer: "questionnaire/save-answer",
    deleteAnswer: "questionnaire/delete-answer",
    getAnswer: "questionnaire/get-answer",
    result: "questionnaire/result",
    publish: "questionnaire/publish",
    count: "questionnaire/count",
  },
  vote: {
    packages: "vote/packages",
    savePackage: "vote/save-package",
    deletePackage: "vote/delete-package",
    getPackage: "vote/get-package",
    questions: "vote/questions",
    saveQuestion: "vote/save-question",
    deleteQuestion: "vote/delete-question",
    getQuestion: "vote/get-question",
    answers: "vote/answers",
    saveAnswer: "vote/save-answer",
    deleteAnswer: "vote/delete-answer",
    getAnswer: "vote/get-answer",
    result: "vote/result",
    publish: "vote/publish",
    count: "vote/count",
  },
  users: {
    list: "users/list",
    allow: "users/allow",
    delete: "users/delete",
    get: "users/get",
    save: "users/save",
    count: "users/count",
    countPerGender: "users/count-per-gender",
    singInHistory: "users/sign-in-history",
  },
};
