import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow, MDBStep, MDBStepper} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Loading from "components/Loading";
import Pagination from "components/Pagination";
import VoteService from "services/VoteService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";

import "./ResultPage.scss";
import VoteResult from "./partial/VoteResult";

export default () => {
  const {packageId, page, page2} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);
  const [packageData, setPackageData] = useState({});
  const [releasedDate, setReleasedDate] = useState("");

  const currentPage = page ? parseInt(page) : 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [page, t]);

  const loadData = e => {
    VoteService.getPackage({id: packageId})
      .then(res => {
        if (res.result === SUCCESS) {
          setPackageData(res.data);
          setReleasedDate(res.data.releasedDate);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
      });
    VoteService.result({packageId, page})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
          setAlert({
            ...alert,
            show: false,
          });
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  };

  const handlePageChange = page => {
    history.push(`${routes.vote.result}/${packageId}/${page}/${page2}`);
  };

  const handleRelease = e => {
    VoteService.publish({id: packageId, page, release: !releasedDate.length})
      .then(res => {
        if (res.result === SUCCESS) {
          setReleasedDate(res.data.releasedDate);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
      });
  };

  const handleGoBack = e => {
    history.goBack();
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("VOTE.RESULT.RESULT")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.VOTE.VOTE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.packages}/${page2 || 1}`}>{t('NAVBAR.VOTE.PACKAGES')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('VOTE.RESULT.RESULT')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{t("VOTE.RESULT.RESULT")}</h3>
          <p className="text-left"><span className="font-weight-bold">{t("VOTE.PACKAGE")}: </span>{packageData.name}</p>
        </MDBCol>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
        <MDBCol md={12} className="text-left my-3">
          <div className="full-width">
            {packageData.endDate >= packageData.today && <MDBBtn size="sm" color="primary" disabled>{t("COMMON.BUTTON.NOT_FINISHED")}</MDBBtn>}
            {packageData.endDate < packageData.today && <MDBBtn size="sm" color={!!releasedDate.length ? "danger" : "primary"} onClick={handleRelease}>{!!releasedDate.length ? t("COMMON.BUTTON.UNPUBLISH") : t("COMMON.BUTTON.PUBLISH")}</MDBBtn>}
            <MDBBtn size="sm" color="warning" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          {/*<Votes items={items}/>*/}
          <MDBStepper vertical className="text-left">
            {items.map((item, index) => (
              <MDBStep key={index} className="completed">
                <a>
                  <span className="circle">{item.index}</span>
                </a>
                <Fragment>
                  <div className="step-content grey lighten-4">
                    <h6 className="mb-0">{item.question}</h6>
                  </div>
                  <div className="step-content mt-3 progress-group">
                    <VoteResult data={item} />
                  </div>
                </Fragment>
              </MDBStep>
            ))}
          </MDBStepper>
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
