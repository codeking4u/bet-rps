import renderer from "react-test-renderer";

import MoveOptions from "../move-options.component";

test("matches snapshot", () => {
  const tree = renderer.create(<MoveOptions />).toJSON();
  expect(tree).toMatchSnapshot();
});
