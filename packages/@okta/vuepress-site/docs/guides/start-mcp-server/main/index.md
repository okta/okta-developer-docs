---
title: Configure, start, and test the Okta MCP server
meta:
  - name: description
    content: Set up your local environment variables and start the Okta Model Context Protocol (MCP) server to connect your AI agent to your Okta org.
---

Set up your local environment variables and start the Okta Model Context Protocol (MCP) server to connect your AI agent to your Okta org.

---

#### Learning outcomes

* Map your Okta app credentials to MCP environment variables.
* Start the Okta MCP server.
* Verify the connection between Okta MCP server and your Okta org.
* Use natural language commands to perform admin tasks (such as, user, group, application, and policy management).

#### What you need

* The [uv](https://docs.astral.sh/uv/getting-started/installation/) package manager.
* [Python 3.8](https://python.org/downloads) or higher.
* A local copy of the Okta MCP server project (see, [Install and initialize the Okta MCP server](https://github.com/okta/okta-mcp-server)).
* The credentials from the [app authentication for Okta MCP server](/docs/guides/configure-mcp-authentication/main/) guide:

  * Okta domain (`OKTA_ORG_URL`): Your Okta org URL (see [Find your Okta domain](/docs/guides/find-your-domain/main/)).
  * Client ID (`OKTA_CLIENT_ID`): The unique identifier for your app integration.
  * API Scopes (`OKTA_SCOPES`): The space-separated list of scopes you granted (for example, `okta.users.read okta.groups.read`).
  * Private key (`OKTA_PRIVATE_KEY`): The PEM-formatted key (Required for Private Key JWT).
  * Key ID (`OKTA_KEY_ID`): The identifier for your public key (Required for Private Key JWT).

* An MCP-compatible client, such as [Claude Desktop](https://claude.ai/download), VS Code with GitHub Copilot, or any other [MCP Client](https://modelcontextprotocol.io/clients).

---

## Overview

This guide explains how to configure your local environment using the credentials from the [app authentication for Okta MCP server](/docs/guides/configure-mcp-authentication/main/) guide. It describes how to start the Okta MCP server and verify that the server connects to your org.

---

## Configure the MCP client

The Okta MCP server works with any MCP-compatible client. This guide provides specific configuration for VS Code with GitHub Copilot and Claude Desktop. Follow similar steps to apply these environment variables to other clients, such as Amazon Bedrock.

### Configure the VS Code (GitHub Copilot)

1. Install the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot).
1. Open the **Copilot chat** view in VS Code.
1. Enable Agent mode by following the steps in the [VS Code documentation](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode#_enable-agent-mode-in-vs-code).
1. Update your VS Code settings to include the Okta MCP server configuration:
   * Press `Command + Shift + P` (MacOS) or `Ctrl + Shift + P ` (Windows) open the *Command Palette*.
   * Type "Preferences: Open User Settings (JSON)" and press *Enter*.
1. Define the connection parameters for the Okta MCP server:
   * Create a folder named `.vscode` in your project directory.
   * Create a new file inside that folder called `mcp.json`.
1. Replace `/path/to/okta-mcp-server` in the configuration below with the actual path to your cloned repository.
1. Add the following configuration to your `mcp.json` file and save it.

   ```json
   {
      "mcp": {
         "inputs": [
            {
               "type": "promptString",
               "description": "Okta org URL (for example, https://dev-123456.okta.com)",
               "id": "OKTA_ORG_URL"
            },
            {
               "type": "promptString",
               "description": "Okta client ID",
               "id": "OKTA_CLIENT_ID",
               "password": true
            },
            {
               "type": "promptString",
               "description": "Okta scopes (separated by whitespace, e.g., 'okta.users.read okta.groups.manage')",
               "id": "OKTA_SCOPES"
            },
            {
               "type": "promptString",
               "description": "Okta private key. Required for 'browserless' auth.",
               "id": "OKTA_PRIVATE_KEY",
               "password": true
            },
            {
               "type": "promptString",
               "description": "Okta key ID (KID) for the private key. Required for 'browserless' auth.",
               "id": "OKTA_KEY_ID",
               "password": true
            }
         ],
         "servers": {
            "okta-mcp-server": {
               "command": "uv",
               "args": [
                  "run",
                  "--directory",
                  "/path/to/okta-mcp-server",
                  "okta-mcp-server"
               ],
               "env": {
                  "OKTA_ORG_URL": "${input:OKTA_ORG_URL}",
                  "OKTA_CLIENT_ID": "${input:OKTA_CLIENT_ID}",
                  "OKTA_SCOPES": "${input:OKTA_SCOPES}",
                  "OKTA_PRIVATE_KEY": "${input:OKTA_PRIVATE_KEY}",
                  "OKTA_KEY_ID": "${input:OKTA_KEY_ID}"
               }
            }
         }
      }
   }
   ```

### Configure Claude Desktop

1. Open your Claude Desktop configuration file.
1. Update the settings file with the following configuration and replace the placeholder values with your actual Okta credentials:

   ```json
   {
     "mcpServers": {
       "okta-mcp-server": {
         "command": "uv",
         "args": [
           "run",
           "--directory",
           "/path/to/okta-mcp-server",
           "okta-mcp-server"
         ],
         "env": {
           "OKTA_ORG_URL": "https://your-org.okta.com",
           "OKTA_CLIENT_ID": "your-client-id",
           "OKTA_SCOPES": "okta.users.read okta.groups.read",
           "OKTA_PRIVATE_KEY": "your-private-key-if-using-jwt",
           "OKTA_KEY_ID": "your-key-id-if-using-jwt"
         }
       }
     }
   }
   ```

## Other MCP Clients

Apply the configuration parameters shown in the previous sections to other MCP-compatible clients. Refer to your client's documentation for the specific configuration file location.

---

## Start the Okta MCP server

The steps to start the server vary by client. To start the Okta MCP server in VS Code with GitHub Copilot, follow the below steps:

### VS Code

1. Open **GitHub Copilot Chat** in VS Code.
1. At the bottom right of the Copilot chat panel, click the **Tools** icon.
1. In the tools dialog at the top, search for **MCP Server: okta-mcp-server**.
1. Click the **settings** icon to open the MCP server configuration (`mcp.json`) file.
1. In the **servers** section, locate **okta-mcp-server** and click **Start** to activate the server.
1. Follow the prompts to authorize your device by entering the user code in your browser and sign in with your Okta credentials to complete the activation.
1. The server prompts you to enter the following configuration variables during the first run:

   | Variable | Description | Required |
   | :--- | :--- | :--- |
   | `OKTA_ORG_URL` | Your Okta tenant org URL (example: `https://integrator-1234567.okta.com`). | Yes |
   | `OKTA_CLIENT_ID` | The client ID copied from your Okta app. | Yes |
   | `OKTA_SCOPES` | Space-separated list of API scopes you granted to the app (example: `okta.users.read okta.groups.read`). **Note:** Only include scopes that you granted for your app. | Yes |
   | `OKTA_PRIVATE_KEY` | Your private key in PEM format (starts with `-----BEGIN PRIVATE KEY-----`). | Private key JWT only |
   | `OKTA_KEY_ID` | The key ID (KID) for your private key. | private key JWT only |

   > **Note**: If using the device authorization grant, press **Enter** to skip the `OKTA_PRIVATE_KEY` and `OKTA_KEY_ID` prompts.

1. [Optional]: To use the Okta MCP server with other MCP clients, manually add the following configuration to your client’s configuration file and restart the app for the changes to take effect:

   ```json
   {
     "mcpServers": {
       "okta-mcp-server": {
         "command": "uv",
         "args": [
           "run",
           "--directory",
           "/path/to/okta-mcp-server",
           "okta-mcp-server"
         ],
         "env": {
           "OKTA_ORG_URL": "<OKTA_ORG_URL>",
           "OKTA_CLIENT_ID": "<OKTA_CLIENT_ID>",
           "OKTA_SCOPES": "<OKTA_SCOPES>",
           "OKTA_PRIVATE_KEY": "<PRIVATE_KEY_IF_NEEDED>",
           "OKTA_KEY_ID": "<KEY_ID_IF_NEEDED>"
         }
       }
     }
   }
   ```

   * Run the server manually:

     ```shell
     uv run okta-mcp-server
     ```

---

## Verify connection

Confirm that the Okta MCP server has established a secure connection between your MCP client and Okta management APIs. Your MCP client should display a status showing the Okta MCP server is connected and ready. The Okta MCP server should appear in your client's available tools.

Manage your Okta org using natural language commands through your AI agent after starting and authenticating your MCP server.

### Example commands

Use the following conversational prompts to interact with your Okta org:

1. List users
   * How many users do I have in my Okta org?
   * List all users in the Engineering department.
1. Create users and groups
   * Create a new user Jane Doe with email `jane.doe@company.com` and add her to the marketing group.
   * Create a group called the sales team and add three users to it.
1. Manage applications
   * Show me all active applications in my org.
1. Security and auditing
   * Show me all failed login attempts from the last 24 hours.
   * Generate a security audit report for the last 30 days. Highlight all changes to user and group memberships.
1. Policy management
   * Create a password policy that requires 12 characters with special characters for the Engineering group.
   * Give me a list of all active users in the 'Finance' group who are assigned to 'Salesforce' but haven't logged into Okta in the last 60 days.
   * Evaluate the policy's logic and compare it to the user's context (such as, their device, and OS) from the log.

---

## Summary

You configured your environment variables, started the Okta MCP server, and verified the connection to your Okta org.

## Next steps

Now that your Okta MCP server is running, explore advanced use cases to manage your Okta org:

* Automate user onboarding: Create workflows that provision users, assign groups, and grant application access with a single command.
* Audit security logs: Query system logs to identify unusual sign-in activity or configuration changes.
* Policy automation: Manage authentication policies and MFA requirements programmatically.

For a complete list of supported operations and tools, see the [Okta MCP server repo](/docs/guides/okta-mcp-server/main/).
