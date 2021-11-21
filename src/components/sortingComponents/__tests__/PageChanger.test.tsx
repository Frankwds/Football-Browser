import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import PageChanger from "../PageChanger";
import allReducers from "../../../redux";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

// Component input parameters
const col = "rgb(192,192,192)";
const acc = "rgb(0,128,128)";

// Test <div> container
let container: any;

// Set up redux store
const store = createStore(allReducers);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Testing PageChanger", () => {
  it("should render without crashing", () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ChakraProvider>
            <PageChanger
              page={0}
              lastpage={10}
              pageSize={5}
              func={() => {}}
              color={col}
              accent={acc}
            />
          </ChakraProvider>
        </Provider>,
        container
      );
    });
  });

  it("should render with the correct fields", () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ChakraProvider>
            <PageChanger
              page={0}
              lastpage={10}
              pageSize={5}
              func={() => {}}
              color={col}
              accent={acc}
            />
          </ChakraProvider>
        </Provider>,
        container
      );
      expect(
        container
          .querySelector("div div button:nth-child(1)")
          .getAttribute("aria-label")
      ).toEqual("Go page back");

      expect(
        container
          .querySelector("div div button:last-child")
          .getAttribute("aria-label")
      ).toEqual("Accending");
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ChakraProvider>
            <PageChanger
              page={0}
              lastpage={10}
              pageSize={5}
              func={() => {}}
              color={col}
              accent={acc}
            />
          </ChakraProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
