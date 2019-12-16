import {combineReducers} from "redux";
import {withReduxStateSync} from "redux-state-sync";
import auth from "reducers/auth.reducer";

const rootReducer = combineReducers({
  auth,
});

export default withReduxStateSync(rootReducer);

