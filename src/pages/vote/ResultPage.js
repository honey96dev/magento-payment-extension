import React, {Fragment, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import VoteService from "services/VoteService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import Votes from "./partial/Votes";

import "./ResultPage.scss";

export default () => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [page, t]);

  const loadData = e => {
    VoteService.result({page})
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
    history.push(`${routes.vote.result}/${page}`);
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("VOTE.VOTE")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem active>{t('VOTE.VOTE')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && !items.length && <ErrorNoData/>}
      {!loading && !!items.length && <MDBRow>
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
        <MDBCol md={12}>
          <Votes items={items}/>
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
