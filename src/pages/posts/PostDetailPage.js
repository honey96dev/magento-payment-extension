import React, {useEffect, useState} from "react";
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
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {sprintf} from "sprintf-js";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";
import apis from "core/apis";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading";
import Error404 from "components/Error404";
import PostDetail from "./partial/PostDetail";
import Comments from "./partial/Comments";
import Topics from "./partial/Topics";
import PostsService from "services/PostsService";

import "./PostDetailPage.scss";


export default ({}) => {
  const {id} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    PostsService.get({id, userId: !!auth.user ? auth.user.id : undefined})
      .then(res => {
        if (res.result === SUCCESS) {
          !!res.data["media"].length && (res.data["media"] = (res.data["media"].startsWith("http://") || res.data["media"].startsWith("https://")) ? res.data["media"] : sprintf("%s%s", apis.assetsBaseUrl, res.data["media"]));
          setData(res.data);
        } else {
          setData([]);
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setData([]);
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
    PostsService.commentList({postId: id})
      .then(res => {
        if (res.result === SUCCESS) {
          setComments(res.data);
        } else {
          setComments([]);
        }
      })
      .catch(err => {
        setComments([]);
      });
    PostsService.post2Topics({postId: id})
      .then(res => {
        if (res.result === SUCCESS) {
          setTopics(res.data);
        } else {
          setTopics([]);
        }
      })
      .catch(err => {
        setTopics([]);
      });
  }, [id]);

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const deletePost = id => {
    PostsService.delete({id: modal.deleteId})
      .then(res => {
        if (res.result === SUCCESS) {
          handleGoBack();
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

  const handleGoBack = e => {
    history.goBack();
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), deleteId: id}));
  };

  return (
    <div>
      <Helmet>
        <title>{t("POSTS.DETAIL.POST_DETAIL")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.POSTS.POSTS')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('POSTS.DETAIL.POST_DETAIL')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && (!data || !data.id) && <Error404 />}
      {!loading && !!data && !!data.id && <MDBRow>
        <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
          <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
        </CSSTransition>
        <MDBCol md={9}>
          <div className="full-width text-left">
            <MDBBtn size="sm" color="warning" onClick={handleGoBack}>
              {t("COMMON.BUTTON.BACK")}
            </MDBBtn>
            <MDBBtn size="sm" color="danger" onClick={e => handleDelete(data.id, data.title)}>
              {t("COMMON.BUTTON.DELETE")}
            </MDBBtn>
          </div>
          <PostDetail data={data} comments={comments.length}/>
          <Comments data={comments} />
        </MDBCol>
        <MDBCol md={3}>
          <div className="text-left mt-10">
            <Topics topics={topics}/>
          </div>
        </MDBCol>
      </MDBRow>}
      <MDBModal isOpen={!!modal.show} toggle={toggleModal} centered>
        <MDBModalHeader toggle={toggleModal}>{modal.title}</MDBModalHeader>
        <MDBModalBody className="text-left">{modal.message}</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn type="button" color="danger" onClick={deletePost}>{t("COMMON.BUTTON.DELETE")}</MDBBtn>
          <MDBBtn type="button" color="secondary" onClick={toggleModal}>{t("COMMON.BUTTON.CANCEL")}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
  )
};
