# O que é ORM?

ORM é mapeamento objeto-relacional.

Consiste basicamente em mapear os dados e a estrutura do banco em objetos no nosso projeto.

### Exemplo

Tabela Pessoa

Nome Idade Sexo

```javascript
class pessoa {
  String nome;
  Integer idade;
  String sexo;

  public save(){
    //insert no banco de dados
  }
}
```

### Exemplos de ORMs

- Python - Flex
- Ruby - Rail
- Java - Hibernate
- PHP - Eloquent
- Typescript - Typeorm
- Javascript - Sequelize
