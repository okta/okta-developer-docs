---
title: Install and initialize the Okta MCP server
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

* Verify the prerequisites and initialize your local Okta MCP server project.

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup) with admin permissions.
* Select an Okta admin role. See [Learn about administrators](https://help.okta.com/okta_help.htm?type=oie&id=administrators-learn-about-admins).
* The [uv](https://docs.astral.sh/uv/getting-started/installation/) package manager.
* [Python 3.8](https://python.org/downloads) or higher.

---

## Overview

This guide explains how to initialize the Okta MCP server project and install the required dependencies. To learn about the Okta MCP server architecture, see the [introductory page](/docs/concepts/mcp-server/) on the Okta MCP server.

---

## Install the Okta MCP server

You can install the Okta MCP server using one of the following two methods:

* [Method 1: Using Docker](#method-1-using-docker)
* [Method 2: Using uv](#method-2-using-uv)

### Method 1: Using Docker

Docker provides a consistent environment without needing to install Python or uv locally.

1. Clone the repository:

    ```shell
    # Clone the Git repo
    git clone https://github.com/okta/okta-mcp-server.git

    # Change directory
    cd okta-mcp-server
    ```

1. Configure environment variables as follows:

    ```
    cp .env.example .env
    ```

1. Edit .env and add your Okta credentials.

1. Build and run the environment with Docker Compose:
    ```
    docker-compose up -d
    ```

### Method 2: Using uv

Use this method for local development or if you prefer to use a lightweight Python environment.

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

---

## Next steps

[Set up Okta app authentication](/docs/guides/configure-mcp-authentication/main/) for the Okta MCP server to create the required credentials and grant API scopes.