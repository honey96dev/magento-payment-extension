import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import routes from "core/routes";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import SignInPage from "./SignInPage";

import "./RootPage.scss";

export default () => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <Navbar/>
      <MDBContainer>
        <div className="admin-nav text-right">
          <MDBBtn href={routes.mainPage} size="sm" rounded color="indigo">{t("COMMON.BUTTON.MAIN_PAGE")}</MDBBtn>
        </div>
        <MDBRow className={"section mb-5"}>
          <MDBCol lg="3" md="0"/>
          <MDBCol lg="6">
            <Switch>
              <Route path={routes.auth.signIn} exact component={SignInPage}/>
              {/*<Route path={routes.auth.signUp} component={SignUpPage}/>*/}
              <Route component={Error404}/>
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
