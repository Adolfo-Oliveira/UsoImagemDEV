import { Model, DataTypes } from 'sequelize'
import connection from './connection'
import { uuid } from 'uuidv4'
import Assinatura from './assinatura.model'
import Evento from './evento.model'
import Imagem from './imagem.model'
import Termo from './termo.model'

class Contrato extends Model {

}

Contrato.init(
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

    fkEvento: {
      type: DataTypes.UUID,
      allowNull: false
    },

    fkImagem: {
      type: DataTypes.UUID,
      allowNull: false
    },

    fkTermo: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'contrato',
    hooks: {
      async beforeValidate (instance) {
        instance.id = uuid()
      }
    }
  }
)

Assinatura.belongsTo(Contrato, { foreignKey: 'fkContrato' })
Contrato.hasMany(Assinatura, { foreignKey: 'fkassinatura' })

Contrato.belongsTo(Evento, { foreignKey: 'fkEvento' })
Evento.hasOne(Contrato, { foreignKey: 'fkEContrato' })

Imagem.belongsTo(Contrato, { foreignKey: 'fkContrato' })
Contrato.hasMany(Imagem, { foreignKey: 'fkImagem' })

Contrato.belongsTo(Termo, { foreignKey: 'fkTermo' })
Termo.hasOne(Contrato, { foreignKey: 'fkContrato' })

export default Contrato
