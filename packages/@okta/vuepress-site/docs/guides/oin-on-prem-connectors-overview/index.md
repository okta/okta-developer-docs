---
title: On-prem connectors
meta:
  - name: description
    content: Learn how Okta on-prem connectors manage the user lifecycle and entitlements for on-premises apps.
---

Use on-prem connectors to manage users and entitlements in on-premises apps from Okta.

## How on-prem connectors work

An on-prem connector has two components:

* **On-prem connector app:** An app integration in the Okta Integration Network (OIN) that provides lifecycle management and Okta Identity Governance features for an on-premises app.
* **Okta On-prem SCIM Agent:** An agent that you install on a server in the same network as the on-premises app. The agent runs user and entitlement operations in the app.

The agent opens an outbound HTTPS connection to Okta on port 443 and polls Okta for tasks, so you don't need to open inbound firewall ports. The agent runs each task in the on-premises app and sends the result to Okta.

You can deploy one or more agents for each app instance:

* **Single agent:** Use one agent for test or low-volume environments.
* **Multiple agents:** Use several agents for high availability and load balancing. Each agent polls Okta independently.

## Supported features

* **Lifecycle management:** Create, update, and deactivate users, and sync passwords.
* **Imports:** Run full and incremental imports of users and entitlements, on demand or on a schedule.
* **Entitlement management:** Discover and assign entitlements in the on-premises app.
* **Okta Identity Governance:** Use access requests, access certifications, and separation of duties rules with the on-premises app.

## Available connectors

* [On-prem Connector for SAP NetWeaver ABAP](/docs/guides/oin-on-prem-connector-sap/)
