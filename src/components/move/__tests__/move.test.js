import renderer from "react-test-renderer";

import Move from "../move.component";

test("matches snapshot", () => {
  const mockBet = { bet: "ROCK", onClick: jest.fn() };
  const tree = renderer.create(<Move {...mockBet} />).toJSON();
  expect(tree).toMatchSnapshot();
});
