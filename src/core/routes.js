export const routes = {
  root: "",
  auth: {
    root: "auth",
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
  profile: {
    root: "profile",
    main: "profile/main",
    myPosts: {
      root: "profile/my-posts",
      detail: "profile/my-posts/detail",
    },
  },
  posts: {
    root: "posts",
    all: "posts",
    add: "posts/add",
    detail: "posts/detail",
    comment: "posts/comment",
  },
  news: {
    root: "news",
  },
  video: {
    root: "video",
  },
  vote: {
    root: "vote",
  },
};

export default routes;
