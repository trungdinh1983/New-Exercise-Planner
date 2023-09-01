const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUsers = [];

    for (let i = 0; i < 9; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "password",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      demoUsers.push(user);
    }

    // Add 1 admin user
    const admin = {
      name: "Admin",
      email: "admin@test.com",
      password: "TestAdmin123#",
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    demoUsers.push(admin);

    return queryInterface.bulkInsert("Users", demoUsers);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
