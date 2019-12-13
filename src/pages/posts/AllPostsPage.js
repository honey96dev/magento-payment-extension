import React, {Fragment, useCallback, useEffect, useState} from "react";
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
import TopicsList from "components/TopicsList";
import PostsService from "services/PostsService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import apis from "core/apis";

import "./AllPostsPage.scss";

export default () => {
  let {scope, page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [topicList, setTopicList] = useState([]);
  const [topicChecked, setTopicChecked] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  scope = scope || "all";
  let pageTitle = t("NAVBAR.POSTS.POSTS");
  let allowed = undefined;
  if (scope === "allowed") {
    pageTitle = t("NAVBAR.POSTS.ALLOWED");
    allowed = 1;
  } else if (scope === "denied") {
    pageTitle = t("NAVBAR.POSTS.DENIED");
    allowed = 0;
  }

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    setAlert({});
    PostsService.topics()
      .then(res => {
        if (res.result === SUCCESS) {
          setTopicList(res.data);
        } else {
          setTopicList([]);
        }
      })
      .catch(err => {
        setTopicList([]);
      });
    loadItems();
  }, [scope, page, t, topicChecked]);

  const loadItems = e => {
    PostsService.list({page, allowed: allowed, topics: topicChecked})
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
  };

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: false}));
  };

  const allowItem = id => {
    PostsService.allow({id: modal.itemId, allow: modal.allowItem, allowed: allowed, page})
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
    PostsService.delete({id: modal.itemId, allowed: allowed, page})
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
    history.push(`${routes.posts.root}/${scope}/${page}`);
  };

  const handleAllow = (id, title, allow) => {
    setModal(Object.assign({}, modal, {show: true, title: !!allow ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY"), message: t(!!allow ? "COMMON.QUESTION.ALLOW" : "COMMON.QUESTION.DENY", {item: title}), itemId: id, allowItem: !!allow ? 1 : 0, proc: "allow", yesButtonColor: !!allow ? "primary" : "warning", yesButtonString: !!allow ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY")}));
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), itemId: id, proc: "delete", yesButtonColor: "danger", yesButtonString: t("COMMON.BUTTON.DELETE")}));
  };

  const handleTopicChange = e => {
    setTopicChecked(e);
  };

  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.POSTS.POSTS')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBRow>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={9} className="order-1 order-md-0">
          {!loading && !posts.length && <ErrorNoData/>}
          {!loading && !!posts.length && <Fragment>
            <div className="mt-5 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
            <Posts items={posts} detailLabel={t("COMMON.BUTTON.READ_MORE")} detailLink={routes.posts.detail} handleAllow={handleAllow} handleDelete={handleDelete} />
            <div className="mt-5 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
          </Fragment>}
        </MDBCol>
        <MDBCol md={3} className="order-0 order-md-1">
          <div className="topic-list text-left">
            <TopicsList topics={topicList} onUpdate={handleTopicChange} />
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
