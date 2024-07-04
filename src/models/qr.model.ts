import { Model, DataTypes } from "sequelize";
import connection from "./connection";

class Qr extends Model {

  public id!: string;
  public caminho!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Qr.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },

    caminho: {
      type: DataTypes.STRING,
      allowNull: false,
    },

},
  {
    sequelize: connection,
    tableName: "qr",
  }
);

export default Qr;
