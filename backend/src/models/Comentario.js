const { Model, DataTypes } = require("sequelize");

class Comentario extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Postagem);
    this.belongsTo(models.Aluno, {foreignKey: "aluno_id"});
  }
}

module.exports = Comentario;
