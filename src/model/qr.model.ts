import { Model, DataTypes } from 'sequelize'
import { uuid } from 'uuidv4'
import connection from './connection'
class Qr extends Model {
}

Qr.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },

    caminho: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'qr',
    hooks: {
      async beforeValidate (instance) {
        instance.id = uuid()
      }
    }
  }
)

export default Qr
