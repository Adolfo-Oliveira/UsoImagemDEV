import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import Usuario from "./usuario.model";

class Imagem extends Model {
  public id!: string;

  public FkUsuario!: string;

  public nomeArquivo!: string;

  public dataUpLoad!: Date;

  public dataValidade!: Date;
  
  public createdAt!: Date;

  public updatedAt!: Date;
}

Imagem.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },

    fkUsuario: {
      type: DataTypes.BIGINT,
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
  }
);

Imagem.belongsTo(Usuario, { foreignKey: "fkUsuario" });
Usuario.hasMany(Imagem, { foreignKey: "fkUsuario" });

export default Imagem;
