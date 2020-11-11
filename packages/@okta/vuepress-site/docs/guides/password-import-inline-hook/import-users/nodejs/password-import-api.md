```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Michelle",
    "lastName": "Test",
    "email": "michelletest@doesnotexist.com",
    "login": "michelletest@doesnotexist.com",
  },
  "credentials": {
    "password" : {
      "hook": {
        "type": "default"
      }
    }
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=true"
```
