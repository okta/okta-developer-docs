---
title: Submit a Cross App Access integration with the OIN Wizard
meta:
  - name: description
    content: Learn how to submit a Cross App Access (XAA) integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---
Learn how to submit a Cross App Access (XAA) integration to the Okta Integration Network (OIN) using the OIN Wizard.

> **Note:** Cross App Access (XAA) requires and works alongside SSO. If you have an existing SSO integration, you don't need to create a new submission. Go to **Applications and Resources** > **Your OIN Integrations**, then click **Add more integrations** on your existing app. In **SSO (Single Sign-On)**, select **SAML 2.0** or **OpenID Connect** as your protocol. Select **Cross App Access** from the **Add integration capabilities** section, and reuse your existing SSO instance for testing.

---

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup/). The OIN Wizard is only available in Integrator Free Plan orgs.

* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

* A functional integration that's based on the [Sign users in overview](/docs/guides/sign-in-overview/main/)

* Google Chrome browser with the Okta Browser Plugin installed (see [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements))

* An xaa.dev test account

---

## Overview

Okta provides you with a seamless experience to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Integrator Free Plan org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta and explore more Okta features. When you decide to publish your integration to the OIN, you can use the same Integrator Free Plan org to submit your integration using the OIN Wizard.

The OIN Wizard is a full-service tool in the Admin Console for you to do the following:

* Provide all your integration submission details.
* Generate an app instance in your org for testing:
  * Test your SSO integration with the OIN Submission Tester.
  * Test your Cross App Access (XAA) integration with xaa.dev.
* Submit your integration directly to the OIN team when you're satisfied with your test results.
* Monitor the status of your submissions through the **Your OIN Integrations** dashboard.
* Edit published integrations and resubmit them to the OIN.

The OIN team verifies your submitted integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

## Start a submission

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. You need to provide artifacts and technical details during the submission process.

> **Note:** As a best practice, add two or three extra admin users in your Okta org to manage the integration. This ensures that your team can access the integration for future updates. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and ensure that the app and org admin roles are assigned to your admin users. The super admin role also provides the same access, but Okta recommends limiting assignments to this role.

Cross App Access (XAA) requires an SSO integration. Start your submission by following the **Start a submission** steps for your protocol, and select **Cross App Access** from the **Add integration capabilities** section:

* SAML 2.0: See [Start a submission](/docs/guides/submit-oin-app/saml2/main/#start-a-submission).
* OpenID Connect: See [Start a submission](/docs/guides/submit-oin-app/openidconnect/main/#start-a-submission).

If you only want to test an existing submission, see [Navigate directly to test your integration](#navigate-directly-to-test-your-integration).

### Integration details

* Configure your OIN catalog properties as described in the [OIN catalog properties](/docs/guides/submit-oin-app/openidconnect/main/#oin-catalog-properties) section.

* Configure your tenant settings as described in the [tenant settings](/docs/guides/submit-oin-app/openidconnect/main/#tenant-settings) section.

* Specify a support contact from your org as described in the [Support contact](/docs/guides/submit-oin-app/openidconnect/main/#support-contact) section.

> **Note:** These properties are the same for SAML and OIDC integrations, and Cross App Access doesn't add any new fields.

### Configure your integration

Configure your integration settings. Settings appear based on your capability selection.

Configure your SSO properties for the protocol that you selected:

* SAML 2.0: See [SAML properties](/docs/guides/submit-oin-app/saml2/main/#saml-properties).
* OpenID Connect: See [OIDC properties](/docs/guides/submit-oin-app/openidconnect/main/#oidc-properties).

#### Cross App Access (XAA) roles

Under **Cross App Access (XAA) roles**, select the role that your app plays in the token exchange:

| Role | Description |
| ----- | ----------- |
| **Client app** | App that exchanges its Okta token for an Identity Assertion JWT Authorization Grant (ID-JAG) token, then exchanges the ID-JAG token at the resource app's authorization server for an access token. The client app uses this access token to access the resource app's data and APIs.It registers as a client at that authorization server and shares the issuer and client ID with Okta to enable the exchange. |
| **Resource app** | App that uses its auth server to validate the ID-JAG token and return an access token, which the client app can then use to access its data and APIs. |

#### XAA client app properties

> **Note:** This section appears if you select the client app under the Cross App Access (XAA) roles.

In the **Resource client registrations** section, specify the issuer URL and client ID for each resource app that this client app connects to. You can add up to 100 registrations.

| Property | Description |
| ----- | ----------- |
| **Issuer URL** | URL of the resource app's authorization server. |
| **Client ID** | The unique identifier assigned to the client app when it's registered on the resource app's authorization server. |

1. Click **Add resource client registrations** to add a row.
1. Click **Add**.

#### XAA resource app properties

> **Note:** This section appears if you select the Resource app under Cross App Access (XAA) roles.

Specify the following properties for your resource app:

| Property | Description |
| ----- | ----------- |
| **Issuer URL** `*` | URL of the resource app's authorization server. The issuer URL must support the HTTPS protocol. If you're using a per tenant design, include the variable names that you created in your URL. For example:` 'https://' + app.subdomain + '.example.com/' `. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).  |
| **Audience tenant ID** | Enable this checkbox to require the Okta IDP to send an audience tenant claim (`aud_tenant`) in the ID-JAG token. This scopes token issuance to a specific organization, workspace, or tenant in the Resource Authorization Server when XAA is enabled. |
| **Resource identifier** | API resource URLs available in your resource app. You can add up to 20 resource identifiers. Click **Add resource identifiers** to add another row. |
| **Scopes** | Resource scopes that your resource app's authorization server accepts, such as read or write. You can add up to 100 scopes. Click **Add scopes** to add another row. |

`*` Required properties

2. Click **Get started with testing** to save your edits and move to the **Test your integration** section, where you need to [enter test information](#enter-test-information) for your integration.

#### Dynamic properties with Okta Expression Language

The OIN Wizard supports [Okta Expression Language](/docs/reference/okta-expression-language/#reference-user-attributes) to generate dynamic properties, such as URLs or URIs, based on your customer tenant. You can specify dynamic strings for your Cross App Access (XAA) properties in the OIN Wizard:

1. Add your [tenant settings](/docs/guides/submit-oin-app/openidconnect/main/#tenant-settings) in the OIN Wizard. These settings become fields for customer admins to enter during your OIN integration installation to identify their tenant.

2.  Language format in your integration properties for dynamic values based on customer information.

For example, if you have a XAA configuration variable called subdomain, then you can set your Issuer URL string for your Resource App to `'https://' + app.subdomain + '.example.org/strawberry/'`. When your customer sets their subdomain variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/` is their issuer URL.

>**Note:** A variable can include a complete URL (for example, `https://example.com/`). This enables you to use global variables, such as `app.issuerURL`.

The following are Expression Language specifics for XAA properties:

* Any XAA tenant settings that you define in the OIN Wizard are considered app properties. They have an `app. prefix` when you reference them in Expression Language. For example, if your tenant variable name is `subdomain`, then you can reference that variable using `app.subdomain`.

* XAA properties support Expression Language conditional expressions. For example:

````
'https://' + app.subdomain + '.example.org/strawberry/'`
'https://' + (app.region == 'us' ? 'myfruit' : 'myveggie') + '.example.com/strawberry/'
````

XAA properties support Expression Language String functions. For example:

```
(String.len(app.baseUrl) == 0 ? 'https://fruit.example.com/' : app.baseUrl) + '/strawberry'
(String.stringContains(app.environment,"PROD") ? 'https://fruit.example.com' : 'https://fruit-sandbox.example.com') + '/strawberry/'
```

### Enter test information

From the OIN Wizard **Test your integration** page, specify the information that's required for testing your integration. The OIN team uses this information to verify your integration after submission.

#### Test information for Okta review

A dedicated test admin account in your app is required for Okta integration testing. This test account needs to be active during the submission review period for Okta to test and troubleshoot your integration. Ensure that the test admin account has:

* Privileges to configure admin settings in your test app
* Privileges to administer test users in your test app

After your integration is verified, Okta automatically deletes test account credentials 30 days after your app is published in the OIN Wizard. To resubmit your app after this period, create a test account and provide the required information.

See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

In the **Testing information for Okta review** section, specify the following **Test account** details:

| <div style="width:100px">Property</div> | Description  |
| --------------- | ------------ |
| **Account URL** `*`  | A static URL to sign in to your app. An OIN analyst goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your app. |
| **Username** `*`  | The username for your test admin account. The OIN analyst signs in with this username to execute test cases. The preferred account username is `isvtest@okta.com`. |
| **Password** `*`  | The password for your test admin account |
| **Testing instructions** | Include information that the OIN team needs to know about your integration for testing (such as the admin account or the testing configuration). You can also provide instructions on how to add test user accounts. |

`*` Required properties

Enter your sign-in flow details for the protocol you selected:

* SAML 2.0: See [SAML tests](/docs/guides/submit-oin-app/saml2/main/#saml-tests) in the SAML 2.0 guide.
* OpenID Connect: See [OIDC tests](/docs/guides/submit-oin-app/openidconnect/main/#oidc-tests) in the OIDC guide.

## Test your integration

The OIN Wizard journey includes the **Test integration** experience page to help you configure and test your integration within the same org before submission. These are the tasks that you need to complete:

1. [Generate instances for testing](#generate-instances-for-testing). You need to create an app integration instance to test each protocol that your integration supports.

2. Test your integration.

3. [Submit your integration](#submit-your-integration) after all required tests are successful.

> **Note:** For Cross App Access integration testing, you need to test your integration on xaa.dev. If you're submitting the OIDC client app role, you can submit your integration directly, without testing.

#### Navigate directly to test your integration

You can navigate directly to the OIN Wizard **Test integration** page if you have an existing submission in the **Your OIN Integrations** dashboard. You can bypass the **[Select protocol](#start-a-submission)**, **[Configure your integration](#configure-your-integration)**, and **[Test your integration](#enter-test-information)** pages in the OIN Wizard, and start generating instances for testing. This saves you time and avoids unnecessary updates to an existing integration submission.

Follow these steps to bypass the configuration pages in the OIN Wizard:

1. Select **Applications and Resources** > **Your OIN Integrations**. Then select the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to the integration submission that you want to test.
1. Select **Test your integration**.

   * The OIN Wizard **Test integration** page appears for you to generate an instance and test your integration.

   * If you haven't specified test information in the **[Test your integration](#enter-test-information)** page, then you're directed to this page to enter testing details. You can go to the **Test integration** page only if the protocols, configuration, and test details are provided in your submission.

   * If your integration is in read-only mode, click **Edit integration** to enter test details before testing.

### Generate instances for testing

Generating and testing the SSO instance doesn't change for Cross App Access. You can use your existing SSO instance for Cross App Access submission. Follow the guide for your protocol:

* [Generate an instance for SAML](/docs/guides/submit-oin-app/saml2/main/#generate-instances-for-testing)
* [Generate an instance for OIDC](/docs/guides/submit-oin-app/openidconnect/main/#generate-instances-for-testing)

After you finish, click **View testing information**.

### Application instances for testing

The **Application instances for testing** section displays, by default, the instances available in your org that are eligible for submission testing.

> **Note:** The filter (![filter icon](/img/icons/odyssey/filter.svg)) is automatically set to only show eligible instances.

An instance is eligible if it was generated from the latest version of the integration submission in the OIN Wizard. An instance is ineligible if it was generated from a previous version of the integration submission and you later made edits to the submission. This is to ensure that you test your integration based on the latest submission details.

If you modify a published OIN integration, you must generate an instance that's based on the currently published integration for backwards compatibility testing. A backward-compatible instance is eligible if it was generated from the published version of the integration before any edits are made in the current submission. The OIN Wizard detects if you're modifying a published OIN integration and asks you to generate a backward-compatible instance before you make any edits.

> **Note:** The Integrator Free Plan org has no limit on active instances. You can create as many test instances as needed for your integration. To deactivate any instances you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

#### Deactivate an app instance in your org

To deactivate an instance from the OIN Wizard:

1. Go to **Test integration** > **Application instances for testing**.
1. Click **Clear filters** to see all instances in your org.
1. Disable the **ACTIVE** toggle next to the app instance you want to deactivate.

Alternatively, to deactivate an app instance without the OIN Wizard, see [Deactivate app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-deactivate).

## Test your Cross App Access (XAA) integration with xaa.dev

Test the ID-JAG token exchange with [xaa.dev](https://xaa.dev/) before you upload your conformance log.

**What you need:**

* A submission in the OIN Wizard with SAML or OIDC and Cross App Access (XAA) enabled, and your SSO and XAA properties already configured
* An Integrator Free Plan org with admin access
* An [xaa.dev](https://xaa.dev/) test account

Choose the walkthrough that matches your role and protocol:

* [Testing a SAML client app](#testing-a-saml-client-app)
* [Testing a SAML resource app](#testing-a-saml-resource-app)
* [Testing an OIDC resource app](#testing-an-oidc-resource-app)

> **Note:** If you're submitting the OIDC client app role, you can submit your integration directly, without testing.

### Testing a SAML client app

**Prerequisite:** An SSO submission with SAML and Cross App Access, in draft or completed state, with **Client app** selected under Cross App Access roles. Testing this role requires a corresponding SAML resource app, which you create in Step 2.

#### Step 1: Update the SAML client app submission in OIN Wizard

1. Go to [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml), and copy the value of the **Audience (AUD claim)** field. This value is the URL of xaa.dev's authorization server (for example, `https://auth.resource.xaa.dev`), and it's the **Issuer URL** you add as an XAA client app property.
1. Copy the **Client ID** from [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml). xaa.dev assigns this ID when you register the client app.
1. Enter these values in the **Resource client registrations** table under [XAA client app properties](#xaa-client-app-properties).
1. Click **View testing information**, and then close the wizard to open the testing page.
1. In the Okta Admin Console, go to **Applications and Resources** > **Your OIN Integrations**, and go directly to the **Test integration** page for your submission.
1. Click **Generate instance** to create your SAML SSO test instance, and complete the standard SAML SSO testing.
1. Assign your test user to the client app instance.

#### Step 2: Create a custom SAML resource app

Create a counterpart resource app in Okta that points to [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml), since [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml) acts as the resource app for this test.

1. In the Okta Admin Console, go to **Applications and Resources** > **Applications**.
1. Click **Create App Integration**, and select **SAML 2.0**.
1. Enter a name (for example, `SAML XAA Resource Testing App`), and configure the SAML properties as described in [SAML properties](/docs/guides/submit-oin-app/saml2/main/#saml-properties).
1. Click **Save**.
1. Select the **Resource Server** tab.
1. Set **Cross App Access (XAA)** to **Enabled**.
1. In the **Issuer URL** field, enter the same value you copied from [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml) in Step 1.
1. Click **Save**.
1. Assign your test user to the custom resource app.

> **Note:** Point the custom resource app at [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml)'s authorization server, not a real third-party app, so [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml) can independently verify the token exchange.

#### Step 3: Set up the AI agent and resource connection

Create a connection between the client app and the resource app before you test on [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml).

1. In the Okta Admin Console, go to **Directory** > **AI Agents**, and then click **Register AI agent**.
1. Enter a name and a description.
1. In the **User access and Authentication** section, select an existing app, and select your client app instance (the one you configured in Step 1).
1. Click **Next**.
1. Under the **Owners** section, set your test user as the owner.
1. Click **Save**.
1. Under **Resource Connections**, click **+ Add resource connection**.
1. Under **Application**, select **Connect to**, and select the custom resource app (created in Step 2) from the **Application instance** dropdown list.
1. Enter the client app's **Client ID** from [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml.
1. Allow the required scopes (for example, `todos.read`).
1. Go to **Actions**, and select **Activate**. Confirm that every checkmark on the agent configuration page is green.

#### Step 4: Configure the xaa.dev test environment

You need to perform the following steps in [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml):

* Register your client app
* Run live verification
* Export conformance log

**Register your client app**

1. Enter your Okta org's base URL as the **Your IdP's issuer URL**.
1. Enter the email address of a user from your Okta org as the **Test user identifier**.
1. Enter the SAML issuer (`SUB_ID.ISSUER`). To find it, go to **Applications and Resources** > **Applications** > select your custom resource app > **Sign On** > **Sign-on methods** > **SAML 2.0** > **More details** > **Issuer**.
1. Click **Save changes**.

**Run live verification**

1. Sign in to your client app instance. Open Chrome DevTools (Cmd+Option+I), go to the **Network** tab, and copy the encoded SAML Response.
1. Request a refresh token. Send a token exchange request with `subject_token` set to the SAML response, `subject_token_type=urn:ietf:params:oauth:token-type:saml2`, and `requested_token_type=urn:ietf:params:oauth:token-type:refresh_token`.

    > **Note:** Keep the refresh token for the session. Discard the SAML response immediately after this exchange; don't store or reuse it.

1. Request an ID-JAG token. Send a token exchange request with `subject_token_type=urn:ietf:params:oauth:token-type:refresh_token`, `requested_token_type=urn:ietf:params:oauth:token-type:id-jag`, and `audience` set to your resource app's authorization server URL.

    > **Note:** ID-JAG tokens are short-lived by design. If your token expires before you finish verification, request a new one with the same refresh token. You don't need to sign in again. If the refresh token itself has expired, the request fails with `invalid_grant`; sign in to the client app again to get a new one.

1. Redeem the ID-JAG for an access token. Send a JWT Bearer grant request to your resource app's authorization server, with `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer`, `assertion` set to the ID-JAG, and `scope` set to the required scope (for example, `todos.read`).
1. Call the API. Send the request to your resource app's endpoint with the access token in the `Authorization: Bearer` header.

See [Enable your SAML client app for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester) for full request and response examples.

Confirm the following:

* The authorization server accepted the ID-JAG as a JWT Bearer grant.
* The authorization server issued the access token with the `todos.read` scope.
* The resource server accepted the access token.
* The API call to `/api/todos` completed successfully.

**Export conformance log**

Download the conformance log from [xaa.dev](https://xaa.dev/developer/test-requesting-app/?tab=saml).

#### Step 5: Complete testing and submit

1. In the OIN Wizard, go to **Test integration** > **Application instances for testing**.
1. Select your client app instance, and click **Add to Tester**.
1. Sign in to the client app, and confirm that the SSO test completes successfully.
1. Upload the conformance log to the SAML client row in **XAA integration testing**.

### Testing a SAML resource app

**Prerequisite:** An SSO submission with SAML and Cross App Access, in draft or completed state, with **Resource app** selected under Cross App Access roles. Testing this role requires a corresponding SAML client app, which you create in Step 3.

#### Step 1: Update the SAML resource app submission in OIN Wizard

1. Ensure that you have used the values from your authorization server in the **Default ACS URL** and **Entity ID / audience restriction** fields.
1. Enter your resource app's **Issuer URL** under [XAA resource app properties](#xaa-resource-app-properties).
1. Confirm that the **Single Sign-On URL** and **Entity ID** of your resource app are configured correctly on your authorization server.
1. Click **Get started with testing**, and then go to the **Test integration** page.
1. Click **Generate instance** to create your resource app instance, and complete the standard SAML SSO testing.
1. On your resource app instance, open the **Resource Server** tab, and enter the **Issuer URL** of the authorization server.
1. Confirm that **Cross App Access (XAA)** is set to **Enabled**.
1. Assign your test user to the resource app instance.

#### Step 2: Create a custom SAML client app

Create a counterpart client app in Okta that redirects SAML sign-in responses to [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml), since [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) acts as the client app for this test.

1. In the Okta Admin Console, go to **Applications and Resources** > **Applications**.
1. Click **Create App Integration**, and select **SAML 2.0**.
1. Enter a name (for example, `SAML XAA Client Testing App`), and configure the SAML properties as described in [SAML properties](/docs/guides/submit-oin-app/saml2/main/#saml-properties).
1. Go to [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml)'s SAML test page, and copy the **Single Sign-On URL** and **Audience URI (SP Entity ID)**.
1. Enter these values as the custom client app's **Single Sign-On URL** and **Audience URI (SP Entity ID)**.
1. Set **Name ID format** to `EmailAddress`.
1. Set **Application username** to `Email`.
1. Click **Save**.
1. Assign your test user to the client app instance.

#### Step 3: Set up the AI agent and resource connection

1. In the Okta Admin Console, go to **Directory** > **AI Agents**, and then click **Register AI agent**.
1. Enter a name and a description.
1. In the **User access and Authentication** section, select the custom client app instance that you created in Step 2.
1. Click **Next**.
1. Under the **Owners** section, set your test user as the owner.
1. Click **Save**.
1. Under **Client Registration**, generate or register a public or private key pair to obtain the **Client ID**, **Key ID**, and private key. These values are needed to copy to [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) later.
1. Under **Resource Connections**, click **+ Add resource connection**.
1. Under **Application**, select **Connect to**, and select your resource app from the **Application instance** dropdown list.
1. Enter the client ID that the authorization server provides for the connections in the **Client ID** field.
1. Allow the required scopes (for example, `todos.read`).
1. Go to **Actions**, and select **Activate**. Confirm that every checkmark on the agent configuration page is green.

> **Important:** The client app instance and the resource app only appear as connectable if you fully configured the XAA properties and the resource server settings, including a valid Issuer URL.

#### Step 4: Configure the xaa.dev test environment

You need to perform the following steps in [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml):

* Register your client app
* Run tests
* Export conformance log

**Register your client app**

1. Enter the SAML app metadata URL from your custom client app's **Sign On** tab. [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) discovers the SSO and token endpoints from this URL.
1. Enter the AI agent's **Client ID** and **Key ID** that you obtained in **Client Registration**.
1. Enter the AI agent's private key.
1. Enter your resource app's issuer URL in the **Resource AS Issuer (ID-JAG Audience)** field.

    > **Warning:** This value becomes the `aud` claim in the ID-JAG. If you change it later, you must delete and recreate the connection.

1. Enter the required scope (for example, `todos.read`).
1. Click **Save**.

**Run tests**

[xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) runs the exchange in stages. Confirm that each stage completes:

1. **Start SAML login at your IdP** - sign in to your custom client app.
1. **SAML assertion -> refresh token** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) exchanges your SAML sign-in response for a refresh token.
1. **Refresh token -> ID-JAG** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) exchanges the refresh token for an ID-JAG through your Okta org.
1. **Redeem ID-JAG at your Resource AS** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) redeems the ID-JAG for an access token at your resource app's authorization server. While testing this, provide the following:
    * Enter the authorization server token URL in the **Resource AS token endpoint** field.
    * Enter the authorization server client ID in the **Client ID (at your resource AS)** field.
    * Enter the authorization server client secret in the **Client secret (at your resource AS)** field.
1. **Call your API with the access token** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=saml) calls your resource app's API with the access token.
1. Confirm that a green **Conformance passed** panel appears.

**Export conformance log**

Click **Export conformance log (JSON)** to download the log.

See [Enable your SAML resource app for Cross App Access](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml) for full request and response examples.

#### Step 5: Complete testing and submit

Follow [Step 5](#step-5-complete-testing-and-submit) in Testing a SAML client app. Upload the conformance log to the **SAML Resource** row instead of the **SAML client** row.

### Testing an OIDC resource app

**Prerequisite:** An SSO submission with OIDC and Cross App Access, in draft or completed state, with **Resource app** selected under Cross App Access roles. Testing this role requires a corresponding OIDC client app, which you create in Step 3.

#### Step 1: Update the OIDC resource app submission in OIN Wizard

1. Confirm that you've entered the redirect URIs for your app in [OIDC properties](/docs/guides/submit-oin-app/openidconnect/main/#oidc-properties), and also enter the URI of the XAA authorization server.
1. Enter your resource app's **Issuer URL** under [XAA resource app properties](#xaa-resource-app-properties).
1. Click **View testing information**, and then click **Close wizard** on the **Test your integration** page.
1. In the Okta Admin Console, go to **Applications and Resources** > **Your OIN Integrations**, select your OIDC resource app, and go directly to the **Test integration** page.
1. Click **Generate instance** to create your OIDC SSO test instance, and complete the standard OIDC SSO testing.
1. On your resource app instance, open the **Resource Server** tab, and enter the **Issuer URL** of the authorization server.
1. Confirm that **Cross App Access (XAA)** is set to **Enabled**.
1. Assign your test user to the resource app instance.

#### Step 2: Create a custom OIDC client app

Create a counterpart client app in Okta that redirects OIDC sign-in responses to [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc), since [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc) acts as the client app for this test.

1. In the Okta Admin Console, go to **Applications and Resources** > **Applications**.
1. Click **Create App Integration**, and select **OpenID Connect (OIDC)**.
1. Enter a name (for example, `OIDC XAA Client Testing App`), and configure the OIDC properties as described in [OIDC properties](/docs/guides/submit-oin-app/openidconnect/main/#oidc-properties).
1. Go to [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc)'s OIDC test page, and copy the **Sign-in redirect URIs**.
1. Enter this value as the custom client app's **Sign-in redirect URIs**.
1. Click **Save**.
1. Assign your test user to the client app instance.

#### Step 3: Set up the AI agent and resource connection

1. In the Okta Admin Console, go to **Directory** > **AI Agents**, and then click **Register AI agent**.
1. Enter a name and a description.
1. In the **User access and Authentication** section, select the custom client app instance that you created in Step 2.
1. Click **Next**.
1. Under the **Owners** section, set your test user as the owner.
1. Click **Save**.
1. Under **Resource Connections**, click **+ Add resource connection**.
1. Under **Application**, select **Connect to**, and select your resource app from the **Application instance** dropdown list.
1. Enter the client ID that the authorization server provides for the connection in the **Client ID** field.
1. Allow the required scopes (for example, `todos.read`).
1. Go to **Actions**, and select **Activate**. Confirm that every checkmark on the agent configuration page is green.

> **Important:** The client app instance and the resource app only appear as connectable if you fully configured the XAA properties and the resource server settings, including a valid Issuer URL.

#### Step 4: Configure the xaa.dev test environment

You need to perform the following steps in [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc):

* Register your client app
* Run tests
* Export conformance log

**Register your client app**

1. Enter your Okta org's base URL as the **Your IdP's issuer URL**.
1. Go to the client app's **General** tab and copy the value from **Client ID**, and enter it in the **Client ID** field.
1. Go to the client app's **General** tab and copy the value from **Client secret**, and enter it in the **Client secret** field.
1. Enter your resource app's issuer URL in the **Resource AS Issuer (ID-JAG Audience)** field.

    > **Warning:** This value becomes the `aud` claim in the ID-JAG. If you change it later, you must delete and recreate the connection. This value must exactly match the **Issuer URL** you set on the resource app's **Resource Server** tab. A mismatch here still produces a correctly signed ID-JAG, but redemption fails the `aud` check.

1. Enter the required scope (for example, `todos.read`).
1. Click **Save**. Confirm that a green **Auto-discovered SSO** checkmark appears.

**Run tests**

[xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc) runs the exchange in stages. Confirm that each stage completes:

1. **Start OIDC login at your IdP** - sign in to your OIDC custom client app.
1. **ID token -> ID-JAG** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc) exchanges the ID token from sign-in for an ID-JAG through your Okta org.
1. **Redeem ID-JAG at your Resource AS** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc) redeems the ID-JAG for an access token at your resource app's authorization server. While testing this, provide the following:
    * Enter the authorization server token URL in the **Resource AS token endpoint** field.
    * Enter the authorization server client ID in the **Client ID (at your resource AS)** field.
    * Enter the authorization server client secret in the **Client secret (at your resource AS)** field.
1. **Call your API with the access token** - [xaa.dev](https://xaa.dev/developer/test-resource-app?tab=oidc) calls your resource app's API with the access token.
1. Confirm that a green **Conformance passed** panel appears.

**Export conformance log**

Click **Export conformance log (JSON)** to download the log.

See [Enable your OIDC resource app for Cross App Access](https://developer.okta.com/blog/2026/08/24/xaa-oidc-resource) for full request and response examples.

#### Step 5: Complete testing and submit

Follow [Step 5](#step-5-complete-testing-and-submit) in Testing a SAML client app. Upload the conformance log to the **OIDC Resource** row instead of the **SAML client** row.

### XAA testing requirements

* All required test logs have been uploaded and passed.

## Submit your integration

After you successfully test your integration, you're ready to submit.

The OIN Wizard checks the following for Cross App Access (XAA) submissions:

* All required test logs, matching your selected roles and protocols, are uploaded and passed within the past 48 hours.

**Submit integration** is enabled after all these requirements are met.

1. Select **I certify that I have successfully completed required tests**.
1. Click **Submit integration** to submit your integration.
1. Click **Close wizard**.
    The **Your OIN Integration** dashboard appears.

After you submit your integration, your integration is queued for OIN initial review. Okta sends you an email with the expected initial review completion date.

The OIN review process consists of two phases:

1. The initial review phase
1. The QA testing phase

Okta sends you an email at each phase of the process to inform you of the status, the expected phase completion date, and any issues for you to fix. If there are issues with your integration, make the necessary corrections and resubmit in the OIN Wizard.

> **Note:** Sometimes, your fix doesn't include OIN Wizard edits to your integration submission. In this case, inform the OIN team of your fix so that they can continue QA testing.

Check the status of your submission on the **Your OIN Integrations** dashboard.

See [Understand the submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process).

## Submission support

If you need help during your submission, Okta provides the following support stream for the various phases of your OIN submission:

1. Building an integration phase

    * When you're constructing your app integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

1. Using the OIN Wizard to submit an integration phase

    * If you need help with the OIN Wizard, review this document or see [Publish an OIN integration](/docs/guides/submit-app-overview/).
    * Submit your OIN Wizard question to <developers@okta.com> if you can't find an answer in the documentation.
    * If you have an integration status issue, contact <oin@okta.com>.

1. Testing an integration phase

    * If you have issues during your integration testing phase, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

## See also

* [Cross App Access (XAA)](/docs/concepts/xaa/)
* [Enable your SAML client app for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester)
* [Enabling Cross App Access for SAML-based resource apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml)
* [Enable your OIDC resource app for Cross App Access](https://developer.okta.com/blog/2026/08/24/xaa-oidc-resource)
* [Submit an integration with the OIN Wizard: SAML 2.0](/docs/guides/submit-oin-app/saml2/main/)
