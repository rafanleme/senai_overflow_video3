const { Model, DataTypes } = require("sequelize");

class Postagem extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.TEXT,
        imagem: DataTypes.STRING,
        gists: DataTypes.TEXT,
      },
      {
        sequelize,
        tableName: "postagens",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "created_aluno_id" });
    this.hasMany(models.Comentario);
  }
}

module.exports = Postagem;
