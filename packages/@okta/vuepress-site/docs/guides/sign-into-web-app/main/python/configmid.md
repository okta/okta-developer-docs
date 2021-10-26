Flask samples read the configuration from `client_secrets.json`.
Add the file `client_secrets.json` to the folder with your application that includes the following parameters:

```bash
{
  "auth_uri": "https://${yourOktaDomain}/oauth2/default/v1/authorize",
  "client_id": "${CLIENT_ID}",
  "client_secret": "${clientSecret}",
  "redirect_uri": "http://localhost:8080/authorization-code/callback",
  "issuer": "https://${yourOktaDomain}/oauth2/default",
  "token_uri": "https://${yourOktaDomain}/oauth2/default/v1/token",
  "userinfo_uri": "https://${yourOktaDomain}/oauth2/default/v1/userinfo"
}
```

Then you can load the config in your application:

```py
import json


def load_config(fname='./client_secrets.json'):
    config = None
    with open(fname) as f:
        config = json.load(f)
    return config


config = load_config()
```

Any config value is accessible by its key:
```py
CLIENT_ID = config["client_id"]
```
