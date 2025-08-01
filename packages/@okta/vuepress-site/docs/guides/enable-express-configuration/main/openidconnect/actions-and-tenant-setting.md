## Configure and deploy an action

### Add a post-login action

[Create a custom post-login action](https://auth0.github.io/auth0-cli/auth0_actions_create.html) to add custom claims (`sp_client_id`, `management_api_audience`, and `init_login_uri`) to the access token that Auth0 issues after a user successfully signs in. These claims provide Okta with the necessary information for the Express Configuration process.

Create a file named `add_post_login_action.js` and add the following code:

```javascript

    exports.onExecutePostLogin = async (event, api) => {

    if (event.request.query.audience !== event.secrets.EXPRESS_CONFIGURE_API_IDENTIFIER) {
       return;
    }

    if (!event.client.metadata.express_configure_sp_client_id
        || !event.organization?.id) {
      throw Error("Unable to issue token for Express Configure API - missing data.");
    }

    // this is the client id of service app
    api.accessToken.setCustomClaim('sp_client_id', event.client.metadata.express_configure_sp_client_id);
    api.accessToken.setCustomClaim('management_api_audience', event.secrets.TENANT_DOMAIN + '/api/v2/');

    const loginUri = event.secrets.SERVICE_INIT_LOGIN_URL;
    api.accessToken.setCustomClaim('init_login_uri', loginUri);
  };
```

Run the following command to create the `express_configure_postlogin_action` post-login action that's triggered after a user logs in.

Replace the following values:
  * `SERVICE_INIT_LOGIN_URL`: The URL that the end users use to sign in to your app. For example, `https://example.com/login`.
  * `$AUTH0_DOMAIN`: Your tenant domain.

```bash
auth0 actions create \
  --name "express_configure_postlogin_action" \
  --trigger "post-login" \
  -r "node22" \
  -s "SERVICE_INIT_LOGIN_URL='$SERVICE_INIT_LOGIN_URL'" \
  -s "EXPRESS_CONFIGURE_API_IDENTIFIER=https://system.okta.com/actions/express-configure/v1" \
  -s "TENANT_DOMAIN=https://$AUTH0_DOMAIN" \
  --code "$(cat ./add_post_login_action.js)"
```

### Deploy the action

Run the following command to deploy the action. Select the action from the prompt for the Express Configuration created in the [previous step].

``` bash
auth0 actions deploy
```

### Attach the action to a flow

Attach the action to a flow so that it executes as part of your tenant's traffic. See [Auth0 Actions](https://auth0.com/docs/customize/actions) to add an action using the Auth0 dashboard.

``` bash
auth0 api patch \
  actions/triggers/post-login/bindings \
  --data '{
    "bindings": [
      {
        "ref": {
          "type": "action_name",
          "value": "express_configure_postlogin_action"
        },
        "display_name": "express_configure_postlogin_action"
      }
    ]
  }'
```

## Update tenant settings

> **Note**: Okta recommends completing this step even though it's not required to enable Express Configuration.

Update tenant settings to display the scope details on the consent page. These settings improve the user experience by providing information about the permissions being granted. Use the `use_scope_descriptions_for_consent` parameter to ensure that scope descriptions are shown instead of raw scope names.

```bash
auth0 api patch tenants/settings \
  --data '{
    "flags": {
      "use_scope_descriptions_for_consent": true
    }
  }'
```