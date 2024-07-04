import { Model, DataTypes } from "sequelize";
import connection from "./connection";

class Adm extends Model {
  public id!: string;

  public setor!: string;

  public nome!: string;

  public cargo!: string;

  public telefone!: string;

  public login!: string;

  public senha!: string;

  public createdAt!: Date;
  
  public updatedAt!: Date;
}

Adm.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },

    setor: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "adm",
  }
);

export default Adm;
