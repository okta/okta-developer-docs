```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
  "profile": {
    "firstName": "Jessie",
    "lastName": "Smith",
    "email": "jessie.smith@example.com",
    "login": "jessie.smith@example.com",
  },
  "credentials": {
    "password" : {
      "hook": {
        "type": "default"
      }
    }
  }
}' "https://{yourOktaDomain}/api/v1/users?activate=true"
```
