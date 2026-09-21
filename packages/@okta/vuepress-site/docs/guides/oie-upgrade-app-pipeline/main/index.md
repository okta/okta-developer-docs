---
title: Switch an app to the Identity Engine pipeline
meta:
  - name: description
    content: Move an individual app to the Identity Engine authentication pipeline during an app-level upgrade, roll back a single app, and migrate many apps with a script.
---

<ApiLifecycle access="ea" />

Learn how to move an individual app to the Identity Engine authentication pipeline during an app-level upgrade, roll a single app back if it doesn't work, and migrate apps in bulk with a script.

> **Note:** This guide covers the API for moving apps between pipelines. For eligibility, enablement, and the Admin Console experience, see [INTEROP_PRODUCT_LINK](https://help.okta.com/okta_help.htm?type=oie&id=) and [Eligibility tasks](https://help.okta.com/okta_help.htm?type=oie&id=oie-upgrade-eligibility).

---

#### Learning outcomes

- Understand what an authentication pipeline controls for an app.
- Update integrations for the session changes that come with the upgrade.
- Check an app for Classic Engine dependencies before you move it.
- Move an app to the Identity Engine pipeline.
- Roll an app back to the Classic Engine pipeline.
- Migrate apps in bulk with a script.

#### What you need

- An org enabled for an app-level upgrade
- An access token with the `okta.apps.read` and `okta.apps.manage` scopes
- The `id` of each app that you want to upgrade

---

## Overview

Your org upgrades to Identity Engine as a whole. But FEATURE_NAME provides the ability for you to upgrade your apps individually. Okta keeps your existing apps and their branding on the Classic Engine pipeline, and you move them to the Identity Engine pipeline one app at a time, on your own schedule.

This means that you don't need to fix every customized app before you upgrade. Move your lowest-risk apps first, confirm that each one works, and roll a single app back to the Classic Engine pipeline if it doesn't. Apps that you create after the upgrade use the Identity Engine pipeline as the default. Okta first-party apps, such as the Admin Console, also use the Identity Engine pipeline.

An app on the Classic Engine pipeline can't use the Identity Engine capabilities that your org gained by upgrading, such as Okta FastPass, device assurance policies, and Identity Engine authentication policies. It also can't use self-service registration, which is a [known limitation](#known-limitations) of the app-level upgrade.

This guide explains each part of an app-level upgrade first, then walks through the tasks in the order that you do them.

## Quick reference

Use the following table to see what an app-level upgrade changes and what you need to do about it.

| Area | What changes | Action required | Learn more |
| --- | --- | --- | --- |
| Authentication pipeline | Before the upgrade, every app used your org's Classic Engine. Afterward, each app has its own pipeline. Your existing apps stay on the Classic Engine pipeline, and apps that you create use Identity Engine. | Set `authenticationPipeline` to `ORG_DEFAULT` on each app that you want to move. | [Authentication pipeline setting](#authentication-pipeline-setting) |
| Sessions | On Classic Engine, Okta identifies a user's session with the `sid` cookie. After the upgrade, Okta uses the `idx` cookie and converts each existing Classic Engine session, which destroys the session that the `sid` identifies. | Replace any code that reads a session by its `sid` value. | [Session handling changes](#session-handling-changes) |
| Authentication policies | An app on the Classic Engine pipeline keeps evaluating its Classic Engine sign-on policy. When you upgrade an app's pipeline, Okta creates a copy of it as an Identity Engine authentication policy and maps the app to it. The app ends up with a policy for each pipeline. | Review the policy that Okta creates and confirm that it aligns with your original policy. | [Authentication policies on both pipelines](#authentication-policies-on-both-pipelines) |
| Self-service registration | Doesn't work for an app on the Classic Engine pipeline. Account recovery still works. | Move the app to the Identity Engine pipeline if it needs self-service registration. | [Known limitations](#known-limitations) |

## Key concepts for an app-level pipeline upgrade

See the following sections to understand the concepts that affect your apps during an app-level upgrade.

### Authentication pipeline setting

An authentication pipeline consists of the authentication behaviors that an app's sign-in flow uses. The pipeline consists of the policies that Okta evaluates, which authenticators are available, which sign-in experiences your apps support, and how registration and account recovery work. Classic Engine and Identity Engine each have their own pipeline. On most orgs every app uses the same one. During an app-level upgrade, you set the pipeline for each app individually.

The `authenticationPipeline` property on an app object (`/api/v1/apps`) controls which pipeline an app uses. It accepts two values: `ORG_DEFAULT` and `CLASSIC`.

| Value | Description |
| --- | --- |
| `ORG_DEFAULT` | The app follows your org's engine. On an org that has upgraded to Identity Engine, this is the Identity Engine pipeline. |
| `CLASSIC` | The app uses the Classic Engine pipeline, regardless of your org's engine. |

There's no `IDENTITY_ENGINE` value. An app-level upgrade happens on an org that has already moved to Identity Engine, so `ORG_DEFAULT` resolves to the Identity Engine pipeline there. `ORG_DEFAULT` is the value that you set to move an app off Classic Engine, and it's what apps use unless you pin them to `CLASSIC`.

There are two restrictions that apply when you switch an app's pipeline:

* `CLASSIC` is only accepted when you update an existing app that previously used the Classic Engine pipeline. You can't create new apps and set their pipelines to `CLASSIC`.
* Some apps always use the Identity Engine pipeline. For those apps, if you try to set `CLASSIC` as the pipeline, the request fails with a `400` error. This applies to Okta first-party apps, such as the Admin Console and the Okta Browser Plugin, and to apps that already evaluate a Classic Engine sign-on policy on an Identity Engine org, such as multifactor-only and RADIUS apps.

### Authentication policies on both pipelines

An app on the Classic Engine pipeline evaluates its Classic Engine sign-on policy. When you move the app to the Identity Engine pipeline, Okta creates an Identity Engine authentication policy from that sign-on policy and maps the app to it. The Classic Engine policy stays in place, so the app has a policy for each pipeline, and its `authenticationPipeline` value decides which policy Okta evaluates.

The two policies are close equivalents. Okta carries over the parts that map directly, such as the rule action, the factor requirements, and the password and multifactor reauthentication intervals. The engines don't model policies identically, so treat the new policy as a starting point and review it carefully. See [Authentication policies](/docs/concepts/policies/#authentication-policies) for how Identity Engine models them, and [Configure a global session policy and app sign-in policies](/docs/guides/configure-signon-policy/) to review or change one.

Keeping both policies is what makes an app-level rollback straightforward. If you move an app back to the Classic Engine pipeline, its original Classic Engine sign-on policy is still there to take over.

### Session handling changes

When you upgrade an app to use the Identity Engine pipeline, the way that Okta tracks a user's session changes. Classic Engine identifies a user's session with the `sid` cookie, and Identity Engine uses the `idx` cookie. The two engines also differ in what the Sessions API returns, which session endpoints they support, and how session tokens behave. For the full set of differences, see [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/) and [Okta API changes for Identity Engine](/docs/guides/oie-upgrade-api-changes/).

The differences between how sessions are handled matter during an app-level upgrade and affect how your org runs both pipelines at the same time. A user might sign in to an app on the Classic Engine pipeline and then open an app on the Identity Engine pipeline. Session transition is the mechanism that resolves this. It converts a Classic Engine session into an Identity Engine session, so that one sign-in covers apps on both pipelines. It also means that users who signed in before your upgrade stay signed in afterward.

#### Replace code that reads a session by ID

This section applies if you have integrations that validate a user's session on the server.

You might have an integration that reads the session cookie that the browser sends, and then passes its value to `GET /api/v1/sessions/{sessionId}` to confirm the session and retrieve its details. On Classic Engine, that cookie is `sid`, and its value works as the session ID.

This pattern breaks after a session converts to Identity Engine. Okta converts a user's Classic Engine session the first time that they do something that engages your org after the upgrade, such as opening the Okta End-User Dashboard, starting an authorization request, or following a SAML app link. Conversion happens once per session, and only if the user doesn't already have an Identity Engine session. Afterward, the `sid` cookie can still be in the browser, but the session that it identifies is gone, so passing that value to `GET /api/v1/sessions/{sessionId}` returns an error.

Don't look for another way to turn a cookie into a session ID. Identity Engine doesn't use server-side session introspection to establish who a user is. Rely on the session that your app establishes from the protocol it already uses. For an OIDC app, use the ID token or the access token. For a SAML app or an app that uses WS-Federation, use the assertion. Validate that token or assertion on your server.

Audit your server-side code for anywhere that passes a cookie value as a session ID, decide what each of those call sites needs to know about the user, and plan the change before you move the app.

If your org rolls back to Classic Engine after sessions have converted, your users have to sign in again, because Okta destroyed their original Classic Engine sessions. See the [Sessions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/).

## Before you switch

Complete the following actions before you move an app to the Identity Engine pipeline:

* Find out what your app depends on in Classic Engine. See [Audit your Classic API dependencies](/docs/guides/oie-upgrade-audit-classic-api-dependencies/) to inventory the endpoints, SDKs, and widget versions that this app relies on. That audit is organized app by app, which matches how you migrate.
* Confirm that your app's Sign-In Widget meets the version requirement. Identity Engine requires Sign-In Widget version 5.11 or later, or the third-generation Sign-In Widget for the Okta-hosted experience. See [Choose an Identity Engine sign-in deployment model](/docs/guides/oie-choose-signin-deploy/).
* Check the app's session handling against [Session handling changes](#session-handling-changes), especially any code that reads a session by ID.
* Plan to review the app's authentication policy afterward. See [Authentication policies on both pipelines](#authentication-policies-on-both-pipelines).
* Plan the order in which you move apps. Start with the apps that have the fewest Classic Engine dependencies and the smallest user population, so that you build confidence before you move business-critical apps.

## Switch an app's pipeline

To move an app to the Identity Engine pipeline, set `authenticationPipeline` to `ORG_DEFAULT` on the app.

`PUT /api/v1/apps/{appId}` replaces the app object, so retrieve the app first and send the complete object back with the one property changed. If you omit `authenticationPipeline` from an update, the app keeps its current pipeline.

1. Use [List all applications](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/listApplications) to find the `id` of the app that you want to move.
1. Change `authenticationPipeline` to `ORG_DEFAULT`, and then send the complete object back.

    ```bash
    curl -X PUT "https://${yourOktaDomain}/api/v1/apps/${appId}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${accessToken}" \
      -d '{
      "id": "0oa6hm3ycieuUv2iI0h7",
      "label": "Example app",
      "signOnMode": "OPENID_CONNECT",
      "authenticationPipeline": "ORG_DEFAULT"
      {...}
    }'
    ```

1. Retrieve the app again to confirm that `authenticationPipeline` changed, and then review the authentication policy that Okta created.

When you update the pipeline successfully, Okta makes the following changes:

* Okta creates an Identity Engine authentication policy from the app's Classic Engine sign-on policy, and maps the app to it.
* Okta adds the app to your default user profile policy, so that self-service registration works for it again.
* Okta records the change in the System Log, including the previous and the new pipeline.

If any part of this process fails, the whole switch fails and the app stays on its current pipeline. You never get an app that's half-moved, so it's safe to retry.

For the rest of the app object and its other properties, see the [Applications API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/).

## Roll back a pipeline switch

If an app doesn't work on the Identity Engine pipeline, move it back by setting `authenticationPipeline` to `CLASSIC`.

A rollback restores the app's Classic Engine sign-on policy as it was immediately before you moved the app. Be aware of what that means:

* Changes that you made to the app's Identity Engine authentication policy are discarded. Okta doesn't merge them into the Classic Engine policy.
* The app's own configuration doesn't change. Settings such as redirect URIs stay as you left them. Only the policy reverts.
* Self-service registration doesn't work for the app again, because Okta removes a Classic Engine pipeline app from your user profile policy.

> **Note:** If the app never had a Classic Engine sign-on policy, Okta creates one with a single Allow rule. That rule permits all access. Configure it to match your security requirements before you rely on it.

Rolling back a single app is separate from rolling your whole org back to Classic Engine. An org-level rollback is a request that you make to Okta rather than an API call, and it discards every per-app pipeline choice. See [Plan your rollback strategy](/docs/journeys/OCI-prepare-upgrade-oie/#plan-your-rollback-strategy).

## Migrate apps in bulk

Okta doesn't provide an endpoint that moves several apps at once. To migrate in batches, list the apps that are still on the Classic Engine pipeline, and then update them one at a time.

Use the following request to filter apps by pipeline to build the list:

```bash
GET /api/v1/apps?filter=authenticationPipeline+eq+%22CLASSIC%22
```

Then, loop over the results, reading and updating each app:

```bash
#!/usr/bin/env bash
# Moves every Classic Engine pipeline app to the Identity Engine pipeline.

auth="Authorization: Bearer ${accessToken}"
base="https://${yourOktaDomain}/api/v1"

appIds=$(curl -s \
  -H "${auth}" \
  -H "Accept: application/json" \
  "${base}/apps?filter=authenticationPipeline+eq+%22CLASSIC%22&limit=200" \
  | jq -r '.[].id')

while read -r appId; do
  app=$(curl -s \
    -H "${auth}" \
    -H "Accept: application/json" \
    "${base}/apps/${appId}" \
    | jq '.authenticationPipeline = "ORG_DEFAULT"')

  status=$(curl -s -o /dev/null -w '%{http_code}' \
    -X PUT "${base}/apps/${appId}" \
    -H "${auth}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "${app}")

  echo "${appId} ${status}"
done <<< "${appIds}"
```

The script has four parts:

* The filter query, `filter=authenticationPipeline+eq+%22CLASSIC%22`, returns only the apps that are still on the Classic Engine pipeline, and `jq -r '.[].id'` extracts their IDs into `appIds`. That's the list that the loop iterates over, so that a rerun skips the apps that you already moved.
* The read step assigns the current app object to `app`, and `jq '.authenticationPipeline = "ORG_DEFAULT"'` changes that one property while leaving every other property intact. This matters because `PUT` replaces the whole object.
* The update step sends the modified object back with `-X PUT` and captures only the HTTP status code with `-w '%{http_code}'`, so that one failed app doesn't stop the loop.
* The log line, `echo "${appId} ${status}"`, records an app ID and a status code for each app, which gives you the list of failures to investigate and rerun.

Keep the following things in mind when you migrate your apps at a larger scale:

* Migrate in batches, and verify between them. Because each switch either fully succeeds or fully fails, a script that stops partway leaves the remaining apps untouched. Rerun it after you fix the cause. To plan the batches, see [Identify integrations and customizations](/docs/guides/oie-upgrade-identify-integrations/) and [Plan upgrade rollout](/docs/guides/oie-upgrade-rollout-plan/).
* Page through the results if you have more apps than one request returns. The sample fetches a single page. Follow the `Link` header with `rel="next"` in the response to retrieve the rest.
* Expect some apps to fail with a `400` error. These are the apps that always use the Identity Engine pipeline, such as Okta first-party apps, so they don't need migrating. Skip them rather than treating them as failures.
* Share one authentication policy across apps that need identical rules. Moving apps one at a time can otherwise create a separate Identity Engine policy for every app, which is harder to review and maintain.
* Test each app's sign-in flow after you move it. A successful API response confirms that the pipeline changed, not that the app's users can sign in.

## Known limitations

The following limitations apply for as long as an app stays on the Classic Engine pipeline. They resolve when you move the app.

* Self-service registration doesn't work for an app on the Classic Engine pipeline. The Identity Engine registration flow isn't available to the app, and Okta turns off the Classic Engine registration feature when your org upgrades. Move the app to the Identity Engine pipeline to enable registration for it, which Identity Engine handles through a user profile policy. See [Configure user profile policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment). Account recovery isn't affected: it works for a Classic Engine pipeline app and uses the Classic Engine experience.
* You can't map a Classic Engine pipeline app to an Identity Engine authentication policy. The app evaluates its Classic Engine sign-on policy, so the mapping has no effect and Okta rejects it.
* Identity Engine settings that apply org-wide can still affect a Classic Engine pipeline app. An app-level upgrade covers the app's sign-on policy and its branding. It doesn't isolate the app from every other Identity Engine setting. This list covers the differences that Okta knows about, and isn't exhaustive.

## See also

* [Manage app branding during the Identity Engine upgrade](/docs/guides/oie-upgrade-app-branding/)
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)
* [Prepare to upgrade to Okta Identity Engine](/docs/journeys/OCI-prepare-upgrade-oie/)
* [Replace Classic Engine auth flows with Identity Engine](/docs/journeys/OCI-replace-ce-auth-flows/)
* [Audit your Classic API dependencies](/docs/guides/oie-upgrade-audit-classic-api-dependencies/)
* [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/)
* [Okta API changes for Identity Engine](/docs/guides/oie-upgrade-api-changes/)
* [Applications API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/)
* [Sessions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/)
