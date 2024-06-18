################################
# PYTHON-BASE
# Sets up all our shared environment variables
################################
FROM python:3.10-slim as python-base

ENV PYTHONUNBUFFERED=1 \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.5.0 \
  POETRY_HOME="/opt/poetry" \
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  VIRTUAL_ENV="/venv" 

ENV PATH="$POETRY_HOME/bin:$VIRTUAL_ENV/bin:$PATH"
RUN python -m venv $VIRTUAL_ENV

WORKDIR /app
ENV PYTHONPATH="/app:$PYTHONPATH"

################################
# BUILDER-BASE
# Used to build deps + create our virtual environment
################################
FROM python-base as builder-base
RUN apt-get update && apt-get install -y \
  libpq-dev \
  python-dev-is-python3 \
  gcc \
  curl \
  && rm -rf /var/lib/apt/lists/*

# RUN pip install poetry==1.5.0
RUN curl -sSL https://install.python-poetry.org | python -

WORKDIR /app
COPY ./database ./database
COPY ./consumer ./consumer

WORKDIR /app/consumer
RUN poetry install --no-interaction

################################
# PRODUCTION
# Final image used for runtime
################################
FROM python-base as production

RUN apt-get update && apt-get install -y \
  libpq-dev \
  python-dev-is-python3 \
  gcc \
  curl \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $VIRTUAL_ENV $VIRTUAL_ENV

WORKDIR /app
COPY ./consumer ./consumer

WORKDIR /app/consumer

EXPOSE 3000
CMD ["poetry", "run", "python", "consumer/main.py"]