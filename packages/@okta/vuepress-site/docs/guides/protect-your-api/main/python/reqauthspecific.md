For example, you could require authentication for any route by defining a new function:

```py
def is_authorized(request):
    """Get access token from authorization header."""
    try:
        token = request.headers.get("Authorization").split("Bearer ")[1]
        return is_access_token_valid(token, config["issuer"], config["client_id"])
    except Exception:
        return False
```

and then in your route, you would call this function to confirm authorization:

```py
if not is_authorized(request):
    return "Unauthorized", 401
```
