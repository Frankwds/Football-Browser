import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Comments from "../Comments";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import allReducers from "../../../redux";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

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

describe("Testing Comments", () => {
  it("should render without crashing", () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <ChakraProvider>
            <Comments
              id={"testId"}
              comments={["hei", "og", "hopp"]}
              callbackFunc={() => {}}
            />
          </ChakraProvider>
        </Provider>,
        container
      );
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ChakraProvider>
            <Comments
              id={"testId"}
              comments={["hei", "og", "hopp"]}
              callbackFunc={() => {}}
            />
          </ChakraProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
