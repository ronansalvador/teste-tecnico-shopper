
# Processo Seletivo - Shopper


- Clone o projeto

```bash
  git clone git@github.com:ronansalvador/teste-tecnico-shopper.git
```

- Entre no diretório do projeto

```bash
  cd teste-tecnico-shopper
```

- Instale as dependências do projeto

```bash
  npm run install
```

- Execute o comando Docker para iniciar um container com o MySQL

```bash
  npm run docker-compose:up
```

- Inicie a aplicação Backend

```bash
  npm run start:backend
```

- Abra um novo terminal e inicia a aplicação Frontend


```bash
  npm run start:frontend
```

- Acesse a aplicação no endereço: http://localhost:5173/ ou clique no link gerado em seu terminal

## Após finalizar a aplicação:

- Encerrar utilização da porta 3001 via linux

```bash
  sudo kill -9 `sudo lsof -t -i:3001`
```

