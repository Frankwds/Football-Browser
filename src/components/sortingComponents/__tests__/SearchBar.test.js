import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';
import SearchBar from "../SearchBar";
import { act } from "react-dom/test-utils";
import allReducers from "../../../redux";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import { useState } from "react";

const acc = "rgb(0,128,128)";
let container;
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
  it.skip("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
        <Provider store={store}>
          <ChakraProvider>
            <SearchBar testid={"iid"} color={acc} type={"test: "} get={() => {}} />
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
            <SearchBar testid={"iid"} color={acc} type={"test: "} get={() => {}} />
          </ChakraProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should update text hook outside of component", () => {
    
    act(() => {
      
      const div = document.createElement("div");
      ReactDOM.render(
        
        <Provider store={store}>
          <ChakraProvider>
            <TestComponent></TestComponent>
            <SearchBar testid={"SearchBarTestID"} color={acc} type={"test: "} get={setParentText} />
          </ChakraProvider>
        </Provider>,
        container
      );
    });
    const searchBar = container.querySelector("[testid='SearchBarTestID']");
    expect(searchBar.innerHTML).toEqual("")

    act(() => {
      ReactTestUtils.Simulate.change(searchBar, {target: {value: "test"}});
    })
    expect(parentText).toEqual("test")
  });
});


function TestComponent() {
  const [parentText, setParentText] = useState("");
  if (parentText === "") {
    return <div>loading</div>;
  }
  return <div>{parentText}</div>;
}