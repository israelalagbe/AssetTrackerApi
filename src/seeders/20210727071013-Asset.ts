import { DataTypes, QueryInterface } from "sequelize";

import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert(
    "assets",
    [
      {
        id: uuidv4(),
        name: "Car",
        latitude: "2.39494",
        longitude: "2.39494",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete("assets", {}, {});
};
