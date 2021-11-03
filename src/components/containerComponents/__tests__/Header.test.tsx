import ReactDOM from "react-dom";
import Header from "../Header";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";


let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Testing Header", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(<Header />, div);
    })
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(<Header />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

