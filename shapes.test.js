const { generateSVG } = require("./index");

test("generateSVG function generates the correct SVG", () => {
  const svg = generateSVG("ABC", "red", "circle", "blue");
  expect(svg).toContain("<svg");
  expect(svg).toContain("ABC");
  expect(svg).toContain("red");
  expect(svg).toContain("circle");
  expect(svg).toContain("blue");
});
