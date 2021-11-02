## Handle users without email addresses

<StackSelector snippet="idp" noSelector inline /> doesn’t always provide email addresses for users that it authenticates. Okta requires an email address for its users, so if a user from <StackSelector snippet="idp" noSelector inline /> doesn't have one, a fake email address is created using some information from the IdP (for example, if the IdP provides a username, an email might be formed using `idp_username@domain.com`).

You can customize this mapping by using the [Okta Expression Language](/docs/reference/okta-expression-language/). See [Profile Editor](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_app_map) for more information on attribute mapping.

To customize the `login` and `email` mappings for <StackSelector snippet="idp" noSelector inline />:

1. From the Admin Console, click **Security**.

1. Click **Identity Providers**.

1. Locate your <StackSelector snippet="idp" noSelector inline /> in the list of providers, then click **Configure** > **Edit Profile and Mappings**.

1. Click **Mappings**.

1. Select the tab that maps a <StackSelector snippet="idp" noSelector inline /> user to an Okta user.

1. Set the expression that maps to the Okta user's `login` value to: `appuser.email == null ? appuser.id + '@github.example.com' : appuser.email`.

1. Set the expression that maps to the Okta user's `email` value to: `appuser.email == null ? appuser.id + '@github.example.com' : appuser.email`.

1. Click **Save Mappings**

Similarly, you can map the IdP username by doing the following:

1. From the Admin Console, click **Security**.

1. Click **Identity Providers**.

1. Locate your <StackSelector snippet="idp" noSelector inline /> in the list of providers, then click **Configure** > **Configure Identity Provider**.

1. Set the expression for **IdP Username** to: `idpuser.email == null ? idpuser.id + '@github.example.com' : idpuser.email`.

1. Click **Update Identity Provider**

**Note:** The domain `example.com` is used when creating these mappings to ensure that the generated emails are invalid. See [Reserved Top Level DNS Names (RFC2606)](https://datatracker.ietf.org/doc/html/rfc2606) for more information on reserved top level DNS names.
