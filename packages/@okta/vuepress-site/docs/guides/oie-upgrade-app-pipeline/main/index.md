---
title: Switch an app to the Identity Engine pipeline
meta:
  - name: description
    content: Move an individual app from the Classic Engine to the Identity Engine authentication pipeline as part of an app-level upgrade, and roll back if needed.
---

<!-- PLACEHOLDER -- not ready to publish. Working notes: see "OIE-Classic interop notes" Google Doc, "Doc writing notes" tab. -->

<ApiLifecycle access="ea" />

> **Note:** This guide covers an app-level upgrade: a capability for orgs that upgraded to Identity Engine but need to keep specific apps on the Classic Engine authentication pipeline temporarily, then switch them one at a time. It's distinct from the standard [Identity Engine upgrade](/docs/guides/oie-upgrade-overview/) process, which is a one-time, org-wide cutover.

## About the authentication pipeline setting

The `authenticationPipeline` property on an app object (`/api/v1/apps`) controls which authentication pipeline that app uses:

| Value | Description |
| --- | --- |
| `ORG_DEFAULT` (default) | The app uses the org's configured pipeline: Identity Engine on an Identity Engine org, Classic Engine on a Classic Engine org. |
| `CLASSIC` | The app uses the Classic Engine pipeline, regardless of the org's engine. |

`authenticationPipeline` is optional. Apps that predate this property, or that omit it, behave as `ORG_DEFAULT`.

> **Note:** On an Identity Engine org, you can't set `authenticationPipeline` to `CLASSIC` when you create a new app. You can set it to `CLASSIC` on an existing app.

This property is only available for orgs eligible for an app-level upgrade.

## Before you switch

<!-- TODO: see working notes doc. -->

## Switch an app's pipeline

<!-- TODO: see working notes doc. -->

## Roll back a pipeline switch

<!-- TODO: see working notes doc. -->

## Migrate apps in bulk

<!-- TODO: see working notes doc. -->

## See also

* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)
* [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/)
* [Okta API changes for Identity Engine](/docs/guides/oie-upgrade-api-changes/)
