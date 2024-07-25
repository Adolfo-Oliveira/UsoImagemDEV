import { Model, DataTypes } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'

class Termo extends Model {

}

Termo.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },

    versao: {
      type: DataTypes.STRING,
      allowNull: false
    },

    data: {
      type: DataTypes.DATE,
      allowNull: false
    },

    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'termo',
    hooks: {
      async beforeValidate (instance) {
        instance.id = uuid()
      }
    }
  }
)

export default Termo
