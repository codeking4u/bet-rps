import renderer from "react-test-renderer";

import Footer from "../footer.component";

test("matches snapshot", () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
