import React, {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {MDBContainer} from "mdbreact";

import Loading from "components/Loading";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

import "./FrontPage.scss";

export default () => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.HOME")}</title>
      </Helmet>
      <Navbar/>
      <MDBContainer className="section">
        <Loading />
      </MDBContainer>
      <Footer/>
      {/*<Loader />*/}
    </Fragment>
  );
}
