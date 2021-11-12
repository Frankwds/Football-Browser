import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import SearchBar from "../SearchBar";

const acc = "rgb(0,128,128)";
let container: any;

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
        <SearchBar color={acc} type={"test: "} get={() => {}} />,
        div
      );
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(<SearchBar color={acc} type={"test: "} get={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
