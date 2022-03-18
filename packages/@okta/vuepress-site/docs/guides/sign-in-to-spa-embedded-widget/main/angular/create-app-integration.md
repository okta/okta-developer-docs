The sample application requires an integration with your Okta org to implement authentication for your application users. You can create an Okta custom app integration from the Admin Console and update the sample application with your configuration details in the following sections.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**.
1. On the **New Single-Page App Integration** page, add the following configurations that work with the sample application:

   * Enter an application name.
   * Select the **Interaction Code** checkbox.
   * Select the **Refresh Token** checkbox.
   * Set **Base URI** to `http://localhost:8080`.
   * Set **Sign-in redirect URIs** to `http://localhost:8080/login/callback`.
   * Set **Sign-out redirect URIs** to `http://localhost:8080/`.

1. In the **Assignments** section, select **Allow everyone in your organization to access**.
1. Click **Save**.
1. Select the **Sign On** tab and scroll down to the **User authentication** section. New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup.
1. For this use case, we want to use only the password factor. Click **Edit** and select the **Password only** [preset policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) to assign it to your app.
1. Click **Save**.

   > **Note:** Be sure to also [update the password authenticator policy rule](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#update-the-password-authenticator-to-password-only) to not require any additional verification.

1. On the **Security** > **API** > **Authorization Servers** page, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and editing the **Default Policy Rule**. Review the **IF Grant type is** section to ensure that the **Interaction Code** checkbox is selected.
1. On the **Security** > **API** > **Trusted Origins** page, ensure that there is an entry for your sign in redirect URI. See [Enable CORS](/docs/guides/enable-cors/).

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** value, which is used in the next section.
