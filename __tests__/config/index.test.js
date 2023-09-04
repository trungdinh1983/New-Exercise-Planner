const config = require("../config");

test("should have necessary keys", () => {
  expect(config).toHaveProperty("session");
  expect(config).toHaveProperty("database");
  // Add other keys you are expecting
});
