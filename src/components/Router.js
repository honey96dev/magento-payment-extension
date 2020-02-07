import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";

import routes from "core/routes";
import {ROUTE_BASE} from "core/globals";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = lazy(() => import("pages/auth/RootPage"));
const ProfilePage = lazy(() => import("pages/profile/RootPage"));
const FrontPage = lazy(() => import("pages/front/RootPage"));
const PostsPage = lazy(() => import("pages/posts/RootPage"));
const NewsPage = lazy(() => import("pages/news/RootPage"));
const VideoPage = lazy(() => import("pages/video/RootPage"));
const QuestionnairePage = lazy(() => import("pages/questionnaire/RootPage"));
const VotePage = lazy(() => import("pages/vote/RootPage"));
const UsersPage = lazy(() => import("pages/users/RootPage"));
const AboutPage = lazy(() => import("pages/about/RootPage"));

export default () => {
  return (
    <Switch basename={ROUTE_BASE}>
      <SignedInRoute path={routes.root} exact component={FrontPage}/>
      <SignedOutRoute path={routes.auth.root} component={AuthPage}/>
      <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
      <SignedInRoute path={routes.posts.root} component={PostsPage}/>
      <SignedInRoute path={routes.news.root} component={NewsPage}/>
      <SignedInRoute path={routes.video.root} component={VideoPage}/>
      <SignedInRoute path={routes.questionnaire.root} component={QuestionnairePage}/>
      <SignedInRoute path={routes.vote.root} component={VotePage}/>
      <SignedInRoute path={routes.users.root} component={UsersPage}/>
      <SignedInRoute path={routes.about.root} component={AboutPage}/>
      <SignedInRoute component={Error404Page}/>
    </Switch>
  );
};
