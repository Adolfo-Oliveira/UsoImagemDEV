import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import Usuario from "./usuario.model"
import Evento from "./evento.model"
import Imagem from "./imagem.model"
import Termo from "./termo.model"


class Contrato extends Model {
  public id!: String;

  public fkUsuario!: String;
  
  public fkEvento!: String;
  
  public fkImagem!: String;

  public fkTermo!: String;

  public createdAt!: Date;
  
  public updatedAt!: Date;
}

Contrato.init(
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

    fkEvento: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    fkImagem: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    fkTermo: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
  },
  {
    sequelize: connection,
    tableName: "contrato",
  }
);

Usuario.belongsTo(Contrato, { foreignKey: "fkContrato" });
Contrato.hasMany(Usuario, { foreignKey: "fkUsuario" });

Contrato.belongsTo(Evento, { foreignKey: "fkEvento" });
Evento.hasOne(Contrato, { foreignKey: "fkEContrato" });

Imagem.belongsTo(Contrato, { foreignKey: "fkContrato" });
Contrato.hasMany(Imagem, { foreignKey: "fkImagem" });

Contrato.belongsTo(Termo, { foreignKey: "fkTermo" });
Termo.hasOne(Contrato, { foreignKey: "fkContrato" });

export default Contrato;
