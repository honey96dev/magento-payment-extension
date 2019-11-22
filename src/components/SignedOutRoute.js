import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import routes from "core/routes";
import {ROUTE_BASE} from "core/globals";

export default ({component, ...props}) => {
  const {auth} = useSelector(state => state);

  return (
    auth.signedIn ? <Redirect to={`${ROUTE_BASE}/${routes.root}`}/> : <Route component={component} {...props}/>
  );
};
