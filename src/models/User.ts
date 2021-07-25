import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../util/sequelize";

interface UserInstance extends Model {
  id: number;
  name: string;
}

const User = sequelize.define<UserInstance>("users", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

export default User;