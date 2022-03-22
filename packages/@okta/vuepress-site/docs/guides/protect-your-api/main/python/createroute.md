1. Create a Flask app instance inside your `app.py` file:

```python
app = Flask(__name__)
app.config.update({'SECRET_KEY': 'SomethingNotEntirelySecret'})
```

2. Create the required routes in `app.py`: 

```python
@app.route("/hello")
def hello():
    return render_template("hello.html")

@app.route("/whoami")
@login_required
def whoami():
    return render_template("whoami.html", user=current_user)
```

3. Create a new folder in your project root called `templates`.

4. Inside the `templates` directory, create the following template files: [hello.html](https://github.com/okta-samples/okta-flask-api-sample/blob/main/templates/hello.html), [whoami.html](https://github.com/okta-samples/okta-flask-api-sample/blob/main/templates/whoami.html), and [template.html](https://github.com/okta-samples/okta-flask-api-sample/blob/main/templates/template.html).