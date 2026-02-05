---
title: Set up Okta app authentication for the MCP server
meta:
  - name: description
    content: Create an Okta admin app integration and obtain the credentials to connect your Okta MCP server.
---

Create an Okta admin app integration and configure authentication credentials to authorize the Model Context Protocol (MCP) server.

---

#### Learning outcomes

* Implement a device authorization grant or private key JWT to authorize the Okta MCP server.
* Get the client ID and security keys for server configuration.

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup) with admin permissions.
* An Okta admin role with the appropriate permissions. See [Learn about administrators](https://help.okta.com/okta_help.htm?type=oie&id=administrators-learn-about-admins).

---

## Overview

This guide explains how to create an Okta admin app integration and generate the authentication credentials for the Okta MCP server to interact with your Okta org.

---

## Authenticate and authorize the Okta MCP server

To connect the Okta MCP server to an Okta org, create an Okta app integration and grant the required API scopes. Choose the method that fits your use case:

* **Device authorization grant (browser-based):** Use for interactive tasks and local development.
* **Private key JWT (browserless):** Use for automation, CI/CD pipelines, and headless environments.

---

## Method 1: Device authorization grant (browser-based)

### Create the native app integration

1. Sign in to the [Okta Integrator Free Plan org](https://developer.okta.com/signup).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the sign-in method.
1. Select **Native Application** as the app type.
1. Click **Next**.
1. Enter an **App integration name**, such as "Okta MCP Server".
1. In **Grant type**, select **Device Authorization**.
1. Configure the redirect URIs:
    * **Sign-in redirect URIs:** `com.oktapreview.{yourOktaDomain}:/callback`
    * **Sign-out redirect URIs:** `com.okta.{yourOktaDomain}:/`
1. Select **Allow everyone in your organization to access** in the **Assignments** section. For this use case, grant everyone access to the app.
1. Click **Save**.

Now that you've configured the app integration, grant the required API scopes.

### Grant API scopes for native app

After you create the app, follow these steps to grant the required API scopes:

1. In the Admin Console, go to **Applications** > **Applications** and locate the MCP server app.
1. Select the **Okta API Scopes** tab.
1. Click **Grant** for the required API scopes based on requirements, such as `okta.users.read`, `okta.groups.manage`, or `okta.logs.read`.

   <div class="three-quarter">

   ![Okta MCP server data flow diagram](/img/concepts/mcp-server-native-app-grant-api-scopes.png)

   </div>

1. Go to the **General** tab and copy the **Client ID** and **Sign-in redirect URIs**.

   > **Note:** Save these values to configure your Okta MCP server (See [Okta Device Authorization Grant Guide](/docs/guides/device-authorization-grant/main/)).

   <div class="three-quarter">

   ![Okta MCP server data flow diagram](/img/concepts/mcp-server-admin-app-copy-client-id.png)

   </div>

---

## Method 2: Private key JWT (browserless)

The private key JWT flow allows the Okta MCP server to run without human intervention, which is effective for CI/CD pipelines or backend services. The server authenticates using a cryptographic key pair instead of a browser-based login.

### Create an API service app integration

1. Sign in to the [Okta Integrator Free Plan org](https://developer.okta.com/signup).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **API Services** as the **Sign-in method**.
1. Click **Next**.
1. Enter an **App integration name**, such as "Okta MCP server automation".
1. Click **Save**.

### Configure client authentication

1. In the **Client Credentials** section, click **Edit**.
1. Select **Public key / Private key**.
1. In the **Public keys** section, click **Edit**.
1. In **Public keys** > **Configuration**, select **Save keys in Okta**.
1. Click **Add key**.
1. In the **Public Keys** section, click **Add Key**.
   The **Add a public key** dialog opens.

### Generate or add a public key

You can either generate the key in Okta (recommended) and copy it in PEM format, or upload your own keys:

#### Option A: Generate a key in Okta (recommended)

1. In the **Public Keys** section, click **Add key**.
1. In the dialog, select **Generate new key**.
1. Select the **PEM** format and click **Copy to clipboard**.
1. Click **Done**.
1. In **Client Credentials**, copy the **Client ID**.
1. In **Public keys**, copy the **Key ID (KID)** displayed.
1. Click **Save**.

   > **Important:** Store the private key securely as you cannot retrieve it later.

   <div class="three-quarter">

   ![Okta MCP server data flow diagram](/img/concepts/mcp-server-generate-new-public-key.png)

   </div>

1. In **General Settings**, click **Edit**.
1. Disable **Require Demonstrating Proof of Possession (DPoP) header in token requests**.
1. Click **Save**.

#### Option B: Use a local key

1. Generate a 2048-bit RSA private key locally:

    ```shell
   openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
   ```

1. Extract the public key from the private key:

   ```shell
   openssl rsa -in private.pem -pubout -out public.pem
   ```

1. In the **Public Keys** section, click **Add key** and paste the contents of your public key (`public.pem`) into the dialog.
1. Click **Save**.
1. Copy the **Key ID (KID)** displayed for the added key.

### Grant API scopes and admin role

1. Go to the **Grant API scopes** tab and grant the required API scopes.
1. Go to the **Admin roles** tab, and click **Edit assignments**.
1. Select an admin role (see [Learn about administrators](https://help.okta.com/okta_help.htm?type=oie&id=administrators-learn-about-admins)) and click **Save changes**.
1. Go to the **General** tab and copy the **Client ID**.

---

You've created an app integration, configured the authentication flow, and granted the required API scopes for your Okta MCP server.

## Next Steps

[Configure, start, and test](/docs/guides/start-mcp-server/main/) the Okta MCP server to connect the local environment to your org.
