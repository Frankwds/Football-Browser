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
      ReactDOM.render(<Footer />, container);
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("testing if footer renders propperly", () => {
    act(() => {
      ReactDOM.render(<Footer />, container);
    });
    expect(container.querySelector("p").textContent).toBe("©Team 50, IT2810");
  });
});
