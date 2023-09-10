// index.js
module.exports = {
  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },
  passport: {
    secret: process.env.PASSPORT_SECRET,
  },
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  },
  transaction: {
    someSetting: process.env.TRANSACTION_SETTING || "default_value",
  },
  // Add other configurations here?
};

// add validation and fallbacks?
