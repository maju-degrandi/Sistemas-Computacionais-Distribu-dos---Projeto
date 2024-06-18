import os

from invoke import task


@task
def migrate(ctx, message):
    ctx.run(
        "flask --app database db migrate -m '{}'".format(message),
        pty=os.name != "nt",
        env={"APP_ENV": "development"},
    )


@task
def upgrade(ctx):
    ctx.run(
        "flask --app database db upgrade",
        pty=os.name != "nt",
        env={"APP_ENV": "development"},
    )
