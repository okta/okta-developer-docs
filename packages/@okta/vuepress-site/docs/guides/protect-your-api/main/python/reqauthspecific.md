
Every endpoint allows anonymous access if they do not validate the request's accompanying access token.

```python
@app.route("/hello")
def get_anonymous():
    return "you are anonymous"
```
