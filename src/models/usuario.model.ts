import { Model, DataTypes } from "sequelize";
import connection from "./connection";

class Usuario extends Model {
  public id!: string;

  public nome!: string;

  public telefone!: string;

  public email!: string;

  public cep!: string;

  public dataNasc!: Date;

  public ativo!: boolean;

  public identidade!: string;

  public cpf!: string;

  public createdAt!: Date;
  
  public updatedAt!: Date;
}

Usuario.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dataNasc: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    identidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        notNull: {
          msg: "O campo CPF não pode ser nulo",
        },
      },
    },

    aluno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: connection,
    tableName: "usuario",
  }
);

export default Usuario;
