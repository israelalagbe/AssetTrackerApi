'use strict';

import {DataTypes, QueryInterface} from "sequelize";


export const up = async (queryInterface: QueryInterface ) => {
  await queryInterface.createTable('users', { 
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });
};

export const down = async (queryInterface: QueryInterface) => {
  queryInterface.dropTable('users');
}