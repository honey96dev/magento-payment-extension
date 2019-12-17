import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {initStateWithPrevTab} from "redux-state-sync";

import configureStore from "core/store";
import registerServiceWorker from "core/registerServiceWorker";
import "core/i18n";
import AppPage from "pages/AppPage";
import Loading from "components/Loading";

import "@fortawesome/fontawesome-pro/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "assets/scss/mdb.scss";
import "assets/index.scss";


// const {store, persistor} = configureStore();
//
// ReactDOM.render(
//   <Suspense fallback={<Loading/>}>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <AppPage/>
//       </PersistGate>
//     </Provider>
//   </Suspense>,
//   document.getElementById("root")
// );

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