---
title: Feature Lifecycle Management
---

# Feature Lifecycle Management

This page will cover a few key concepts that underpin the [Okta Features API](/docs/reference/api/features/). The Features API allows you to manage self-service features, as well as their feature dependents and dependencies. Special restrictions apply to the behavior of the API with respect to Beta features.

## Self-service Features

Self-service features are features that can be enabled or disabled by an Okta admin directly. Features that are not self-service can only be enabled or disabled by getting in touch with Okta Support. The [Okta Features API](/docs/reference/api/features/) is used to list, enable, and disable self-service features.

> **Note**: A Beta feature that is marked as self-service will stay as self-service even if it's closed and temporarily unavailable to be enabled. For example, if an [open Beta](#beta-features) transitions into a closed Beta, the feature will remain self-service. This means that it will appear in the list of available self-service Features, but you will not be able to enable it without contacting Support.

Only Beta and Early Access (EA) features are considered self-service. Once a feature transitions from either of these states to Generally Available (GA), it will no longer be listed as an available self-service Feature.

## Beta Features

Though all available Betas qualify as "self-service features", Betas can be either open or closed. Open Betas can be both enabled or disabled using the API, however closed Betas can only be disabled. If a feature has Feature dependencies that are in Closed Beta, then you will not be able to enable it. If you'd like to enable a closed Beta, you should [contact Support](mailto:support@okta.com). Enabling an Open Beta will trigger an email to the admin who performed the action.

> **Note:** Beta Features are only available in Preview cells.

## Dependencies and Dependents

Features may have dependencies and dependents. Dependencies are other features that the feature relies on, whereas dependents are features that rely on the feature.

Consider the following example:

![Feature relation](/img/feature-relation.png "Feature dependency diagram")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

Note that arrows below should use two dashes instead of one, but that breaks the HTML comment syntax.

@startuml
skinparam monochrome true

object "Feature A" as featA
object "Feature B" as featB
object "Feature C" as featC
object "Feature D" as featD

featA -> featB
featA -> featC
featA -> featD
@enduml

-->

In this example:

* Feature A has three dependencies: Feature B, Feature C, and Feature D.
* Feature D has one dependent, which is Feature A

If Feature A has Feature B as a dependency, that means that Feature A cannot be enabled if Feature B is not enabled first. Conversely, Feature B has Feature A as one of its dependents. This means that Feature B cannot be disabled unless you disable Feature A first.
