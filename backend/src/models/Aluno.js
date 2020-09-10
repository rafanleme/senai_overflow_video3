const { Model, DataTypes } = require("sequelize");

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        ra: DataTypes.STRING,
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Postagem, { foreignKey: "created_aluno_id" });
    this.hasMany(models.Comentario);
  }
}

module.exports = Aluno;
