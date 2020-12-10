Use the `refreshTokens` method to get a new access token:

```javascript
const tokens = await refreshTokens();
```
Reponse:
```json
{ 
  "access_token": "{accessToken}", 
  "id_token": "{idToken}", 
  "refresh_token": "{refreshToken}" 
}
```
