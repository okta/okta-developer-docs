1. Add the following `import` statements to the top of `app.py`:

   ```python
   import pybase64
   import secrets
   ```

1. Add the following code to the end of `app.py` to implement the endpoints:

   ```python
   app = Flask(__name__)
   app.config.update({'SECRET_KEY': secrets.token_urlsafe()})

   @app.route("/api/whoami")
   def whoami():
      return "you are a super developer"

   @app.route("/api/hello")
   def get_anonymous():
      return "you are anonymous"

   if __name__ == '__main__':
      app.run(host="localhost", port=5000, debug=True)
   ```
