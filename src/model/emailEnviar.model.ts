import { Model, DataTypes } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'
class EmailEnviar extends Model {}

EmailEnviar.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },

    de: {
      type: DataTypes.STRING,
      allowNull: false
    },

    para: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cc: {
      type: DataTypes.STRING,
      allowNull: true
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    conteudo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    enviado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    dataHoraEnvio: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    tableName: 'emailEnviar',
    timestamps: false,
    hooks: {
      async beforeValidate (instance) {
        instance.id = uuid()
      }
    }
  }
)

export default EmailEnviar
