import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
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

import "./AnswersPage.scss";

export default () => {
  const {questionId, packageId, page, page2, page3} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  const columns = [
    {
      label: "#",
      field: "id",
      sort: "asc",
    },
    {
      label: t("VOTE.ANSWERS.ANSWER"),
      field: "answer",
      sort: "asc",
    },
    {
      label: "",
      field: "button",
      sort: "asc"
    }
  ];

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    VoteService.getQuestion({id: questionId})
      .then(res => {
        if (res.result === SUCCESS) {
          setQuestion(res.data.question);
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
    VoteService.answers({questionId, page: currentPage})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["button"] = makeButtons(row.id, row.number);
          }
          setPageCount(res.pageCount);
          setItems(res.data);
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

  const makeButtons = (id, number) => {
    return (
      <Fragment>
        <Link to={`${routes.vote.addAnswer}/${questionId}/${id}`}><MDBBtn tag="a" size="sm" color="indigo" className="mr-2" floating><MDBIcon icon="edit"/></MDBBtn></Link>
        <MDBBtn tag="a" size="sm" color="danger" floating onClick={e => handleDelete(id, "#" + number)}><MDBIcon icon="trash"/></MDBBtn>
      </Fragment>
    );
  };

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const deleteItem = id => {
    VoteService.deleteAnswer({id: modal.deleteId, page: currentPage})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["button"] = makeButtons(row.id, row.number);
          }
          setPageCount(res.pageCount);
          setItems(res.data);
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
    history.push(`${routes.vote.answers}/${questionId}/${page}/${page2 || 1}/${page3 || 1}`);
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), deleteId: id}));
  };

  const handleGoBack = e => {
    history.goBack();
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("VOTE.ANSWERS.ANSWERS")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.VOTE.VOTE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.packages}/${page3 || 1}`}>{t('NAVBAR.VOTE.PACKAGES')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.questions}/${packageId}/${page2 || 1}/${page3 || 1}`}>{t('NAVBAR.VOTE.QUESTIONS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('VOTE.ANSWERS.ANSWERS')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{t("VOTE.ANSWERS.ANSWERS")}</h3>
          <p className="text-left"><span className="font-weight-bold">{t("VOTE.QUESTION")}: </span>{question}</p>
        </MDBCol>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        {!!pageCount && <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
          </div>
        </MDBCol>}
        <MDBCol md={12} className="text-left mt-3">
          <div className="full-width">
            <Link to={`${routes.vote.addAnswer}/${questionId}`}>
              <MDBBtn size="sm" color="primary">
                {t("VOTE.ADD_ANSWER.ADD_ANSWER")}
              </MDBBtn>
            </Link>
            <MDBBtn size="sm" color="warning" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          <MDBTable responsive striped>
            <MDBTableHead>
              <tr className="text-left">
                {columns.map((item, index) => (
                  <th key={index}>{item.label}</th>
                ))}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {items.map((item, index) => (
                <tr key={index} className="text-left">
                  <td>{item.number}</td>
                  <td>{item.answer}</td>
                  <td className="p-2 answer-edit-col">{item.button}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
        {!!pageCount && <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
          </div>
        </MDBCol>}
      </MDBRow>}
      <MDBModal isOpen={!!modal.show} toggle={toggleModal} centered>
        <MDBModalHeader toggle={toggleModal}>{modal.title}</MDBModalHeader>
        <MDBModalBody className="text-left">{modal.message}</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn type="button" color="danger" onClick={deleteItem}>{t("COMMON.BUTTON.DELETE")}</MDBBtn>
          <MDBBtn type="button" color="secondary" onClick={toggleModal}>{t("COMMON.BUTTON.CANCEL")}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  )
};
