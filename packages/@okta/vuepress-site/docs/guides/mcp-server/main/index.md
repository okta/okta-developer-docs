---
title: Access admin management APIs with Okta MCP server
meta:
  - name: description
    content: mcp
layout: Guides
sections:
- main
---

Get started with the Okta Model Context Protocol (MCP) server setup and prerequisites.

---

#### Learning outcomes

* Verify the prerequisites and initialize your local MCP server project.

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup) with admin permissions.
* [Super admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin) in your Okta org.
* The [uv](https://docs.astral.sh/uv/getting-started/installation/) package manager.
* [Python 3.8](https://python.org/downloads) or higher.

---

## Overview

This guide explains how to initialize the Okta MCP server project and install required dependencies. To learn about the Okta MCP server architecture, see the introductory page on Okta MCP server.

---

## Install and configure the Okta MCP server

### Set up the project

Install and configure the Okta MCP server project for integration with your chosen MCP client.

1. Initialize the Okta MCP server project:

    ```shell
    # Clone the Git repo
    git clone https://github.com/okta/okta-mcp-server.git

    # Change directory
    cd okta-mcp-server
    ```

1. Install dependencies and set up the project:

    ```shell
    uv sync
    ```

## Next steps

After the project environment is ready, continue to the guide to configure an Okta application integration and obtain authentication credentials.
