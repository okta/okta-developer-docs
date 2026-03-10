---
title: Configure offline mode for Access Gateway
meta:
  - name: description
    content: How to configure offline mode for Access Gateway
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure Temporary Offline Access (offline mode) for Access Gateway using Access Gateway APIs. Offline mode allows users to authenticate locally through Access Gateway and continue accessing protected on-premises apps, even when Access Gateway is unable to reach Okta.

> **Note:** The Access Gateway APIs that are used for offline mode configuration are available in a Limited Early Access program and may be updated or changed based on feedback. Be aware that the APIs may change.

---

#### Learning outcome

Learn how to configure Temporary Offline Access (offline mode) for Access Gateway using Access Gateway APIs.

#### What you need

* An Okta org that's subscribed to Access Gateway
* Version `2026.03.0` or later of Access Gateway
* The Offline mode feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this feature.
* An LDAP server or an Active Directory (AD) server that's synced with your Okta tenant using either the [Okta LDAP agent](https://help.okta.com/okta_help.htm?type=oie&id=ext_LDAP_Provisioning) or the [Okta AD agent](https://help.okta.com/okta_help.htm?type=oie&id=ext-ad-agent-install)
* A MySQL database and the configuration details for the database, such as the name, host, port, username, and password
* An [Okta identity provider (IdP)](https://help.okta.com/okta_help.htm?type=oag&id=ext_oag_config_idp_okta)
* An app, such as a [generic app](https://help.okta.com/okta_help.htm?type=oag&id=ext_oag_app_gen_header)

---

## Overview

Offline mode is a feature of Access Gateway that allows it to function with modified capabilities when the connection to the IdP is lost. It enables your users to authenticate locally through Access Gateway and continue accessing protected on-premises apps.

Configuring offline mode for Access Gateway is only possible by using Access Gateway APIs. This guide explains how to set up Access Gateway for API access and how to use Access Gateway APIs to configure offline mode.

## Set up Access Gateway APIs for offline mode configuration

Set up Access Gateway to authenticate to Access Gateway APIs and manage offline mode configuration and policies.

1. [Enable the Access Gateway API](#enable-the-access-gateway-api).
1. [Scopes required for offline mode](#scopes-required-for-offline-mode).

### Enable the Access Gateway API

To enable the Access Gateway API, follow the steps in [Enable the Access Gateway API](https://help.okta.com/okta_help.htm?type=oag&id=api-enable-disable).

Create a JWT token to authenticate your API requests. For instructions, see [Build a JWT for Client Authentication](/docs/guides/build-self-signed-jwt/java/main/) and [How to generate a JWT for Okta Access Gateway APIs](https://support.okta.com/help/s/article/how-to-generate-jwt-for-okta-access-gateway-apis).

### Scopes required for offline mode

After you enable the Access Gateway API, add the following scopes to an access token to manage offline mode configuration and policies:

* `okta.oag.app.manage`
* `okta.oag.idp.manage`
* `okta.oag.authenticationService.manage`

To create an access token, use the [Access Tokens API](https://developer.okta.com/docs/api/openapi/oag/oag/tags/accesstokens).

## Configure offline mode for Access Gateway

The following sections explain which endpoints to use to configure offline mode for Access Gateway.

### Enable the authentication service

The authentication service is a component of Access Gateway that handles user authentication when in offline mode. Enable the authentication service and provide the necessary configuration details so that Access Gateway can use it to authenticate users locally when in offline mode.

This step is needed only if your authentication service isn't already configured.

1. Retrieve your `certificateId` by using the [List all certificates](https://developer.okta.com/docs/api/openapi/oag/oag/tags/certificates/other/listcertificates) endpoint.
1. In the request body, include the details of your [MySQL database](#what-you-need).
1. Then, use the [Enable the authentication service setting](https://developer.okta.com/docs/api/openapi/oag/oag/tags/settings-authentication-service/other/enableauthenticationservicesetting) endpoint.

#### Request example

```bash
curl -i -X POST \
  'https://{oaghostname}/api/v2/settings/authentication-service' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "serverNodes": [
      "worker-node1.test-oag.com"
    ],
    "database": {
      "type": "mysql",
      "host": "db.domain.tld",
      "port": 3306,
      "username": "<database-username>",
      "password": "<database-password>",
      "name": "oagofflinemode"
    },
    "publicDomain": "offline-idp-service.domain.tld",
    "certificateId": "15cc2bc6-b280-4d94-a0bf-c91751b40d9c"
  }'
```

These settings indicate that the authentication service is running on an Access Gateway server node at `worker-node1.test-oag.com`, using a MySQL database hosted at `db.domain.tld` with the specified credentials. The public domain for the authentication service is `offline-idp-service.domain.tld`, and it uses the certificate with the provided ID for secure communication.

Users are directed to the `publicDomain` to authenticate when Access Gateway is in offline mode.

### Monitor your authentication service status

After you've configured offline mode, monitor the status of your authentication service.

Monitor the health of your authentication service by using [Retrieve the authentication service health check](https://developer.okta.com/docs/api/openapi/oag/oag/tags/settings-authentication-service/other/getauthenticationservicehealthcheck) endpoint.

#### Response example

```json
{
  "status": "HEALTHY",
  "lastChecked": "2026-10-01T12:34:56Z"
}
```

### Assign failover mode for the identity provider

Set your Okta IdP to use automatic failover so that Access Gateway can switch to offline mode if the IdP becomes unavailable. Enabling offline mode on your existing IdP instructs Access Gateway to use a backup directory for authentication if the online IdP becomes unavailable.

1. Retrieve your `idpId` by using the [List all IdPs](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps) endpoint.
1. Then, use the [Assign the failover mode for an IdP](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode/other/assignidpofflinemodefailovermode) endpoint.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "mode": "AUTOMATIC"
  }'
```

You've now enabled your Okta IdP to use automatic failover. This means that Access Gateway automatically switches to offline mode when the connection to your IdP is lost.

### Configure the offline mode health policy

Configure the health policy settings for offline mode to control how Access Gateway monitors the health of the connection to your IdP and when offline mode is triggered. Configure the offline mode health policy at any time.

Access Gateway sets default values for all health policy parameters. Adjust these settings based on your environment and needs.

1. Retrieve your `idpId` by using the [List all IdPs](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps) endpoint.
1. Retrieve your current health policy settings using the [Retrieve an offline mode health policy](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-health-policy/other/getofflinemodehealthpolicy) endpoint.
1. Use the [Replace an offline mode health policy](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-health-policy/other/replaceofflinemodehealthpolicy) endpoint to make any necessary changes.

#### Request example

```bash
curl -i -X PUT \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/health-policy' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "healthCheckInterval": 60,
    "timeout": 3,
    "maxRetries": 3,
    "failureThreshold": 3,
    "successThreshold": 2,
    "recoveryCooldownInterval": 360
}'
```

These health policy settings indicate that Access Gateway checks the health of the IdP connection every minute, with a timeout of three seconds. If there are three consecutive failures, Access Gateway enters offline mode. Access Gateway attempts to recover every 60 seconds. After two consecutive successful attempts, offline mode is exited after a cooldown period of six minutes.

### Test the directory connection

Optional, but recommended. Verify that your offline directory connection is functional before creating your offline mode directory. The `/idps/{idpId}/offline-mode/test-directory-connection` endpoint tests whether the authentication service can reach your offline mode directory.

1. Retrieve your `idpId` by using the [List all IdPs](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps) endpoint.
1. Then, use the [Test a directory connection](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-directory/other/createtestdirectoryconnection) endpoint.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/test-directory-connection' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "connectionUrl": "ldap://ldap.domain.tld:389",
    "bindDn": "cn=admin,dc=domain,dc=tld",
    "bindCredential": "<bind-credential>"
  }'
```

If your connection settings are correct, you receive an HTTP 204 No Content response.

### Create and configure the offline mode directory

Create an offline mode directory for your Okta IdP and configure the connection settings to your directory. The offline mode directory is a backup directory that Access Gateway uses for authentication when the connection to the online IdP is lost.

Define your directory connection and synchronization settings for authentication during offline mode. Refer to your directory credentials and structure and use those values in the request body parameters.

> **Note:** When you create a directory, the users and groups from the LDAP or AD server are synchronized to the authentication service. After the initial creation, there's an automated sync that happens every hour between your directory's server and the authentication service.
>
> However, there's not an immediate sync when you modify a directory with a [PUT request](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-directory/other/replaceofflinemodedirectory). The changes aren't synchronized to the authentication service until the next automated sync runs. You might encounter a delay before your changes to the directory are synced with the authentication service, and are applicable for offline mode authentication.

1. Retrieve your `idpId` by using the [List all IdPs](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps) endpoint.
1. Then, use the [Create an offline mode directory](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-directory/other/createofflinemodedirectory) endpoint.

#### Request example for an OpenLDAP directory

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/directories' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "OPEN_LDAP",
    "connection": {
      "connectionUrl": "ldaps://dc1.example.com:636",
      "bindDn": "cn=svc-oag,ou=service-accounts,dc=example,dc=com",
      "bindCredential": "<bind-credential>"
    },
    "config": {
      "usernameLDAPAttribute": "uid",
      "uniqueIdAttribute": "entryUUID",
      "userSearchDn": "ou=users,dc=example,dc=com",
      "userObjectClasses": [
        "inetOrgPerson"
      ],
      "userObjectFilter": "(objectClass=inetOrgPerson)",
      "groupNameLDAPAttribute": "cn",
      "groupSearchDn": "ou=groups,dc=example,dc=com",
      "groupObjectClasses": [
        "groupOfUniqueNames"
      ],
      "memberAttribute": "uniqueMember",
      "memberUserAttribute": "uid",
      "rdnLdapAttribute": "uid"
    }
  }'
```

These settings indicate that the offline mode directory is an OpenLDAP directory with the specified connection details and configuration for user and group attributes. Access Gateway uses this information to connect to the LDAP directory and synchronize user and group information for authentication during offline mode.

#### Request example for an AD directory

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/directories' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "ACTIVE_DIRECTORY",
    "connection": {
      "connectionUrl": "ldap://ad.domain.com:389",
      "bindDn": "cn=Administrator,cn=Users,DC=company,dc=com",
      "bindCredential": "<bind-credential>"
    },
    "config": {
      "usernameLDAPAttribute": "sAMAccountName",
      "uniqueIdAttribute": "objectGUID",
      "userSearchDn": "ou=CorpUsers,dc=company,dc=com",
      "userObjectClasses": [
        "user"
      ],
      "userObjectFilter": "(objectClass=user)",
      "groupNameLDAPAttribute": "cn",
      "groupSearchDn": "OU=CorpGroups,dc=company,dc=com",
      "groupObjectClasses": [
        "group"
      ],
      "memberAttribute": "member",
      "memberUserAttribute": "uid",
      "rdnLdapAttribute": "cn"
    }
  }'
```

These settings indicate that the offline mode directory is an AD directory. Access Gateway uses this information to connect to the AD directory and synchronize user and group information for authentication during offline mode.

### Use a policy to assign groups to the app for offline mode

After you've created and configured the offline mode directory, assign groups to the offline mode policy of the app. When you assign groups to the offline mode policy of the app, only users in those groups are allowed to authenticate to the app when Access Gateway is in offline mode.

Before you assign groups to the app, ensure that the groups exist in your directory. If your groups originate in Okta, sync them to your directory server using the [Okta LDAP agent](https://help.okta.com/okta_help.htm?type=oie&id=ext_LDAP_Provisioning) or [Okta AD agent](https://help.okta.com/okta_help.htm?type=oie&id=ext_AD_Provisioning).

> **Note:** You can use the `Everyone` group in the payload to assign all users to the offline mode policy.

1. Use the [List all apps](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/listapplication) endpoint to retrieve your [app's ID](#what-you-need).
1. Then, use the [Assign a group to the offline mode policy of an app](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-offline-mode/other/assignapplicationofflinemodegrouppolicy) endpoint.

#### Request example

```bash
curl -i -X PUT \
  'https://oag.domain.tld/api/v2/apps/{applicationId}/offline-mode/group-policy' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "groups": [
      {
        "name": "Admins"
      },
      {
        "name": "Developers"
      }
    ]
  }'
```

This request assigns the "Admins" and "Developers" groups to the offline mode policy of the app. Only users in these groups can authenticate to the app when Access Gateway is in offline mode.

### Assign TEST as the offline mode state for the app

Set the offline mode state for your app as `TEST`. This setting indicates that Access Gateway simulates offline mode for the app, but users can still authenticate through the online IdP. This allows you to verify that your offline mode configuration is functional before fully enabling offline mode.

1. Use the [List all apps](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/listapplication) endpoint to retrieve your [app's ID](#what-you-need).
1. Then, use the [Assign the offline mode state for an app](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-offline-mode/other/assignapplicationofflinemodestate) endpoint.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/apps/{applicationId}/offline-mode' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "state": "TEST"
  }'
```

### Test offline access to the app

Test that users can access the app when its state is `TEST`. Follow the steps in [Test example header application](https://help.okta.com/okta_help.htm?type=oag&id=app-header-test).

### Enable offline access for the app

When you're ready to enable offline mode for the app, change the offline mode state from `TEST` to `ACTIVE`.

1. Use the [List all apps](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/listapplication) endpoint to retrieve your [app's ID](#what-you-need).
1. Then, use the [Assign the offline mode state for an app](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-offline-mode/other/assignapplicationofflinemodestate) endpoint.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/apps/{applicationId}/offline-mode' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "state": "ACTIVE"
  }'
```

## Summary

You've successfully configured offline mode. Your IdP can now failover to offline mode if the connection to the online IdP is lost. And your LDAP or AD directory is set up as the backup directory for authentication during offline mode.

Users are able to sign in to the offline mode app and access resources when Access Gateway is in offline mode.

## See also

* [Access Gateway API documentation](https://developer.okta.com/docs/api/openapi/oag/guides/overview)
* [Okta Access Gateway documentation](https://help.okta.com/okta_help.htm?type=oag&id=ext_oag_main)
