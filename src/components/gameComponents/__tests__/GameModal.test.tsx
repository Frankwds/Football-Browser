import { ApolloClient, gql } from "@apollo/client";
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

let container: any;

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

const mocks = [
  {
    request: {
      query: GETSINGLEGAME,
      variables: { id_odsp: "8bTG0QD7/" },
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
  },
];

describe("Testing GameModal", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
        <MockedProvider mocks={mocks} addTypename={false}>
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
  });

  it.skip("should display the correct data", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
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
        </ChakraProvider>,
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
