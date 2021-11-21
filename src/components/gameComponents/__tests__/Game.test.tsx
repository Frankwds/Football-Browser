import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import Game from "../Game";
import { ChakraProvider } from "@chakra-ui/react";
import { MockedProvider } from "@apollo/client/testing";


// Test <div> container
let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Testing Game", () => {
  it("should render without crashing", () => {
    act(() => {
      ReactDOM.render(
        <MockedProvider >
            <ChakraProvider>
              <Game
                id={"testId"}
                country={"Norway"}
                series={"N1"}
                homeTeam={"GGTeam"}
                awayTeam={"FrankTeam"}
              />
            </ChakraProvider>
        </MockedProvider>,
        container
      );
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <MockedProvider >
            <ChakraProvider>
              <Game
                id={"testId"}
                country={"Norway"}
                series={"N1"}
                homeTeam={"GGTeam"}
                awayTeam={"FrankTeam"}
              />
            </ChakraProvider>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
