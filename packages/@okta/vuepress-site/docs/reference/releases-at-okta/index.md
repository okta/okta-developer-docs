---
title: Release Life Cycle
---

# Release Life Cycle

Okta features travel through a regular life cycle:

- [Beta](#beta-release)
- [Early Access (EA)](#early-access-ea)
- [General Availability (GA)](#general-availability-ga)

> **Note:** Okta reserves the right to add new parameters, properties, or resources to the API without advance notice.
These updates are non-breaking because they are additive. Follow [the compatibility rules](/docs/reference/api-overview/) to ensure that your application doesn't break
when additive changes are made.
Breaking changes such as removing or renaming an attribute are released as a new version of the API, and Okta provides a migration path for new API versions.

Changes, regardless of life cycle stage, are always reported in the [Okta API Products Release Notes](/docs/release-notes/).

## Quick Reference Table

| Description                | Beta                 | EA                   | GA                   | Deprecated |
| :------------              | :------------------: | :-----------------:  | :------------------: | :---------:|
| Contact with Product Team  | &check;              | &cross;              | &cross;              | NA         |
| API  Changes               | Subject to change    | Backwards compatible | Backwards compatible | N/A        |
| Okta Support               | &cross;              | &check;              | &check;              | &check;    |
| Service-level agreements   | &cross;              | &check;              | &check;              | &check;    |
| Announced in Release Notes | &cross;              | &check;              | &check;              | &check;    |
| In preview orgs            | By invitation or self-service, depending on the feature | By request or self-service, depending on the feature | &check;| &check;|
| In production orgs         | &cross;              | By request or self-service, depending on the feature| &check;| &check; |
| Documentation              | Limited              | &check;              | &check;              | NA         |

## Beta Release

Features in Beta are managed and supported by the Product Team and have been internally validated for a set of use cases. Minimal documentation is directly provided to customers for API-related Beta releases and is normally not publicly hosted. API endpoint and configuration information is usually supplied.

> **Important:** Okta only enables Beta features in Preview org environments because features in Beta aren't supported by Okta Customer Support and may change at any time during the Beta release.

Okta selects a small number of customers for early testing of features in a Beta release. Customers participating in a Beta program agree to provide feedback that is required for maturing the feature. However, the timeline for addressing specific areas of feedback (including bugs) is determined by Okta's market requirements for that feature.

Beta releases are managed in two ways:

* **Beta:** Involves regular contact with Okta, which may include conference calls between you and Okta that cover specific use cases, deployment guidance, and feedback. Betas are also announced to customers through the Ozone newsletter and Communities. Okta may also solicit customers to participate in a Beta via email.

* **Beta (Self-Service):** Self-directed without ongoing support or regular contact with Okta. Contact is primarily limited to collecting feedback. If you are interested in a Beta Self-Service feature, you can enable that feature for your org from the **Settings** > **Features** page in the Admin Console.

You can track the availability of Beta features on the [Product Roadmap](https://support.okta.com/help/s/productroadmap) page.

See [Manage Early Access and Beta features](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Manage_Early_Access_features) for more information on Okta's Self-Service Feature Manager.

## Early Access (EA)

A feature in an Early Access (EA) stage is new or enhanced functionality made available for you to selectively opt-in to and use in both Production and non-Production environments.

> **Note:** A feature may skip EA if it doesn't affect other features or functionality. Also, although we strive for API-first development, a feature in EA may add functionality later.

Any bug fixes or improvements are managed and fixed with the same timeline and processes as those in General Availability.

Features in EA release are marked with the EA icon: <ApiLifecycle access="ea" />

EA releases are managed in two ways:

* **Early Access:** If you are interested in an EA feature, you must contact Support to enable the feature. Support can enable features in EA for any customer, provided any required pre-requisites have been met.

* **Early Access (Self-Service):** If you are interested in an EA Self-Service feature, you can enable the feature for your org from the **Settings** > **Features** page in the Admin Console.

You can track the availability of EA features on the [Product Roadmap](https://support.okta.com/help/s/productroadmap) page.

See [Manage Early Access and Beta features](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Manage_Early_Access_features) for more information on Okta's Self-Service Feature Manager.

## General Availability (GA)

A feature in General Availability (GA) is new or enhanced functionality that is enabled by default for all customers.
Beginning in February 2017, features move from EA (enabled by request) to GA (enabled for all orgs) in a regular cadence:

1. EA features become GA in preview orgs in the first release of the month.
2. These same features become GA in production orgs in the first release of the next month.

Features in GA are supported by Okta Customer Support, and issues are addressed according to your Customer Agreement with Okta.

Documentation for features in GA release are not marked with any icons.

## Deprecation

A feature identified as Deprecated is no longer recommended and may be removed in the future.
The recommended path forward is included in the relevant documentation, libraries, or references.
When Okta schedules an end-of-life plan, that information is also included.

Documentation for features that have been deprecated are marked with the Deprecated icon: <ApiLifecycle access="deprecated" />

## Exceptions to the Beta-EA-GA Lifecycle

Some changes may not go through the full Beta-EA-GA lifecycle:

*  Bug fixes that change only the incorrect behavior of the bug.
* Cosmetic changes, such as changing the label of a field in the administrator UI.
* Changes that are narrow in scope or effect, or purely additive, such as adding a new attribute.

Changes like these may be released to preview orgs any week of the month, and appear in production the next week.

Other exceptions include:

* Occasionally, a feature is released using an iterative, custom schedule to enable close monitoring.
Such features may spend more than one month between preview and production for their GA release.
* Features exposed in the administrator UI may be EA or GA without the corresponding API being in the same stage of the lifecycle, or available at all.

As with all changes that affect our customers, changes outside the regular Beta-EA-GA lifecycle are reported in the [Okta API Release Notes](/docs/release-notes/).
