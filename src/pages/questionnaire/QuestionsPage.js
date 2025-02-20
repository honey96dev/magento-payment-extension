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
import Pagination from "components/Pagination";
import Service from "services/QuestionnaireService";
import {ALERT_DANGER, PREFIX_INPUT, SUCCESS, TABLE_TEXT_MAX_LENGTH, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";

import "./QuestionsPage.scss";

export default () => {
  const {packageId, page, page2, page3} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);
  const [packageName, setPackageName] = useState("");

  const currentPage = page ? parseInt(page) : 1;

  const columns = [
    {
      label: "#",
      field: "id",
      sort: "asc",
    },
    {
      label: t("QUESTIONNAIRE.QUESTION"),
      field: "question",
      sort: "asc",
    },
    {
      label: t("QUESTIONNAIRE.TYPE"),
      field: "type",
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

    loadData();
  }, [page, t]);

  const loadData = () => {
    Service.getPackage({id: packageId})
      .then(res => {
        if (res.result === SUCCESS) {
          setPackageName(res.data.name);
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
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
      });
    Service.questions({packageId, page})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["question"] = row["question"].length > TABLE_TEXT_MAX_LENGTH ? row["question"].substring(0, TABLE_TEXT_MAX_LENGTH) + "..." : row["question"];
            row["button"] = makeButtons(row);
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
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
        setLoading(false);
      });
  }

  const makeButtons = ({id, number, type}) => {
    const disabled = type === PREFIX_INPUT;
    return (
      <Fragment>
        <Link to={`${routes.questionnaire.addQuestion}/${packageId}/${page || 1}/${page2 || 1}/${id}`}><MDBBtn tag="a" size="sm" color="indigo" floating><MDBIcon icon="edit"/></MDBBtn></Link>
        <Link to={!disabled && `${routes.questionnaire.answers}/${id}/${packageId}/1/${page || 1}/${page2 || 1}`}><MDBBtn tag="a" size="sm" color={!!disabled ? "mdb-color" : "primary"} className="mx-2" floating disabled={disabled}><MDBIcon icon="comments"/></MDBBtn></Link>
        <MDBBtn tag="a" size="sm" color="danger" floating onClick={e => handleDelete(id, "#" + number)}><MDBIcon icon="trash"/></MDBBtn>
      </Fragment>
    );
  };

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const deleteItem = id => {
    Service.deleteQuestion({id: modal.deleteId, packageId, page})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["question"] = row["question"].length > TABLE_TEXT_MAX_LENGTH ? row["question"].substring(0, TABLE_TEXT_MAX_LENGTH) + "..." : row["question"];
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
          message: t("COMMON.ERROR.UNKNOWN_SERVER_ERROR"),
        });
        scroll.scrollToTop({
          duration: TRANSITION_TIME,
        });
        setLoading(false);
        toggleModal();
      });
  };

  const handlePageChange = data => {
    history.push(`${routes.questionnaire.questions}/${packageId}/${data}/${page2 || 1}`);
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
        <title>{t("NAVBAR.QUESTIONNAIRE.QUESTIONS")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.questionnaire.packages}/${page2 || 1}`}>{t("NAVBAR.QUESTIONNAIRE.PACKAGES")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t("QUESTIONNAIRE.QUESTIONS.QUESTIONS")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {/*{!loading && !items.length && <ErrorNoData/>}*/}
      {!loading && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{t("NAVBAR.QUESTIONNAIRE.QUESTIONS")}</h3>
          <p className="text-left"><span className="font-weight-bold">{t("QUESTIONNAIRE.PACKAGE")}: </span>{packageName}</p>
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
            <Link to={`${routes.questionnaire.addQuestion}/${packageId}/${page || 1}/${page2 || 1}`}>
              <MDBBtn size="sm" color="primary">
                {t("NAVBAR.QUESTIONNAIRE.ADD_QUESTION")}
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
              {!items.length && <tr>
                <td colSpan={5} className="text-center">{t("COMMON.ERROR.NO_DATA")}</td>
              </tr>}
              {!!items.length && items.map((item, index) => (
                <tr key={index} className="text-left">
                  <td>{item.number}</td>
                  <td>{item.question}</td>
                  <td>{item.type2}</td>
                  <td className="p-2 edit-col3">{item.button}</td>
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
