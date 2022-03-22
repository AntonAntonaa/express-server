"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn("users", "userName", {
      type: DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("users", "password", {
      type: DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("users", "dob", {
      type: DataTypes.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("users", "dob");
    await queryInterface.removeColumn("users", "email");
    await queryInterface.removeColumn("users", "password");
    await queryInterface.removeColumn("users", "userName");
  },
};
