import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import FilterBox from "../FilterBox";
import renderer from "react-test-renderer";

const col = "rgb(192,192,192)";
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

describe("Testing FilterBox", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(<FilterBox color={col} accent={acc} />, div);
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(<FilterBox color={col} accent={acc} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
