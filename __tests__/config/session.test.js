const sessionConfig = require("./session");

test("should have all necessary session configurations", () => {
  expect(sessionConfig).toHaveProperty("secret");
  expect(sessionConfig).toHaveProperty("cookie");
  // ... add more checks here
});
