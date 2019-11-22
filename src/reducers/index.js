import {combineReducers} from "redux";
import auth from "reducers/auth.reducer";

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;

