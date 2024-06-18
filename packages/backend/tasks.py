import os

from invoke import task


@task
def dev(ctx):
    ctx.run(
        "flask --app backend run --debug --port 3000",
        pty=os.name != "nt",
        env={"APP_ENV": "development"},
    )
