import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import QuestionsPage from "./QuestionsPage";
import NewQuestionPage from "./NewQuestionPage";
import routes from "core/routes";

import "./VotePage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.vote.addQuestion}/:id`} component={NewQuestionPage}/>
          <Route path={routes.vote.addQuestion} component={NewQuestionPage}/>
          <Route path={routes.vote.all} exact component={QuestionsPage}/>
          <Route path={`${routes.vote.all}/:page`} exact component={QuestionsPage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
