---
title: Send a Test Request
---

### If you have an Okta Authorization Server:

To obtain a token with the configured groups claim, send a request for an ID token that includes the `groups` claim set in Step 3.c. as a scope to `https://{yourOktaDomain}/oauth2/v1/authorize`, as illustrated in the following example.

Request Example for Okta Authorization Server:

```bash
curl -X GET \
"https://{yourOktaDomain}/oauth2/v1/authorize?client_id=0oabskvc6442nkvQO0h7
&response_type=id_token
&response_mode=fragment&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState&nonce=${yourNonceValue}"
```

### If you have a custom Authorization Server:

To obtain a token with the configured groups claim, send a request for an ID token that includes one of the scopes that the claim is associated with: `https://{yourOktaDomain}/oauth2/${authServerId}/v1/authorize`.

##### Request Example for Custom Authorization Server:

```bash
curl -X GET \
"https://{yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7/v1/authorize?client_id=0oabskvc6442nkvQO0h7
&response_type=id_token
&response_mode=fragment
&scope=groups%20openid
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState&nonce=${myNonceValue}"
 ```

In this example, the claim was configured to work with all scopes. If you specify only certain scopes to return the claim, you'll need to specify one of them in the request.

To obtain an access token instead of an ID token, simply change `response_type=id_token` to `response_type='token'`.
