const passport = require("passport");
// ... any mock or setups

test("should initialize passport", () => {
  expect(passport._strategies).toHaveProperty("session");
  expect(passport._strategies).toHaveProperty("local");
  // ... add more checks
});
