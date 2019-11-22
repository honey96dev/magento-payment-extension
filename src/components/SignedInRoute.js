import React from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import routes from "core/routes";
import {ROUTE_BASE} from "../core/globals";

export default ({component, ...props}) => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const history = useHistory();

  const pathname = history.location.pathname;

  return (
    !auth.signedIn && pathname !== routes.auth.signIn ? <Redirect to={`${ROUTE_BASE}/${routes.auth.signIn}?redirect=${history.location.pathname}`}/> : <Route component={component} {...props}/>
  );
}