---
title: Set up Okta app authentication for the Okta Open Source MCP server
meta:
  - name: description
    content: Create an Okta admin app integration and obtain the credentials to connect your Okta Open Source MCP server.
---

Create an Okta admin app integration, configure authentication credentials, and grant required OAuth 2.0 scopes to authorize the Okta Open Source Model Context Protocol (MCP) server tools.

---

#### Learning outcomes

* Implement a device authorization grant or private key JWT to authorize the Okta Open Source MCP server.
* Get the client ID and security keys and identify the OAuth 2.0 scopes that are required for your specific use cases.
* Configure scope-based tool loading to match your app permissions.

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup) with admin permissions.
* An Okta admin role with the appropriate permissions. See [Learn about administrators](https://help.okta.com/okta_help.htm?type=oie&id=administrators-learn-about-admins).

---

## Overview

This guide explains how to create an Okta admin app integration and generate the authentication credentials for the Okta Open Source MCP server to interact with your Okta org.

---

## Authenticate and authorize the Okta Open Source MCP server

To connect the Okta Open Source MCP server to an Okta org, create an Okta app integration and grant the required API scopes. Choose the method that fits your use case:

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
1. Enter an **App integration name**, such as "Okta Open Source MCP Server".
1. In the **Grant type**, select **Device Authorization**.
1. Configure the redirect URIs:
    * **Sign-in redirect URIs:** `com.oktapreview.{yourOktaDomain}:/callback`
    * **Sign-out redirect URIs:** `com.okta.{yourOktaDomain}:/`
1. Select **Allow everyone in your organization to access** in the **Assignments** section. For this use case, grant everyone access to the app.
1. Click **Save**.

Now that you've configured the app integration, grant the required API scopes.

### Grant Okta API scopes for native app

After you create the app, follow these steps to grant the required API scopes:

1. In the Admin Console, go to **Applications** > **Applications** and locate the MCP server app.
1. Select the **Okta API Scopes** tab.
1. Click **Grant** for the required API scopes based on requirements, such as `okta.users.read`, `okta.groups.manage`, or `okta.logs.read`.

   <div class="three-quarter">

   ![Okta Open Source MCP server data flow diagram](/img/concepts/mcp-server-native-app-grant-api-scopes.png)

   </div>

1. Go to the **General** tab and copy the **Client ID** and **Sign-in redirect URIs**.

   > **Note:** Save these values and the list of granted scopes to configure your Okta Open Source MCP server, see [Okta Device Authorization Grant Guide](/docs/guides/device-authorization-grant/main/).

   <div class="three-quarter">

   ![Okta Open Source MCP server data flow diagram](/img/concepts/mcp-server-admin-app-copy-client-id.png)

   </div>

---

## Method 2: Private key JWT (browserless)

The private key JWT flow allows the Okta Open Source MCP server to run without human intervention, which is effective for CI/CD pipelines or backend services. The server authenticates using a cryptographic key pair instead of a browser-based sign-in.

### Create an API service app integration

1. Sign in to the [Okta Integrator Free Plan org](https://developer.okta.com/signup).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **API Services** as the **Sign-in method**.
1. Click **Next**.
1. Enter an **App integration name**, such as "Okta Open Source MCP server automation".
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

   ![Okta Open Source MCP server data flow diagram](/img/concepts/mcp-server-generate-new-public-key.png)

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

### Okta API scopes and admin role

1. Go to the **Okta API Scopes** tab and grant the required API scopes. Ensure you grant `okta.deviceAssurance.manage` or `okta.brands.manage` if the server needs to perform write operations for security or branding.
1. Go to the **Admin roles** tab, and click **Edit assignments**.
1. Select an admin role (see [Learn about administrators](https://help.okta.com/okta_help.htm?type=oie&id=administrators-learn-about-admins)) and click **Save changes**.
1. Go to the **General** tab and copy the **Client ID**.

---

You've created an app integration, configured the authentication flow, and granted the required API scopes for your Okta Open Source MCP server.

## Configure scope-based tool loading

The Okta Open Source MCP server uses a scope-based tool loading mechanism to ensure that only the tools your app is authorized to use are exposed to the LLM.

### How it works

* Startup filtering: After authentication completes, the server reads the scopes listed in your `OKTA_SCOPES` environment variable. The server compares each tool's required scope against your configured scopes. Tools whose required scope isn’t present are silently removed from the tool registry and don’t appear in `tools/list`.

* Runtime enforcement: A `@require_scopes decorator` on each tool provides a second layer of enforcement. If a scope is missing at call time (for example, if a token refreshes with fewer scopes), the tool returns an error message instead of making an API call.

### Scope-to-tool mapping

| OAuth 2.0 scope | Tools unlocked |
|---|---|
| `okta.users.read` | `list_users`, `get_user`, `get_user_profile_attributes` |
| `okta.users.manage` | `create_user`, `update_user`, `deactivate_user`, `delete_deactivated_user` |
| `okta.groups.read` | `list_groups`, `get_group`, `list_group_users`, `list_group_apps` |
| `okta.groups.manage` | `create_group`, `update_group`, `delete_group`, `add_user_to_group`, `remove_user_from_group` |
| `okta.apps.read` | `list_applications`, `get_application` |
| `okta.apps.manage` | `create_application`, `update_application`, `delete_application`, `activate_application`, `deactivate_application` |
| `okta.policies.read` | `list_policies`, `get_policy`, `list_policy_rules`, `get_policy_rule` |
| `okta.policies.manage` | `create_policy`, `update_policy`, `delete_policy`, `activate_policy`, `deactivate_policy`, `create_policy_rule`, `update_policy_rule`, `delete_policy_rule`, `activate_policy_rule`, `deactivate_policy_rule` |
| `okta.deviceAssurance.read` | `list_device_assurance_policies`, `get_device_assurance_policy` |
| `okta.deviceAssurance.manage` | `create_device_assurance_policy`, `replace_device_assurance_policy`, `delete_device_assurance_policy` |
| `okta.logs.read` | `get_logs` |
| `okta.brands.read` | `list_brands`, `get_brand`, `list_brand_domains`, `list_brand_themes`, `get_brand_theme`, `get_sign_in_page_resources`, `get_customized_sign_in_page`, `get_default_sign_in_page`, `get_preview_sign_in_page`, `list_sign_in_widget_versions`, `get_error_page_resources`, `get_customized_error_page`, `get_default_error_page`, `get_preview_error_page`, `get_sign_out_page_settings` |
| `okta.brands.manage` | `create_brand`, `replace_brand`, `delete_brand`, `replace_brand_theme`, `upload_brand_theme_logo`, `delete_brand_theme_logo`, `upload_brand_theme_favicon`, `delete_brand_theme_favicon`, `upload_brand_theme_background_image`, `delete_brand_theme_background_image`, `replace_customized_sign_in_page`, `delete_customized_sign_in_page`, `replace_preview_sign_in_page`, `delete_preview_sign_in_page`, `replace_customized_error_page`, `delete_customized_error_page`, `replace_preview_error_page`, `delete_preview_error_page`, `replace_sign_out_page_settings` |
| `okta.templates.read` | `list_email_templates`, `get_email_template`, `list_email_customizations`, `get_email_customization`, `get_email_customization_preview`, `get_email_default_content`, `get_email_default_content_preview`, `get_email_settings` |
| `okta.templates.manage` | `create_email_customization`, `replace_email_customization`, `delete_email_customization`, `delete_all_email_customizations`, `replace_email_settings`, `send_test_email` |
| `okta.domains.read` | `list_custom_domains`, `get_custom_domain` |
| `okta.domains.manage` | `create_custom_domain`, `replace_custom_domain`, `delete_custom_domain`, `upsert_custom_domain_certificate`, `verify_custom_domain` |
| `okta.emailDomains.read` | `list_email_domains`, `get_email_domain` |
| `okta.emailDomains.manage` | `create_email_domain`, `replace_email_domain`, `delete_email_domain`, `verify_email_domain` |

  > **Note:**  Scopes follow the pattern `okta.<resource>.read` for read-only access and `okta.<resource>.manage` for full read and write access. The `manage` scope implicitly enables all corresponding read operations on that resource.

### Enable a tool group

To activate specific tools, complete the following configuration steps:

1. Grant the scope to your Okta app:

   a. Open your app integration in the Admin Console.
   b. Select the **Okta API scopes** tab and click **Grant** for each scope that you want to enable.

1. Add the scope to client configurations:

   a. Update the `OKTA_SCOPES` value in your `mcp.json` or `settings.json` file.
   b. Include the required scopes as a space-separated string:

   ```
   "OKTA_SCOPES": "okta.users.read okta.groups.read okta.brands.read okta.templates.read"
   ```

1. Restart the client: Restart your MCP client app to apply the updated scope configurations.

  > **Note:** Start with the minimum set of scopes that your use case requires. For example, if you only need to read users and brands, use `okta.users.read okta.brands.read`. Managing scopes enables write operations, so only grant them when required.

## Next Steps

[Configure, start, and test](/docs/guides/start-mcp-server/main/) ensuring you define the `OKTA_SCOPES` environment variable to load your authorized tools.
