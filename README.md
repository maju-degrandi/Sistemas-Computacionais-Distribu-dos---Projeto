# Trabalho de Sistemas Distribuídos

## Alunos:

- ARTHUR VERGAÇAS DAHER MARTINS - 12542672
- FÁBIO VERARDINO DE OLIVEIRA - 12674547
- LAURA FERRÉ SCOTELARI - 12543436
- MARIA JÚLIA SOARES DE GRANDI - 12542501

## Instruções de uso

### Importante

Esse projeto usa a ferramenta Poetry para gerenciar dependências do Python. Para instalar o Poetry, siga as instruções em https://python-poetry.org/docs/#installation.

### Instalação

Para instalar as dependências do projeto, execute o script `install.sh`:

```bash
$ ./scripts/install.sh
```

### Inicialização do banco de dados

**Importante**: esse passo deve ser realizado apenas uma vez, antes da primeira execução do projeto.

Para inicializar o banco de dados, execute o script `init-db.sh` dentro do diretório `scripts`:

```bash
$ cd scripts
$ ./init-db.sh
```

Caso tenha problemas com o script, inicie o banco de dados manualmente:

```bash
$ cd scripts
$ docker-compose up -d postgres
$ cd ../packages/database
$ poetry run inv upgrade
$ cd ../../scripts
$ docker-compose down postgres
```

### Execução

Para executar o projeto, suba o `docker-compose` contido no diretório `scripts` com as flags `-d` e `--build`:

```bash
$ cd scripts
$ docker-compose up -d --build
```

A aplicação é servida através de um proxy reverso Nginx na porta 6027, que redireciona as requisições para o frontend e o backend. O backend é servido nas UTLs `/api`. O frontend é servido na raiz.

Além disso, é possível acessar uma instância do Grafana, para visualização de métricas do sistema, na porta 5027. As credenciais de acesso são usuário `admin` e senha `distribuidos`.

## Desenvolvimento local

Para adicionar dependências ao projeto, navegue até o diretório do pacote que deseja adicionar a dependência e execute o comando:

```bash
$ poetry add <nome-da-dependencia>
```

### Banco de dados

Para adicionar ou modificar modelos de banco de dados, edite o pacote `packages/database`. É importante que, após realizar as modificações, você gere uma nova migração e a aplique. As instruções para isso estão no README do pacote `packages/database`.

### Backend

Para executar o backend em modo de desenvolvimento local, navegue até o diretório `packages/backend` e execute o comando:

```bash
$ poetry run inv dev
```

### Frontend

Para executar o frontend em modo de desenvolvimento local, navegue até o diretório `packages/frontend` e execute o comando:

```bash
$ npm run dev
```
