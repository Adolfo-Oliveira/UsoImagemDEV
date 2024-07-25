import { Model, DataTypes } from 'sequelize'
import connection from './connection'
import Qr from './qr.model'
import Usuario from './usuario.model'

class Evento extends Model {
}

Evento.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    data: {
      type: DataTypes.DATE,
      allowNull: true
    },

    hora: {
      type: DataTypes.TIME,
      allowNull: true
    },

    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },

    categoria: {
      type: DataTypes.STRING,
      allowNull: false
    },

    eixo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fkUsuario: {
      type: DataTypes.UUID,
      allowNull: false
    },

    fkQr: {
      type: DataTypes.UUID,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    tableName: 'evento'
  }
)

Evento.belongsTo(Usuario, { foreignKey: 'fkUsuario' })
Usuario.hasMany(Evento, { foreignKey: 'fkUsuario' })

Evento.belongsTo(Qr, { foreignKey: 'fkQr' })
Qr.hasOne(Evento, { foreignKey: 'fkQr' })

export default Evento
