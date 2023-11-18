Now that you have a DPoP-bound access token, you can make requests to DPoP-protected resources. The following example request displays the DPoP-bound access token in the `Authorization` header and the DPoP proof JWT in the `DPoP` header. Values are truncated for brevity.

```bash
curl -v -X GET \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: DPoP eyJraWQiOiJRVX.....wt7oSakPDUg' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  "https://resource.example.org"
```
