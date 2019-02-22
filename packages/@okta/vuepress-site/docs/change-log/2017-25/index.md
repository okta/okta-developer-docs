---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.24
---

## 2017.25

### Advance Notice: Data Retention Changes

Okta is changing system log data retention. System log data is available from `/api/v1/events` or
Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data will be retained for 6 months.
* For orgs created on and after July 17th, data will be retained for 3 months.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on July 17, 2017 and later will retain this log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancements

* [System Logs Track Key Rotation and Generation](#system-logs-track-key-rotation-and-generation)
* [Client Registration API Is an Early Access Feature](#client-registration-api-is-an-early-access-feature)
* [Create OAuth 2.0 and OpenID Connect Clients with the Apps API](#create-oauth-20-and-openid-connect-clients-with-apps-api)
* [OAuth 2.0 and OpenID Connect Client App Updates Available in System Log](#oauth-20-and-openid-connect-client-app-updates-available-in-system-log)
* [Support for RP-Initiated Logout](#support-for-rp-initiated-logout)
* [OAuth 2.0 and OpenID Connect .well-known Response Includes Registration Endpoint](#oauth-20-and-openid-connect-well-known-response-includes-registration-endpoint)


#### System Logs Track Key Rotation and Generation
Logged information about key rotation and generation for apps and identity providers is available by using GET requests to either of the following endpoints: `/api/v1/events` or `/api/v1/logs`.
For more information, see [Identity Provider Signing Key Store Operations](/docs/api/resources/idps#identity-provider-signing-key-store-operations)
or [Update Key Credential for Application](/docs/api/resources/apps#update-key-credential-for-application).

Here is a response from `/api/v1/logs`
![Logged Key Rotation Event](/assets/img/release_notes/KeyRotateLog.png "Logged Key Rotation Event")
<!-- (OKTA-76607) -->

#### Client Registration API Is an Early Access Feature
The [Auth Clients API](/docs/api/resources/oauth-clients) provides operations to register and manage client applications for use with Okta's
OAuth 2.0 and OpenID Connect endpoints.

#### Create OAuth 2.0 and OpenID Connect Clients with Apps API
The [Apps API](https://developer.okta.com/docs/api/resources/apps) supports creating and configuring
OAuth 2.0 or OpenID Connect clients. Alternatively, you can use
[Client Registration API](https://developer.okta.com/docs/api/resources/oauth-clients) (RFC 7591 and RFC 7592)
to create and manage clients.
<!-- (OKTA-78223) -->

#### OAuth 2.0 and OpenID Connect Client App Updates Available in System Log
Logged information about OAuth 2.0 client updates is now available by using GET requests to
either log endpoint: `/api/v1/events` or `/api/v1/logs`.

![Logged Key Rotation Event](/assets/img/release_notes/DeactClientLog.png "Logged Key Rotation Event")
<!-- (OKTA-86738, OKTA-127445) -->

#### Support for RP-Initiated Logout
Okta supports [RP-intiated logout](http://openid.net/specs/openid-connect-session-1_0.html#RPLogout)
from OpenID Connect client apps in both the administrator UI and Okta API. You can specify a logout redirect URI,
or accept the default behavior of returning to the Okta Login page. You can access this feature on the
Create OpenID Connect Integration page (under Applications) in the UI.
<!-- (OKTA-94106) -->

#### OAuth 2.0 and OpenID Connect .well-known Response Includes Registration Endpoint
Okta returns the `registration_endpoint` in OAuth 2.0 and OpenID Connect `.well-known` responses.
<!-- (OKTA-127457) -->

### Platform Bugs Fixed

* [Invalid Availability of credentials.signing.kid](#invalid-availability-of-credentialssigningkid)
* [WWW-Authenticate Header in HTTP 401 Response](#www-authenticate-header-in-http-401-response)

#### Invalid Availability of credentials.signing.kid
The `credentials.signing.kid` property of an app was available even if its sign-on mode does not support
certificates. Only apps using the following sign-on mode types support certificates: SAML 2.0, SAML 1.1,
WS-Fed, or OpenID Connect. For more information,
see: [Application Key Store Operations](https://developer.okta.com/docs/api/resources/apps#application-key-store-operations) (OKTA-76439)

#### WWW-Authenticate Header in HTTP 401 Response
When a call to the token, introspect, or revocation endpoint of OpenID Connect or API Access Management
encountered an invalid_client error, the response did not include the WWW­Authenticate header. (OKTA-127653)
