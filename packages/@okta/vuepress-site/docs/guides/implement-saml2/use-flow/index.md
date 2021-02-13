---
title: Use the SAML 2.0 Assertion flow
---

Before you can begin this flow, you must collect the SAML assertion from the Identity Provider and make sure that it is [base64-encoded](https://www.base64decode.org/). You can then use the assertion in the API call to the [Authorization Server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint.

## Request example

If you are using the default Custom Authorization Server, then your request would look something like this:

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hDc....' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer' \
  --data 'redirect_uri=https://example.com' \
  --data 'assertion=<base64-encoded assertion>' \
  --data 'scope=openid offline_access'
```

> **Note:** The call to your authorization server's `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and secret. You can find the Client ID and secret on your application's **General** tab. See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type` blah blah
- `redirect_uri` is the callback location where the user agent is directed to along with the `access_token`. This must match one of the **Login redirect URIs** that you specified when you created your Okta application in the <GuideLink link="../setup-app">previous step</GuideLink>.
- `assertion` blah blah
- `scope` is `openid`, which is required, but you can request additional scopes. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).
- `response_type` is `token`. It could also be `id_token` or both.

## Response example

```JSON
{
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token": "eyJraWQiOiJXSHVFaVljQ0F6X0wyd2NDRjZGeUk2bDBHcjU0SWxKc21ad0xBTmFKc3pFIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjVDY0xLRmtUTFZvSE1fd2tRdzhJaVdTZ1pFZkRyV1QxamRrRU5aLXRvWG8iLCJpc3MiOiJodHRwczovL2xvZ2luLmhhaWt1dGhlZG9nLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6Imh0dHBzOi8vYXBpLmJveC5jb20iLCJpYXQiOjE2MDQ2MDg4MjksImV4cCI6MTYwNDYxMjQyOSwiY2lkIjoiMG9hcmRiMm5iNk5QMVRsZlIwaDciLCJ1aWQiOiIwMHVqejF5M3hjRTdrUVp3MzBoNyIsInNjcCI6WyJvcGVuaWQiXSwic3ViIjoidmVua2F0LnZpc3dhbmF0aGFuQG9rdGEuY29tIiwibXlva3RhaWQiOiI4ODg4OCIsInNjb3BlIjpbIm9wZW5pZCJdLCJmdWxsbmFtZSI6IlZlbmthdCBWaXN3YW5hdGhhbiIsInVzZXJpZCI6InZlbmthdC52aXN3YW5hdGhhbkBva3RhLmNvbSIsImNsaWVudF9pZCI6IjBvYXJkYjJuYjZOUDFUbGZSMGg3In0.wpAML1cmr45mEf18v3OG48gxr4W0qx5X7DzlRhFgaqTzo19kQLPL6TPsWffOYwLivU4l-DY6SysaaciDpQqpE7lWd1MEaX4GBCHQWjhEk6bl6hjNPpvGmv4hD14_eSGsTSWDzRANwbG-hGVj-8lZ5CUS6tYoKQtKeZnf78h4Tw1QPT3NIcibUA76yB54Zop5Fa4ZPoM90UYXI3rSxonPGWCt6T0BYdRBeDQCBi-5ueXN8PZw56JFVvMTWjEJ5jI0EwjKY6sUZxI11iXlW6A8VwMjvummwv5BCFJ3RHZdfOCA_F8Jeil3IpQS7bQzK_umZA80noWjoQDS_A_rgucYAQ",
   "scope": "openid",
   "id_token": "eyJraWQiOiJXSHVFaVljQ0F6X0wyd2NDRjZGeUk2bDBHcjU0SWxKc21ad0xBTmFKc3pFIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVqejF5M3hjRTdrUVp3MzBoNyIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5oYWlrdXRoZWRvZy5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiIwb2FyZGIybmI2TlAxVGxmUjBoNyIsImlhdCI6MTYwNDYwODgyOSwiZXhwIjoxNjA0NjEyNDI5LCJqdGkiOiJJRC43TkVZVlFhaU9Sblo1dUZkb3lIYy0weHFPS21OVGN0Y1JxYXdUWVF5T2pJIiwiYW1yIjpbInB3ZCJdLCJpZHAiOiIwMG9qejF5M3dhbjFhaXVjODBoNyIsImF1dGhfdGltZSI6MTYwNDYwODgyOSwiYXRfaGFzaCI6IjVjczhRU054MU5uMDBrbnVvZDZZdHciLCJNQ0lEIjoiMjUzNiIsImdyb3VwcyI6WyJFdmVyeW9uZSJdLCJ1c2VyaWQiOiJ2ZW5rYXQudmlzd2FuYXRoYW5Ab2t0YS5jb20iLCJhcnJheUNsYWltIjp7ImhlbGxvIjoiaG93IiwiaG9sYSI6InlvdSJ9fQ.aqTtPxTwUwNcs9SD0EmZL_w0RoWBj5Ck3gkhelE12TKhQBsHTkl5fQUOyVkeuF2Lq3Eem3DRf-JQezivh2Wrz7NoGZH0qHxJjzmBQDW1zC2zByX24_ECNqrCxE8bjEuVFeZTAtuiDoUhELK30wjTfOA-BMzw3HIRaBDNbvbLfTvuPFum7jT3y7U1Oo6jDWVaCGydAsBiKkrNosSp3L53NDno0bDzYqpouvMqd2VfomX99L5foFbGTHC4UVqUh8c9kP2bR-nZeVlq9okBXTqQG5jbGgRngh8sWKpa_4RnxhbiQ2eKGygxl82g5b0iFjZYUBNfyzk_YG1hZczmaHYAgg"
}
```


Your application must now extract the token(s) from the HTTP response body and then use it to call the resource server on behalf of the user.


<NextSectionLink>Next Steps</NextSectionLink>
