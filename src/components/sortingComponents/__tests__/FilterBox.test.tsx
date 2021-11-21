import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import FilterBox from "../FilterBox";
import renderer from "react-test-renderer";
import { createStore } from "redux";
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

describe("Testing FilterBox", () => {
  it("should render without crashing", () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ChakraProvider>
            <FilterBox color={col} accent={acc} />
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
            <FilterBox color={col} accent={acc} />
          </ChakraProvider>
        </Provider>,
        container
      );
      expect(container.querySelector("button").textContent).toBe(
        "-Filter and search!-"
      );
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ChakraProvider>
            <FilterBox color={col} accent={acc} />
          </ChakraProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
