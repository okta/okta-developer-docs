In the **General Settings** section:

* **Name**: Enter the name that you would expect to see on a button, such as **Sign in with SAML 2.0**.

In the **Authentication Settings** section:

* **IdP Username**: This is the expression (written in the Okta Expression Language) that is used to convert an Identity Provider attribute to the application user's `username`. This Identity Provider username is used for matching an application user to an Okta User.

    For example, the value `idpuser.email` means that it takes the email attribute passed by the social Identity Provider and maps it to the Okta application user's `username` property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/) for more information.

In the **SAML Protocol Settings** section:

* **IdP Issuer URI**: The issuer. The Identity Provider provides this valu.e

* **IdP Single Sign-On URL**: The sign-on URL from the Identity Provider. If you sign the authN request by selecting the Request Signature option, but don't specify a destination in the **Destination** field (see [Advanced Settings](/docs/reference/social-settings/)), Okta automatically sends the authN request to the Identity Provider Single Sign-On URL.

* **IdP Signature Certificate**: Click **Browse files** to upload the certificate from the Identity Provider used to sign the assertion.

> Note: For more information about the **Advanced Settings**, see [Social Identity Provider Settings](/docs/reference/social-settings/).