import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import Content from "../Content";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { createStore } from "redux";
import allReducers from "../../../redux";


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

describe("Testing Content", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    act(() => {
      ReactDOM.render(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ChakraProvider>
              <Content color={col} accent={acc}/>
            </ChakraProvider>
          </Provider>
        </ApolloProvider>
        , div);
    })
  });
})