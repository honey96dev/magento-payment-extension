import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBInput,
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
import Service from "services/UsersService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import useDebounce from "core/debounce";

import "./AllUsersPage.scss";

export default () => {
  const {scope, page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [modal, setModal] = useState({});

  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const debouncedSearch = useDebounce(search, TRANSITION_TIME);

  const currentPage = page ? parseInt(page) : 1;

  const columns = [
    {
      label: "#",
      field: "id",
      sort: "asc",
    },
    {
      label: t("USERS.EMAIL"),
      field: "email",
      sort: "asc",
    },
    {
      label: t("USERS.USERNAME"),
      field: "username",
      sort: "asc",
    },
    {
      label: t("USERS.FIRST_NAME"),
      field: "firstName",
      sort: "asc",
    },
    {
      label: t("USERS.FATHER_NAME"),
      field: "lastName",
      sort: "asc",
    },
    {
      label: t("USERS.LAST_NAME"),
      field: "lastName",
      sort: "asc",
    },
    {
      label: t("USERS.GENDER"),
      field: "gender",
      sort: "asc",
    },
    {
      label: t("USERS.PHONE"),
      field: "phone",
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
    // loadData();
  }, [scope, page, t]);

  const loadData = e => {
    setLoading(true);
    Service.list({page, scope, search})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["button"] = makeButtons({id: row.id, number: row.number, name: `${row.firstName} ${row.lastName}`, allowedDate: row.allowedDate});
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
  };

  useMemo(e => {
    history.push(`${routes.users.list}/${scope}`);
    loadData();
  }, [debouncedSearch]);

  useMemo(e => {
    loadData();
  }, [scope, page, t]);

  const makeButtons = ({id, number, name, allowedDate}) => {
    return (
      <Fragment>
        <Link to={`${routes.users.edit}/${id}/${scope}/${page || 1}`}><MDBBtn tag="a" size="sm" color="indigo" floating><MDBIcon icon="edit"/></MDBBtn></Link>
        <MDBBtn tag="a" size="sm" color={!!allowedDate.length ? "warning" : "primary"} className="mx-2" floating onClick={e => handleAllow(id, name, allowedDate)}><MDBIcon icon={!!allowedDate.length ? "times" : "check"}/></MDBBtn>
        <MDBBtn tag="a" size="sm" color="danger" floating onClick={e => handleDelete(id, name)}><MDBIcon icon="trash"/></MDBBtn>
      </Fragment>
    );
  };

  const toggleModal = e => {
    setModal(Object.assign({}, modal, {show: !modal.show}));
  };

  const allowItem = id => {
    Service.allow({id: modal.itemId, allow: modal.allowItem, page, scope, search})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["button"] = makeButtons({id: row.id, number: row.number, name: `${row.firstName} ${row.lastName}`, allowedDate: row.allowedDate});
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

  const deleteItem = id => {
    Service.delete({id: modal.itemId, page, scope})
      .then(res => {
        if (res.result === SUCCESS) {
          for (let row of res.data) {
            row["button"] = makeButtons({id: row.id, number: row.number, name: `${row.firstName} ${row.lastName}`, allowedDate: row.allowedDate});
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

  const handlePageChange = page => {
    history.push(`${routes.users.list}/${scope}/${page}`);
  };

  const handleAllow = (id, title, allowedDate) => {
    const allow = !allowedDate.length;
    setModal(Object.assign({}, modal, {show: true, title: !!allow ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY"), message: t(!!allow ? "COMMON.QUESTION.ALLOW" : "COMMON.QUESTION.DENY", {item: title}), itemId: id, allowItem: !!allow ? 1 : 0, proc: "allow", yesButtonColor: !!allow ? "primary" : "warning", yesButtonString: !!allow ? t("COMMON.BUTTON.ALLOW") : t("COMMON.BUTTON.DENY")}));
  };

  const handleDelete = (id, title) => {
    setModal(Object.assign({}, modal, {show: true, title: t("COMMON.BUTTON.DELETE"), message: t("COMMON.QUESTION.DELETE", {item: title}), itemId: id, proc: "delete", yesButtonColor: "danger", yesButtonString: t("COMMON.BUTTON.DELETE")}));
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.USERS.USERS")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.USERS.USERS")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{scope === "all" ? t("NAVBAR.USERS.LIST") : t("NAVBAR.USERS.NEW_LIST")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{scope === "all" ? t("NAVBAR.USERS.LIST") : t("NAVBAR.USERS.NEW_LIST")}</h3>
        </MDBCol>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={12} className="mt-5">
          <MDBRow>
            <MDBCol md={6}>
              <MDBInput id="search" name="search" type="text" label={t("COMMON.BUTTON.SEARCH")} outline value={search}
                        getValue={setSearch}>
              </MDBInput>
            </MDBCol>
            <MDBCol md={6}/>
          </MDBRow>
        </MDBCol>
        <Fragment>
          <MDBCol md={12} className="text-center">
            <div>
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
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
                    <td>{item.email} {!item.allowedDate && <MDBIcon className="text-danger" icon="exclamation-circle"/>}</td>
                    <td>{item.username}</td>
                    <td>{item.firstName}</td>
                    <td>{item.fatherName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>
                    <td>{`${item.countryCode}${item.phone}`}</td>
                    <td className="p-2 edit-col2">{item.button}</td>
                  </tr>
                ))}
                {!items.length && <tr>
                  <td className="text-center" colSpan="8">{t("COMMON.ERROR.NO_DATA")}</td>
                </tr>}
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
          <MDBCol md={12} className="text-center">
            <div className="mt-5">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
          </MDBCol>
        </Fragment>
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
