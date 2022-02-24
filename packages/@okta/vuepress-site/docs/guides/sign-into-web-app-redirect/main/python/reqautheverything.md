To handle auth for all routes within a group, you can use some middleware or the `@before_request` decorator. We use the `@before_request` decorator. Add the following to your main `app.py` file:

```py
@app.before_request
def check_valid_login():
    endpoint_group = ('/profile', '/logout')
    if request.endpoint in endpoint_group and not is_authenticated():
            return render_template('login.html', next=request.endpoint)
```
