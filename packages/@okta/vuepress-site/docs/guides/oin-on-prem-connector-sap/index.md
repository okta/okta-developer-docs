---
title: On-prem Connector for SAP NetWeaver ABAP
meta:
  - name: description
    content: Deploy the Okta On-prem SCIM Agent and connect SAP NetWeaver ABAP to Okta for lifecycle and entitlement management.
---

Use the On-prem Connector for SAP NetWeaver ABAP to manage SAP NetWeaver users and entitlements from Okta. The connector uses the Okta On-prem SCIM Agent and the SAP Java Connector (JCo) to run operations in SAP. See [On-prem connectors](/docs/guides/oin-on-prem-connectors-overview/).

#### What you need

* An Okta org with [Okta Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga)
* An Okta admin account with permissions to add apps and configure provisioning
* An SAP NetWeaver ABAP instance
* A Linux server in the same network as SAP NetWeaver that meets the [system requirements](#system-requirements)
* Okta On-prem SCIM Agent version 3.0.0 or later

## Supported systems

The connector supports SAP solutions based on SAP NetWeaver ABAP Application Server versions 6.10, 6.20, 6.30, 2004, and 7.x, including BW/BI, GRC, SRM, PI, CRM, HCM, and ECC.

## System requirements

| Component | Requirement |
| --------- | ----------- |
| **Operating system** | Red Hat Enterprise Linux 8, 9, or 10 |
| **Java** | JDK 21 or later |
| **Processor** | 4 or more cores |
| **Memory** | 4 GB RAM for testing. Production environments need more. |
| **Storage** | 10 GB minimum |

### Network ports

| Port | Source | Destination | Purpose |
| ---- | ------ | ----------- | ------- |
| 443 | Agent server | Okta | Outbound connection that the agent uses to poll Okta |
| 32XX | Agent server | SAP application server | SAP dispatcher port |
| 36XX | Agent server | SAP message server | Required only for message server connections, such as logon groups |

`XX` is the SAP instance number. For example, port `3200` is the dispatcher port for instance `00`.

Make sure that your firewall allows the agent server to reach Okta. See [Allowlist IP addresses](https://help.okta.com/okta_help.htm?type=oie&id=ext-ip-address-allow-listing).

## Prepare the agent server

1. In the Admin Console, go to **Settings** > **Downloads**.
1. In the **Okta On-prem SCIM Agent** section, click **Download Latest**.
1. Copy the agent RPM file to a folder on the Linux server, such as `/installers`.
1. Download the [SAP Java Connector](https://support.sap.com/en/product/connectors/jco.html) for Linux.
1. Extract the SDK, and copy `libsapjco3.so` and `sapjco3.jar` to a folder on the server, such as `/installers/sap`.

## Collect SAP details

You need the following details to connect the agent to SAP:

| Detail | Description |
| ------ | ----------- |
| **Username** and **Password** | Credentials of a dedicated SAP service account. The account needs the roles listed in [SAP NetWeaver ABAP admin roles](https://help.okta.com/oie/en-us/content/topics/provisioning/opc/connectors/sap-netweaver-abap-admin-roles.htm). |
| **Connection type** | **Application server host** or **Message server host** |
| **Application server host name** | The fully qualified domain name (FQDN) or IP address of the SAP server |
| **System number** | The two-digit SAP instance number, from `00` to `97` |
| **Client** | The three-digit SAP client number |

## Add the app integration

1. In the Admin Console, go to **Applications** > **Applications**, and click **Browse App Catalog**.
1. Search for **On-prem Connector for SAP NetWeaver ABAP**, select it, and click **Add Integration**.
1. Enter an **Application label**, click **Next**, and then click **Done**.
1. On the **General** tab, click **Edit** in the **Entitlement Management** section, select **Enable**, and click **Save**.

## Install the agent and connect to SAP

1. On the **Provisioning** tab, click **Enable Provisioning**.
1. Follow the instructions on the page to install the agent on the Linux server. When prompted, enter the path to the SAP Java Connector files.
1. Select the agent from the list of active agents, and click **Next**.
1. Enter the SAP details that you collected.
1. Click **Setup complete**. After the connection succeeds, the provisioning settings appear.

## Configure provisioning

1. On the **Provisioning** tab, click **To App**, and then click **Edit**.
1. Enable the options that you need: **Create Users**, **Update User Attributes**, **Deactivate Users**, and **Sync Password**.
1. Click **Save**.
1. In the **SAP NetWeaver ABAP Attribute Mapping** section, map any extra attributes that you need. **Username** and **Email** are mapped by default.

## Import users and entitlements

1. On the **Provisioning** tab, click **To Okta**, and then click **Edit** in the **General** section.
1. Select an **Incremental Import Schedule**, such as **Weekly**, and click **Save**.
1. On the **Import** tab, click **Import Now**, select **Full Import**, and click **Import**.
1. After the import completes, link any users that Okta didn't match automatically.

## Test the integration

1. On the **Assignments** tab, click **Assign** > **Assign to People**.
1. Click **Assign** next to a test user, and then click **Assign and Continue**.
1. For the entitlement assignment method, select **Custom Values**, select entitlements, and click **Assign entitlements**.
1. In SAP, use transaction `SU01` to confirm that the user exists and has the assigned entitlements.

## Troubleshoot

### Check the agent status

In the Admin Console, open the app and go to **Provisioning** > **Integration**.

To check the status on the agent server, run the following command:

```bash
sudo systemctl status OktaOnPremScimAgent
```

### Restart the agent

Run the following command on the agent server:

```bash
sudo systemctl restart OktaOnPremScimAgent
```

### Review the logs

The agent writes logs to `/opt/OktaOnPremScimServer/logs/`:

* `configure-agent.log`
* `service.err`
* `service.out`
* `application.log`

To find SAP connection errors, run the following command:

```bash
sudo grep -iE 'SAP connection error|sapjco3|JCO_ERROR|Failed to ' /opt/OktaOnPremScimServer/logs/application.log | tail -50
```

### Uninstall the agent

> **Caution:** Uninstalling the agent stops all user and entitlement operations between Okta and SAP NetWeaver.

Run the following command on the agent server:

```bash
sudo yum remove OktaOnPremScimAgent
```
