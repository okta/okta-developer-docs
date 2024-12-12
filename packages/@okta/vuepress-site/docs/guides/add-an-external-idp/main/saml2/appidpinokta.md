* **Name**: Enter the name that you would expect to see on a button, such as **Sign in with <StackSnippet snippet="idp" inline /> 2.0**.

In the **Account matching with IdP Username** section:

* **IdP username**: This is the expression (written in Okta Expression Language) that's used to convert an IdP attribute to the app user's `username`. This IdP username is used for matching an app user to an Okta user. Select the entity in the SAML assertion that contains the username.

    For example, the value `idpuser.subjectNameId` means that it takes the subject's username, from the SAML assertion passed by the IdP, and maps it to the Okta app user's `username` property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

* **Filter** > **Only allow usernames that match defined RegEx Pattern**: Select this option to only authenticate users with transformed usernames that match a regular expression pattern in the text field that appears. This filters the IdP username to prevent the IdP from authenticating unintended users. Users are only authenticated if the transformed username matches the regular expression pattern.

    > **Note:** When you use Okta for B2B or multi-tenancy use cases, select this checkbox. This helps you scope a subset of users in the org and enforce identifier constraints, such as email suffixes.

    For example, you could restrict an IdP for use only with users who have `@company.com` as their email address using the following expression: `^[A-Za-z0-9._%+-]+@company\.com`.

* **Account Link Policy**: Specify whether Okta automatically links the user's IdP account with a matching Okta account. See [Account link](#account-link).

In the **<StackSnippet snippet="idp" inline /> Protocol Settings** section:

When you set up an IdP in Okta, sometimes the **Issuer**, **Single Sign-On URL**, and **Certificate** values aren't available from the external IdP. This information may not be available until the metadata is uploaded to the IdP. Also, the ACS URL and Audience URI values aren't available until you configure the IdP in Okta.

Okta recommends that if the external IdP requires information from Okta for setup before you have that information, do the following:

* Enter any text for the **IdP Issuer URI**.
* Enter `https://URL` for the **IdP Single Sign-On URL**.
* Upload a temporary certificate.

After you upload the metadata to the external IdP in the next step, you can edit the IdP in Okta. Then, you can enter the appropriate **IdP Issuer URI**, **IdP Single Sign-On URL**, and **Certificate** information:

* **IdP Issuer URI**: The issuer. The IdP provides this value.

* **IdP Single Sign-On URL**: The sign-on URL from the IdP. You can sign the AuthN request by selecting **Request Signature**. If you don't specify a **Destination**, Okta automatically sends the request to the IdP SSO URL.

* **IdP Signature Certificate**: Click **Browse files** to upload the certificate from the IdP used to sign the assertion.
