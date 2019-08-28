---
title: Feature Lifecycle Management
---

# Feature Lifecycle Management

This page will cover a few key concepts that underpin the [Okta Features API](/docs/reference/api/features/).

## Self-service Features



## Dependencies and Dependents

Features may have dependencies and dependents. Dependencies are other Features that the Feature relies on, whereas dependents are Features that rely on the Feature.

Consider the following example:

![Feature relation](/img/feature-relation.png "Feature dependency diagram")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true

object "Feature A" as featA
object "Feature B" as featB
object "Feature C" as featC
object "Feature D" as featD

featA <-- featB
featA <-- featC
featA <-- featD
@enduml

-->

In this example:
* Feature A has three dependencies: Feature B, Feature C, and Feature D.
* Feature D has one dependent, which is Feature A

If Feature A has Feature B as a dependency, that means that Feature A cannot be enabled if Feature B is not enabled first. Conversely, Feature B has Feature A as one of its dependents. This means that Feature B cannot be disabled unless you disable Feature A first.

## Beta Features

Beta Features can only be managed in Preview cells. Betas can be open or closed.  The API can be used to enable or disable open Betas, however closed Betas can only be disabled. If a Feature has Feature dependencies that are in Closed Beta, then you will not be able to enable it. If you'd like to enable a closed Beta, you should [contact Support](mailto:support@okta.com). Enabling an Open Beta will trigger an email to the admin who performed the action.
