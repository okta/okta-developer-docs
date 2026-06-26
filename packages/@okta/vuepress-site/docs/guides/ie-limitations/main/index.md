---
title: Identity Engine limitations
excerpt: Okta Identity Engine introduces a lot of changes to the Okta platform. Some of these changes result in a lack of support for previously available features.
---

<ApiLifecycle access="ie" />

Okta Identity Engine introduces many changes to the Okta platform. Some of these changes result in a lack of support for previously available features. Also, some of these changes result in Identity Engine features not supported for use with Classic Engine APIs.

> **Note:** To update your integrations for these changes, see [API changes after the upgrade](/docs/guides/oie-upgrade-api-changes/main/).

To find which of these features and integrations your org actually uses, see [Identify your Okta authentication integrations and customizations](/docs/guides/oie-upgrade-identify-integrations/).

Are you an admin? See the Identity Engine [limitations](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-limitations) doc for admins.

> **Note:** This doc is designed for people who are familiar with Classic Engine. If you're new to Okta and Identity Engine, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) with Identity Engine.

## Classic Engine features not supported in Identity Engine

### Custom sign-in page for embedded app links

**What Changed:** Using a custom sign-in page for embedded app links isn't supported. Users who click an app embed link are now evaluated by their org's global session policy (called the **Okta sign-on policy** in Classic Engine). Admins can customize an Okta-hosted sign-in page or configure an IdP routing rule for the app.

**Further information:** [Configure a custom Okta-hosted sign-in page](/docs/guides/custom-widget/) and [Configure routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext_Identity_Provider_Discovery).

***

### Event type availability for event hooks

**What changed:** The following event types aren't available in Identity Engine because Device Trust isn't currently supported:

* `user.authentication.authenticate`
* `user.credential.enroll`

The following event type isn't available in Identity Engine because it's no longer being triggered:

`user.account.unlock_token`

The following event types are available only in Identity Engine:

* `device.enrollment.create`
* `user.mfa.factor.suspend`
* `user.mfa.factor.unsuspend`
* `security.authenticator.lifecycle.activated`
* `security.authenticator.lifecycle.deactivate`

**Further information:** [Event types](/docs/reference/api/event-types/)

***

### Support number

**What changed:** In Identity Engine, if the user is unable to use an authenticator, the support number is no longer provided. The only support available is the authenticator list page that provides alternative ways for the user to authenticate.

***

### Self-Service Registration

**What changed:** The Classic Engine Self-Service Registration feature isn't supported. The Identity Engine Self-Service Registration is now accomplished through a user profile policy. In a user profile policy, admins select the attributes they want to collect when a new end user clicks **Sign up**. After the end user is authenticated into the app, their profile is complete and they're provisioned to the appropriate groups.

> **Note:** The form for the user profile policy only supports read-write attributes. If you added read-only or hidden attributes to your Self-Service Registration form in Classic Engine, they're not migrated to your user profile policy.

**Further information:** APIs not supported in Identity Engine self-registration: POST `/api/v1/registration`.

See [Configure user profile policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).

***

### Session token created before an Identity Engine upgrade prompts user for password after upgrade completes

**What changed:** If a user authenticates in Classic Engine (which creates a `sessionToken`), and the upgrade to Identity Engine completes while the `sessionToken` is valid (five minutes), then when a user attempts to access an OpenID Connect app after the upgrade, the user is prompted for their password again.

> **Note:** This scenario only happens during an upgrade from Classic Engine to Identity Engine. It doesn't continue to happen after the upgrade.

***

## Okta Sign-In Widget upgrade

For Identity Engine, some specific objects that were previously in the Sign-In Widget configuration are no longer supported and must be removed. Also, specific feature flags aren't supported when you upgrade Sign-In Widget and must be removed from `features` in the JSON code. See [Upgrade your Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/main/) for a comprehensive list of configuration and feature changes. Before you upgrade production, see [Test your widget's existing customizations in a test environment](/docs/guides/oie-upgrade-test-widget-custom/main/).
