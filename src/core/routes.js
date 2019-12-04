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
    allowed: `${ROUTE_BASE}/posts/allowed`,
    denied: `${ROUTE_BASE}/posts/denied`,
    detail: `${ROUTE_BASE}/posts/detail`,
  },
  news: {
    root: `${ROUTE_BASE}/news`,
    all: `${ROUTE_BASE}/news`,
    add: `${ROUTE_BASE}/news/add`,
  },
  video: {
    root: `${ROUTE_BASE}/video`,
    all: `${ROUTE_BASE}/video`,
    add: `${ROUTE_BASE}/video/add`,
  },
  vote: {
    root: `${ROUTE_BASE}/vote`,
    packages: `${ROUTE_BASE}/vote`,
    addPackage: `${ROUTE_BASE}/vote/add`,
    questions: `${ROUTE_BASE}/vote/questions`,
    addQuestion: `${ROUTE_BASE}/vote/questions/add`,
    answers: `${ROUTE_BASE}/vote/answers`,
    addAnswer: `${ROUTE_BASE}/vote/answers/add`,
    result: `${ROUTE_BASE}/vote/result`,
  },
};

export default routes;
