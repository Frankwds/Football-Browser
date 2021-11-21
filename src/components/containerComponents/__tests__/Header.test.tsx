import ReactDOM from "react-dom";
import Header from "../Header";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import logoImage from "./../../../resources/football.jpg";

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
      ReactDOM.render(<Header />, container);
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("testing if footer renders propperly", () => {
    act(() => {
      ReactDOM.render(<Header />, container);
    });
    expect(container.querySelector("h2").textContent).toBe(
      "WebDev Project3 - Football browser"
    );
  });

  it("renders the correct image", () => {
    act(() => {
      ReactDOM.render(<Header />, container);
    });

    expect(container.querySelector("img").getAttribute("src")).toEqual(
      logoImage
    );
  });
});
