export const UPDATE_MOVIES= "UPDATE_MOVIES";
export const UPDATE_SEARCH_DATA= "UPDATE_SEARCH_DATA"; 

//Type of values in the searchFilter query
export interface SearchData {
  searchQueries:{
    league?: string; 
    country?: string;
    season?: string;
    ht?: string;
    at?: string ;
    acc?: boolean;
    sort?: string;
  }
}

//Implemented actiontype:
export interface SearchAction {
  type: "UPDATE_SEARCH_DATA";
  payload: SearchData;
}