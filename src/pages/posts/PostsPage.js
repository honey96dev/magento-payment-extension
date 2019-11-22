import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import SignedInRoute from "components/SignedInRoute";
import AddPostPage from "./AddPostPage";
import AllPostsPage from "./AllPostsPage";
import PostDetailPage from "./PostDetailPage";
import routes from "core/routes";

import "./PostsPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <SignedInRoute path={routes.posts.add} component={AddPostPage}/>
          <Route path={routes.posts.all} exact component={AllPostsPage}/>
          <Route path={`${routes.posts.all}/:page`} exact component={AllPostsPage}/>
          <Route path={`${routes.posts.detail}/:id`} component={PostDetailPage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
