import React, {Fragment, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {sprintf} from "sprintf-js";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Posts from "components/Posts";
import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import PostsService from "services/PostsService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import apis from "core/apis";

import "./AllPostsPage.scss";

export default () => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    PostsService.list({page, allowed: 1})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          for (let item of res.data) {
            item["media"] = (item["media"].startsWith("http://") || item["media"].startsWith("https://")) ? item["media"] : sprintf("%s%s", apis.assetsBaseUrl, item["media"]);
          }
          setPosts(res.data);
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
  }, [page, t]);

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: false}));
  };

  const allowItem = id => {
    PostsService.allow({id: modal.itemId, allow: modal.allowItem, page})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          for (let item of res.data) {
            item["media"] = (item["media"].startsWith("http://") || item["media"].startsWith("https://")) ? item["media"] : sprintf("%s%s", apis.assetsBaseUrl, item["media"]);
          }
          setPosts(res.data);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
          scroll.scrollToTop({
            duration: TRANSITION_TIME,
          });
        }
        setLoading(false);
        toggleModal();
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        scroll.scrollToTop({
          duration: TRANSITION_TIME,
        });
        setLoading(false);
        toggleModal();
      });
  };

  const deleteItem = id => {
    PostsService.delete({id: modal.itemId, page})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          for (let item of res.data) {
            item["media"] = (item["media"].startsWith("http://") || item["media"].startsWith("https://")) ? item["media"] : sprintf("%s%s", apis.assetsBaseUrl, item["media"]);
          }
          setPosts(res.data);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
          scroll.scrollToTop({
            duration: TRANSITION_TIME,
          });
        }
        setLoading(false);
        toggleModal();
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        scroll.scrollToTop({
          duration: TRANSITION_TIME,
        });
        setLoading(false);
        toggleModal();
      });
  };

  const handlePageChange = page => {
    history.push(`${routes.posts.all}/${page}`);
  };

  const handleAllow = (id, title, allow) => {
    setModal(Object.assign({}, modal, {show: true, title: !!allow ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY"), message: t(!!allow ? "COMMON.QUESTION.ALLOW" : "COMMON.QUESTION.DENY", {item: title}), itemId: id, allowItem: !!allow ? 1 : 0, proc: "allow", yesButtonColor: !!allow ? "primary" : "warning", yesButtonString: !!allow ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY")}));
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), itemId: id, proc: "delete", yesButtonColor: "danger", yesButtonString: t("COMMON.BUTTON.DELETE")}));
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.POSTS.ALLOWED")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.POSTS.POSTS')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NAVBAR.POSTS.ALLOWED')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && !posts.length && <ErrorNoData/>}
      {!loading && !!posts.length && <MDBRow>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          <Posts items={posts} detailLabel={t("COMMON.BUTTON.READ_MORE")} detailLink={routes.posts.detail} handleAllow={handleAllow} handleDelete={handleDelete} />
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
          </div>
        </MDBCol>
      </MDBRow>}
      <MDBModal isOpen={!!modal.show} toggle={toggleModal} centered>
        <MDBModalHeader toggle={toggleModal}>{modal.title}</MDBModalHeader>
        <MDBModalBody className="text-left">{modal.message}</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn type="button" color={modal.yesButtonColor} onClick={modal.proc === "allow" ? allowItem : deleteItem}>{modal.yesButtonString}</MDBBtn>
          <MDBBtn type="button" color="secondary" onClick={toggleModal}>{t("COMMON.BUTTON.CANCEL")}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  )
};
