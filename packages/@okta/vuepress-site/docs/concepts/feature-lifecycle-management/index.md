---
title: Feature Lifecycle Management
---

# Feature lifecycle management

This page covers a few key concepts that underpin the [Okta Features API](/docs/reference/api/features/). The Features API allows you to manage self-service features, their feature dependants, and their feature dependencies. For Beta features, special restrictions apply to the behavior of the API.

See [Release lifecycle](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/).

## Self-service features

Self-service features are features an Okta admin can directly enable or disable. Features that aren't self-service can only be enabled or disabled by getting in touch with Okta Support. The [Okta Features API](/docs/reference/api/features/) is used to list, enable, and disable self-service features.

> **Note:** A Beta feature marked as self-service will stay as self-service, even if it's closed and temporarily unavailable to be enabled. For example, if an [open Beta](#beta-features) transitions into a closed Beta, the feature will remain self-service. This means that it appears in the list of available self-service features, but you can't enable it without contacting Support.

Only Beta and Early Access (EA) features are considered self-service. Once a feature transitions from either of these states to Generally Available (GA), it will no longer be listed as an available self-service feature.

## Beta features

Though all available Beta features qualify as "self-service", Betas can be either open or closed. Open Betas can be enabled or disabled using the API. Closed Betas can only be disabled. If a feature has dependencies that are in Closed Beta, then you can't enable it. If you'd like to enable a closed Beta, [contact Support](https://support.okta.com). Enabling an Open Beta triggers an email to the admin who performed the action.

> **Note:** Beta features are only available in Preview orgs environments.

## Dependencies and dependants

Features might have dependencies and dependants. Dependencies are other features that the feature relies on, whereas dependants are features that rely on the feature.

Consider the following example:

<div class="half">

![Feature dependency diagram](/img/concepts/feature-relation.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true

object "Feature A" as featA
object "Feature B" as featB
object "Feature C" as featC
object "Feature D" as featD

featA ..> featB
featA ..> featC
featA ..> featD
@enduml

-->

In this example:

* Feature A has three dependencies: Feature B, Feature C, and Feature D.
* Feature D has one dependant: Feature A.

If Feature A has Feature B as a dependency, then Feature A can't be enabled if Feature B isn't enabled first. Conversely, Feature B has Feature A as one of its dependants. This means that Feature B can't be disabled unless you disable Feature A first.
