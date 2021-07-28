import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../util/sequelize";
import { v4 as uuidv4 } from "uuid";

class Asset extends Model {
  id!: string;
  name!: string;
  latitude!: string;
  longitude!: string;
  createdAt!: string;
  updatedAt!: string;
}

Asset.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "assets",
  }
);

export default Asset;
