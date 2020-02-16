import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import routes from "core/routes";
import AllVideoPage from "./AllVideoPage";
import NewVideoPage from "./NewVideoPage";
import SectionsPage from "./SectionsPage";
import NewSectionPage from "./NewSectionPage";

import "./RootPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.video.addSection}/:id?`} component={NewSectionPage}/>
          <Route path={routes.video.sections} component={SectionsPage}/>
          <Route path={`${routes.video.add}/:id?`} component={NewVideoPage}/>
          <Route path={routes.video.all} exact component={AllVideoPage}/>
          <Route path={`${routes.video.all}/:page`} exact component={AllVideoPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
