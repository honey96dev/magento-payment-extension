import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import numeral from "numeral";

import routes from "core/routes";
import {SUCCESS} from "core/globals";
import UsersService from "services/UsersService";
import PostsService from "services/PostsService";
import NewsService from "services/NewsService";
import VideoService from "services/VideoService";
import VoteService from "services/VoteService";

import "./Overview.scss";

export default ({}) => {
  const {t} = useTranslation();

  const [userCount, setUserCount] = useState({});
  const [postCount, setPostCount] = useState({});
  const [newsCount, setNewsCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [voteCount, setVoteCount] = useState({});

  useEffect(e => {
    UsersService.count({})
      .then(res => {
        if (res.result === SUCCESS) {
          setUserCount(res.data);
        } else {
          setUserCount({});
        }
      })
      .catch(err => {
        setUserCount({});
      });

    PostsService.count({})
      .then(res => {
        if (res.result === SUCCESS) {
          setPostCount(res.data);
        } else {
          setPostCount({});
        }
      })
      .catch(err => {
        setPostCount({});
      });

    NewsService.count({})
      .then(res => {
        if (res.result === SUCCESS) {
          setNewsCount(res.data.count);
        } else {
          setNewsCount({});
        }
      })
      .catch(err => {
        setNewsCount({});
      });

    VideoService.count({})
      .then(res => {
        if (res.result === SUCCESS) {
          setVideoCount(res.data.count);
        } else {
          setVideoCount({});
        }
      })
      .catch(err => {
        setVideoCount({});
      });

    VoteService.count({})
      .then(res => {
        if (res.result === SUCCESS) {
          setVoteCount(res.data);
        } else {
          setVoteCount({});
        }
      })
      .catch(err => {
        setVoteCount({});
      });
  }, [t]);

  return (
    <Fragment>
      <MDBRow className="text-left">
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="info-color">
            <Link to={routes.users.list}>
            <MDBCardBody className="text-white">
              <h1>{numeral(userCount.count || 0).format("0,0")}</h1>
              <h6>{t("USERS.USERS")}</h6>
            </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="red lighten-1">
            <Link to={routes.users.newList}>
            <MDBCardBody className="text-white">
              <h1>{numeral(userCount.countAwaiting || 0).format("0,0")}</h1>
              <h6>{t("USERS.USERS_AWAITING_ACTIVATION")}</h6>
            </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="default-color">
            <Link to={routes.posts.all}>
            <MDBCardBody className="text-white">
              <h1>{numeral(postCount.count || 0).format("0,0")}</h1>
              <h6>{t("POSTS.POSTS")}</h6>
            </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="red lighten-1">
            <Link to={routes.posts.denied}>
            <MDBCardBody className="text-white">
              <h1>{numeral(postCount.countAwaiting || 0).format("0,0")}</h1>
              <h6>{t("POSTS.POSTS_AWAITING_ACTIVATION")}</h6>
            </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="cyan lighten-1">
            <Link to={routes.news.all}>
              <MDBCardBody className="text-white">
                <h1>{numeral(newsCount || 0).format("0,0")}</h1>
                <h6>{t("NEWS.NEWS")}</h6>
              </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="blue lighten-1">
            <Link to={routes.video.all}>
              <MDBCardBody className="text-white">
                <h1>{numeral(videoCount || 0).format("0,0")}</h1>
                <h6>{t("VIDEO.VIDEOS")}</h6>
              </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="primary-color-dark">
            <Link to={routes.vote.packages}>
              <MDBCardBody className="text-white">
                <h1>{numeral(voteCount.count || 0).format("0,0")}</h1>
                <h6>{t("VOTE.VOTES")}</h6>
              </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
        <MDBCol lg={3} md={6} className="mb-4">
          <MDBCard className="red lighten-1">
            <Link to={routes.vote.packages}>
              <MDBCardBody className="text-white">
                <h1>{numeral(voteCount.countAwaiting || 0).format("0,0")}</h1>
                <h6>{t("VOTE.VOTES_AWAITING_RELEASE")}</h6>
              </MDBCardBody>
            </Link>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </Fragment>
  )
}
