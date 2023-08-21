You can use a middleware function or the `@before_request` decorator to protect every endpoint so only authenticated users can access anything. For example:

```python
@app.before_request
def check_valid_signin():
    endpoint_group = ('/profile', '/signout')
    if request.endpoint in endpoint_group and not is_authenticated():
            return render_template('signin.html', next=request.endpoint)
```
