import renderer from "react-test-renderer";

import GameInfo from "../game-info.component";

test("matches snapshot", () => {
  const tree = renderer.create(<GameInfo />).toJSON();
  expect(tree).toMatchSnapshot();
});
