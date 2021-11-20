import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import allReducers from "../../../redux";
import Rating from "../Rating";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


// Import Apollo Server from specified uri adress
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

let container: any;
const store = createStore(allReducers);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Testing Rating", () => {
  it("should render without crashing", () => {
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <Provider store={store}>
          <ChakraProvider>
            <Rating
              id={"testId"}
              rating={3}
              numReviews={666}
              callbackOnRate={() => {}}
            />
          </ChakraProvider>
          </Provider>
        </ApolloProvider>,
        container
      );
    });
  });

  it("should show one star if the only rating is one star", () => {
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <Provider store={store}>
          <ChakraProvider>
            <Rating
              id={"testId"}
              rating={3}
              numReviews={666}
              callbackOnRate={() => {}}
            />
          </ChakraProvider>
          </Provider>
        </ApolloProvider>,
        container
      );
    });
  })

  it.skip("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ChakraProvider>
            <Rating
              id={"testId"}
              rating={3}
              numReviews={666}
              callbackOnRate={() => {}}
            />
          </ChakraProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
