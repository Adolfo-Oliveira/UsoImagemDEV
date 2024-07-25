import { Model, DataTypes } from 'sequelize'
import connection from './connection'

class Aluno extends Model {
}

Aluno.init(
  {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

    DataNascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    DDD: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    CEP: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'alunos'
  }
)

export default Aluno
