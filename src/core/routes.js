import {ROUTE_BASE} from "core/globals";

export const routes = {
  root: `${ROUTE_BASE}/`,
  auth: {
    root: `${ROUTE_BASE}/auth`,
    signIn: `${ROUTE_BASE}/auth/sign-in`,
    signUp: `${ROUTE_BASE}/auth/sign-up`,
  },
  profile: {
    root: `${ROUTE_BASE}/profile`,
    main: `${ROUTE_BASE}/profile/main`,
    myPosts: {
      root: `${ROUTE_BASE}/profile/my-posts`,
      detail: `${ROUTE_BASE}/profile/my-posts/detail`,
    },
  },
  posts: {
    root: `${ROUTE_BASE}/posts`,
    all: `${ROUTE_BASE}/posts`,
    add: `${ROUTE_BASE}/posts/add`,
    detail: `${ROUTE_BASE}/posts/detail`,
    comment: `${ROUTE_BASE}/posts/comment`,
  },
  news: {
    root: `${ROUTE_BASE}/news`,
  },
  video: {
    root: `${ROUTE_BASE}/video`,
  },
  vote: {
    root: `${ROUTE_BASE}/vote`,
  },
};

export default routes;
