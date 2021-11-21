import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Comments from "../Comments";
import renderer from "react-test-renderer";
import { ChakraProvider } from "@chakra-ui/react";
import { MockedProvider } from "@apollo/client/testing";


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


describe("Testing Comments", () => {
  it("should render without crashing", () => {
    // Generate test data
    const testData = {
      id: "8bTG0QD7/",
      comments: ["hei", "og", "hopp"],
      testFunction : (data: any) => {}      
    }
    
    // Render component
    act(() => {
      ReactDOM.render(
        <MockedProvider>
          <ChakraProvider>
            <Comments
              id={testData.id}
              comments = {testData.comments}
              callbackFunc={testData.testFunction}
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
            <Comments
              id={"testId"}
              comments={["hei", "og", "hopp"]}
              callbackFunc={() => {}}
            />
          </ChakraProvider>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
