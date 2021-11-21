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
  it("should render without crashing", () => {
    // Render component
    act(() => {
      ReactDOM.render(
        <MockedProvider>
          <ChakraProvider>
            <Rating
              id={"8bTG0QD7/"}  
              rating={3}
              numReviews={666}
              callbackOnRate={(data) => {}}
            />
          </ChakraProvider>
        </MockedProvider>,
        container
      );
    });
  });

  it("should display the number of reviews next to the rating", () => {
    // Generate test data
    const testData = {
      id: "8bTG0QD7/",
      rating: 3,
      numReviews: 11,
      testFunction : (data: any) => {}      
    }

    // Render component
    act(() => {
      ReactDOM.render(
        <MockedProvider>
          <ChakraProvider>
            <Rating
              id={testData.id}
              rating={testData.rating}
              numReviews={testData.numReviews}
              callbackOnRate={testData.testFunction}
            />
          </ChakraProvider>
        </MockedProvider>,
        container
      );
    });

    // Make assertions
    const ratingStarsText = getByTestId(container, "rating-stars-text")
    const innerText = ratingStarsText.innerHTML
    expect(innerText.split(" ")[0]).toBe("11")
    expect(innerText.split(" ")[1]).toBe("reviews")
  })

  it("should start loading after clicking the first rating star", () => {
    // Generate test data
    const testData = {
      id: "8bTG0QD7/",
      rating: 3,
      numReviews: 10,
      testFunction: (data: any) => {}
    } 
    
    // Render component
    act(() => {
      ReactDOM.render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ChakraProvider>
            <Rating
              id={testData.id}
              rating={testData.rating}
              numReviews={testData.numReviews}
              callbackOnRate={testData.testFunction}
            />
          </ChakraProvider>
        </MockedProvider>,
        container
      );
    const ratingStars = getByTestId(container, "rating-stars");
    ratingStars.firstChild?.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    }); 

    // Make assertions
    expect(container).toHaveTextContent("Loading Ratings...")
  })

  it("snapshot should be same as previous", () => {
    // Generate test data
    const testData = {
      id: "8bTG0QD7/",
      rating: 3,
      numReviews: 10,
      testFunction: (data: any) => {}
    } 
    const tree = renderer
      .create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ChakraProvider>
            <Rating
              id={testData.id}
              rating={testData.rating}
              numReviews={testData.numReviews}
              callbackOnRate={testData.testFunction}
            />
          </ChakraProvider>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
