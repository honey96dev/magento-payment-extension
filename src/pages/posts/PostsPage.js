import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import routes from "core/routes";
import AllPostsPage from "./AllPostsPage";
import AllowedPostsPage from "./AllowedPostsPage";
import DeniedPostsPage from "./DeniedPostsPage";
import PostDetailPage from "./PostDetailPage";

import "./PostsPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.posts.allowed}`} exact component={AllowedPostsPage}/>
          <Route path={`${routes.posts.allowed}/:page`} exact component={AllowedPostsPage}/>
          <Route path={`${routes.posts.denied}`} exact component={DeniedPostsPage}/>
          <Route path={`${routes.posts.denied}/:page`} exact component={DeniedPostsPage}/>
          <Route path={routes.posts.all} exact component={AllPostsPage}/>
          <Route path={`${routes.posts.all}/:page`} exact component={AllPostsPage}/>
          <Route path={`${routes.posts.detail}/:id`} component={PostDetailPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
