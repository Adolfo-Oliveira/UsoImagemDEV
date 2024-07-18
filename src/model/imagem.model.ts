import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import Assinante from "./assinante.model";
import { uuid } from "uuidv4";

class Imagem extends Model {
}

Imagem.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    fkAssinante: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    nomeArquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dataUpLoad: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    dataValidade: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "imagem",
    hooks: {
      async beforeValidate(instance) {
        instance.id = uuid();
      },
    },
  }
);

Imagem.belongsTo(Assinante, { foreignKey: "fkAssinante" });
Assinante.hasMany(Imagem, { foreignKey: "fkAssinante" });

export default Imagem;
