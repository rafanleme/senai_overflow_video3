# Senai Overflow

## Backend

-  Instalação das dependências
```shell
cd backend
npm install
```

- Criação do banco de dados
> Alterar as credenciais do mysql no arquivo src/config/database.js
```shell
npx sequelize db:create
```

- Rodar as migrations para criação das tabelas
```shell
npx sequelize db:migrate
```

- Inicializar projeto
```shell
npm run dev
```

## Frontend

- Instalação das dependências
```shell
cd frontend
npm install
```

- Inicializar o projeto
```shell
npm start
```