import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client";
import { getByTestId, getByText, prettyDOM } from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from "react-redux";
import Rating from "../Rating";
import ReactDOM from "react-dom";
import TestRenderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import allReducers from "../../../redux";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import { useState } from "react";

// Import Apollo Server from specified uri adress

const RATEGAME = gql`
mutation rateGame($gameId: String!, $rating: Int!) {
  rateGame(gameID: $gameId, rating: $rating) {
    id_odsp
    ratings
  }
}
`;
const mocks = [
{
  request: {
    query: RATEGAME,
    variables: { id_odsp: '8bTG0QD7/', ratings: 3},
  },
  result: {
    data: { ratings: [1,1,1,1,1] },
  },
}
];


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
              id={"8bTG0QD7/"}
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
              id={"8bTG0QD7/"}
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
    const ratingStarsText = getByTestId(container, "rating-stars-text")
    const innerText = ratingStarsText.innerHTML

    // Ensure it is 
    expect(innerText.split(" ")[0]).toBe("11")
    expect(innerText.split(" ")[1]).toBe("reviews")
  })

  // Frank og Amund intercepter mutation

  it("should send a apollo-server-query when clicked", () => {
    


    // Generate mock-rating data
    const fake = {
      id: "8bTG0QD7/",
      rating: 3,
      numReviews: 10,
      callbackOnRate: (data: any) => {
        console.log("CallbackOnRate method from parent was called");
        console.log(data)
      }
    } 

    
    // Render
    act(() => {
      ReactDOM.render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Provider store={store}>
          <ChakraProvider>
            <Rating
              id={fake.id}
              rating={fake.rating}
              numReviews={fake.numReviews}
              callbackOnRate={fake.callbackOnRate}
            />
          </ChakraProvider>
          </Provider>
        </MockedProvider>,
        container
      );
    }); 
    // Locate rating button and prepare for click
    const ratingStars = getByTestId(container, "rating-stars");
    act(() => {
      // click the rating stars
      ratingStars.firstChild?.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    // Ensure rating stars have started reloading
    const loadingElement = getByText(container, "Loading Ratings...")
    expect(getByText(container, "Loading Ratings...")).toBeTruthy()
    expect(loadingElement.innerHTML).toBe("Loading Ratings...")
  })

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <MockedProvider mocks={mocks} addTypename={false}>
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
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
