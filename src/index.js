import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {initStateWithPrevTab} from "redux-state-sync";

import "@fortawesome/fontawesome-pro/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "assets/mdb/scss/mdb.scss";

import configureStore from "core/store";
import registerServiceWorker from "core/registerServiceWorker";
import "core/i18n";
import AppPage from "pages/AppPage";
import Loading from "components/Loading";
import "assets/index.scss";

initStateWithPrevTab(configureStore);
ReactDOM.render(
  <Suspense fallback={<Loading/>}>
    <Provider store={configureStore}>
      <AppPage/>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

registerServiceWorker();