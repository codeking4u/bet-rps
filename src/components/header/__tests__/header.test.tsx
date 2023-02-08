import renderer from "react-test-renderer";

import Header from "../header.component";

test("matches snapshot", () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
