import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import QuestionsPage from "./QuestionsPage";
import NewQuestionPage from "./NewQuestionPage";
import AnswersPage from "./AnswersPage";
import NewAnswerPage from "./NewAnswerPage";
import routes from "core/routes";

import "./VotePage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.vote.addAnswer}/:questionId/:id`} exact component={NewAnswerPage}/>
          <Route path={`${routes.vote.addAnswer}/:questionId`} exact component={NewAnswerPage}/>
          <Route path={`${routes.vote.answers}/:id/:page/:page2`} exact component={AnswersPage}/>
          <Route path={`${routes.vote.answers}/:id/:page2`} exact component={AnswersPage}/>
          <Route path={`${routes.vote.addQuestion}/:id`} exact component={NewQuestionPage}/>
          <Route path={routes.vote.addQuestion} exact component={NewQuestionPage}/>
          <Route path={`${routes.vote.questions}/:page`} exact component={QuestionsPage}/>
          <Route path={routes.vote.questions} exact component={QuestionsPage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
