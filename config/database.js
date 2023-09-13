const development = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Using an environment variable here
  database: "trungmacbook", // Change to your development database name: trungmacbook_dev?
  host: "127.0.0.1", // Change to your development database host
  dialect: "postgres",
};

const test = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Using an environment variable here
  database: "trungmacbook", // Change to your test database name: trungmacbook_test?
  host: "127.0.0.1", // Change to your test database host
  dialect: "postgres",
};

const production = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Using an environment variable here
  database: "trungmacbook", // Change to your production database name: trungmacbook_prod?
  host: "127.0.0.1", // Change to your production database host
  dialect: "postgres",
};

module.exports = {
  development,
  test,
  production,
};
