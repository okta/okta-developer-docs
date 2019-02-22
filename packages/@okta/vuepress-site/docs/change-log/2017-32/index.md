---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.31
---

## 2017.32

### Platform Feature Enhancements

| Feature Enhancement                                                                                                 | Expected in Preview Orgs | Expected in Production Orgs             |
|:--------------------------------------------------------------------------------------------------------------------|:-------------------------|:----------------------------------------|
| [Default Custom Authorization Server](#default-custom-authorization-server)                                         | August 9, 2017           | August 14, 2017                         |
| [Web App Supports Client Credential Grant Type](#web-app-supports-client-credential-grant-type)                     | August 9, 2017           | August 14, 2017                         |
| [OpenID Connect Group Claim Retrieves Application Groups](#openid-connect-group-claim-retrieves-application-groups) | August 9, 2017           | August 14, 2017                         |
| [SHA-256 Signed Certificates for New SAML 2.0 Apps](#sha-256-signed-certificates-for-new-saml-20-apps)              | Generally Available now  | Generally Available beginning 9/11/2017 |

#### Default Custom Authorization Server
<!-- OKTA-133786 -->

Okta provides a pre-configured Custom Authorization Server named `default`.
This default authorization server includes a basic access policy and rule, which you can edit to control access.
It allows you to specify `default` instead of the `authServerId` in requests to it:

* `https://{yourOktaDomain}/api/v1/authorizationServers/default` vs
* `https://{yourOktaDomain}/api/v1/authorizationServers/${authServerId}` for other Custom Authorization Servers

#### Web App Supports Client Credential Grant Type
<!-- OKTA-102062 -->

OAuth 2.0 clients now support [configuration of the `web` application type to use a `client_credential` grant type](/docs/api/resources/oauth-clients#client-application-properties).
This allows you to use one `client_id` for an application that needs to make user-specific calls and back-end calls for data.

#### OpenID Connect Group Claim Retrieves Application Groups
<!-- OKTA_132193 -->

OpenID Connect, which uses the Okta Authorization Server, can retrieve [application groups](/docs/api/resources/apps#application-group-model) for use in tokens.
Previously, application groups could only be retrieved with the Custom Authorization Server.

You can use the Okta Expression Language [`getFilteredGroups` function](/reference/okta_expression_language/#group-functions) to retrieve application groups.

#### SHA-256 Signed Certificates for New SAML 2.0 Apps

All new SAML 2.0 apps are bootstrapped with SHA-256 signed public certificates. Existing SAML 2.0 apps are unchanged.

### Platform Bug Fixes

Bug fixes are expected on preview orgs starting August 9, 2017, and on production orgs starting August 14, 2017.

* The **Add policy** button wasn't disabled for Org Admins, who don't have permission to create authorization server policies. (OKTA-127450)
* Some requests to `/oauth2/v1/authorize` with the `state` parameter incorrectly returned an error. (OKTA-130916)
* When an ID token was minted for a custom authorization server, an app sign-on event wasn't generated. (OKTA-134554)
