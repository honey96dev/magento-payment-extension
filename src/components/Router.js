import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";

import routes from "core/routes";
import {ROUTE_BASE} from "core/globals";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = lazy(() => import("pages/auth/AuthPage"));
const ProfilePage = lazy(() => import("pages/profile/ProfilePage"));
const FrontPage = lazy(() => import("pages/front/FrontPage"));
const PostsPage = lazy(() => import("pages/posts/PostsPage"));
const NewsPage = lazy(() => import("pages/news/NewsPage"));
const VideoPage = lazy(() => import("pages/video/VideoPage"));
const VotePage = lazy(() => import("pages/vote/VotePage"));

export default () => {
  return (
    <Switch basename={ROUTE_BASE}>
      <SignedInRoute path={routes.root} exact component={FrontPage}/>
      <SignedOutRoute path={routes.auth.root} component={AuthPage}/>
      <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
      <SignedInRoute path={routes.posts.root} component={PostsPage}/>
      <SignedInRoute path={routes.news.root} component={NewsPage}/>
      <SignedInRoute path={routes.video.root} component={VideoPage}/>
      <SignedInRoute path={routes.vote.root} component={VotePage}/>
      <Route component={Error404Page}/>
    </Switch>
  );
};
