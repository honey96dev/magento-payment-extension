import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {
  MDBAlert,
  MDBBadge,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import apis from "core/apis";
import {POST} from "apis/constants";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import Service from "services/QuestionnaireService";
import GlobalService from "services/GlobalService";

import "./AttachmentsPage.scss";

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
  const pageTitle = t("NAVBAR.QUESTIONNAIRE.ATTACHMENTS");

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });

    loadData();
  }, [page, t]);

  const getFileExtension = filename => {
    let arr = filename.split("/");
    if (!arr.length) {
      return "";
    }
    arr = filename.split(arr[0]);
    if (!!arr.length) {
      return arr.pop();
    } else {
      return "";
    }
  };

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
    Service.attachments({questionnaireId: packageId, page})
      .then(res => {
        if (res.result === SUCCESS) {
          // for (let row of res.data) {
          //   row["button"] = makeButtons(row);
          // }
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

  const handlePageChange = data => {
    history.push(`${routes.questionnaire.attachments}/${packageId}/${data}/${page2 || 1}`);
  };

  const handleDownload = ({userId, attachment, applicantId, firstName, fatherName, lastName}) => {
    GlobalService.downloadFile({
      method: POST,
      url: apis.questionnaire.downloadAttachment,
      params: {
        questionnaireId: packageId,
        userId: userId,
      },
      filename: !!applicantId ? `${packageName} - ${firstName || ""} ${fatherName || ""} ${lastName || ""}` : `${packageName} - ${t("QUESTIONNAIRE.ATTACHMENTS.GUEST")}`,
    })
  };

  const handleGoBack = e => {
    history.goBack();
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.questionnaire.packages}/${page2 || 1}`}>{t("NAVBAR.QUESTIONNAIRE.PACKAGES")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{pageTitle}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {/*{!loading && !items.length && <ErrorNoData/>}*/}
      {!loading && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{pageTitle}</h3>
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
            <MDBBtn size="sm" color="warning" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          <MDBTable responsive striped>
            <MDBTableHead>
              <tr className="text-left">
                <th>#</th>
                <th>{t("QUESTIONNAIRE.ATTACHMENTS.APPLICANT")}</th>
                <th>{t("QUESTIONNAIRE.ATTACHMENTS.TIMESTAMP")}</th>
                <th></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {!items.length && <tr>
                <td colSpan={5} className="text-center">{t("COMMON.ERROR.NO_DATA")}</td>
              </tr>}
              {!!items.length && items.map((item, index) => (
                <tr key={index} className="text-left">
                  <td>{item.number}</td>
                  {!!item.applicantId && <td>{item.firstName || ""} {item.lastName || ""}</td>}
                  {!item.applicantId && <td>
                    <MDBBadge color="warning" pill>{t("QUESTIONNAIRE.ATTACHMENTS.GUEST")}</MDBBadge>
                  </td>}
                  <td>{item.timestamp2}</td>
                  <td className="p-2 edit-col1">
                    <MDBBtn tag="a" size="sm" color="primary" floating onClick={e => handleDownload(item)}><MDBIcon icon="download"/></MDBBtn>
                  </td>
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
    </Fragment>
  )
};
