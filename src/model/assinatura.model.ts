import { Model, DataTypes } from 'sequelize'
import connection from './connection'
import { uuid } from 'uuidv4'
import Evento from './evento.model'

class Assinatura extends Model { }

Assinatura.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    dataNasc: {
      type: DataTypes.DATE,
      allowNull: false
    },

    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    ddd: {
      type: DataTypes.STRING,
      allowNull: false
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nomeResp: {
      type: DataTypes.STRING,
      allowNull: true
    },

    emailResp: {
      type: DataTypes.STRING,
      allowNull: true
    },

    dataNascResp: {
      type: DataTypes.DATE,
      allowNull: true
    },

    cpfResp: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },

    dddResp: {
      type: DataTypes.STRING,
      allowNull: true
    },

    telefoneResp: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fkEvento: {
      type: DataTypes.UUID,
      allowNull: false
    },

    ip: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'assinatura',
    hooks: {
      async beforeValidate (instance) {
        instance.id = uuid()
      }
    }
  }
)

Evento.hasMany(Assinatura, { foreignKey: 'fkEvento' })
Assinatura.belongsTo(Evento, { foreignKey: 'fkEvento' })

export default Assinatura
