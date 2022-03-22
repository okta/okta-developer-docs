To force Flask to check for login on all routes, use `@before_request` to check route access. For example:

```python
@app.before_request
def check_route_access():
    if current_user.is_authenticated:
            return  # Access granted
    else:
            return redirect(url_for('login'))

```