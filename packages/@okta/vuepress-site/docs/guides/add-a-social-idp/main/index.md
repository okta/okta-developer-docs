---
title: Add a social Identity Provider
meta:
  - name: description
    content: Okta supports authentication with social Identity Providers. Get an overview of the process and prerequisites, as well as the set up instructions.
---

<StackSelector />

This article explains how to configure an external social Identity Provider for your application by creating an application on <StackSelector snippet="idp" noSelector inline />, creating an Identity Provider in Okta, testing the configuration, and creating a sign-in button.

Okta manages the connection to the IdP for your application, sitting between your application and the IdP that authenticates your users. The industry-standard term for this is Inbound Federation. When a user signs in, you can link the user’s <StackSelector snippet="idp" noSelector inline /> account to an existing Okta user profile or choose to create a new user profile using Just-In-Time (JIT) provisioning.

> **Note:** We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

---

**Learning outcomes**

How to configure a social Identity Provider so that your users can quickly sign up or sign in to your application using their social Identity Provider account.

**What you need**

* An Okta Developer Edition organization. Don't have one? [Create one for free](/signup)
* An OpenID Connect (OIDC) app integration in Okta. You can use an existing OIDC app integration or create a new one. To create a new OIDC app integration, see [Create OIDC app integrations using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard).
* An account with <StackSelector snippet="idpaccount" noSelector inline />.

**Sample code**

n/a

---

## Create an application at the Identity Provider

1. Create and register <StackSelector snippet="apptype" noSelector inline /> at <StackSelector snippet="idp" noSelector inline />.

1. When you create an application at the IdP, you need to provide a redirect URI for authentication. Use the Okta sign-in redirect URI from your app integration. To locate the Okta sign-in redirect URI for your application:

    * From the Admin Console, select **Applications** > **Applications**.
    * Find your app and select it.
    * On the **General Settings** tab, scroll to to the **Login** section.
    * Copy a **Sign-in redirect URIs** value for use as your redirect URI.

    The redirect URI sent in the authorize request from the client needs to match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URI has the same structure for most IdPs in Okta and is constructed using your Okta subdomain and the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

1. Save the generated <StackSelector snippet="idp" noSelector inline /> Client ID and Client Secret values. You need to add them to your Okta configuration.

## Create the Identity Provider in Okta

To add <StackSelector snippet="idp" noSelector inline /> as an Identity Provider in Okta:

1. In the Okta Admin Console, go to **Security** > **Identity Providers**.
1. Click **Add Identity Provider**, and then select **<StackSelector snippet="idp" noSelector inline />**.
1. In the **Add an Identity Provider** dialog box, define the following:

    * **Name** &mdash; Enter a name for the Identity Provider in Okta.
    * **Client ID** &mdash; Paste the generated Client ID from your <StackSelector snippet="idp" noSelector inline /> application.
    * **Client secret** &mdash; Paste the generated Client secret from your <StackSelector snippet="idp" noSelector inline /> application.
    * **Scopes** &mdash; Leave the defaults for a simple sign-in flow. You can also add more scopes. See <StackSelector snippet="scopes" noSelector inline />.

1. Click **Finish**.

## Test the integration

You can test your integration by configuring a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use <StackSelector snippet="idp" noSelector inline /> as the Identity Provider.

Alternatively, you can [use the Authorize URL to simulate the authorization flow](/docs/guides/add-an-external-idp/-/main/#use-the-authorize-url-to-simulate-the-authorization-flow).

<StackSnippet snippet="noemail" />

## Add <StackSelector snippet="idp" noSelector inline /> to the Okta Sign-In Widget

The Okta Sign-In Widget is an embeddable JavaScript Widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with GitHub** button to the Widget by adding the following code to your Okta Sign-in Widget configuration. Replace `IDP` with the name of the Identity Provider in all caps. Replace `Your_IDP_ID` with the Identity Provider ID from your Identity Provider that you created in Okta in the [Create the Identity Provider in Okta](/#Create_the_Identity_Provider_in_Okta) section:

```javascript
    config.idps= [
        { type: 'IDP', id: 'Your_IDP_ID' }
    ];
    config.idpDisplay = "SECONDARY";
```

## Next steps

You should now understand how to add a social Identity Provider and have successfully added and tested the integration with the social Identity Provider.

To add another Identity Provider:

* If you have already created an app at the Identity Provider, start by [configuring the Identity Provider in Okta](/#create-the-identity-provider-in-okta).
* If you haven't already created an app at the Identity Provider, start by [creating an app at the Identity Provider](/#create-an-application-at-the-identity-provider).

> **Note:** You don't need to register another app in Okta unless you want to use a different application with the new Identity Provider that you are creating.

## See also

* [Concepts: External Identity Providers](/docs/concepts/identity-providers/)
* [Map Okta attributes to app attributes in the Profile Editor](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_app_map)
* [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget)
