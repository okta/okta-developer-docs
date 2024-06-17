```bash
  curl --request POST
  --url 'https://{yourOktaDomain}/oauth2/default/v1/token' \
  --header 'Accept: application/json' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code' \
  --data 'redirect_uri=https://{yourOktaDomain}/app/oauth2' \
  --data 'code=XGa_U6toXP0Rvc.....SnHO6bxX0ikK1ss-nA' \
  --data 'code_verifier=k9raCwW87d_wYC.....zwTkqPqksT6E_s' \
  --data 'client_id={clientId}'
```
