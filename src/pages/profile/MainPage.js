import React, {Fragment, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCol,
  MDBIcon,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBTabContent,
  MDBTabPane
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

import routes from "core/routes";
import PersonalInfo from "./partial/PersonalInfo";
import ChangePassword from "./partial/ChangePassword";

import "./MainPage.scss";

export default (props) => {
  const {t} = useTranslation();
  let {tab} = useParams();
  const history = useHistory();

  const TAB_PERSONAL_INFO = "personal-info";
  const TAB_SOCIAL_MEDIA = "social-media";
  const TAB_PASSWORD = "password";

  tab = tab || TAB_PERSONAL_INFO;
  let CURRENT_TAB;
  switch (tab) {
    case TAB_PERSONAL_INFO:
      CURRENT_TAB = t("PROFILE.MAIN.PERSONAL_INFO");
      break;
    case TAB_SOCIAL_MEDIA:
      CURRENT_TAB = t("PROFILE.MAIN.SOCIAL_MEDIA");
      break;
    case TAB_PASSWORD:
      CURRENT_TAB = t("PROFILE.MAIN.PASSWORD");
      break;
    default:
      break;
  }

  useEffect(e => {
  }, [props]);

  const handleChangeTab = tab => {
    const pathname = `${routes.profile.main}/${tab}`;
    history.push(pathname);
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("PROFILE.PROFILE")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.profile.main}>{t("PROFILE.PROFILE")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{CURRENT_TAB}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBRow>
        <MDBCol md={3}>

        </MDBCol>
        <MDBCol md={9}>
          <div className="classic-tabs">
            <MDBNav classicTabs color="mdb-color">
              <MDBNavItem>
                <MDBNavLink to={`${routes.profile.main}/${TAB_PERSONAL_INFO}`} link={routes.profile.main} active={tab === TAB_PERSONAL_INFO} role="tab" onClick={e => handleChangeTab(TAB_PERSONAL_INFO)} >
                  <MDBIcon icon="user" /> {t("PROFILE.MAIN.PERSONAL_INFO")}
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to={`${routes.profile.main}/${TAB_PASSWORD}`} link={routes.profile.main} active={tab === TAB_PASSWORD} role="tab" onClick={e => handleChangeTab(TAB_PASSWORD)} >
                  <MDBIcon icon="key" /> {t("PROFILE.MAIN.PASSWORD")}
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent
              className="card"
              activeItem={tab}
            >
              <MDBTabPane tabId={TAB_PERSONAL_INFO} role="tabpanel">
                <PersonalInfo/>
              </MDBTabPane>
              <MDBTabPane tabId={TAB_PASSWORD} role="tabpanel">
                <ChangePassword/>
              </MDBTabPane>
            </MDBTabContent>
          </div>
        </MDBCol>
      </MDBRow>
    </Fragment>
  );
}