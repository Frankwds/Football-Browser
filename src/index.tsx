import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import allReducers from "./redux";
//uri: "https://48p1r2roz4.sse.codesandbox.io"

// Import Apollo Server from specified uri adress
const client = new ApolloClient({
  /* To run the server locally, uncomment here: */
  //uri:"http://localhost:4000/graphql",
  uri: "http://it2810-50.idi.ntnu.no:4000/graphql",
  cache: new InMemoryCache(),
});

// Set up redux store
const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
