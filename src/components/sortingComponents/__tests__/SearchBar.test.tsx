import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import allReducers from "../../../redux";
import SearchBar from "../SearchBar";

const acc = "rgb(0,128,128)";
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

describe("Testing SearchBar", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
        <Provider store={store}>
        <ChakraProvider>
        <SearchBar color={acc} type={"test: "} get={() => {}} />
        </ChakraProvider>
        </Provider>
        ,
        container
      );
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
      <Provider store={store}>
        <ChakraProvider>
          <SearchBar color={acc} type={"test: "} get={() => {}} />
        </ChakraProvider>
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
