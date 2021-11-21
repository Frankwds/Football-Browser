import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM, { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
//import makeApolloClient from "./apollo";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import allReducers from "../../../redux";
import GameModal from "../GameModal";
import { MockedProvider } from "@apollo/client/testing";
import { prettyDOM } from "@testing-library/react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";

let container: any;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

const id = "testId";
const ser = "N1";
const cou = "Norway";
const ht = "GGTeam";
const at = "FrankTeam";

const GETSINGLEGAME = gql`
  query GetGameDetailsByID($gameID: String!) {
    GetGameByID(gameID: $gameID) {
      date
      season
      fthg
      ftag
    }
  }
`;

const mocks = {
  request: {
    query: GETSINGLEGAME,
    variables: { gameID: "testId" },
  },
  result: {
    data: {
      GetGameByID: {
        date: "2022-08-05",
        season: "2022",
        fthg: "1",
        ftag: "3",
      },
    },
  },
};

describe("Testing GameModal", () => {
  it.skip("should render without crashing", async () => {
    act(() => {
      ReactDOM.render(
        <MockedProvider mocks={[mocks]} addTypename={false}>
          <ChakraProvider>
            <GameModal
              id={id}
              country={cou}
              series={ser}
              homeTeam={ht}
              awayTeam={at}
              callbackOnRate={() => {}}
              callbackOnComment={() => {}}
              rating={3}
              numReviews={666}
              comments={["1", "2", "3"]}
            />
          </ChakraProvider>
        </MockedProvider>,
        container
      );
    });
    console.log(prettyDOM(container));
    await new Promise((r) => setTimeout(r, 2000));
    console.log(prettyDOM(container));
  });

  it("temp apollo thing", async () => {
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <ChakraProvider>
            <GameModal
              id={id}
              country={cou}
              series={ser}
              homeTeam={ht}
              awayTeam={at}
              callbackOnRate={() => {}}
              callbackOnComment={() => {}}
              rating={3}
              numReviews={666}
              comments={["1", "2", "3"]}
            />
          </ChakraProvider>
        </ApolloProvider>,
        container
      );
    });
    console.log(prettyDOM(container));
    await new Promise((r) => setTimeout(r, 2000));
    console.log(prettyDOM(container));
  });

  it.skip("should display the correct data", () => {
    act(() => {
      ReactDOM.render(
        <MockedProvider mocks={[mocks]} addTypename={false}>
          <ChakraProvider>
            <GameModal
              id={id}
              country={cou}
              series={ser}
              homeTeam={ht}
              awayTeam={at}
              callbackOnRate={() => {}}
              callbackOnComment={() => {}}
              rating={3}
              numReviews={666}
              comments={["1", "2", "3"]}
            />
          </ChakraProvider>
        </MockedProvider>,
        container
      );
    });
    expect(container.querySelector("li:nth-child(0)").textContent).toBe(
      "League: " + ser
    );
    expect(container.querySelector("li:nth-child(1)").textContent).toBe(
      "Country: " + cou
    );
    expect(container.querySelector("li:nth-child(4)").textContent).toBe(
      "Home team: " + ht
    );
    expect(container.querySelector("li:nth-child(5)").textContent).toBe(
      "Away team: " + at
    );
    expect(container.querySelector("li:nth-child(6) p").textContent).toBe(
      "Final score: 3 - 1 to FrankTeam!"
    );
  });

  it.skip("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <MockedProvider mocks={[mocks]} addTypename={false}>
          <ChakraProvider>
            <GameModal
              id={"testId"}
              country={"Norway"}
              series={"N1"}
              homeTeam={"GGTeam"}
              awayTeam={"FrankTeam"}
              callbackOnRate={() => {}}
              callbackOnComment={() => {}}
              rating={3}
              numReviews={666}
              comments={["1", "2", "3"]}
            />
          </ChakraProvider>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
