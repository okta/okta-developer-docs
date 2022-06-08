* **Name**: Enter the name that you would expect to see on a button, such as **Sign in with <StackSnippet snippet="idp" inline /> 2.0**.

In the **Authentication Settings** section:

* **IdP Username**: This is the expression (written in Okta Expression Language) that is used to convert an Identity Provider attribute to the application user's `username`. This Identity Provider username is used for matching an application user to an Okta User.

    For example, the value `idpuser.subjectNameId` means that it takes the subject's username, from the SAML assertion passed by the Identity Provider, and maps it to the Okta application user's `username` property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/) for more information.

* **Filter > Only allow usernames that match defined RegEx Pattern**: Select this option to only authenticate users with transformed usernames that match a regular expression pattern in the text field that appears.

In the **<StackSnippet snippet="idp" inline /> Protocol Settings** section:

> **Note:** When you are setting up the IdP in Okta, sometimes the Issuer, Single Sign-On URL, and Certificate aren't available from the external IdP until the metadata (the Assertion Consumer Service URL (ACS URL) and Audience URI) is uploaded to the IdP. And, the ACS URL and Audience URI values aren't available until the IdP in Okta is configured.<br>
<br>
We recommend that if the external IdP requires information from Okta for setup before you have that information, enter any text for the **IdP Issuer URI**, enter `https://URL` for the **IdP Single Sign-On URL**, and upload a temporary certificate. After you upload the metadata to the external IdP in the next step, you can edit the IdP in Okta and enter the appropriate **IdP Issuer URI**, **IdP Single Sign-On URL**, and **Certificate** information.

* **IdP Issuer URI**: The issuer. The Identity Provider provides this value.

* **IdP Single Sign-On URL**: The sign-on URL from the Identity Provider. If you sign the authN request by selecting the **Request Signature** option, but don't specify a destination in the **Destination** field, Okta automatically sends the authN request to the Identity Provider Single Sign-On URL.

* **IdP Signature Certificate**: Click **Browse files** to upload the certificate from the Identity Provider used to sign the assertion.
