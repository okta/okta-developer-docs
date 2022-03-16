You can create a `@public_route` decorator to allow any route decorated by it to be accessed without login: 

```python
def public_route(decorated_function):
    decorated_function.is_public = True
    return decorated_function
```

For example, to make the default route (`/`) public, you'd update that route as follows:

```python
@app.route("/")
@public_route
def hello():
    return render_template("hello.html")
```
