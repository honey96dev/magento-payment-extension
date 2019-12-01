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
    allow: "posts/allow",
  },
  news: {
    list: "news/list",
    save: "news/save",
    delete: "news/delete",
    get: "news/get",
  },
  video: {
    list: "video/list",
    save: "video/save",
    delete: "video/delete",
    get: "video/get",
  },
  vote: {
    questions: "vote/questions",
    saveQuestion: "vote/save-question",
    deleteQuestion: "vote/delete-question",
    getQuestion: "vote/get-question",
    answers: "vote/answers",
    saveAnswer: "vote/save-answer",
    deleteAnswer: "vote/delete-answer",
    getAnswer: "vote/get-answer",
    result: "vote/result",
  },
};
