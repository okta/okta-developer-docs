---
title: Sample apps
excerpt: initial set up, sign in and enrollment sections
layout: Guides
---
samples-android

## Initial set up

Before we begin, you need to create an Okta Native OpenID Connect app to represent the Android sample app and then install the sample app.

> **Note:** These steps assume that you are using Android Studio to configure the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Native app** as the **Platform**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `com.okta.example:/callback`
    * **Logout redirect URIs** &mdash; `com.okta.example:/logoutCallback`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. Store this temporarily for use when you add it to the `okta_oidc_config.json` file in a few steps.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default/.well-known/openid-configuration`. For example: `https://example-1234.oktapreview.com/oauth2/default/.well-known/openid-configuration`.
10. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-android.git`
Open the `browser-sign-in` directory and navigate to the `okta_oidc_config.json` file in the app's `res/raw/` directory.
Add the information that you copied in the previous steps:

    ```JSON
    {
    "client_id": "{clientId}",
    "redirect_uri": "{LoginredirectUri}",
    "end_session_redirect_uri": "{LogoutredirectUri}",
    "scopes": [
        "openid",
        "profile"
    ],
    "Discovery_uri": "https://{yourOktaDomain}/oauth2/default/.well-known/openid-configuration"
    }
    ```

> **Note:** The `discovery_uri` is the issuer URL that you built earlier.

11. To redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, define a gradle manifest placeholder in your app's `build.gradle` file:

    ```bash
    android.defaultConfig.manifestPlaceholders = [
        "appAuthRedirectScheme": "com.okta.example"]
    ```

    > **> **Note:**** Make sure that this value is consistent with the redirect URI that you added to the `okta_oidc_config.json` file. For example, if your redirect URI is `com.okta.example:/callback`, then the `appAuthRedirectScheme` should be `com.okta.example`.
12. Verify that the correct Okta OIDC Library is defined: `implementation 'com.okta.android:oidc-androidx:1.0.18`

You have now created your App in Okta and installed the Okta Android sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. From Android Studio, run the app.
2. In the emulator, click **Login**, and you are redirected to the Okta Sign-In Widget.
3. Enter the **Username** and **Password** for an admin user in your Okta org, and click **Next**. You are redirected to the success page.
4. Click **SIGN OUT** to sign out of the app.

These sections added

-------
samples-aspnet

## Initial set up

Before we begin, you need to create an Okta Web OpenID Connect app to represent the ASP.NET sample app and then install the sample app.

> **Note:** These steps assume that you are using Visual Studio to work with the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `https://localhost:44314/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `https://localhost:44314/Account/PostLogout`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**, **Client secret**, and the **Okta domain**. Store these temporarily for use when you configure the `web.config` file in a few steps.
9. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-aspnet.git`
10. In Visual Studio, open the `okta-aspnet-mvc-example` solution file in the `okta-hosted-login` directory.
11. Open the `web.config` file and, in the `configuration.appSettings` section, add the information that you copied in previous steps:
    <add key="okta:ClientId" value="{ClientID}" />
    <add key="okta:ClientSecret" value="{ClientSecret}" />
    <add key="okta:OktaDomain" value="${yourOktaDomain}" />
    <add key="okta:AuthorizationServerId" value="{authServerId}" />
    <add key="okta:RedirectUri" value="http://localhost:8080/authorization-code/callback" />
    <add key="okta:PostLogoutRedirectUri" value="http://localhost:8080/" />

> **Note:** In this example we are using the "default" Custom Authorization Server. The value for `"okta:AuthorizationServerId"` is `"default"`.

You have now created your Web app in Okta and installed the Okta ASP.NET sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. In Visual Studio, run the okta-aspnet-mvc-example solution.
2. Your default browser automatically opens to `localhost:44314`, and the Okta ASP.NET Sample App landing page appears.
3. Click **Log in** in the upper-right corner of the page. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Log out** in the upper-right corner of the page to sign out of the app.

These sections added

-----
samples-aspnet-webforms

## Initial set up

Before we begin, you need to create an Okta Web OpenID Connect app to represent the ASP.NET Web Forms sample app and then install the sample app.

> **Note:** These steps assume that you are using Visual Studio to work with the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `https://localhost:44314/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `https://localhost:44314`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**, **Client secret**, and the **Okta domain**. Store these temporarily for use when you configure the `web.config` file in a few steps.
9. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-aspnet-webforms.git`
10. In Visual Studio, open the `okta-aspnet-webforms-example` solution file in the `okta-hosted-login` directory.
11. Open the `web.config` file and, in the `configuration.appSettings` section, add the information that you copied in previous steps:
    <add key="okta:ClientId" value="{ClientID}" />
    <add key="okta:ClientSecret" value="{ClientSecret}" />
    <add key="okta:OktaDomain" value="${yourOktaDomain}" />
    <add key="okta:AuthorizationServerId" value="{authServerId}" />
    <add key="okta:RedirectUri" value="http://localhost:8080/authorization-code/callback" />
    <add key="okta:PostLogoutRedirectUri" value="http://localhost:8080/" />

> **Note:** In this example we are using the "default" Custom Authorization Server. The value for "okta:AuthorizationServerId" is "default".

You have now created your Web app in Okta and installed the Okta ASP.NET Web Forms sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. In Visual Studio, run the okta-aspnet-webforms-example solution.
2. Your default browser automatically opens to `localhost:44314`, and the Okta ASP.NET OIDC Sample App landing page appears.
3. Click **Login** in the upper-right corner of the page. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** in the upper-right corner of the page to sign out of the app.

These sections added

-------
samples-aspnetcore

Initial set up
Before we begin, you need to create an Okta Web OpenID Connect app to represent the ASP.NET Core sample app and then install the sample app.

> **Note:** These steps assume that you are using Visual Studio 2019 and higher to work with the aspnetcore-3x sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `https://localhost:44314/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `https://localhost:44314/signout/callback`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**, **Client secret**, and the **Okta domain**. Store these temporarily for use when you configure the `appsettings.json` file in a few steps.
9. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-aspnetcore.git`
10. In Visual Studio, open the `okta-aspnetcore-mvc-example` solution file in the `okta-hosted-login` directory.
11. Open the `appsettings.json` file in the `okta-aspnetcore-mvc-example` folder, and in the `Okta` section, add the information that you copied in previous steps:

    ```json
    "Okta": {
    	"OktaDomain": "https://{yourOktaDomain}",
    	"ClientId": "{ClientId}",
    	"ClientSecret": "{ClientSecret}",
    	"AuthorizationServerId": "default"
         }
    ```

You have now created your Web app in Okta and installed the Okta ASP.NET Core sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. In Visual Studio, run the okta-aspnetcore-example solution.
2. Your default browser automatically opens to `localhost:44314`, and the Okta ASP.NET Core example app landing page appears.
3. Click **Sign In** in the upper-right corner of the page. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the Welcome page.
5. Click **Sign Out** in the upper-right corner of the page to sign out of the app.

These sections added

------
samples-blazor

## Initial set up

Before we begin, you need to create an Okta Web OpenID Connect app to represent the Blazor sample app and then install the sample app.

> **Note:** These steps assume that you are using Visual Studio 2019 and higher to configure the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `https://localhost:44314/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `https://localhost:44314/signout/callback`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**, **Client secret**, and the **Okta domain**. Store these temporarily for use when you configure the `appsettings.json` file in a few steps.
9. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-blazor.git`
10. In Visual Studio, open the `okta-blazor-server-side-example` solution file in the `okta-hosted-login` directory.
11. Open the `appsettings.json` file and, in the `Okta` section, add the information that you copied in previous steps:

    ```json
    "Okta": {
        "OktaDomain": "https://oietiger147.oktapreview.com",
        "ClientId": "0oaywibbsnwZpjBNf0h7",
        "ClientSecret": "_FG3_au--d_SPoxggTUo8LcgFUXt6d2sx4XjfwIR",
        "AuthorizationServerId": "default"
    }
    ```

You have now created your Web app in Okta and installed the Okta Blazor sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. In Visual Studio, run the okta-blazor-server-side-example solution.
2. Your default browser automatically opens to `localhost:44314`, and the Okta Blazor Sample App landing page appears.
3. Click **Sign in** at the top of the page. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Sign out** at the top of the page to sign out of the app.

These sections added

-----
samples-golang

## Initial set up

Before we begin, you need to create an Okta OpenID Connect app to represent the Golang sample app and then install the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080/`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID** and the **Client secret**. Store this temporarily for use when you add it to the `env` file in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-golang.git`
14. From the command line, enter the  `okta-hosted-login` directory and run `go get` to install the dependencies.
15. Create an `.env` file in the `okta-hosted-login` directory and add the information that you copied in previous steps:

    ```ini
    CLIENT_ID={ClientID}
    CLIENT_SECRET={ClientSecret}
    ISSUER=https://{yourOktaDomain}/oauth2/default
    ```

You have now created your App in Okta and installed the Okta Golang sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `okta-hosted-login` subdirectory, start the Golang app by running `go run main.go`.
2. Enter `localhost:8080` in an incognito/private window, and the Okta Hosted Login + Golang Example landing page appears.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** in the upper-right corner of the page to sign out of the app.

These sections added

-----
samples-ios

## Initial set up

Before we begin, you need to create an Okta Native OpenID Connect app to represent the iOS sample app and then install the sample app.

> **Note:** These steps assume that you are using XCode and the provided XCode project in the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Native app** as the **Platform**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `com.okta.example:/callback`
    * **Logout redirect URIs** &mdash; `com.okta.example:/logoutCallback`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. Store this temporarily for use when you add it to the `Okta.plist` file in a few steps.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`.
10. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-ios.git`
11. Navigate to the `OktaBrowserSignIn` directory and edit the `Okta.plist` file with the information that you copied in previous steps:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>scopes</key>
        <string>openid profile offline_access</string>
        <key>redirectUri</key>
        <string>{redirectUri}</string>
        <key>clientId</key>
        <string>{clientID}</string>
        <key>issuer</key>
        <string>{issuer}</string>
        <key>logoutRedirectUri</key>
         <string>{logoutRedirectUri}</string>
    </dict>
    </plist>

12. To redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open `Info.plist` in your application bundle and add `com.okta.example` as a URL Scheme.

    > **Note:** Make sure that this value is consistent with the redirect URI that you added to the `Okta.plist` file. For example, if your redirect URI is `com.okta.example:/callback`, then the URL Scheme that you add should be `com.okta.example`.

You have now created your App in Okta and installed the Okta iOS sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. In XCode, run the OktaBrowserSignIn project.
2. In the simulator, click **Sign In**. You are redirected to the Okta Sign-In Widget.
3. Enter the **Username** and **Password** for an admin user in your Okta org, and then click **Next**. You are redirected to the success page.
4. Click **Sign Out** to sign out of the app.

These sections added

------
samples-java-micronaut

## Initial set up

Before we begin, you need to create an Okta OpenID Connect app to represent the Micronaut sample app and then install the sample app.

> **Note:** This sample app works with any Java version up to version 15.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/oauth/callback/okta`
    * **Logout redirect URIs** &mdash; &mdash; `http://localhost:8080/logout`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**, **Client secret**, and the **Okta domain**. Store these temporarily for use when you set dependencies in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-java-micronaut.git`
13. From the command line, enter the `okta-hosted-login` directory and set the following dependencies with the information that you copied in a previous step:

    `export OIDC_ISSUER_DOMAIN=https://{yourOktaDomain}`
    `export OAUTH_CLIENT_ID={clientID}`
    `export OAUTH_CLIENT_SECRET={clientSecret}`
    `export OIDC_ISSUER_AUTHSERVERID=default`

You have now created your App in Okta and installed the Okta Micronaut sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `okta-hosted-login` subdirectory, start the Micronaut sample app by running `mvn mn:run`.
2. Open `localhost:8080` in an incognito/private window, and the Okta Hosted Login + Micronaut Example landing page appears.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** to sign out of the app.

-----

DO LAST
samples-java-servlet

## Initial set up and authentication

This example shows you how to use the Okta Java Authentication SDK to sign a user in to a servlet-based application. This sample application is meant to show you how to integrate the Okta Java Authentication SDK into existing frameworks or applications. It is a convenient HTTP client wrapper for Okta's Authentication API.

1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-java-servlet.git`

    > **Note:** There is a `pom.xml` at the root of this project that exists to build all of the projects. Each project is independent and could be copied from this repo as a primer for your own application.

2. Obtain your Org URL (found in the global header located in the upper-right corner of the Admin Console), for example, `https://example-1234.oktapreview.com`.
3. From the command line, enter the `authn-servlet` directory.
4. Include your Org URL in the following `mvn` command to start the application: `mvn -Dokta.client.orgUrl=https://{yourOktaDomain}`
5. Open `http://localhost:8080` in an incognito/private browser window. The Okta Authentication SDK + Servlet page appears.
6. Click **Login**. You are redirected to a sign-in page.
7. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
8. Click **Logout** in the upper-right corner of the page to sign out of the app.

You now have the Okta Java servlet sample app installed and working.

-----

samples-java-spring

## Initial set up and authentication

Before we begin, you need to create an Okta OpenID Connect app to represent the Spring sample app and then install the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080/`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID** and the **Client secret**. Store these temporarily for use when starting the sample app in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-java-spring.git`
14. From the command line, enter the `okta-hosted-login` directory and run the following `mvn` commands to start the application using the information that you copied in previous steps:

    `mvn -Dokta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default` \
    `-Dokta.oauth2.clientId={clientId}` \
    `-Dokta.oauth2.clientSecret={clientSecret}` \
    `-Dokta.oauth2.postLogoutRedirectUri={absoluteLogoutRedirectUri}`

    > **Note:** This example is only for testing. Don't put client secrets on the command line in production environments. Instead, we recommend that you store them as environment variables.
15. Open `http://localhost:8080` in an incognito/private window, and the Okta Hosted Login + Spring Boot Example page appears.
16. Click **Login**. You are redirected to the Okta Sign-In Widget.
17. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
18. Click **Logout** in the upper-right corner of the page to sign out of the app.

You have now created your App in Okta, and the Okta Spring sample app is installed and working.

-----
samples-js-angular

## Initial set up

Before we begin, you need to create an Okta Single Page App to represent the Angular sample app and then install the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Single Page App (SPA)** as the **Platform**, then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/login/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. Store this temporarily for use when you add it to the `testenv` file in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-angular.git`
14. From the command line, enter the `okta-hosted-login` directory and run `npm install`.
15. Create a `testenv` file in the `samples-js-angular` directory with the information that you copied in previous steps:

    ```ini
        ISSUER=https://${yourOktaDomain}/oauth2/default
        CLIENT_ID={yourAppClientId}
    ```

You have now created your SPA in Okta and installed the Okta Angular sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `okta-hosted-login` subdirectory, start the Angular app by running `npm start`.
2. Open `localhost:8080` in an incognito/private window, and the PKCE Flow w/Okta Hosted Login Page appears for the Okta Angular sample project.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** at the top of the page to sign out of the app.

-----
samples-js-react-native (iOS)

## Initial set up

Before we begin, you need to create an Okta Native App to represent the React Native sample app and then install the sample app. In this example, we are setting up an iOS React Native application.

> **Note:** These steps assume that you are using XCode and the provided XCode project in the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Native app** as the **Platform**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; &mdash; `com.okta.example:/callback`
    * **Logout redirect URIs** &mdash; `com.okta.example:/logoutCallback`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. Store this temporarily for use when you add it to the `samples.config.js` file in a few steps.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
10. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-react-native.git`
11. From the command line, enter the `browser-sign-in` directory and install the iOS dependencies:
    `cd ios`
    `pod install`
12. Within the `samples-react-native` directory, edit the `samples.config.js` file in the `browser-sign-in` directory with the information that you copied in previous steps:

    ```javascript
    export default {
            oidc: {
    	        clientId: `{yourAppClientId}`,
    	        redirectUri: `com.okta.example:/callback`,
    	        endSessionRedirectUri: `com.okta.example:/logoutCallback`,
    	        discoveryUri: `https://${yourOktaDomain}/oauth2/default`,
    	        scopes: ['openid', 'profile', 'offline_access'],
    	        requireHardwareBackedKeyStore: false,
  	            },
         };
    ```

    > **Note:** The `discovery_uri` is the issuer URL that you built in a previous step.

You have now created your React Native app in Okta and installed the Okta React Native app for iOS.

## Simple enrollment and authentication

1. This section walks you through enrolling a user and authenticating that user.
2. Open and test the Sign-In Widget
3. On the command line inside the `ios` subdirectory, start the React Native app by running `npm start`.
4. In XCode, run the `browserSignIn` project.
5. In the simulator, click **Login**. You are redirected to the Okta Sign-In Widget.
6. Enter the **Username** and **Password** for an admin user in your Okta org, and click **Next**. You are redirected to the success page.
7. Click **Logout** to sign out of the app.

-------
samples-js-react-native (Android)

## Initial set up

Before we begin, you need to create an Okta Native App to represent the React Native sample app and then install the sample app. In this example, we are setting up an Android React Native application.

> **Note:** These steps assume that you are using Android Studio to run the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Native app** as the **Platform**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; &mdash; `com.okta.example:/callback`
    * **Logout redirect URIs** &mdash; `com.okta.example:/logoutCallback`
    > **Note:** Copy these values and store them temporarily. You need them in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. Store this temporarily for use when you add it to the `samples.config.js` file in a few steps.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
10. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-react-native.git`
11. From the command line, enter the `browser-sign-in` directory and run `npm install` to install the dependencies.
12. Within the `samples-react-native` directory, edit the `samples.config.js` file in the `browser-sign-in` directory with the information that you copied in previous steps:

    ```javascript
    export default {
        oidc: {
    	    clientId: `{yourAppClientId}`,
    	    redirectUri: `com.okta.example:/callback`,
    	    endSessionRedirectUri: `com.okta.example:/logoutCallback`,
    	    discoveryUri: `https://${yourOktaDomain}/oauth2/default`,
    	    scopes: ['openid', 'profile', 'offline_access'], 
    	    requireHardwareBackedKeyStore: false,
  	        },
        };
    ```

    > **Note:** The `discovery_uri` is the issuer URL that you built in a previous step.

13. To redirect back to your application, you must specify a unique URI to your app. To do this, define a gradle manifest placeholder in the `build.gradle` file located in the `browser-sign-in` > `android` > `app` directory.

```bash
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.example"
]
```

> **Note:** Make sure that this value is consistent with the redirect URI that you added to the `samples.config.js` file. For example, if your redirect URI is `com.okta.example:/callback`, then the `appAuthRedirectScheme` should be `com.okta.example`.

You have now created your React Native app in Okta and installed the Okta React Native app for Android.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `browser-sign-in` subdirectory, start the React Native app by running `npm start`.
2. From Android Studio, run the app.
3. In the emulator, click **LOGIN**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **LOGOUT** in the emulator to sign out of the app.

------
samples-js-vue

## Initial set up

Before we begin, you need to create an Okta OpenID Connect app to represent the Vue sample app and then install the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Single Page App (SPA)** as your **Platform**, then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/login/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080/`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. Store this temporarily for use when you add it to the `testenv` file in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-vue.git`
14. From the command line, enter the `okta-hosted-login` directory and run `npm install` to install the dependencies.
15. Create a `testenv` file in the  `samples-js-vue` directory with the  information that you copied in previous steps:

    ```ini
    ISSUER=https://${yourOktaDomain}/oauth2/default
    CLIENT_ID={yourAppClientID}
    ```

You have now created your App in Okta and installed the Okta Vue sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `okta-hosted-login` subdirectory, start the Vue app by running `npm start`.
2. Open `localhost:8080` in an incognito/private window, and the PKCE Flow w/Okta Hosted Login Page appears for the Okta Vue sample project.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** at the top of the page to sign out of the app.


----
samples-nodejs-express

## Initial set up

Before we begin, you need to create an Okta OpenID Connect app to represent the Node.js Express sample app and then install the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080/`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID** and the **Client secret**. Store these temporarily for use when you add this information to the `testenv` file in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-nodejs-express-4.git`
14. From the command line, enter the `samples-nodejs-express-4` directory and run `npm install` to install the dependencies.
15. Create a `testenv` file in the  `samples-nodejs-express-4` directory with the information that you copied in previous steps:

    ```ini
    ISSUER=https://${yourOktaDomain}/oauth2/default
    CLIENT_ID={yourAppClientID}
    CLIENT_SECRET={yourAppClientSecret}
    ```

You have now created your App in Okta and installed the Okta Node.js Express sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `samples-nodejs-express-4` directory, start the Node.js app by running `npm run okta-hosted-login-server`.
2. Open `localhost:8080` in an incognito/private window, and the Okta Hosted Login + Express JS Example page appears.
3. Click **Log In**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** from the left side of the page to sign out of the app.

-----
samples-php

## Initial set up

Before we begin, you need to create an Okta OpenID Connect app to represent the PHP sample app and then install the sample app.

> **Note:** We depend on other packages for the samples to run. To install these dependencies, we use composer. These steps assume that you have Composer installed.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080/`
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID** and the **Client secret**. Store these temporarily for use when you add this information to the `.env` file in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-php.git`
14. From the command line, enter the `okta-hosted-login` directory and run `composer install` to install the dependencies.
15. Create an `.env` file in the `okta-hosted-login` directory and add the  information that you copied in previous steps:

    ```ini
    CLIENT_ID={yourAppClientID}
    CLIENT_SECRET={yourAppClientSecret}
    ISSUER=https://{yourOktaDomain}/oauth2/default
    ```

You have now created your App in Okta and installed the Okta PHP sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `okta-hosted-login` subdirectory, start the PHP app by running `composer server:start`.
2. Open `localhost:8080` in an incognito/private window, and the Okta Hosted Login + PHP Example page appears.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** in the upper-right corner of the page to sign out of the app.

------
samples-python-flask

## Initial set up

Before we begin, you need to create an Okta OpenID Connect app to represent the Flask sample app and then install the sample app.

> **Note:** These steps require Python version 3.6.0 or higher.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Web** as the **Platform**, select **OpenID Connect** as the **Sign on method**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click ?**Save**:
    * **Login redirect URIs** &mdash; `http://localhost:8080/authorization-code/callback`
    * **Logout redirect URIs** &mdash; `http://localhost:8080/`
    > **Note:** Copy the Login redirect URIs value and store it temporarily. You need it in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID** and the **Client secret**. Store these temporarily for use when you add this information to the `client_secrets.json` file in a few steps.
9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
13. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-python-flask.git`
14. From the command line, enter the `samples-python-flask` directory and run `pip install -r requirements.txt` to install the dependencies.
15. In the `samples-python-flask` directory, open the `okta-hosted-login` directory.
16. Copy the `client_secrets.json.dist` to `client_secrets.json` and fill in the information that you copied in previous steps.

    ```json
    {
    "web": {
        "auth_uri": "https://{yourOktaDomain}/oauth2/default/v1/authorize",
        "client_id": "{yourClientId}",
        "client_secret": "{yourClientSecret}",
        "redirect_uris": [
            "http://localhost:8080/authorization-code/callback"
     ],
        "issuer": "https://{yourOktaDomain}/oauth2/default",
        "token_uri": "https://{yourOktaDomain}/oauth2/default/v1/token",
        "token_introspection_uri": "https://{yourOktaDomain}/oauth2/default/v1/introspect",
        "userinfo_uri": "https://{yourOktaDomain}/oauth2/default/v1/userinfo"
        }
    }
    ```

You have now created your App in Okta and installed the Okta Flask Python sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. On the command line inside the `okta-hosted-login` subdirectory, start the Flask app by running `python main.py`.
2. Open `localhost:8080` in an incognito/private window, and the Okta Hosted Login + Flask Example page appears.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
5. Click **Logout** in the upper-right corner of the page to sign out of the app.

-----
okta-idx-swift

## Initial set up

Before we begin, you need to create an Okta Native OpenID Connect app to represent the Okta-IDX-Swift iOS sample app and then install the sample app.

> **Note:** These steps assume that you are using XCode and the provided XCode workspace in the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Native app** as the **Platform**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `com.okta.example:/callback`
    * **Logout redirect URIs** &mdash; `com.okta.example:/logoutCallback`
    > **Note:** Copy the Login redirect URI value and store it temporarily. You need it in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. You need this ID when you are signing in using the simulator.
9. In the General Settings section, click **Edit**, select **Interaction Code** as a **Grant type allowed**, and click **Save**.
10. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
11. From the side navigation, select **Security** > **API**, and then select the "default" Custom Authorization Server.
12. Select **Access Policies** and then click the pencil icon for the **Default Policy Rule**.
13. Select **Interaction Code** in the **IF Grant type is** section and click **Update Rule**.
14. Install the sample app wherever you want using: `git clone https://github.com/okta/okta-idx-swift.git`

You have now created your App in Okta and installed the Okta IDX Swift sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. From the `okta-idx-swift` directory, open `okta-idx.xcworkspace` in XCode.
2. In the XCode title bar, set the active scheme by selecting OktaIdxExample, and then run the example.
3. In the simulator, enter the **Issuer URL**, **Client ID**, and **Redirect URL** that you copied in previous steps.
4. Click L**og In**, and you are redirected to the Okta Sign-In Widget.
5. Enter the **Username** and **Password** for an admin user in your Okta org, and then click **Next**. The simulator displays the access token.
