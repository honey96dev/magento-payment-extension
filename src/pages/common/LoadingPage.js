import React, {Fragment} from "react";
import Loading from "components/Loading";
import Navbar from "../../components/Navbar";
import {MDBContainer} from "mdbreact";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className="section">
        <Loading/>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  )
};