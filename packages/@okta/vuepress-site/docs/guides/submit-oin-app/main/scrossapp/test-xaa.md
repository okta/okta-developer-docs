### Test your Cross App Access (XAA) integration with xaa.dev

Test the ID-JAG token exchange with xaa.dev before you upload your test log.

**What you need:**

* A submission in the OIN Wizard with SAML or OIDC and Cross App Access (XAA) enabled, and your SSO and XAA properties already configured
* An Integrator Free Plan org with admin access
* An xaa.dev test account

Choose the walkthrough that matches your role and protocol:

* [Testing a SAML client app](#testing-a-saml-client-app)
* [Testing a SAML resource app](#testing-a-saml-resource-app)
* [Testing an OIDC resource app](#testing-an-oidc-resource-app)

#### Testing a SAML client app

**Prerequisite:** An SSO submission with SAML and Cross App Access, in draft or completed state, with **Client app** selected under Cross App Access roles. Testing this role requires a corresponding SAML resource app, which you create in Step 2.

##### Step 1: Configure the OIN Wizard submission

1. Open the OIN Wizard for your submission.
1. Select **SAML 2.0** from the **SSO (Single Sign-On)** section and select **Cross App Access (XAA)**.
1. Configure your standard SAML properties. See [SAML properties](#saml-properties).
1. Under **Cross App Access roles**, select **client app**.
1. Go to xaa.dev, and copy the value of the **Audience (AUD claim)** field. This is the URL of the xaa.dev's authorization server. For example: `https://auth.resource.xaa.dev`. This is the **Issuer URL** that you need to add as an XAA client app property.
1. Copy the **Client ID** from xaa.dev (for example: `byora_3dc15fcb7d3b...`). This is the client ID given in xaa.dev when registering the client app.
1. Enter these values in the **Resource client registrations** table under [XAA client app properties](#xaa-client-app-properties).
1. Click **View testing information**, and then close the wizard to open the testing page.

##### Step 2: Create a custom SAML Resource app

Create a counterpart resource app in Okta that points to xaa.dev, since xaa.dev acts as the resource app for this test.

1. From the OIN testing page, click **Generate instance** to create your client app instance.
1. In the Okta Admin Console, go to **Applications and Resources** > **Applications**.
1. Click **Create App Integration**, and select **SAML 2.0**.
1. Enter a name (for example, `SAML XAA Resource Testing App`), and configure the SAML properties as described in [SAML properties](#saml-properties).
1. Click **Save**.
1. Select the **Resource Server** tab.
1. Set **Cross App Access (XAA)** to **Enabled**.
1. Enter the same Issuer URL you copied from xaa.dev in Step 1, in the **Issuer URL** field.
1. Click **Save**.
1. Assign your test user to both the client app instance and the custom resource app.

> **Note:** Point the custom resource app at xaa.dev's authorization server, not a real third-party app, so xaa.dev can independently verify the token exchange.

##### Step 3: Set up the AI agent and resource connection

Create a connection between the client app and the resource app before you test on xaa.dev.

1. In the Okta Admin Console, go to **Directory** > **AI Agents**, and then click **Register AI agent**.
1. Enter a name and a description.
1. In the **User access and Authentication** section, select an existing app, and select your client app (the one you configured in Step 1) instance.
1. Click **Next**.
1. Under the **Owners** section, set your test user as the owner.
1. Click **Save**.
1. Under **Client Registration**, generate or register a public or private key pair to obtain the **Client ID**, **Key ID**, and private key.
1. Confirm that **User Access** links the client app to your assigned test user.
1. Under **Resource Connections**, click **+ Add resource connection**.
1. Under **Application**, select **Connect to**, and select the custom resource app (created in Step 2) from the **Application instance** dropdown list.
1. Enter the client app's **Client ID**. When testing with xaa.dev, enter the client ID from xaa.dev.
1. Allow the required scopes (for example, `todos.read`).
1. Go to **Actions**, and select **Activate**. Confirm that every checkmark on the agent configuration page is green.

##### Step 4: Configure the xaa.dev test environment

You need to perform the following steps in xaa.dev:

* Register your client app
* Run live verification
* Export conformance log

**Register your client app**

1. Enter your Okta org's base URL as the **Your IdP's issuer URL**.
1. Enter the email address of a user from your Okta org as the **Test user identifier**.
1. Enter the SAML issuer (`SUB_ID.ISSUER`). To find it: go to **Applications and Resources** > **Applications** > select your custom resource app > **Sign-On** > **Sign-on methods** > **SAML 2.0** > **More details** > **Issuer**.
1. Click **Save changes**.

**Run live verification**

1. Sign in to your client app instance. Open Chrome DevTools (Cmd+Option+I), go to the **Network** tab, and copy the encoded SAML Response.
1. Request a refresh token. Send a token exchange request with `subject_token` set to the SAML response, `subject_token_type=urn:ietf:params:oauth:token-type:saml2`, and `requested_token_type=urn:ietf:params:oauth:token-type:refresh_token`.

    > **Note:** Keep the refresh token for the session. Discard the SAML response immediately after this exchange; don't store or reuse it.

1. Request an ID-JAG token. Send a token exchange request with `subject_token_type=urn:ietf:params:oauth:token-type:refresh_token`, `requested_token_type=urn:ietf:params:oauth:token-type:id-jag`, and `audience` set to your resource app's authorization server URL.

    > **Note:** ID-JAG tokens are short-lived by design. If yours expires before you finish verification, request a new one with the same refresh token — no sign-in needed. If the refresh token itself has expired, the request fails with `invalid_grant`; sign in to the client app again to get a new one.

1. Redeem the ID-JAG for an access token. Send a JWT Bearer grant request to your resource app's authorization server, with `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer`, `assertion` set to the ID-JAG, and `scope` set to the required scope (for example, `todos.read`).
1. Call the API. Send the request to your resource app's endpoint with the access token in the `Authorization: Bearer` header.

See [Enable your SAML client app for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester) for full request and response examples.

Confirm that:

* The auth server accepted the ID-JAG as a JWT Bearer grant.
* Okta issued the access token with the `todos.read` scope.
* The resource server accepted the access token.
* The API call to `/api/todos` completed successfully.

**Export conformance log**

Download the conformance log from xaa.dev.

##### Step 5: Complete testing and submit

1. In the OIN Wizard, go to **Test integration** > **Application instances for testing**.
1. Select your client app instance, and click **Add to Tester**.
1. Sign in to the client app, and confirm that the SSO test completes successfully.
1. Go to **Cross App Access role** and delete the **Client ID** and **Issuer URL** of xaa.dev, and add the **Client ID** and **Issuer URL** specific to your client app.
1. Upload the conformance log to the SAML client row in **XAA integration testing**.

#### Testing a SAML resource app

**Prerequisite:** An SSO submission with SAML and Cross App Access, in draft or completed state, with **Resource app** selected under Cross App Access roles. Testing this role requires a corresponding SAML client app, which you create in Step 3.

##### Step 1: Configure the OIN Wizard submission

1. Open the OIN Wizard for your submission.
1. Select **SAML 2.0** from the **SSO (Single Sign-On)** section and select **Cross App Access (XAA)**.
1. Configure your standard SAML properties. See [SAML properties](#saml-properties). Get the values from your authorization server, for the **Default ACS URL** and **Entity ID / audience restriction** fields.
1. Under **Cross App Access roles**, select **Resource app**.
1. Enter your resource app's **Issuer URL** under [XAA resource app properties](#xaa-resource-app-properties).
1. Click **Save**, and then click **Get started with testing**.
1. Click **View testing information**, and then close the wizard to open the testing page.
1. From the testing page, click **Generate instance** to create your resource app instance.
1. Ensure that the **Single Sign-On URL** and **Entity ID** of your resource app is configured correctly on your authorization server.
1. On your resource app instance, open the **Resource Server** tab, and enter the **Issuer URL** of the authorization server.
1. Confirm that **Cross App Access (XAA)** is set to **Enabled**.
1. Assign your test user to the resource app instance.

##### Step 2: Create a custom SAML client app

Create a counterpart client app in Okta that redirects SAML sign-in responses to xaa.dev, since xaa.dev acts as the client app for this test.

1. From the OIN testing page, click **Generate instance** to create your client app instance.
1. In the Okta Admin Console, go to **Applications and Resources** > **Applications**.
1. Click **Create App Integration**, and select **SAML 2.0**.
1. Enter a name (for example, `SAML XAA Client Testing App`), and configure the SAML properties as described in [SAML properties](#saml-properties).
1. Go to xaa.dev's SAML test page, and copy the **Single Sign-On URL** and **Audience URI (SP Entity ID)**.
1. Enter these values as the custom client app's **Single Sign-On URL** and **Audience URI (SP Entity ID)**.
1. Set **Name ID format** to `EmailAddress`.
1. Set **Application username** to `Email`.
1. Click **Save**.

##### Step 3: Set up the AI agent and resource connection

Create a connection between the client app and the resource app before you test on xaa.dev.

1. In the Okta Admin Console, go to **Directory** > **AI Agents**, and then click **Register AI agent**.
1. Enter a name and a description.
1. In the **User access and Authentication** section, select an existing app, and select your custom client app instance.
1. Click **Next**.
1. In the **Owners** section, set your test user as the owner.
1. Click **Save**.
1. Under **Client Registration**, generate or register a public or private key pair to obtain the **Client ID**, **Key ID**, and private key.
1. Under **Resource Connections**, click **+ Add resource connection**.
1. Under **Application**, select **Connect to**, and select your resource app from the **Application instance** dropdown list.
1. Enter the client ID that the authorization server provides for the connection.
1. Allow the required scopes (for example, `todos.read`).
1. Click **Save**, and then click **Activate**.

> **Important:** The client app instance and the resource app only appear as connectable if you fully configured the XAA properties and the resource server settings, including a valid Issuer URL.

##### Step 4: Configure the xaa.dev test environment

You need to perform the following steps in xaa.dev:

* Register your client app
* Run live verification
* Export conformance log

**Register your client app**

1. Enter the SAML app metadata URL from your custom client app's **Sign On** tab. xaa.dev discovers the SSO and token endpoints from this URL.
1. Enter the AI agent's **Client ID** and **Key ID** that you obtained in **Client Registration**.
1. Enter the AI agent's private key.
1. Enter your resource app's issuer URL in the **Resource AS Issuer (ID-JAG Audience)** field.

    > **Warning:** This value becomes the `aud` claim in the ID-JAG. If you change it later, you must delete and recreate the connection.

1. Enter the required scope (for example, `todos.read`).
1. Click **Save**.

**Run live verification**

xaa.dev runs the exchange in stages. Confirm that each stage completes:

1. **Start SAML login at your IdP** - sign in to your custom client app.
1. **SAML assertion -> refresh token** - xaa.dev exchanges your SAML sign-in response for a refresh token.
1. **Refresh token -> ID-JAG** - xaa.dev exchanges the refresh token for an ID-JAG through your Okta org.
1.  **Redeem ID-JAG at your Resource AS** - xaa.dev redeems the ID-JAG for an access token at your resource app's authorization server. While testing this, provide the following:
    * Enter the authorization server token URL in the **Resource AS token endpoint** field.
    * Enter the authorization server client ID in the **Client ID (at your resource AS)** field.
    * Enter the authorization server client secret in the **Client secret (at your resource AS)** field.
1. **Call your API with the access token** - xaa.dev calls your resource app's API with the access token.
1. Confirm that a green **Conformance passed** panel appears.

**Export conformance log**

Click **Export conformance log (JSON)** to download the log.

See [Enable your SAML resource app for Cross App Access](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml) for full request and response examples.

##### Step 5: Complete testing and submit

1. In the OIN Wizard, go to **Test integration** > **Application instances for testing**.
1. Select your client app instance, and click **Add to Tester**.
1. Sign in to the client app, and confirm that the SSO test completes successfully.
1. Upload the conformance log to the SAML Resource row in the **XAA integration testing**.

#### Testing an OIDC resource app

**Prerequisite:** An SSO submission with OIDC and Cross App Access, in draft or completed state, with **Resource app** selected under Cross App Access roles. Testing this role requires a corresponding OIDC client app, which you create in Step 3.

##### Step 1: Configure the OIN Wizard submission

1. Open the OIN Wizard for your submission.
1. Select **OpenID Connect (OIDC)** from the **SSO (Single Sign-On)** section and select **Cross App Access (XAA)**.
1. Configure your standard OIDC properties. See [OIDC properties](#oidc-properties). Enter the redirect URIs corresponding to your actual app. Also enter the URI of the XAA authorization server.
1. Under **Cross App Access roles**, select **Resource app**.
1. Enter your resource app's **Issuer URL** under [XAA resource app properties](#xaa-resource-app-properties).
1. Click **Save**, and then click **Get started with testing**. You can do the normal OIDC testing.
1. Click **View testing information**, and then close the wizard to open the testing page.
1. From the testing page, click **Generate instance** to create your resource app instance.
1. On your resource app instance, open the **Resource Server** tab, and enter the **Issuer URL** of the authorization server.
1. Confirm that **Cross App Access (XAA)** is set to **Enabled**.
1. Assign your test user to the resource app instance.

##### Step 2: Create a custom OIDC client app

Create a counterpart client app in Okta that redirects OIDC sign-in responses to xaa.dev, since xaa.dev acts as the client app for this test.

1. From the OIN testing page, click **Generate instance** to create your client app instance.
1. In the Okta Admin Console, go to **Applications and Resources** > **Applications**.
1. Click **Create App Integration**, and select **OpenID Connect (OIDC)**.
1. Enter a name (for example, `OIDC XAA Client Testing App`), and configure the OIDC properties as described in [OIDC properties](#oidc-properties).
1. Go to xaa.dev's OIDC test page, and copy the **Sign-in redirect URIs**.
1. Enter these values as the custom client app's **Sign-in redirect URIs**.
1. Click **Save**.
1. Assign your test user to the client app instance.

##### Step 3: Set up the AI agent and resource connection

Same as [Step 3](#step-3-set-up-the-ai-agent-and-resource-connection-1) in Testing a SAML resource app — none of those steps are SAML-specific. Follow that procedure, including the note about when the client app and resource app appear as connectable.

##### Step 4: Configure the xaa.dev test environment

You need to perform the following steps in xaa.dev:

* Register your client app
* Run live verification
* Export conformance log

**Register your client app**

1. Enter your Okta org's base URL as the **Your IdP's issuer URL**.
1. Go to the client app's **General** tab and copy the value from **Client ID**, and enter it in the **Client ID** field.
1. Go to the client app's **General** tab and copy the value from **Client secret**, and enter it in the **Client secret** field.
1. Enter your resource app's issuer URL in the **Resource AS Issuer (ID-JAG Audience)** field.

    > **Warning:** This value becomes the `aud` claim in the ID-JAG. If you change it later, you must delete and recreate the connection. This value must exactly match the Issuer URL you set on the resource app's **Resource Server** tab. A mismatch here still produces a correctly signed ID-JAG, but redemption fails the `aud` check.

1. Enter the required scope (for example, `todos.read`).
1. Click **Save**. Confirm that a green **Auto-discovered SSO** checkmark appears.

**Run live verification**

xaa.dev runs the exchange in stages. Confirm that each stage completes:

1. **Start OIDC login at your IdP** - sign in to your OIDC custom client app.
1. **Refresh token -> ID-JAG** - xaa.dev exchanges the refresh token from sign-in for an ID-JAG through your Okta org.
1. **Redeem ID-JAG at your Resource AS** - xaa.dev redeems the ID-JAG for an access token at your resource app's authorization server. While testing this, provide the following:
    * Enter the authorization server token URL in the **Resource AS token endpoint** field.
    * Enter the authorization server client ID in the **Client ID (at your resource AS)** field.
    * Enter the authorization server client secret in the **Client secret (at your resource AS)** field.
1. **Call your API with the access token** - xaa.dev calls your resource app's API with the access token.
1. Confirm that a green **Conformance passed** panel appears.

**Export conformance log**

Click **Export conformance log (JSON)** to download the log.

See [Enable your OIDC resource app for Cross App Access](https://developer.okta.com/blog/2026/08/24/xaa-oidc-resource) for full request and response examples.

##### Step 5: Complete testing and submit

1. In the OIN Wizard, go to **Test integration** > **Application instances for testing**.
1. Select your client app instance, and click **Add to Tester**.
1. Sign in to the client app, and confirm that the SSO test completes successfully.
1. Upload the conformance log to the OIDC Resource row in **XAA integration testing**.

#### XAA testing requirements

* All required test logs have been uploaded and passed.
