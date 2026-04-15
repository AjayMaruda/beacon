import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ServiceAttributes {
  id: string;
  name: string;
  url: string;
  status: "healthy" | "unhealthy";
  lastChecked: Date;
}

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: string;
  public name!: string;
  public url!: string;
  public status!: "healthy" | "unhealthy";
  public lastChecked!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("healthy", "unhealthy"),
      defaultValue: "unhealthy",
    },
    lastChecked: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "services",
    timestamps: true,
  },
);

export default Service;
