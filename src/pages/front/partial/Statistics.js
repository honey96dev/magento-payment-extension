import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import ReactApexChart from "react-apexcharts";
import numeral from "numeral";

import routes from "core/routes";
import {GENDER_FEMALE, GENDER_MALE, SUCCESS} from "core/globals";
import UsersService from "services/UsersService";
import PostsService from "services/PostsService";
import NewsService from "services/NewsService";
import VideoService from "services/VideoService";
import VoteService from "services/VoteService";

import "./Statistics.scss";

export default ({}) => {
  const {t} = useTranslation();

  const genderChartInitData = {
    options: {
      labels: [t("COMMON.GENDER.MALE"), t("COMMON.GENDER.FEMALE")],
    },
    series: [50, 50],
  };

  const signInChartInitData = {
    // selection: "one_year",
    options: {
      labels: [t("")],
      xaxis: {
        type: "datetime",
      },
      stroke: {
        show: true,
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
      markers: {
        size: 4,
        strokeWidth: 2,
        strokeOpacity: 0.9,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        hover: {
          sizeOffset: 3
        }
      },
    },
    series: [],
  };

  const [genderChart, setGenderChart] = useState(genderChartInitData);
  const [signInChart, setSignInChart] = useState(signInChartInitData);

  useEffect(e => {
    UsersService.countPerGender({})
      .then(res => {
        if (res.result === SUCCESS) {
          let counts = [0, 0];
          for (let item of res.data) {
            if (item.gender === GENDER_MALE) {
              counts[0] = item.count;
            } else if (item.gender === GENDER_FEMALE) {
              counts[1] = item.count;
            }
          }
          setGenderChart({
            ...genderChart,
            options: {
              ...genderChart.options,
              labels: [t("COMMON.GENDER.MALE"), t("COMMON.GENDER.FEMALE")],
            },
            series: counts,
          });
        } else {
          setGenderChart(genderChartInitData);
        }
      })
      .catch(err => {
        setGenderChart(genderChartInitData);
      });

    UsersService.singInHistory({})
      .then(res => {
        if (res.result === SUCCESS) {
          let data = [];
          for (let item of res.data) {
            data.push([item.date, item.count]);
          }
          setSignInChart({
            ...signInChart,
            series: [{
              name: t("AUTH.SIGN_IN"),
              data: data,
            }]
          });
        } else {
          setSignInChart(signInChartInitData);
        }
      })
      .catch(err => {
        setSignInChart(signInChartInitData);
      });
  }, [t]);

  return (
    <Fragment>
      <MDBRow className="text-left">
        <MDBCol md={6} className="mb-4">
          <MDBCard>
            <MDBCardBody>
              <h4 className="text-center">{t("USERS.STATISTICS_OF_USERS")}</h4>
              {/*<Pie data={genderCount} height={200} options={{ responsive: true }} />*/}
              <ReactApexChart options={genderChart.options} series={genderChart.series} type="pie" height="350" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md={6} className="mb-4"><MDBCard>
          <MDBCardBody>
            <h4 className="text-center">{t("USERS.STATISTICS_OF_SIGN_IN")}</h4>
            <ReactApexChart options={signInChart.options} series={signInChart.series} type="line" height="335" />
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
      </MDBRow>
    </Fragment>
  )
}
