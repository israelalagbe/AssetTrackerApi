import {DataTypes, QueryInterface} from "sequelize";


export const up = async (queryInterface: QueryInterface ) => {
  await queryInterface.createTable('assets', { 
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_latitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location_longitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
  });
};

export const down = async (queryInterface: QueryInterface) => {
  queryInterface.dropTable('assets');
}