const development = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Using an environment variable here
  database: "trungmacbook",
  host: "127.0.0.1",
  dialect: "postgres",
};

const test = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Using an environment variable here
  database: "trungmacbook",
  host: "127.0.0.1",
  dialect: "postgres",
};

const production = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Using an environment variable here
  database: "trungmacbook",
  host: "127.0.0.1",
  dialect: "postgres",
};

module.exports = {
  development,
  test,
  production,
};
