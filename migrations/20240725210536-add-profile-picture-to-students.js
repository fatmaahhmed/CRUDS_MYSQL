'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('students', 'profilePicture', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'uploads/profile.png',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('students', 'profilePicture');
  }
};
