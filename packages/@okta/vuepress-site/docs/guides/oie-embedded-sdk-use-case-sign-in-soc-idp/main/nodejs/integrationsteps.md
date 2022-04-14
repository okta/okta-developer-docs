### 1: The user navigates to the sign-in page

As part of the `/login` entry point, call `idx.startTransaction()` to render social Identity Providers on the user sign-in page, as shown in the `login.js` page of the SDK sample application.

```JavaScript
// entry route
router.get('/login', async (req, res) => {
  req.setFlowStates({
    entry: '/login',
    idxMethod: 'authenticate'
  });

  // Delete the idp related render logic if you only want the username and password form
  const authClient = getAuthClient(req);
  const { availableSteps } = await authClient.idx.startTransaction({ state: req.transactionId });
  const idps = availableSteps
    ? availableSteps
      .filter(({ name }) => name === 'redirect-idp')
      .map(({ href, idp: { name }, type }) => ({
        name,
        href,
        class: getIdpSemanticClass(type),
        id: type.toLowerCase()
      }))
    : [];

  renderTemplate(req, res, 'login', {
    action: '/login',
    hasIdps: !!idps.length,
    idps,
  });
});
```

You need to build a generic sign-in view page with the social sign-in options available from the list of IdPs returned. However, in this use case, Facebook is the only configured IdP in the list. For example:

```html
<div class="ui row grid">
        {{#hasIdps}}
          <div id="idp-buttons" class="ui row">
            {{#idps}}
              <button id="{{id}}" onclick="location.href='{{href}}'" class="ui {{class}} button">
                {{name}}
              </button>
            {{/idps}}
          </div>
        {{/hasIdps}}
</div>
```

The previous code snippet is rendered as the **Login with Facebook** button, similar to the following image:

<div class="common-image-format">

![Displays the Login with Facebook button in a sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link-java.png)

</div>

### 2: The user signs in with Facebook

When the user selects the **Login with Facebook** option, they are directed to the Facebook sign-in page.

After the user signs in to Facebook successfully, Facebook routes the user to the location specified in **Valid OAuth Redirect URIs** from the Facebook developer site.

> **Note:** The **Valid OAuth Redirect URIs** for your Okta org is in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`. See [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_1-create-a-facebook-app-in-facebook) for details on configuring the **Valid OAuth Redirect URIs** value.

### 3: Handle the callback from Okta

Okta returns the Interaction code in the callback to the **Sign-in redirect URI** location specified in the [Create a new application](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-a-new-application) section. You need to handle the callback by exchanging the Interaction code for an access token using `idx.handleInteractionCodeRedirect()`.

```JavaScript
try {
    // handle interactionCode and save tokens
  await authClient.idx.handleInteractionCodeRedirect(callbackUrl);
} catch (err) {
  if (authClient.isInteractionRequiredError(err)) {
    // need to proceed with required authenticator/s
  }
  throw err;
}
```

With the obtained access token, you can retrieve basic user information by making a request to Okta's OpenID Connect Authorization Server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/#get-the-user-profile-information) for details.

The user is now successfully signed in and can be sent to the default signed-in home page.
