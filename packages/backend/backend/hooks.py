import functools

from database.models import Model
from flask import request


def load_model(Model: Model, extract_id_lambda=None):
    def decorator(view):
        @functools.wraps(view)
        def wrapped_view(**kwargs):
            model_name = Model.__name__.lower()
            model_id_name = f"{model_name}_id"

            model_id = kwargs.get(model_id_name)
            if extract_id_lambda:
                model_id = extract_id_lambda(request)

            if not model_id:
                raise ValueError(f"{model_id_name} must be provided in the request.")

            instance = Model.find_by(id=model_id)

            if model_id_name in kwargs:
                del kwargs[model_id_name]
            kwargs[model_name] = instance
            return view(**kwargs)

        return wrapped_view

    return decorator


def add_headers(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response
