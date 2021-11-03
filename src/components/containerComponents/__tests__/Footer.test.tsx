import ReactDOM from "react-dom";
import Footer from "../Footer";
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

describe("Testing Footer", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(<Footer />, div);
    })
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(<Footer />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

