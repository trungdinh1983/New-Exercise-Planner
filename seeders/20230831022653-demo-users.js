const faker = require("@faker-js/faker");
const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUsers = [];

    for (let i = 0; i < 9; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password_digest: "password", // Note: Use password_digest as per your model
        // You can omit isAdmin, createdAt, updatedAt because Sequelize handles them automatically
      };

      demoUsers.push(user);
    }

    // Add 1 admin user
    const admin = {
      name: "Admin",
      email: "admin@test.com",
      password_digest: "TestAdmin123#", // Use password_digest
    };

    demoUsers.push(admin);

    // Use the User model to bulk insert
    await User.bulkCreate(demoUsers);

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // To delete all users, you can use the truncate method provided by Sequelize
    await User.destroy({
      where: {}, // Delete all records
      truncate: true, // Reset the auto-increment counter
    });

    return Promise.resolve();
  },
};
