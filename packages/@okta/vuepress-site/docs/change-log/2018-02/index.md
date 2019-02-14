---
title: Okta API Products Change Log
---

## 2018.02

### Feature Enhancements

| Feature Enhancement                          | Expected in Preview Orgs | Expected in Production Orgs |
|:---------------------------------------------------|:------------------------------------|:---------------------------------------|
| [App User Schema API is Generally Available](#generally-available-app-user-schema-api)   | January 10, 2018          | February 13, 2017  |
| [SHA-256 Certificates for New SAML 2.0 Apps is Generally Available](#generally-available-sha-256-certificates-for-saml-20-apps) | Available  Now        | January 10, 2018                |

#### Generally Available: App User Schema API
Use the [App User Schema API](/docs/api/resources/schemas#app-user-schema-operations) to work with App User profiles, typically for apps that have features for provisioning users. <!--OKTA-154105-->

#### Generally Available: SHA-256 Certificates for SAML 2.0 Apps

When you create a SAML 2.0 app in Okta, the app is created with SHA-256 signed public certificates. Certificates for existing SAML 2.0 apps aren't changed. To update an existing app, use [these instructions](/docs/how-to/updating_saml_cert#existing-saml-20-app-integrations).<!--OKTA-132058-->

### Bug Fixes

The following bugs have been fixed, and are expected in preview orgs starting January 10, 2018, and in production orgs starting January 16, 2018.

* Network zones couldn't be deleted if they were associated with a sign-on policy, even after the policy has been deleted. (OKTA-150747)
* Results returned from the Users API incorrectly reported the status of some users who were mastered by Active Directory. The statuses `PASSWORD_RESET` or `LOCKED_OUT` were reported as `ACTIVE`. (OKTA-153214, OKTA-151861)
