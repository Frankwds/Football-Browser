import {
    UPDATE_SEARCH_DATA,
    SearchAction,
    SearchData
  } from "./searchFilterTypes";
  
//Initial search data, setup as undefined.
const initialSearchQuery:SearchData={
    searchQueries:{
      league: undefined,
      country:  undefined,
      season: undefined,
      ht:  undefined,
      at:  undefined,
      acc: undefined,
      sort: "date",
    }
  }

  //Setup how to react to queries
export const searchReducer = (
    state = initialSearchQuery,
    action: SearchAction,
  )=> {
    switch (action.type) {
      case UPDATE_SEARCH_DATA:
        return {
          ...state,
          searchQueries: action.payload
        };
      default:
        return state;
    }
  };
  
