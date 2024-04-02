---
title: Feature Lifecycle Management
---

# Feature lifecycle management

This page covers a few key concepts that underpin the [Okta Features API](/docs/reference/api/features/). The Features API allows you to manage self-service features, their feature dependents, and their feature dependencies. For Beta features, special restrictions apply to the behavior of the API.

See [Release lifecycle](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/).

## Self-service features

Self-service features are features that you can directly enable or disable. Contact Okta Support to enable features that aren't self-service. The [Okta Features API](/docs/reference/api/features/) is used to list, enable, and disable self-service features.

> **Note:** A Beta feature marked as self-service remains as self-service, even if it's closed and temporarily unavailable. For example, if an [open Beta](#beta-features) transitions into a closed Beta, the feature remains self-service. This means that it appears in the list of available self-service features, but you can't enable it without contacting Support.

Only Beta and Early Access (EA) features are considered self-service. After a feature transitions from either of these states to Generally Available (GA), it's no longer listed as an available self-service feature.

## Beta features

Though all available Beta features qualify as "self-service," Betas are either open or closed. You can enable or disable open Betas using the API. But, you can only disable closed Betas. If a feature has dependencies that are in closed Beta, then you can't enable it. If you want to enable a closed Beta, [contact Support](https://support.okta.com). When you enable an open Beta, it triggers an email to the admin who performed the action.

> **Note:** Beta features are only available in Preview orgs.

## Dependencies and dependents

Features might have dependencies and dependents. Dependencies are other features that the feature relies on, whereas dependents are features that rely on the feature.

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
* Feature D has one dependent: Feature A.

If Feature A has Feature B as a dependency, then you can't enable Feature A unless you enable Feature B first. Conversely, Feature B has Feature A as one of its dependents. This means that you can't disable Feature B unless you disable Feature A first.