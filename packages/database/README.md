# Database

Esse pacote contém os modelos e serviços de banco de dados para a aplicação.

## Modelos

Para alterar o esquema do banco de dados, crie ou modifique os modelos no no diretório `models`. Os modelos devem herdar da classe `BaseModel`.

Após criar ou modificar os modelos, gere uma nova migração e a aplique.

# Migrações

Para gerar uma nova migração, execute:

```bash
$ poetry run inv migrate "migration name"
```

**Importante**: não esqueça de:

- Conferir manualmente a migração gerada para garantir que a geração automática não cometeu erros. As migrações são geradas no diretório `migrations/versions`.
- Adicionar a migração gerada ao controle de versão.

Para aplicar as migrações, execute:

```bash
$ poetry run inv upgrade
```
