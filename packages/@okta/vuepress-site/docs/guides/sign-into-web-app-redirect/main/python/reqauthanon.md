To handle anonymous access:

1. Remove the `@app.before_request` block added in above to stop everything requiring authentication.
2. Add the `@login_required` decorator just to the specific routes that require authentication, as seen in the previous section. Any other routes will have anoymous access.
