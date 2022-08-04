<!-- NOT USED IN CURRENT VERSION -->
Use this API to provide push provider credentials from FCM so that Okta can send push notifications to your custom app authenticator. See [Push Providers API](/docs/reference/api/push-providers/).

<ApiOperation method="post" url="/api/v1/push-providers" />

#### Sample bearer token request

This request needs the `okta.pushProviders.manage` scope and a Push Provider object in the request body. Each push provider must have a unique name. See [Push Providers API objects](/docs/reference/api/push-providers/#push-providers-api-objects).

The following sample shows a bearer token request:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
-d '{
  "providerType": "FCM",
  "name": "Example FCM Push Provider 1",
  "configuration": {
    "serviceAccountJson": {
        "type": "service_account",
        "project_id": "PROJECT_ID",
        "private_key_id": "KEY_ID",
        "private_key": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
        "client_email": "SERVICE_ACCOUNT_EMAIL",
        "client_id": "CLIENT_ID",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/SERVICE_ACCOUNT_EMAIL"
    },
    "fileName": "fileName.json"
  }
}' "https://${yourOktaDomain}/api/v1/push-providers"
```

#### Sample response

The response contains the Push Provider response object.

```json
{
  "id": "ppctekcmngGaqeiBxB0g4",
  "providerType": "FCM",
  "name": "Example FCM Push Provider 1",
  "lastUpdatedDate": "2022-01-00T00:00:00.000Z",
  "configuration": {
    "projectId": "PROJECT_ID",
    "fileName": "fileName.json",
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
      "hints": {
        "allow": [ "GET", "PUT", "DELETE"]
      }
    }
  }
}
```
