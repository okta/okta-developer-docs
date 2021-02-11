In order to handle auth for all routes within a group, you need to use some middleware or use `@before_request` decorator:

```py
@app.before_request
def check_valid_login():
    endpoint_group = ('/profile', '/logout')
    if request.endpoint in endpoint_group and not is_authenticated():
        return render_template('login.html', next=request.endpoint)
```
