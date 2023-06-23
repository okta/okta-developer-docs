Create a `@public_route` decorator to mark any route accessible without `login`:

```python
def public_route(decorated_function):
    decorated_function.is_public = True
    return decorated_function
```

For example, to make the default route (`/`) public, update it as follows:

```python
@app.route("/")
@public_route
def hello():
    return render_template("hello.html")
```
