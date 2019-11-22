import {isDev} from "core/globals";

export default {
  baseUrl: isDev ? "http://localhost:8080/admin-api/" : "/admin-api/",
  assetsBaseUrl: isDev ? "http://localhost:8080/assets/" : "/assets/",
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
    writeComment: "posts/write-comment",
  },
};
