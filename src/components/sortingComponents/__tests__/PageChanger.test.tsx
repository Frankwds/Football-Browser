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

{/* <ApolloProvider client={client}>

</ApolloProvider> */}



describe("Testing PageChanger", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
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
        </Provider>
        ,
        div
      );
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
