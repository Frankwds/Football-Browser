import { combineReducers } from "redux";
import {searchReducer} from "./searchFilter/filterSearchReducer";


// In this case only one reducer, but very scalable.
const allReducers = combineReducers({
  searchQueries: searchReducer,
});

export default allReducers;