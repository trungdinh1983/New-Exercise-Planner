// Import your database config file
const dbConfigs = require("./database");

test("should load the correct database configuration based on NODE_ENV", () => {
  process.env.NODE_ENV = "development";
  const config = dbConfigs[process.env.NODE_ENV];

  expect(config.username).toBe("postgres");
  expect(config.password).toBe(process.env.DB_PASSWORD);
  expect(config.database).toBe("trungmacbook");
  // ... add more here
});
