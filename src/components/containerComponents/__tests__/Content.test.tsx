import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import Content from "../Content";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { createStore } from "redux";
import allReducers from "../../../redux";
import renderer from "react-test-renderer";

let container: any;

// Import Apollo Server from specified uri adress
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// Set up redux store
const store = createStore(allReducers);

// Styling
const col = "rgb(192,192,192)";
const acc = "rgb(0,128,128)";

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Testing Content", () => {
  it("should render without crashing", () => {
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ChakraProvider>
              <Content color={col} accent={acc} />
            </ChakraProvider>
          </Provider>
        </ApolloProvider>,
        container
      );
    });
  });

  it("snapshot shuld be same as last", () => {
    const tree = renderer
      .create(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ChakraProvider>
              <Content color={col} accent={acc} />
            </ChakraProvider>
          </Provider>
        </ApolloProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
