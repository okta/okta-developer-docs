---
title: Configure offline mode for Access Gateway
meta:
  - name: description
    content: How to configure offline mode for Access Gateway
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure Temporary Offline Access (offline mode) for Access Gateway using Access Gateway APIs. Offline mode allows users to authenticate locally through Access Gateway and continue accessing protected on-premises applications, even when Access Gateway is unable to reach Okta.

> **Note:** The Access Gateway APIs that are used for offline mode configuration are in Early Access (EA).

---

#### Learning outcome

Learn how to configure Temporary Offline Access (offline mode) for Access Gateway using Access Gateway APIs.

#### What you need

An Okta org that's subscribed to Access Gateway

---

## Overview

Offline mode is a feature of Access Gateway that allows it to continue functioning with modified capabilities when the connection to the identity provider (IdP) is lost. It enables your users to authenticate locally through Access Gateway and continue accessing protected on-premises applications.

You can only configure offline mode for Access Gateway using Access Gateway APIs. This guide explains how to set up Access Gateway for API access and how to use Access Gateway APIs to configure offline mode.

## Set up Access Gateway APIs for offline mode configuration

Set up Okta so that you can authenticate to Okta APIs and have the proper roles and scopes to manage labels:

1. [Enable the Access Gateway API](#enable-the-access-gateway-api).
1. [Scopes required for offline mode](#scopes-required-for-offline-mode).

### Enable the Access Gateway API

To enable the Access Gateway API, follow the steps in [Enable the Access Gateway API](https://help.okta.com/okta_help.htm?type=oag&id=api-enable-disable).

You must create a JWT token to authenticate your API requests. For instructions, see [Build a JWT for Client Authentication](/docs/guides/build-self-signed-jwt/java/main/) and [How to generate a JWT for Okta Access Gateway APIs](https://support.okta.com/help/s/article/how-to-generate-jwt-for-okta-access-gateway-apis).

### Scopes required for offline mode

After you enabled the Access Gateway API, add the following scopes to an access token to manage offline mode configuration and policies:

* `okta.oag.app.manage`
* `okta.oag.idp.manage`
* `okta.oag.authenticationService.manage`

To create an access token, use the [Access Tokens API](https://developer.okta.com/docs/api/openapi/oag/oag/tag/AccessTokens/).

## Configure offline mode for Access Gateway

The following sections explain which endpoints to use to configure offline mode for Access Gateway.

### Assign failover mode for the identity provider

Set your Okta IdP to use automatic failover so that Access Gateway can switch to offline mode if the IdP becomes unavailable. Enabling offline mode on your existing IdP instructs Access Gateway to use a backup directory for authentication if the online IdP becomes unavailable.

Use the [Assign the failover mode for an IdP](/openapi/oag/oag/tag/IDPs-Offline-Mode/#tag/IDPs-Offline-Mode/operation/assignIdPOfflineModeFailoverMode) endpoint.

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

You have now enabled your Okta IdP to use automatic failover. This means that Access Gateway can switch to offline mode if the IdP becomes unavailable.

### Create and configure the offline mode directory

Create an offline mode directory for your IdP and configure the connection settings to your LDAP directory. The offline mode directory is a backup directory that Access Gateway uses for authentication when the connection to the online IdP is lost.

You must define your LDAP directory connection and synchronization settings for authentication during offline mode. Refer to your LDAP directory credentials and structure and use those values in the request body parameters.

Use the [Create an offline mode directory](/openapi/oag/oag/tag/IDPs-Offline-Mode-Directory/#tag/IDPs-Offline-Mode-Directory/operation/createOfflineModeDirectory) endpoint.

#### Request example

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
        "inetOrgPerson",
        "organizationalPerson"
      ],
      "userObjectFilter": "(objectClass=inetOrgPerson)",
      "groupNameLDAPAttribute": "cn",
      "groupSearchDn": "ou=groups,dc=example,dc=com",
      "groupObjectClasses": [
        "groupOfUniqueNames"
      ],
      "memberAttribute": "uniqueMember",
      "memberUserAttribute": "uid",
      "rdnLdapAttribute": "cn"
    }
  }'
```

These settings indicate that the offline mode directory is an OpenLDAP directory with the specified connection details and configuration for user and group attributes. Access Gateway uses this information to connect to the LDAP directory and synchronize user and group information for authentication during offline mode.

Your offline mode directory is now created and configured.

#### Response example

```json
{
  "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
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
      "inetOrgPerson",
      "organizationalPerson"
    ],
    "userObjectFilter": "(objectClass=inetOrgPerson)",
    "groupNameLDAPAttribute": "cn",
    "groupSearchDn": "ou=groups,dc=example,dc=com",
    "groupObjectClasses": [
      "groupOfUniqueNames"
    ],
    "memberAttribute": "uniqueMember",
    "memberUserAttribute": "uid",
    "rdnLdapAttribute": "cn"
  }
}
```

Copy the connection URL in the response to use in the next step.

### Test the directory connection

Optional. Verify that your offline directory connection is functional before entering offline mode.

Use the [Create a test directory connection](/openapi/oag/oag/tag/IDPs-Offline-Mode-Directory/#tag/IDPs-Offline-Mode-Directory/operation/createTestDirectoryConnection) endpoint.

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

The `connectionUrl` can be found in the [response](#create-and-configure-the-offline-mode-directory) from the previous step. The `bindDn` and `bindCredential` are the same credentials you used to create the offline mode directory.

If your connection settings are correct, you receive an HTTP 204 No Content response.

### Configure the offline mode health policy

Optional. You can configure the health policy settings for offline mode to control how Access Gateway monitors the health of the connection to your IdP and when offline mode is triggered.

Access Gateway sets default values for all health policy parameters, but you can adjust these settings based on your environment and needs.

1. Retrieve your current health policy settings using the [Retrieve an offline mode health policy](/openapi/oag/oag/tag/IDPs-Offline-Mode-Health-Policy/#tag/IDPs-Offline-Mode-Health-Policy/operation/getOfflineModeHealthPolicy) endpoint.
1. Use the [Replace an offline mode health policy](/openapi/oag/oag/tag/IDPs-Offline-Mode-Health-Policy/#tag/IDPs-Offline-Mode-Health-Policy/operation/replaceOfflineModeHealthPolicy) endpoint to make any necessary changes.

#### Request example

```bash
curl -i -X PUT \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/health-policy' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "healthCheckInterval": 180,
    "timeout": 4,
    "maxRetries": 2,
    "failureThreshold": 4,
    "successThreshold": 3,
    "recoveryCooldownInterval": 144000
  }'
```

These health policy settings indicate that Access Gateway checks the health of the IdP connection every 3 minutes, with a timeout of 4 seconds. If there are 4 consecutive failures, Access Gateway enters offline mode. Access Gateway attempts to recover every 4 hours and requires 3 consecutive successful health checks to exit offline mode.

### Enable the authentication service

The authentication service is a component of Access Gateway that handles user authentication when in offline mode. You need to enable the authentication service and provide the necessary configuration details for it to function properly.

This step is needed only if your authentication service isn't already configured. Enabling the authentication service provides Access Gateway with the necessary information to set up the service, including server nodes, database connection details, public domain, and certificate information.

After the authentication service is enabled, Access Gateway can use it to authenticate users locally when in offline mode.

Use the [Enable the authentication service setting](/openapi/oag/oag/tag/Settings-Authentication-Service/#tag/Settings-Authentication-Service/operation/enableAuthenticationServiceSetting) endpoint.

#### Request example

```bash
curl -i -X POST \
  https://oag.domain.tld/api/v2/settings/authentication-service \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "serverNodes": [
      "worker-node1.test-oag.com"
    ],
    "database": {
      "type": "mysql",
      "host": "db.domain.tld",
      "port": 5432,
      "username": "<database-username>",
      "password": "<database-password>",
      "name": "oagofflinemode"
    },
    "publicDomain": "offline-idp-service.domain.tld",
    "certificateId": "15cc2bc6-b280-4d94-a0bf-c91751b40d9c"
  }'
```

These settings indicate that the authentication service is running on a server node at `worker-node1.test-oag.com`, using a MySQL database hosted at `db.domain.tld` with the specified credentials. The public domain for the authentication service is `offline-idp-service.domain.tld`, and it uses the certificate with the provided ID for secure communication.

Users are directed to the public domain to authenticate when Access Gateway is in offline mode.

### Monitor your offline mode status

After you've configured offline mode, you can monitor the status of your IdP connection and the health of the authentication service.

Monitor the health of your authentication service by using [Retrieve the authentication service health check](/openapi/oag/oag/tag/Settings-Authentication-Service/#tag/Settings-Authentication-Service/operation/getAuthenticationServiceHealthCheck) endpoint.

## Summary

You've successfully configured offline mode. Your IdP can now failover to offline mode if the connection to the online IdP is lost. And your LDAP directory is set up as the backup directory for authentication during offline mode.

## See also

* [Access Gateway API documentation](https://developer.okta.com/openapi/oag/guides/overview/)
* [Temporary Offline Access (Disconnected Mode)]()