import React from "react";
import {Route, Switch} from "react-router-dom";

import routes from "core/routes";
import {ROUTE_BASE} from "core/globals";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = React.lazy(() => import("pages/auth/AuthPage"));
const FrontPage = React.lazy(() => import("pages/front/FrontPage"));
const PostsPage = React.lazy(() => import("pages/posts/PostsPage"));
const ProfilePage = React.lazy(() => import("pages/profile/ProfilePage"));

export default () => {
  return (
    <Switch basename={ROUTE_BASE}>
      <SignedOutRoute path={routes.auth.root} component={AuthPage}/>
      <SignedInRoute path={routes.posts.root} component={PostsPage}/>
      <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
      <SignedInRoute path={routes.root} exact component={FrontPage}/>
      <Route component={Error404Page}/>
    </Switch>
  );
};
