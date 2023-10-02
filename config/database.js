const development = {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "trungmacbook",
  host: "127.0.0.1",
  dialect: "postgres",
};

const test = {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "trungmacbook",
  host: "127.0.0.1",
  dialect: "postgres",
};

const production = {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "trungmacbook",
  host: "127.0.0.1",
  dialect: "postgres",
};

// Export configurations
module.exports = {
  development,
  test,
  production,
};
