import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import { uuid } from "uuidv4";

class Assiante extends Model { }

Assiante.init(
  {
    id: {
      type: DataTypes.UUID,
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
    tableName: "assiantne",
    hooks: {
      async beforeValidate(instance) {
        instance.id = uuid();
      },
    },
  }
);

export default Assiante;
