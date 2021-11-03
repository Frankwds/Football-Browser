import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { createStore } from "redux";
import allReducers from "./redux";

// Import Apollo Server from specified uri adress
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// Set up redux store
const store = createStore(allReducers);

describe("Testing App", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
        <React.StrictMode>
          <ApolloProvider client={client}>
            <Provider store={store}>
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </Provider>
          </ApolloProvider>
        </React.StrictMode>
      , div);
    })
  });
});