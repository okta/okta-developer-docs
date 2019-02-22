---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.23
---

## 2017.24

### Advance Notices

* [Key Rollover Change](#key-rollover-change)
* [Data Retention Policy Changes](#data-retention-changes)

#### Key Rollover Change

Beginning in Release 2017.25, the `credentials.signing.kid` property of an app won't be available if the app doesn't support the key rollover feature.
An app supports key rollover if the app uses one of the following signing mode types: SAML 2.0, SAML 1.1, WS-Fed, or OpenID Connect.

Before this change takes effect, verify that your integration doesn't expect the `credentials.signing.kid` property
if your app doesn't have one of the listed signing mode types. This change is expected in Release 2017.25,
which is scheduled for preview orgs on June 21, 2017 and in production orgs on June 26, 2017. <!-- OKTA-76439 -->

#### Data Retention Changes

Okta is changing system log data retention. System log data is available from `/api/v1/events` or Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data will be retained for 6 months.
* For orgs created on and after July 17th, data will be retained for 3 months.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on July 17,2017 and later will retain this log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancements

* [Default Scopes for OAuth 2.0](#default-scopes-for-oauth-20)
* [Improved UI for Creating OpenID Connect Apps](#improved-ui-for-creating-openid-connect-apps)
* [Event Notifications for OpenID Connect Apps](#event-notifications-for-openid-connect-apps)
* [Query String Support in IdP Redirect URLs](#query-string-support-in-idp-redirect-urls)
* [API Rate Limit Improvements](#api-rate-limit-improvements)


#### Default Scopes for OAuth 2.0

Using either the administrator UI or API, you can configure default scopes for an OAuth 2.0 client.
If the client omits the scope parameter in an authorization request,
Okta returns all default scopes in the Access Token that are permitted by the access policy rule.

![Default Scope Configuration UI](/assets/img/release_notes/default-scope.png "Default Scope Configuration UI")

For more information about setting default scopes in the API, see [OAuth 2.0 API](/docs/api/resources/authorization-servers#scope-properties).
<!-- OKTA-122185 OKTA-122072 -->

#### Improved UI for Creating OpenID Connect Apps

The wizard for creating an OpenID Connect app has been improved and consolidated onto a single screen.

![New OpenID Connect Create Wizard](/assets/img/release_notes/single-oidc-screen.png "New OpenID Connect Create Wizard")

<!-- OKTA-129127 -->

#### Event Notifications for OpenID Connect Apps

Notifications are entered in the System Log via the Events API (`/api/v1/events`) when OpenID Connect apps are created, modified, deactivated, or deleted.
Previously these notifications appeared only in the System Log (`/api/v1/logs`).

#### Query String Support in IdP Redirect URLs

Query strings are now supported in the definition of IdP Login URLs:

* The **IDP Login URL** field in the Add/Edit Endpoint wizard.
* The **IdP Single Sign-On URL** field for Inbound SAML. Reserved SAML parameters (SAMLRequest, RelayState, SigAlg, Signature) in a query string are ignored.<!-- OKTA-127771 -->

#### API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately lessens the chances of one user's request impacting another. We're also providing a transition period so you can see what these changes look like in your Okta system log before enforcing them:

##### Preview Orgs

We enforce new rate limits for all preview orgs. API calls exceeding the new rate limits return an HTTP 429 error.

##### Production Orgs

1. As of May 8, we enabled a System Log alert which lets you know if you have exceeded any of the new API rate limits:

    ```
    Warning: requests for url pattern <url-pattern> have reached
    a threshold of <number> requests per <time-duration>. Please
    be warned these rate limits will be enforced in the near future.
    ```

2. As of mid-May, we started enforcing these new rate limits for all newly created orgs. For these new orgs, instead of alerts in your System log, the API calls exceeding the new rate limits return an HTTP 429 error.

3. We are rolling out the enforcement of these new rate limits to all orgs this week. Once your org has the new limits, you'll see HTTP 429 errors instead of rate-limit warnings in the System Log if the new limits are exceeded.

For a full description of the new rate limits, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Platform Bug Fixed

* The dropdown that controls Authorization Server lifecycle operations failed to display properly if you navigated directly to a tab or refreshed a tab other than Settings. (OKTA-129014)
