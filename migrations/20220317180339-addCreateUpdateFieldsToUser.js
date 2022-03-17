"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
    await queryInterface.addColumn("users", "createdAt" ,{
      type: DataTypes.DATE,
      allowNull: false,
    })
    await queryInterface.addColumn("users", "updatedAt",{
      type: DataTypes.DATE,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('users', 'updatedAt');
     await queryInterface.removeColumn('users', 'createdAt');
  },
};
