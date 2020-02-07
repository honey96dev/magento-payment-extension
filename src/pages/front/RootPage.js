import React, {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {MDBContainer} from "mdbreact";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Overview from "./partial/Overview";
import Statistics from "./partial/Statistics";

import "./RootPage.scss";

export default () => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.HOME")} - {t("SITE_NAME")}</title>
      </Helmet>
      <Navbar/>
      <MDBContainer className="section">
        <Overview/>
        <Statistics/>
      </MDBContainer>
      <Footer/>
      {/*<Loader />*/}
    </Fragment>
  );
}
