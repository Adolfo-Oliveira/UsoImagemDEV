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

    ddd: {
      type: DataTypes.STRING,
      allowNull: false
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    cep: {
      type: DataTypes.STRING,
      allowNull: false
    },

    logradouro: {
      type: DataTypes.STRING,
      allowNull: false
    },

    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },

    bairro: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cidade: {
      type: DataTypes.STRING,
      allowNull: false
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },

    dataNasc: {
      type: DataTypes.DATE,
      allowNull: false
    },

    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      // validate: {
      //   is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      //   notNull: {
      //     msg: 'O campo CPF não pode ser nulo'
      //   }
      // }
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
