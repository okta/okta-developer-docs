* **Name**: Enter the name that you would expect to see on a button, such as **Sign in with <StackSnippet snippet="idp" inline /> 2.0**.

In the **Authentication Settings** section:

<!-- * **Authentication method reference (AMR) claims**: Select **Trust AMR claims from this identity provider** to have Okta evaluate that AMR claims sent in the IdP response meet sign-on policy requirements. <ApiLifecycle access="ea" />

    > **Note:** Ensure that the IdP includes the correct AMR claims in the IdP response and that the claims match the requirements of your [sign-on policies](/docs/guides/configure-signon-policy/main/). If the claims don't satisfy the requirements, then users can't sign in to the application.
-->
* **IdP Username**: This is the expression (written in Okta Expression Language) that is used to convert an Identity Provider attribute to the application user's `username`. This Identity Provider username is used for matching an application user to an Okta user.

    For example, the value `idpuser.subjectNameId` means that it takes the subject's username, from the SAML assertion passed by the Identity Provider, and maps it to the Okta application user's `username` property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/) for more information.

* **Filter > Only allow usernames that match defined RegEx Pattern**: Select this option to only authenticate users with transformed usernames that match a regular expression pattern in the text field that appears. This filters the IdP username to prevent the IdP from authenticating unintended users. Users are only authenticated if the transformed username matches the regular expression pattern.

    > **Note:** When you use Okta for B2B or multi-tenancy use cases, select this checkbox. This helps you scope a subset of users in the org and enforce identifier constraints, such as email suffixes.

    For example, you could restrict an IdP for use only with users who have `@company.com` as their email address using the following expression: `^[A-Za-z0-9._%+-]+@company\.com`.

* **Account Link Policy**: Specify whether Okta automatically links the user's IdP account with a matching Okta account. See [Account link](#account-link).

In the **<StackSnippet snippet="idp" inline /> Protocol Settings** section:

When you set up an IdP in Okta, sometimes the **Issuer**, **Single Sign-On URL**, and **Certificate** values aren't available from the external IdP. This information may not be available until the metadata is uploaded to the IdP. Futhermore, the ACS URL and Audience URI values aren't available until the IdP in Okta is configured.

Okta recommends that if the external IdP requires information from Okta for setup before you have that information, do the following:

* Enter any text for the **IdP Issuer URI**.
* Enter `https://URL` for the **IdP Single Sign-On URL**.
* Upload a temporary certificate.

After you upload the metadata to the external IdP in the next step, you can edit the IdP in Okta. Then, you can enter the appropriate **IdP Issuer URI**, **IdP Single Sign-On URL**, and **Certificate** information.

* **IdP Issuer URI**: The issuer. The Identity Provider provides this value.

* **IdP Single Sign-On URL**: The sign-on URL from the Identity Provider. If you sign the authN request by selecting the **Request Signature** option, but don't specify a **Destination**, Okta automatically sends the authN request to the IdP SSO URL.

* **IdP Signature Certificate**: Click **Browse files** to upload the certificate from the Identity Provider used to sign the assertion.
