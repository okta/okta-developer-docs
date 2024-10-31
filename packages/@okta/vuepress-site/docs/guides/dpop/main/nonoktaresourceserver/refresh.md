```bash
  curl --request POST
  --url 'https://{yourOktaDomain}/oauth2/default/v1/token' \
  --header 'Accept: application/json' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'grant_type=refresh_token' \
  --data 'redirect_uri={redirectUri}' \
  --data 'client_id={clientId}' \
  --data 'scope=offline_access openid' \
  --data 'refresh_token=3CEz0Zvjs0eG9mu4w36n-c2g6YIqRfyRSsJzFAqEyzw'
```
