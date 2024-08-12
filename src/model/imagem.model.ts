import { Model, DataTypes } from 'sequelize'
import connection from './connection'
import Assinatura from './assinatura.model'
import { uuid } from 'uuidv4'

class Imagem extends Model {
}

Imagem.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },

    fkAssinatura: {
      type: DataTypes.UUID,
      allowNull: false
    },

    nomeArquivo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    dataUpLoad: {
      type: DataTypes.DATE,
      allowNull: false
    },

    dataValidade: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'imagem',
    hooks: {
      async beforeValidate (instance) {
        instance.id = uuid()
      }
    }
  }
)

Imagem.belongsTo(Assinatura, { foreignKey: 'fkAssinatura' })
Assinatura.hasMany(Imagem, { foreignKey: 'fkAssinatura' })

export default Imagem
