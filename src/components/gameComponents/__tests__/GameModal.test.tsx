import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import allReducers from "../../../redux";
import GameModal from "../GameModal";

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

describe("Testing GameModal", () => {
  it.skip("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
        <Provider store={store}>
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
        </Provider>,
        container
      );
    });
  });

  it.skip("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
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
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
