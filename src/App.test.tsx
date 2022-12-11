import { getDeckColour } from "./Helpers/CardHelpers";

const suits = ['♦', '♣', '♥', '♠'];
test('Returns correct suit values', () => {
  // Test all suits
  expect(getDeckColour("1" + suits[3])).toBe("redSuit");
  expect(getDeckColour("2222" + suits[1])).toBe("redSuit");
  expect(getDeckColour("3 " + suits[0])).toBe("blackSuit");
  expect(getDeckColour("J" + suits[2])).toBe("blackSuit");

  // Default should return black if we pass an unexpected value
  expect(getDeckColour("Billy No'Colours")).toBe("blackSuit");

});