---
title: Enable Express Configuration
meta:
  - name: description
    content: Use this guide to enable Express Configuration for your Auth0-enabled OIDC OIN integration.
layout: Guides
---
<ApiLifecycle access="ie" />

# Enable Express Configuration

This guide walks you through how to enable Express Configuration for your Auth0-enabled OpenID Connect (OIDC) OIN integration.

**Learning outcome**

- Understand how to enable Express Configuration for an Auth0-enabled OIDC OIN integration.
- Verify and test the Express Configuration setup to ensure successful integration.

**What you need**

* An Okta Developer Edition org
* An admin user in the org with either the super admin or the app and org admin roles
* Auth0-enabled SaaS app that supports OIDC capability
* Auth0 Enterprise subscription with the [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations) feature enabled
* Auth0 [Command Line Interface](https://auth0.github.io/auth0-cli/)(CLI) permission

## Authenticate with Auth0 CLI

To enable Express Configuration, your first step is to [Authenticate with the Auth0 CLI](https://auth0.github.io/auth0-cli/auth0_login.html) to establish a connection between your app environment and your Auth0 tenant. The specified scopes ( `create:client_credentials`, `update:client_credentials`, `create:client_grants`, and `update:tenant_settings`) provide the CLI permissions to modify tenant-wide settings and create client grants, which are essential for the subsequent configuration steps.

> **Note**: Before you run the command, replace `$AUTH0_DOMAIN` with your Auth0 tenant's domain. For example, `your-tenant.us.auth0.com`.

```bash
auth0 login --domain $AUTH0_DOMAIN --scopes update:tenant_settings --scopes create:client_grants --scopes create:client_credentials --scopes update:client_credentials
```

## Create a resource server in Auth0

The resource server refers to the Okta Express Configuration API. When you authorize Okta for this resource server using OAuth 2.0, Okta receives an access token and uses it to access user and org information.

Run the following command to [create the resource server](https://auth0.github.io/auth0-cli/auth0_api.html) in Auth0:

> **Note**: The `identifier` parameter is a unique URI that identifies the resource server. The `expressconfigure:sso` scope allows Okta to configure Single Sign-On (SSO) settings.

```bash
auth0 api post resource-servers \
  --data '{
    "name": "Okta Express Configure API",
    "identifier": "https://system.okta.com/actions/express-configure/v1",
    "scopes": [
      {
        "value": "expressconfigure:sso",
        "description": "Configure SSO with Express Configuration"
      }
    ],
    "enforce_policies": true,
    "token_lifetime": 300,
    "allow_offline_access": false,
    "skip_consent_for_verifiable_first_party_clients": false
  }'
```

## Configure roles and permissions

Follow these steps to configure the roles and permissions required for managing Express Configuration.

### Create a role

Run the following command to [create a role](https://auth0.github.io/auth0-cli/auth0_roles_create.html) for users who manage the Express Configuration integration. This command creates a role named `EXPRESS_CONFIGURE_ADMIN_ROLE`.

> **Note**: Skip this step if you already have a suitable role for managing Express Configuration.

```bash
auth0 roles create \
  --name "EXPRESS_CONFIGURE_ADMIN_ROLE" \
  --description "Administrator role for Express Configuration"
```

### Assign permissions to the role

Assign the `expressconfigure:sso` permission to the specified role. Replace `$ROLE_ID` with the role ID that you want to grant permission to.

```bash
auth0 roles permissions add "$ROLE_ID" \
  --api-id "https://system.okta.com/actions/express-configure/v1" \
  --permissions "expressconfigure:sso"
```

## Create a client

Register the OIN as an OAuth client in your Auth0 tenant. This client allows Okta to securely interact with Auth0 APIs.

Run the following command to create a client. Ensure that you provide configuration values that are specific to your app.

> **Notes**:
> * The `express_configure_sp_client_id` value refers to the client ID of the app that you're enabling Express Configuration for.
> * The `organization_usage` value ensures that users sign in using an org. Set this value to `true`, as it’s a prerequisite for Express Configuration. Setting the value to `true` ensures that Express Configuration functions within the context of an org, which provides secure and structured access control.
> * The `organization_require_behavior` value determines how the org's sign-in behavior is handled. See [Define Organization Behavior](https://auth0.com/docs/manage-users/organizations/configure-organizations/define-organization-behavior).
> * Save the public key provided by Okta Express Configuration in the `okta-public-key.pem` file.
> * Ensure that you make note of the Okta OIN Integration Client app client ID after it’s created. Share this client ID with the Okta Express Configuration team to configure your app in the OIN.

```bash
auth0 api post clients \
  --data '{
    "name": "Okta OIN Integration Client",
    "description": "For Okta OIN Integration",
    "app_type": "regular_web",
    "callbacks": ["https://system-admin.okta.com/admin/app/generic/oauth20redirect"],
    "oidc_conformant": true,
    "grant_types": ["authorization_code", "client_credentials"],
    "jwt_configuration": {
      "alg": "RS256"
    },
    "client_authentication_methods": {
       "private_key_jwt": {
         "credentials": [
           {
              "name": "OIN Public Key",
              "credential_type": "public_key",
              "pem": '"$(jq -Rs '.' ./okta-public-key.pem)"',
              "alg": "RS256"
           }
         ]
       }
    },
    "organization_require_behavior": "post_login_prompt",
    "organization_usage": "require",
    "client_metadata": {
      "express_configure_sp_client_id": "'$SERVICE_APP_CLIENT_ID'"
    }
  }'
```

### Assign client credentials to the Okta OIN Integration Client

Use the client credentials that you create in this step to authorize the `Okta OIN Integration Client` to access the Auth0 Management API with defined scopes. The OIN can use the token that's returned to create and manage connections on behalf of the orgs. The scopes (`create:connection`, `update:connection` and so on) securely allows your Auth0 tenant's Management API to create and update [Okta Workforce connections]
(https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta).

Run the following commands to create the client credentials. Ensure that you update the `client_id` value with the OIDC app client ID and include the Auth0 domain in the `audience` parameter.

```bash
auth0 api post client-grants \
  --data '{
    "client_id": "'$OIN_APP_CLIENT_ID'",
    "audience": "https://'$AUTH0_DOMAIN'/api/v2/",
    "scope": [
      "create:connections",
      "read:connections",
      "update:connections",
      "read:connections_options",
      "update:connections_options",
      "read:organization_connections",
      "create:organization_connections",
      "update:organization_connections"
    ]
  }'
```

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

## Email the Okta Express Configuration team

Email the following information to the Okta Express Configuration team at [expressconfig@okta.com](mailto:expressconfig@okta.com):

* Confirmation that you completed all the steps in this guide and that your app is ready to support Express Configuration.
* Your app name in the OIN.
* Okta OIN Integration Client app client ID.

The Okta Express Configuration team configures your app in the OIN and assigns it to your developer org. You can then test the feature by creating an instance of your app in the OIN catalog.

# Verification and testing

Follow these steps to verify and test the Express Configuration feature:

1. Sign in to your [org](/login/) as a user with either the super admin (`SUPER_ADMIN`) role, or the app (`APP_ADMIN`) and org (`ORG_ADMIN`) admin [roles](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles).
1. Go to **Applications** > **Applications** in the Admin Console.
1. Click **Browse App Catalog** and search for your app.
1. Open your app's detail page and click **Add Integration**.
1. In **General Settings**, click **Done** to create an instance of your OIN app.
1. Go to the **Authentication** tab.
1. Click **Configure SSO with OIDC**. You’re redirected to sign in to the app and prompted to consent to data sharing.

<div class="wireframe-border">

![Configure SSO with OIDC](/img/oin/ec_configure_SSO_with_OIDC.png "Configure SSO with OIDC")

</div>

8. Assign a test Okta user to this app instance.
9. Sign in to your org using this test user and click your app's tile in the End-User Dashboard.
10. Verify that the user is successfully signed in to your app.

## Additional information

Admins use Express Configuration to set up SSO for an instance of your app in Okta. During this process, the following default configurations are applied to the newly created Okta Workforce Connection in Auth0. See [Enable Organization Connections](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections).

**Connection Settings**

  * **Scopes**: `openid email profile`
  * **User Mapping**: `{"mapping_mode" : "basic_profile"}`
  * **Connection Profile**: `{"pkce":"auto"}`

**Connection Login Experience (Org Level)**

  * **Home Realm Discovery**: Empty (not supported)
  * **Display Connection as a button**: Enable
  * **Button display name**: Okta
  * **Button logo URL**: `https://cdn.brandfolder.io/R30ALRIS/at/scvv8tj7w545j3r5gmxq4jrb/Okta_Aura_Logomark_Black_RGB.png` (Okta brand logo)