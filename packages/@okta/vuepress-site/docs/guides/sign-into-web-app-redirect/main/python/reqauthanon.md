Any routes you don't explicitly protect have anonymous access:

1. Remove the `@before_request` decorator block from `app.py` to stop all pages and resources requiring authentication before they can be accessed.
2. Add the `@login_required` decorator just to the specific routes that require authentication, as seen in the previous section. Any other routes have anonymous access.
