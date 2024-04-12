1. Add the following `import` statement to `app.py`:

    ```python
    from flask_cors import CORS
    ```

1. Enable CORS by adding the following line after the call to `app.config.update`:

    ```python
    app = Flask(__name__)
    app.config.update({'SECRET_KEY': secrets.token_urlsafe()})
    CORS(app)
    ```
