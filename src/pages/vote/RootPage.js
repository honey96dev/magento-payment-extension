import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import routes from "core/routes";
import PackagesPage from "./PackagesPage";
import NewPackagePage from "./NewPackagePage";
import QuestionsPage from "./QuestionsPage";
import NewQuestionPage from "./NewQuestionPage";
import AnswersPage from "./AnswersPage";
import NewAnswerPage from "./NewAnswerPage";
import ResultPage from "./ResultPage";

import "./RootPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.vote.result}/:packageId/:page?/:page2?`} exact component={ResultPage}/>
          <Route path={`${routes.vote.addAnswer}/:questionId/:packageId/:page?/:page2?/:page3?/:id?`} exact component={NewAnswerPage}/>
          <Route path={`${routes.vote.answers}/:questionId/:packageId/:page?/:page2?/:page3?`} exact component={AnswersPage}/>
          <Route path={`${routes.vote.addQuestion}/:packageId/:page?/:page2?/:id?`} exact component={NewQuestionPage}/>
          <Route path={`${routes.vote.questions}/:packageId/:page?/:page2?`} exact component={QuestionsPage}/>
          <Route path={`${routes.vote.addPackage}/:page?/:id?`} exact component={NewPackagePage}/>
          <Route path={`${routes.vote.packages}/:page?`} exact component={PackagesPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
