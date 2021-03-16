---
title: Use a static group allow list with the Org Authorization Server
---

For an Okta Org Authorization Server, you can only create an ID token with a Groups claim, not an access token. For the steps to configure a Groups claim for use with an access token, see the <GuideLink link="../use-static-group-allowlist-custom-as">Use a static group allow list with a Custom Authorization Server</GuideLink> section.

1. In the Admin Console, from the **Applications** menu, select **Applications**, and then select the OpenID Connect client application that you want to configure.
2. Navigate to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.
3. In the **Groups claim type** section, select **Expression**.
4. In **Group claims expression**, leave the default name `groups` (or add it if the box is empty) and then add this expression in the second box: `getFilteredGroups(app.profile.groupallowlist, "group.name", 40)`
5. Click **Save**.

### Request an ID token that contains the Groups claim

To obtain a token with the configured Groups claim, send a request for an ID token that includes the Groups claim as a scope to the authorization endpoint. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains the claim</GuideLink>.

> **Note:** The scopes that you need to include as query parameters are `openid` and `groups`.

The resulting URL looks something like this:

```bash
curl -X GET \
"https://${yourOktaDomain}/oauth2/v1/authorize?client_id=0oaoesxtxmPf08QHk0h7
&response_type=id_token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState
&nonce=yourNonceValue"
```

```bash
curl --location --request GET 'https://${yourOktaDomain}/oauth2/v1/authorize?client_id=0oaiw2v8m6unWCvXM0h7
&response_type=id_token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState
&nonce=yourNonceValue' \
--header 'Accept: application/json'
```

The decoded JWT looks something like this:

```json
{
  "sub": "00uixa271s6x7qt8I0h7",
  "ver": 1,
  "iss": "${yourOktaDomain}",
  "aud": "0oaoesxtxmPf08QHk0h7",
  "iat": 1574117011,
  "exp": 1574120611,
  "jti": "ID.LPQaDhnBhZ9wy-B5BvamTBs7E2C8EzXuLA5P8Uyx-IE",
  "amr": [
    "mfa",
    "kba",
    "pwd"
  ],
  "idp": "00oixa26ycdNcX0VT0h7",
  "nonce": "yourNonceValue",
  "auth_time": 1574117006,
  "groups": [
    "IT"
  ]
}
```

The ID token contains the group **IT**, so the audience (`aud`) has access to the group information about the user.

> **Note:** For flows other than implicit, post to the token endpoint `https://${yourOktaDomain}/oauth2/v1/token` with the user or client that you want. Make sure that the user is assigned to the app and to one of the Groups from your allow list.

If the results aren't as expected, start your troubleshooting by inspecting the [System Log](/docs/reference/api/system-log/) to see what went wrong.

<NextSectionLink/>
