You can use the `@login_required` decorator to achieve this. For example:

```py
@app.route("/profile")
@login_required
def profile():
    return render_template("profile.html", user=current_user)
```
