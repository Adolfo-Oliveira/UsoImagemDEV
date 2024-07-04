import { Model, DataTypes } from "sequelize";
import connection from "./connection";
import Adm from "./adm.model";
import Qr from "./qr.model"


class Evento extends Model {
  public id!: String;

  public titulo!: String;

  public data!: Date;

  public descricao!: String;

  public categoria!: String;

  public eixo!: String;

  public fkAdm!: String;

  public fkQr!: String;

  public createdAt!: Date;
  
  public updatedAt!: Date;
}

Evento.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },

    titulo: {
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

    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    esixo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fkAdm: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    fkQr: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
  },
  {
    sequelize: connection,
    tableName: "evento",
  }
);

Evento.belongsTo(Adm, { foreignKey: "fkAdm" });
Adm.hasMany(Evento, { foreignKey: "fkAdm" });

Evento.belongsTo(Qr, { foreignKey: "fkQr" });
Qr.hasOne(Evento, { foreignKey: "fkQr" });

export default Evento;
