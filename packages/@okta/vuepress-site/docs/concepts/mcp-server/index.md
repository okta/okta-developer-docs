---
title: Okta Model Context Protocol (MCP) server
meta:
  - name: description
    content: Connect LLMs to Okta with the Model Context Protocol (MCP).
---

# Manage Okta APIs with the Okta MCP server

The Okta Model Context Protocol (MCP) server securely connects AI agents and Large Language Models (LLMs) to an Okta org. This abstraction layer enables AI agents and LLMs to interact with Okta admin management APIs using natural language commands.

The Okta MCP server translates natural language instructions into structured API calls between LLM clients and an Okta org using Okta's Python SDK v3.4.1. This approach reduces security risks and complexity when connecting autonomous AI agents to Identity and Access Management (IAM) systems. The architecture ensures that AI actions remain secure, properly scoped, and fully auditable.

IT admins, developers, and security professionals use the Okta MCP server to automate Okta administration through AI-powered interfaces.

## Deployment options: Self-hosted and Okta-hosted

To integrate AI assistants securely with your identity infrastructure, the Okta Model Context Protocol (MCP) server can be deployed using two distinct hosting options: Self-hosted and Okta-hosted.

You can choose the deployment track that matches your technical requirements:

* **Self-hosted MCP server:** You run the server software locally on your own network. This track is best for developers who want to modify the underlying server code. See, [Self hosted MCP server](/docs/guides/self-hosted-okta-mcp-server/) documentation.

* **Okta-hosted MCP server:** Okta hosts and manages the gateway in the cloud. Your chat client streams instructions over secure HTTPS, which removes local software installations and hosting fees. This setup simplifies onboarding for nontechnical users, such as Okta Identity Governance (OIG) request approvers, who need a ready-made tool without local configuration. It also supports browser-based tools and lets you run clients and servers on separate containers for better flexibility. See, Okta hosted MCP server documentation.

The following table compares the two hosting options:

| Feature | Self-hosted | Okta-hosted |
| :--- | :--- | :--- |
| **Where it runs** | Your computer, a company container, or a private cloud. | Okta cloud infrastructure. |
| **Setup required** | Install python packages, clone code repositories, and maintain tools manually. | No software to install. You connect using a web address. |
| **How it connects** | Uses local standard input and output channels on your machine. | Uses a secure internet connection (HTTPS). |
| **Sign-in method** | Browser sign-in or secure digital keys. | Uses the signed-in user's active Okta credentials. |
| **Maintenance** | You handle costs, updates, security patches, and logs. | Okta handles upgrades, scaling, and system performance. |
| **Best for** | Developers testing code in a sandbox or using a command-line interface. | Help Desk teams, IT admins, and automated Workflows. |

## Benefits

The Okta MCP server addresses security, automation, and integration requirements.

- **Security features:** The Okta MCP server reduces risks by acting as a security checkpoint for AI-initiated actions.
- **Access control**: The server enforces the principle of least privilege through scope-based tool loading and pre-defined tool definitions.
- **Compliance**: The system provides audit trails for compliance and security monitoring.
- **Operational efficiency**: Admins execute identity operations, such as security playbooks and repetitive tasks, with natural language commands.
- **Standardized communication**: The server uses a standardized protocol to eliminate the need for custom middleware or integration code.

> **Note**: For a list of operations and tools, refer to the [okta-mcp-server](https://github.com/okta/okta-mcp-server/) repo.

## Secure AI agent interactions

The Okta MCP server implements AI agent identity security through the following methods:

### Principle of least privilege

The Okta MCP server ensures AI agents possess only the minimum permissions required for specific tasks.

- The server manages authentication through OAuth 2.0 scopes and environment variables.
- The server dynamically registers tools based on the granted API scopes of the Okta admin app, ensuring the LLM only sees authorized capabilities.
- The system blocks unauthorized API calls before those calls reach the org.

### Audibility and traceability

The Okta MCP server maintains a detailed record of all agent interactions to support security monitoring.

- The server creates a complete audit trail of all AI agent activities.
- The system integrates with Okta system logs for centralized monitoring and security investigations.
- The server provides data to support compliance requirements and internal security audits.

## How the Okta MCP server works

The following process describes how an LLM translates a request and how the Okta MCP server executes the API call against Okta APIs.

<div class="full">

![Okta MCP server data flow diagram](/img/concepts/mcp-server-flow-diagram.png)

</div>

1. **User command**: A user or AI agent (such as GitHub Copilot or Claude Desktop) sends a natural language command through an MCP-compatible client to perform an Okta task.
1. **Client routing**: The MCP client (which hosts the AI agent) securely routes the command to the active Okta MCP server instance.
1. **Server authentication**: The Okta MCP server authenticates with the org using the pre-configured credentials, such as Device Authorization Grant or Private Key JWT.
1. **Scope validation**: The Okta MCP server validates scope twice. First, it filters tools during startup. Second, it uses a scope guard decorator to confirm active permissions immediately before executing a command and calling the API.
1. **Response handling**: The APIs return a technical response to the Okta MCP server.
1. **Natural language response**: The Okta MCP server passes the data to the LLM, which formats the information into a natural language response for the user.

## Core functionality and capabilities

The Okta MCP server enables AI agents to perform the following actions through natural language.

| **Category** | **Example operations** |
| --- | --- |
| User management | Create, list, retrieve, update, deactivate, delete users, and manage user profile attributes. |
| Group administration | Create, list, retrieve, update, and delete groups. Add and remove users from groups, and view group memberships. |
| App management | List, retrieve, create, update, activate and deactivate apps. View app assignments. |
| Policy and security management | Manage authentication policies, password rules, MFA configurations, and device assurance policies. |
| System monitoring and logs | Filter System Logs, generate security audit reports, and query specific sign-in failures. |
| Brands and customization | Manage brands, themes, custom pages, email templates, and custom domains. |

## Security and authentication

The Okta MCP server supports two authentications flows for different use cases:

### OAuth 2.0 Device Authorization Grant (browser-based)

This browser-based flow is recommended for interactive use and local development. The Okta MCP server initiates a flow where the user signs in through a browser. Upon successful authentication, the Okta MCP server exchanges the authorization for a secure access token.

### Private Key JWT (browserless)

This browserless flow is recommended for automation, CI/CD pipelines, and headless environments. The Okta MCP server authenticates using a cryptographic key pair, which enables authentication without user intervention.

## Next steps

To connect an LLM to an org, follow the [Okta MCP server implementation guide](/docs/guides/mcp-server/main/) for setup instructions.
