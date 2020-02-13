import {applyMiddleware, createStore} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {createStateSyncMiddleware} from "redux-state-sync";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "reducers";
import {isDev, PERSIST_KEY} from "./globals";

const config = {};
const middlewares = [
  createStateSyncMiddleware(config),
];
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default createStore(rootReducer, {}, isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares));
