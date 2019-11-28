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

import "./QuestionsPage.scss";

export default () => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  const columns = [
    {
      label: '#',
      field: 'id',
      sort: 'asc',
    },
    {
      label: t("VOTE.QUESTION"),
      field: 'question',
      sort: 'asc',
    },
    {
      label: t("VOTE.START_DATE"),
      field: 'startDate',
      sort: 'asc',
    },
    {
      label: t("VOTE.END_DATE"),
      field: 'endDate',
      sort: 'asc'
    },
    {
      label: '',
      field: 'button',
      sort: 'asc'
    }
  ];

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    VoteService.questions({page})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row['button'] = makeButtons(row.id, row.number);
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
        <Link to={`${routes.vote.addQuestion}/${id}`}><MDBBtn tag="a" size="sm" color="indigo" floating><MDBIcon icon="edit"/></MDBBtn></Link>
        <Link to={`${routes.vote.answers}/${id}/${page || 1}`}><MDBBtn tag="a" size="sm" color="primary" className="mx-2" floating><MDBIcon icon="comments"/></MDBBtn></Link>
        <MDBBtn tag="a" size="sm" color="danger" floating onClick={e => handleDelete(id, "#" + number)}><MDBIcon icon="trash"/></MDBBtn>
      </Fragment>
    );
  };

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const deleteItem = id => {
    VoteService.deleteQuestion({id: modal.deleteId, page})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row['button'] = makeButtons(row.id, row.number);
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
    history.push(`${routes.vote.questions}/${page}`);
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), deleteId: id}));
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.VOTE.VOTE")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.VOTE.VOTE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NAVBAR.VOTE.QUESTIONS')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && !items.length && <ErrorNoData/>}
      {!loading && !!items.length && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{t("NAVBAR.VOTE.QUESTIONS")}</h3>
        </MDBCol>
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
        <MDBCol md={12} className="text-left mt-3">
          <div className="full-width">
            <Link to={routes.vote.addQuestion}>
              <MDBBtn size="sm" color="primary">
                {t("NAVBAR.VOTE.ADD_QUESTION")}
              </MDBBtn>
            </Link>
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
                  <td>{item.question}</td>
                  <td className="date-col">{item.startDate}</td>
                  <td className="date-col">{item.endDate}</td>
                  <td className="p-2 edit-col">{item.button}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
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
          <MDBBtn type="button" color="danger" onClick={deleteItem}>{t("COMMON.BUTTON.DELETE")}</MDBBtn>
          <MDBBtn type="button" color="secondary" onClick={toggleModal}>{t("COMMON.BUTTON.CANCEL")}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  )
};
