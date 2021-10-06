---
title: Add an external Identity Provider
meta:
  - name: description
    content: Okta supports authentication with external OpenID Connect Identity Providers as well as SAML (also called Inbound Federation). Get an overview of the process and prerequisites, as well as the instructions required to set one up.
---

## Before you begin

You want to give your users the freedom to choose which Identity Provider that they can use to sign in to your application. Okta manages connections to Identity Providers for your application, sitting between your application and the Identity Provider that authenticates your users. The industry-standard term for this is Inbound Federation.

We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Have an application that you want to add authentication to.

> **Note:** This guide doesn't explain the differences between SAML and OpenID Connect and doesn't help you choose between them. See [External Identity Providers](/docs/concepts/identity-providers/#the-big-picture) for more information.

### Supported Identity Providers

We support a lot of Identity Providers. This guide provides instructions for the following Identity Providers. If the provider that you need isn't listed, we may still support it through generic OpenID Connect or SAML. The Identity Provider's documentation should say which protocol you need to use.

* [Apple](/docs/guides/add-an-external-idp/apple/main)
* [Azure AD](/docs/guides/add-an-external-idp/azure/main)
* [Facebook](/docs/guides/add-an-external-idp/facebook/main)
* [Google](/docs/guides/add-an-external-idp/google/main)
* [LinkedIn](/docs/guides/add-an-external-idp/linkedin/main)
* [Microsoft](/docs/guides/add-an-external-idp/microsoft/main)
* [Okta to Okta](/docs/guides/add-an-external-idp/oktatookta/main)
* [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main)
* [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main)

### Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

## Create an app at the Identity Provider

At the Identity Provider, create the client application that you want to use for authenticating and authorizing your users.

<StackSnippet snippet="appatidp" />

## Create an Identity Provider in Okta

To connect your org to the Identity Provider, add and configure that Identity Provider in Okta.

> **Note:** See the [Identity Providers API](/docs/reference/api/idps/#add-identity-provider) for request and response examples of creating an Identity Provider in Okta using the API.

1. In the Admin Console, go to **Security** > **Identity Providers**.

1. Select **Add Identity Provider** and then select the appropriate Identity Provider.

1. In the **Add an Identity Provider** dialog box, define the following in the **General Settings** section::

    <StackSnippet snippet="appidpinokta" />

1. Click **Add Identity Provider**. The Identity Providers page appears.

1. Locate the Identity Provider that you just added and click the arrow next to the Identity Provider name to expand.

<StackSnippet snippet="afterappidpinokta" />

### Social Identity Provider settings

When you are setting up your social Identity Provider (IdP) in Okta, there are a number of settings that allow you to finely control the social sign-in behavior. While the provider-specific instructions show one possible configuration, this section explains each of these in more detail so that you can choose the right configuration for your use case.

#### Authentication settings

**IdP Username:** The expression (written in the Okta Expression Language) that is used to convert an IdP attribute to the Application User's `username`. This IdP username is used for matching an Application User to an Okta User through the `oidc_idp` profile.

You can enter an expression to reformat the value, if you want. For example, if the social username is `john.doe@mycompany.com`, you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

**Match against &mdash;** The Okta user property that the IdP username is compared against in order to determine if an account link needs to be established. If an existing account link is found, no comparison is performed.

> **Note:** See [Account Linking](/docs/concepts/identity-providers/#account-linking) for more information on how account linking works.

**Account Link Policy &mdash;** Determines whether your Application User should be linked to an Okta user.

* **Automatic &mdash;** Link user accounts automatically according to the **Auto-Link Restrictions** and **Match against** settings.
* **Disabled &mdash;** Don't link existing User accounts. Unless the User is already linked, when the user signs in, the sign-in request fails.

**Auto-Link Restrictions &mdash;** Allows you to restrict auto-linking to members of specified groups.

**Provisioning Policy &mdash;** Determines whether just-in-time provisioning of users should be automatic or disabled.

#### JIT settings

**Profile Master &mdash;** If selected, the social Identity Provider is the source of truth for a user's profile attributes. This means that the next time the user signs in using the social Identity Provider, Okta updates the user profile attributes for this user. If a user is assigned multiple applications with profile mastering enabled, a prioritization in **Directory > Profile Masters** decides whether this provider is the profile master for the user's attributes. See [Attribute-level mastering](https://help.okta.com/okta_help.htm?id=ext_Attribute_Level_Mastering).

**Group Assignments &mdash;** Allows you to assign new users to one or more existing Groups. For example, new Facebook users could be added to a "Facebook" Group.

### Error codes

See the [OpenID Connect and Okta Social Authentication](/docs/reference/error-codes/#openid-connect-and-okta-social-authentication) section of the [Error codes](/docs/reference/error-codes/) API documentation.

### Attribute Mapping

When a user first signs in to Okta using an OpenID Connect Identity Provider, their Identity Provider user profile is mapped to an Okta Universal Directory profile using Just-in-Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OpenID Connect specification.

To view and modify the mappings, access the Identity Provider that you created by selecting **Security** and then **Identity Providers**. Click **Configure** for the Identity Provider and select **Edit Profile and Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's Identity Provider profile, add the attributes by editing the Identity Provider user profile in your org.

See [Manage User Profiles](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Editor) for more information on custom attributes.

## Register an App in Okta

You can use either an existing OpenID Connect (OIDC) app integration or create a new one. The app integration consumes the response from the Identity Provider (IdP) after authentication and authorization. Users that sign in for the first time are created in Okta and are associated with this app integration.

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.

> **Note:** If you need Okta to only authenticate users and not to redirect them to a particular OpenID Connect client, then the Identity Provider (IdP) configuration is complete. Add [routing rules](https://help.okta.com/okta_help.htm?id=ext_Identity_Provider_Discovery) to redirect users from the Okta Sign-In Page to the IdP.

If you want to add an existing OIDC app integration:

1. Click **Browse App Catalog**.
1. Enter the name of the app integration in the **Search...** text box
1. On the catalog page for the app integration, click **Add**.
1. Enter a label for your copy of this app integration. Click **Done** to add this to your org.
1. On the **Assignments** tab, click **Assign** to assign the app integration to any user or group in your org. Click **Done** when the assignments are complete.

If you need to create a new OIDC app integration:

1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method** and choose the appropriate **Application type** to match your external application environment. Click **Next**.
1. Enter a name for your new app integration.
1. Add one or more **Sign-in redirect URIs**. This is where the user is sent to after they authenticate with the Identity Provider.
1. Click **Save**.
1. Click **Edit** to change the **General Settings** pane. In the **Allowed grant types** section, enable **Implicit**. Using the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow streamlines authentication by returning tokens without introducing additional steps. It allows you to get an ID token quickly, which makes it easy to test your configuration. Click **Save** to confirm your changes.
    > **Note:** The Authorization Code grant flow is also supported.
1. On the **Assignments** tab, click **Assign** to assign the app integration to any user or group in your org. Click **Done** when the assignments are complete. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation.

> **Note:** To get the client credentials for your app integration, on the **General** tab, copy the **Client ID** from the **Client Credentials** section. You need this ID to complete the Authorize URL in the next section.

## Create an authorization URL

The Okta Identity Provider that you created in the second step generated an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

> **Note:** Use this step to test your authorization URL as an HTML link. For information on using the Sign-In Widget, Okta hosted sign-in page, or AuthJS, see the next step.

In the URL, replace `${yourOktaDomain}` with your org's base URL, and then replace the following values:

* `client_id` &mdash; use the `client_id` value that you obtained from the OpenID Connect client application in the previous section. This is not the `client_id` from the Identity Provider.

* `response_type` &mdash; determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, this should be `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, this should be `code`.

* `response_mode` &mdash; determines how the authorization response should be returned. This should be `fragment`.

* `scope` &mdash; determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email` as well as any custom scopes specific to your Identity Provider.

* `redirect_uri` &mdash; the location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state` &mdash; protects against cross-site request forgery (CSRF). Can be any value.

* `nonce` &mdash; a string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. Can be any value.

For a full explanation of all of these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters).

An example of a complete URL looks like this:

```bash
https://${yourOktaDomain}/oauth2/v1/authorize?idp=${idp_id}&client_id=${client_id}&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo
```

## Use the Identity Provider to sign in

To test your authorization URL, enter the complete authorization URL in a browser. Do this in your browser's privacy or incognito mode to avoid false positive or negative results.

If everything is configured properly:

* The user is redirected to the Identity Provider's sign-in page.
* After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

> **Note:** With Sign In with Apple, when a user signs in, Apple offers the user the option to either share their email address or hide it. If the user chooses to hide their email address, Apple generates a random email address and sends that to Okta. However, Apple maintains the mapping between this random email address and the user's original email address. The user must choose the **Share My Email** option if you want to link the user's Apple account to an existing account in Okta. A user can choose this option only when the user is signing in with Apple to Okta for the first time.

There are four primary ways to kick off the sign-in flow.

## HTML Link

Create a link that the user clicks to sign in. The HREF for that link is the authorize URL that you created in the previous section:

```bash
`<a href="https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo">Sign in with Identity Provider</a>`
```

After the user clicks the link, they are prompted to sign in with the Identity Provider. After successful sign in, the user is returned to the specified `redirect_uri` along with an ID token in JWT format.

## Okta Sign-In Widget

Okta also offers an easily embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with ${IdentityProviderName}** button by adding the following code to your Okta Sign-in Widget configuration:

```js
config.idps= [
  { type: 'IdentityProviderName', id: 'Your_IDP_ID_Here' }
];
config.idpDisplay = "SECONDARY";
```

You can find out more about the Okta Sign-in Widget [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing sign in with an Identity Provider uses the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

## Custom Okta-hosted sign-in page

If you configured a [Sign-In Widget](/docs/guides/style-the-widget/style-okta-hosted/), you can add a **Sign in with ${IdentityProviderName}** button by adding the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:

```js
config.idps= [
  {type: 'IdentityProviderName', id: 'Your_IDP_ID_Here'}
];
config.idpDisplay ="SECONDARY";
```

## AuthJS

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. For further information see [the AuthJS GitHub repo](https://github.com/okta/okta-auth-js#install). Implementing sign in with an Identity Provider uses the SDK's [OpenID Connect authentication flow](https://github.com/okta/okta-auth-js#openid-connect-options).

## Next steps

You should now understand how to add an external Identity Provider and have successfully added and tested the authorization URL with the external Identity Provider.

To add another Identity Provider:

* If you have already created an app at the Identity Provider, start by configuring the Identity Provider in Okta.
* If you haven't already created an app at the Identity Provider, start by creating an app at the Identity Provider.

> **Note:** You don't need to register another app in Okta unless you want to use a different application with the new Identity Provider that you are creating.

For more information about topics mentioned in this guide:

* [Concepts: External Identity Providers](/docs/concepts/identity-providers/)
* [Implement the Implicit flow](/docs/guides/implement-grant-type/implicit/main/)
* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
