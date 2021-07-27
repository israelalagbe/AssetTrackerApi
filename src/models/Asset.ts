import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../util/sequelize";

interface AssetType extends Model {
  id: string;
  name: string;
  location_latitude: string;
  location_longitude: string;
  createdAt: string;
  updatedAt: string;
}

const Asset = sequelize.define<AssetType>("assets", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.literal('uuid_generate_v4()')
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
});

export default Asset;