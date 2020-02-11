import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import routes from "core/routes";
import AllPostsPage from "./AllPostsPage";
import PostDetailPage from "./PostDetailPage";
import TopicsPage from "./TopicsPage";
import NewTopicPage from "./NewTopicPage";

import "./RootPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.posts.addTopic}/:id?`} exact component={NewTopicPage}/>
          <Route path={`${routes.posts.topics}/:page?`} exact component={TopicsPage}/>
          <Route path={`${routes.posts.detail}/:id`} component={PostDetailPage}/>
          <Route path={`${routes.posts.root}/:scope?/:page?`} exact component={AllPostsPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
