1. Create the required routes in `app.py`: 

```python
@app.route("/")
def hello():
    return render_template("hello.html")

@app.route("/whoami")
@login_required
def whoami():
    return render_template("whoami.html", user=current_user)
```

2. Create a new folder in your project root  called `templates`.

3. Inside the `templates` directory, create the following template files: [hello.html](https://github.com/okta-samples/okta-flask-api-sample/blob/main/templates/hello.html) and [whoami.html](https://github.com/okta-samples/okta-flask-sample/blob/main/templates/whoami.html).