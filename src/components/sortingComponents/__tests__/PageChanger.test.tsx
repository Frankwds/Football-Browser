import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import PageChanger from "../PageChanger";

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

describe("Testing PageChanger", () => {
  it("should render without crashing", () => {
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(
        <PageChanger
          page={0}
          lastpage={10}
          pageSize={5}
          func={() => {}}
          color={col}
          accent={acc}
        />,
        div
      );
    });
  });

  it("snapshot should be same as previous", () => {
    const tree = renderer
      .create(
        <PageChanger
          page={0}
          lastpage={10}
          pageSize={5}
          func={() => {}}
          color={col}
          accent={acc}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
