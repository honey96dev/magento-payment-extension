import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

import routes from "core/routes";
import {ROUTE_BASE} from "core/globals";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import SignInPage from "./SignInPage";
// import SignUpPage from "./SignUpPage";

import "./AuthPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer>
        <MDBRow className={"section mb-5"}>
          <MDBCol lg="3" md="0"/>
          <MDBCol lg="6">
            <Switch>
              <Route path={`${ROUTE_BASE}/${routes.auth.signIn}`} component={SignInPage}/>
              {/*<Route path={routes.auth.signUp} component={SignUpPage}/>*/}
            </Switch>
          </MDBCol>
          <MDBCol lg="3" md="0"/>
        </MDBRow>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
