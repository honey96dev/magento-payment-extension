import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import routes from "core/routes";
import Navbar from "components/Navbar";
import SignedInRoute from "components/SignedInRoute";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import MainPage from "./MainPage";

import "./RootPage.scss";

export default (props) => {

  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <SignedInRoute path={routes.profile.main} exact component={MainPage}/>
          <SignedInRoute path={`${routes.profile.main}/:tab`} exact component={MainPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
