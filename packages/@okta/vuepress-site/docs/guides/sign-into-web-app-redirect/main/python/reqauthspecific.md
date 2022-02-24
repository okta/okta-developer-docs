You can use the `@login_required` decorator provided by the `flask_login` library to achieve this. Try out the following in your `app.py` file:

```py
@app.route("/profile")
@login_required
def profile():
    return render_template("profile.html", user=current_user)
```
