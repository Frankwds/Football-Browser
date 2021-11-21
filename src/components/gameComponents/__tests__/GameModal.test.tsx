import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import GameModal from "../GameModal";
import { MockedProvider } from "@apollo/client/testing";
import { gql} from "@apollo/client";

// Setup and teardown
let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const id = "testId";
const ser = "N1";
const cou = "Norway";
const ht = "GGTeam";
const at = "FrankTeam";

const GETSINGLEGAME = gql`
  query GetGameDetailsByID($gameID: String!) {
    GetGameByID(gameID: $gameID) {
      date
      season
      fthg
      ftag
    }
  }
`;

const mocks = [{
  request: {
    query: GETSINGLEGAME,
    variables: { gameID: "testId" },
  },
  result: {
    data: {
      GetGameByID: {
        date: "2022-08-05",
        season: "2022",
        fthg: "1",
        ftag: "3",
      },
    },
  },
}
];

describe("Testing GameModal", () => {
  it("should render without crashing", async () => {
    act(() => {
      ReactDOM.render(
        <MockedProvider >
          <ChakraProvider>
            <GameModal
              id={id}
              country={cou}
              series={ser}
              homeTeam={ht}
              awayTeam={at}
              callbackOnRate={() => {}}
              callbackOnComment={() => {}}
              rating={3}
              numReviews={666}
              comments={["1", "2", "3"]}
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
        <MockedProvider>
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
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
