---
title: Release lifecycle
---

The Release lifecycle is now available at the new [Okta API reference portal](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/).

<!--
# Release lifecycle

Okta features travel through a regular lifecycle:

- [Beta](#beta)
- [Early Access (EA)](#early-access-ea)
- [General Availability (GA)](#general-availability-ga)

> **Note:** Okta reserves the right to add new parameters, properties, or resources to the API without advance notice.
These updates are non-breaking because they're additive. Follow [the compatibility rules](/docs/reference/core-okta-api/) to ensure that your application doesn't break when additive changes are made. Breaking changes such as removing or renaming an attribute are released as a new version of the API. Okta provides a migration path for new API versions.

Changes, regardless of lifecycle stage, are always reported in the [Okta API Products Release Notes](/docs/release-notes/).

## Quick reference table

| Description                | Beta                 | EA                   | GA                   | Deprecated |
| :------------              | :------------------: | :-----------------:  | :------------------: | :---------:|
| Contact with Product team  | &check;              | &cross;              | &cross;              | N/A         |
| API changes                | Subject to change    | Backwards compatible | Backwards compatible | N/A        |
| Okta Support               | &cross;              | &check;              | &check;              | &check;    |
| Service-level agreements   | &cross;              | &check;              | &check;              | &check;    |
| Announced in release notes | &cross;              | &check;              | &check;              | &check;    |
| In Preview orgs            | By invitation or self-service, depending on the feature | By request or self-service, depending on the feature | &check;| &check;|
| In Production orgs         | &cross;              | By request or self-service, depending on the feature| &check;| &check; |
| Documentation              | Limited              | &check;              | &check;              | N/A         |

## Beta

Each feature's Product team manages and supports the feature and internally validates it for a set of use cases. Minimal documentation is directly provided to customers for API-related Beta releases and is normally not publicly hosted. API endpoint and configuration information is normally supplied.

> **Important:** Okta only enables Beta features in Preview org environments. Okta Customer Support doesn't support these features. Beta features can change at any time during the Beta release.

Okta selects a few customers for early testing of features in a Beta release. Customers participating in a Beta program agree to provide feedback that is required for maturing the feature. Market requirements for a feature determine the timeline for addressing specific areas of feedback (including bugs).

Beta releases are managed in two ways:

- **Beta:** Involves regular contact with Okta, which may include conference calls between you and Okta that cover specific use cases, deployment guidance, and feedback. Betas are also announced to customers through the Ozone newsletter and communities. Okta may also solicit customers to participate in a Beta through email.

- **Beta (Self-Service):** Self-directed without ongoing support or regular contact with Okta. Contact is primarily limited to collecting feedback. If you're interested in using a Beta Self-Service feature, enable that feature for your org from the **Settings** > **Features** page in the Admin Console.

You can track the availability of Beta features on the [Product Roadmap](https://support.okta.com/help/s/productroadmap) page.

See [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features) for more information on the Self-Service Feature Manager.

## Early Access (EA)

A feature in an Early Access (EA) stage is new or enhanced functionality made available for you to selectively opt in to. You can use the feature in both Production and non-Production environments.

> **Note:** A feature may skip EA if it doesn't affect other features or functionality. Also, although Okta strives for API-first development, a feature in EA may add functionality later.

Any bug fixes or improvements are managed and fixed with the same timeline and processes as those in General Availability.

Features in EA are marked with the EA icon: <ApiLifecycle access="ea" />

EA releases are managed in two ways:

- **Early Access:** If you're interested in an EA feature, you must contact Support to enable the feature. Support can enable features in EA for any customer, provided any prerequisites have been met.

- **Early Access (Self-Service):** If you're interested in an EA Self-Service feature, you can enable it for your org from the **Settings** > **Features** page in the Admin Console.

You can track the availability of EA features on the [Product Roadmap](https://support.okta.com/help/s/productroadmap) page.

See [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features) for more information on the Self-Service Feature Manager.

## General Availability (GA)

A feature in General Availability (GA) is new or enhanced functionality enabled by default for all customers.

Features move from EA (enabled by request) to GA (enabled for all orgs) in a regular cadence:

1. EA features become GA in Preview orgs in the first release of the month.
2. These same features become GA in Production orgs in the first release of the next month.

GA features that don't have an EA release go directly to Preview orgs. They stay in Preview for a month before moving to Production.

Features in GA are supported by Okta Customer Support, and issues are addressed according to your Customer Agreement with Okta.

Documentation for features in GA isn't marked with any icons.

## Deprecation

A feature identified as deprecated is no longer recommended for use and may be removed in the future. Generally, this means that you shouldn't use it unless you have to. Any workarounds or recommended paths forward are included in the relevant documentation, libraries, or references. When Okta schedules an end-of-service plan, that information is also included.

Documentation for features that have been deprecated are marked with the Deprecated icon: <ApiLifecycle access="deprecated" />

## Exceptions to the Beta-EA-GA lifecycle

Some changes may not go through the full Beta-EA-GA lifecycle:

- Bug fixes that change only the incorrect behavior of the bug
- Cosmetic changes, such as changing the label of a field in the Admin Console
- Changes that are narrow in scope or effect, or purely additive, such as adding an attribute

Changes like these may be released to Preview orgs any week of the month, and appear in Production the next week.

Other exceptions include:

- Occasionally, a feature is released using an iterative, custom schedule to enable close monitoring.
Such features may spend more than one month between Preview and Production for their GA release.
- Features exposed in the Admin Console may be EA or GA without the corresponding API being in the same lifecycle stage, or available at all.

As with all changes that affect our customers, changes outside the regular Beta-EA-GA lifecycle are reported in the [Okta API Release Notes](/docs/release-notes/).-->
