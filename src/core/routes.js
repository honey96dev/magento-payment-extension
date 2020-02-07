import {ROUTE_BASE} from "core/globals";

export const routes = {
  root: `${ROUTE_BASE}/`,
  mainPage: "//knowledge.hrgulf.org",
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
    all: `${ROUTE_BASE}/posts/all`,
    allowed: `${ROUTE_BASE}/posts/allowed`,
    denied: `${ROUTE_BASE}/posts/denied`,
    detail: `${ROUTE_BASE}/posts/detail`,
    topics: `${ROUTE_BASE}/posts/topics`,
    addTopic: `${ROUTE_BASE}/posts/topics/add`,
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
  questionnaire: {
    root: `${ROUTE_BASE}/questionnaire`,
    packages: `${ROUTE_BASE}/questionnaire`,
    addPackage: `${ROUTE_BASE}/questionnaire/add`,
    questions: `${ROUTE_BASE}/questionnaire/questions`,
    addQuestion: `${ROUTE_BASE}/questionnaire/questions/add`,
    answers: `${ROUTE_BASE}/questionnaire/answers`,
    addAnswer: `${ROUTE_BASE}/questionnaire/answers/add`,
    result: `${ROUTE_BASE}/questionnaire/result`,
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
  users: {
    root: `${ROUTE_BASE}/users`,
    list: `${ROUTE_BASE}/users/list`,
    allList: `${ROUTE_BASE}/users/list/all`,
    newList: `${ROUTE_BASE}/users/list/new`,
    edit: `${ROUTE_BASE}/users/edit`,
  },
  about: {
    root: `${ROUTE_BASE}/about`,
    us: `${ROUTE_BASE}/about/us`,
  },
};

export default routes;
