import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Rating, { RATEGAME } from "../Rating";
import { getByTestId, getByText, prettyDOM } from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import allReducers from "../../../redux";
import { createStore } from "redux";
import renderer from "react-test-renderer";

// Mock data to be returned in place of normal GraphQL data response
const rateGame = { id_odsp: '8bTG0QD7/', ratings: [1,1,1,1,1]};
const mocks = [
  {
    request: {
      query: RATEGAME,
      variables: { gameId: '8bTG0QD7/', rating: 1 }, //Mulig gameId må skrives gameID !
    },
    result: { data: { rateGame } },
  },
];


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const store = createStore(allReducers);


// Setup and teardown
let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("testing rating", async () => {
  const confirmationText = "callbackOnRate was called"
  console.log = jest.fn();
  const testEmptyCallback = () => { console.log(confirmationText)};

  act( () => {
    ReactDOM.render(
      <MockedProvider mocks={mocks} addTypename={false}>
          <ChakraProvider>
            <Rating
              id={"8bTG0QD7/"}
              rating={1}
              numReviews={666}
              callbackOnRate={testEmptyCallback}/>
          </ChakraProvider>
      </MockedProvider>,
      container
    ) // Finish render
  // Locate rating button and prepare for click
  const ratingStars = getByTestId(container, "rating-stars");
  ratingStars.firstChild?.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  }) // Finish act

  // Assert component to start loading
  expect(container).toHaveTextContent("Loading Ratings...")

  // Wait for mock server response 100 ms
  await act( async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // wait for response
  });

  // Assert reviews to show again
  expect(container).toHaveTextContent("666 reviews")
  
  // Assert that the callback function has been called
  expect(console.log).toHaveBeenCalledWith(confirmationText);
})

describe("Testing Rating", () => {
  it.skip("should render without crashing", () => {
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

  it.skip("should display the number of reviews next to the rating", () => {
    // Render
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <Provider store={store}>
          <ChakraProvider>
            <Rating
              id={"8bTG0QD7/"}
              rating={3}
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

  it.skip("should send a apollo-server-query when clicked", () => {
    


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

  it.skip("snapshot should be same as previous", () => {
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
