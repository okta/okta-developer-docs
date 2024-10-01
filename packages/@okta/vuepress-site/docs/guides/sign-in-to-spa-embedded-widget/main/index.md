---
title: Sign in to your SPA with the embedded Okta Sign-In Widget
---

<ApiLifecycle access="ie" /><br>

<StackSelector />

<StackSnippet snippet="nutrition" />

## About using the Sign-In Widget with your SPA app

<StackSnippet snippet="intro" />

## Create an Okta app integration

Before you integrate Okta authentication to your app, register your app in your Okta org. This provides you with the OpenID Connect client ID for authentication requests from your app. Register your app by creating an Okta app integration through the [Okta CLI](https://cli.okta.com/), the [Okta Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/), or through the [Admin Console](/docs/concepts/okta-organizations/#admin-console) with the following steps.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**, and then click **Next**.
1. On the **New Single-Page App Integration** page:

   * Enter an application name.
   * Select the **Refresh Token** checkbox.
   * Select **Advanced** in the **Grant type** section, and then select the **Interaction Code** checkbox.

      <VerifyICGrantType />

   * Set **Sign-in redirect URIs** to a URI that is appropriate for your app. For example, `http://localhost:8080/login/callback` if you're using the sample app.
   * Set **Sign-out redirect URIs** to a URI that is appropriate for your app. For example, `http://localhost:8080` if you're using the sample app.

1. In the **Assignments** section, select **Allow everyone in your organization to access**, and click **Save**.
1. In the **General Settings** section on the **General** tab, click **Edit**.
1. Under **EMAIL VERIFICATION EXPERIENCE** set **Callback URI** to a URI that is appropriate for your app. For example, `http://localhost:8080/login/callback` if you're using the sample app.
1. Click **Save**.

1. Select the **Sign On** tab and scroll down to the **User authentication** section. New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup.
1. For this use case, we want to use only the password factor. Click **Edit** and select the **Password only** [preset policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) to assign it to your app.
1. Click **Save**.

   > **Note:** Be sure to also [update the password authenticator policy rule](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#update-the-password-authenticator-to-password-only) to not require any additional verification.

1. In the **Security** > **API** > **Authorization Servers** section, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and then editing the **Default Policy Rule**. Click **Advanced** in the **IF Grant type is** section to ensure that the **Interaction Code** checkbox is selected.

   <VerifyICGrantType />

1. In the **Security** > **API** > **Trusted Origins** page, ensure that there is an entry for your sign-in redirect URI. See [Enable CORS](/docs/guides/enable-cors/).

### Okta org app integration configuration settings

You need two pieces of information from your org and app integration for your React app:

* **Client ID**: From the **General** tab of your app integration, save the generated **Client ID** value.
* **Issuer**: From the **General** tab of your app integration, save the **Okta domain** value. Use your Okta domain value for the [issuer](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) setting that represents the authorization server. Use `https://{yourOktaDomain}/oauth2/default` as the issuer for your app if you're using an Okta Developer Edition org. See [Issuer configuration](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) if you want to use another Okta custom authorization server.

## Install the SDK

<StackSnippet snippet="download-sample" />

## Load the Sign-In Widget

<StackSnippet snippet="load-app" />

## Basic sign-in flow

<StackSnippet snippet="basic-sign-in" />

## Run the sample application

<StackSnippet snippet="run-sample" />

## Next steps

<StackSnippet snippet="next-steps" />

## See also

<StackSnippet snippet="see-also" />
