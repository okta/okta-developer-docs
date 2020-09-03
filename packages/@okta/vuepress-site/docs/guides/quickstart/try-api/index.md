---
title: Try APIs and SDKs
---

You've seen how Okta handles sign-in for your app and how you can use the Developer Console to manage users. Okta offers much more, including a large set of APIs your software can interact with, either directly, through REST calls, or by means of SDKs that support various coding languages. 

#### Get an API token

To secure access to API endpoints, Okta requires an API token, which consists of a secret value, to included in the header of each request.

To obtain an API token your software can use, use the Developer Console:

1. Select **Tokens** from the **API** menu.

2. Click **Create Token**.

3. Name your token and click **Create Token**.

4. Record the token value. This is the only opportunity to see it and record it.

For full details on API tokens, see [Create an API token](/docs/guides/create-an-api-token/create-the-token/).

#### Create a user by API

To create an additional end user in your org, you can make a REST API call to the `/users` endpoint.

The full URL of the endpoint needs to begin with your Okta domain. That should be followed by `/api/v1/users`. For example: `https://dev-l33337.okta.com/api/v1/users`.

To create a new user, make a `POST` call to that endpoint, supplying information about the new user in a JSON object in the request body. 

You need to include your API token in the `Authorization` header of the request.

Here's how you would do it using curl from the command line:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://dev-33337.okta.com/api/v1/users?activate=false"
```

In the above example, you need to replace the Okta domain in the endpoint with your own Okta domain also, and you also need to replace the API token in the `Authorization` header with the API token you created. Note that the value of the API token needs to be prefaced with `SSWS` followed by a space.

For full details of the `/users` API and everything it can do, see the [Users](/docs/reference/api/users/) API reference page.

For information on using Postman to explore Okta APIs, see [Use Postman with the Okta REST APIs](/code/rest/). 

#### Create a user by SDK

Instead of making REST API calls directly, you can use Okta SDKs, provided for a variety languages, to access the same functionality.

<StackSelector snippet="try-api" />

