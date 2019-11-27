import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import AllNewsPage from "./AllNewsPage";
import NewNewsPage from "./NewNewsPage";
import routes from "core/routes";

import "./NewsPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.news.add}/:id`} component={NewNewsPage}/>
          <Route path={routes.news.add} component={NewNewsPage}/>
          <Route path={routes.news.all} exact component={AllNewsPage}/>
          <Route path={`${routes.news.all}/:page`} exact component={AllNewsPage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
