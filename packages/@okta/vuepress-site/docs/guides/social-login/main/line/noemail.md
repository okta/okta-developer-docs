## Handle users without email addresses

LINE doesn’t always provide email addresses for users that it authenticates, but Okta requires an email address for its users to be able to sign in. You can support users who don't have email addresses by using information from LINE to generate email addresses for them.

For example, you might generate email addresses using the `example.com` domain. This ensures that your LINE users have email addresses that Okta can use, but can be easily identified as invalid should you ever want to replace them with valid email addresses. They're guaranteed to be invalid as `example.com` is a reserved domain. See [Reserved Top Level DNS Names (RFC2606)](https://datatracker.ietf.org/doc/html/rfc2606) for more information on reserved domains.

You can customize this mapping by using the [Okta Expression Language](/docs/reference/okta-expression-language/). See [Profile Editor](https://help.okta.com/okta_help.htm?id=ext_app_map) for more information on attribute mapping.

To generate user login values and email addresses for LINE users, do the following:

1. From the Admin Console, click **Security**.

1. Click **Identity Providers**.

1. Locate LINE in the list of providers, then click **Configure** > **Edit Profile and Mappings**.

1. Click **Mappings**.

1. Select the tab that maps a LINE user to an Okta user.

1. Set the expression that maps to the Okta user's `login` value to:
   ```
   appuser.email == null ? appuser.id + '@line.example.com' : appuser.email
   ```

1. Set the expression that maps to the Okta user's `email` value to:
   ```
   appuser.email == null ? appuser.id + '@line.example.com' : appuser.email
   ```

1. Click **Save Mappings**

Similarly, you can map the IdP username by doing the following:

1. From the Admin Console, click **Security**.

1. Click **Identity Providers**.

1. Locate LINE in the list of providers, and then click **Configure** > **Configure Identity Provider**.

1. Set the expression for **IdP Username** to: 
```
   idpuser.email == null ? idpuser.id + '@line.example.com' : idpuser.email
```

1. Click **Update Identity Provider**
