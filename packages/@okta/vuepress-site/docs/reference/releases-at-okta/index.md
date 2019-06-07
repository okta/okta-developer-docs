---
title: Release Lifecycle
---

# Release Lifecycle

Okta features travel through a regular lifecycle:

- [Beta](#beta)
- [Early Access (EA)](#early-access-ea)
- [General Availability (GA)](#general-availability-ga)

>Note: Okta reserves the right to add new parameters, properties, or resources to the API without advance notice.
These updates are non-breaking because they are additive. Follow [the compatibility rules](/docs/reference/api-overview/) to ensure your application doesn't break
when additive changes are made.
Breaking changes such as removing or renaming an attribute are released as a new version of the API, and Okta provides a migration path for new API versions.

Changes, regardless of lifecycle stage, are always reported in the [Okta API Products Release Notes](/docs/release-notes/).

## Quick Reference Table

| Description                | Beta (High touch)    | Beta (Low touch)    | EA                   | GA                   | Deprecated |
| :------------              | :------------------: | :-----------------: | :---:                | :---:                | :---:      |
| Contact with Product Team  | X                    |                     |                      |                      |            |
| API  Changes               | Subject to change    | Subject to change   | Backwards compatible | Backwards compatible | N/A        |
| Okta Support               |                      |                     | X                    | X                    |            |
| Service-level agreements   |                      |                     | X                    | X                    | X          |
| Announced in Release Notes |                      |                     | X                    | X                    | X          |
| In preview orgs            | By invitation        | By invitation       | By request           | X                    | X          |
| In production orgs         |                      |                     | By request           | X                    | X          |
| Documentation              | Limited              | Limited             | X                    | X                    | X          |

## Beta

Features in Beta are managed and supported by the Product Team and have been internally validated for a set of use cases.
Minimal documentation is supplied for API-related Beta releases; API endpoint and configuration information is usually supplied.

>Important: Okta only enables Beta features in non-production or sandbox environments, because features in Beta aren't supported by Okta Customer Support and
may change at any time during the Beta release.

Okta selects a small number of customers for early testing of features in a Beta release.
Customers participating in a Beta program agree to provide feedback which is required for maturing the feature;
however, the timeline for addressing specific areas of feedback (including bugs) is determined by Okta's market requirements for that feature.
Any customer interested in a feature in Beta must apply by visiting [our Beta Signup page](https://support.okta.com/help/OktaBetaProgramHome).
Only customers with use cases that match our use cases are invited.

Beta releases are either high touch or low touch:

* High-touch Beta releases involve regular contact with Okta, typically consisting of conference calls covering specified use cases, deployment guidance, and feedback.
* Low-touch Beta releases are self-directed without ongoing support and limited to collecting feedback.

Documentation for features in Beta release is marked with the Beta icon: <ApiLifecycle access="beta" />

## Early Access (EA)

A feature in an Early Access (EA) release is new or enhanced functionality made available for customers to selectively "opt-in" to and use in both Production and non-Production environments.

Features in EA:

* Are supported by Okta Customer Support.
* Obey the SLAs. APIs are [backwards compatible](/docs/reference/api-overview/).

>Note: A feature may skip EA if it doesn't affect other features or functionality.
Also, although we strive for API-first development, a feature in EA may add functionality later.

Any bug fixes or improvements are managed and fixed with the same timeline and processes as those in General Availability.

Features in EA release are marked with the EA icon: <ApiLifecycle access="ea" />

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
