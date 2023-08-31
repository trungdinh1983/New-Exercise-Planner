const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoUsers = [];

    // 9 random users from Faker
    for (let i = 0; i < 9; i++) {
      demoUsers.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 1 admin user (hard-coded)
    demoUsers.push({
      name: "Admin",
      email: "admin@test.com",
      password: "TestAdmin123#", // Replace with hashed password if using bcrypt
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert("Users", demoUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
