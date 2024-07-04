import { Model, DataTypes } from "sequelize";
import connection from "./connection";

class Termo extends Model {
  public id!: string;

  public versao!: string;
  
  public data!: Date;

  public descricao!: string;

  public createdAt!: Date;
  
  public updatedAt!: Date;


}

Termo.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },

    versao: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
  {
    sequelize: connection,
    tableName: "termo",
  }
);

export default Termo;
