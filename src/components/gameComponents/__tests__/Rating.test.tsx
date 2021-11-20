import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { ChakraProvider } from "@chakra-ui/react";
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from "react-redux";
import Rating from "../Rating";
import ReactDOM from "react-dom";
import TestRenderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import allReducers from "../../../redux";
import { createStore } from "redux";
import { getByTestId } from "@testing-library/react";
import renderer from "react-test-renderer";
import { useState } from "react";

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
              callbackOnRate={(data) => {}}
            />
          </ChakraProvider>
          </Provider>
        </ApolloProvider>,
        container
      );
    });
  });

  it("should display the number of reviews next to the rating", () => {
    // Render
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <Provider store={store}>
          <ChakraProvider>
            <Rating
              id={"testId"}
              rating={1}
              numReviews={11}
              callbackOnRate={(data) => {}}
            />
          </ChakraProvider>
          </Provider>
        </ApolloProvider>,
        container
      );
    });

    // Locate review text
    const ratingBox = getByTestId(container, "rating-stars-text")
    const someText = ratingBox.innerHTML

    // Ensure it is 
    expect(someText.split(" ")[0]).toBe("11")
    expect(someText.split(" ")[1]).toBe("reviews")
  })

  // 

  it("should send a apollo-server-query when clicked", () => {

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
              callbackOnRate={(data) => {}}
            />
          </ChakraProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
