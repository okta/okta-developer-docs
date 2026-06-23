---
title: Update your event hooks for Identity Engine
meta:
  - name: description
    content: Identify and fix the event hook changes required before you upgrade from Classic Engine to Identity Engine.
---

<ApiLifecycle access="ie" />

If your org uses event hooks that rely on Classic Engine event payloads or event types, review your event hook external service before you upgrade to Okta Identity Engine. Some event payload structures have changed, some event types are no longer available, and new Identity Engine event types are available for your workflows.

---

#### Learning outcomes

* Understand which event hook payloads and event types change when you upgrade to Identity Engine.
* Update your external service endpoint code to parse the new Identity Engine payload structure.
* Remove subscriptions to event types that aren't triggered in Identity Engine and identify new event types that you can subscribe to.

#### What you need

* One or more active event hooks configured in your Classic Engine org.
* An understanding of which event types your hooks subscribe to.
* Access to the external service code that receives your event hook payloads.

---

## About event hook upgrade changes

Event hooks are outbound calls from Okta that notify your external service of events that occur in your Okta org. See [Event hooks](/docs/concepts/event-hooks/) for an overview of event hook payload structure, verification, and limits.

When you upgrade from Classic Engine to Identity Engine, three kinds of changes can affect your event hooks:

* The payload structure changes for some event types, which means that your endpoint may parse data from a field that no longer exists.
* Some Classic Engine event types are no longer triggered in Identity Engine, which means that hooks subscribed to those events stop receiving calls.
* New event types are available only in Identity Engine, which you can subscribe to after you upgrade.

Review the following sections and update your endpoints before you upgrade your production org.

## Understand the event payload changes

Identity Engine restructures where certain data appears in event hook payloads. If your endpoint code parses specific fields from the payload, verify that those fields still exist at the same path in the Identity Engine payload.

### Phone verification events

The most significant payload change affects phone verification events. The location of the phone number data has moved out of the `target` array.

| Field | Classic Engine location | Identity Engine location |
| ----- | ----------------------- | ------------------------ |
| Phone number | `target[].alternateId` | `debugContext.debugData.phoneNumber` |
| Country calling code | Not explicitly separate | `debugContext.debugData.countryCallingCode` |
| Target object type | `"type": "MobilePhone"` | No longer in the `target` array |

This change affects the following event types:

* `system.sms.send_phone_verification_message`
* `system.voice.send_phone_verification_call`

In Identity Engine, the payload for these event types doesn't include a `MobilePhone` target object. The phone number, country calling code, and related metadata (such as `smsProvider`) appear under `debugContext.debugData` instead.

#### What to update

1. Locate the endpoint handler code for the affected event types.
1. Update the parsing logic to read the phone data from `debugContext.debugData` instead of from the `target` array.
1. Test the updated endpoint with a sample Identity Engine payload before you upgrade.

The following is an example of the Classic Engine payload, where the phone number appears in the `target` array:

```json
"target": [
  {
    "id": "mbl3p075rwLbODqXZ0g7",
    "type": "MobilePhone",
    "alternateId": "+14xxxxxxxxx"
  }
]
```

The following is an example of the Identity Engine payload, where the phone number appears in `debugContext.debugData`:

```json
"debugContext": {
  "debugData": {
    "phoneNumber": "+14xxxxxxxxx",
    "countryCallingCode": "1"
  }
}
```

> **Tip:** To inspect a real payload for any event type in your org, call the [System Log API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/) and filter on the event type. For example: `https://{yourOktaDomain}/api/v1/logs?filter=eventType eq "system.sms.send_phone_verification_message"`.

## Event types not available in Identity Engine

Some Classic Engine event types aren't triggered in Identity Engine. If your hooks subscribe to these events, remove or replace them.

| Event type | Reason not available | Suggested action |
| ---------- | -------------------- | ---------------- |
| `user.authentication.authenticate` | Device Trust isn't supported in Identity Engine | Remove the subscription or replace it with an alternative event |
| `user.credential.enroll` | Device Trust isn't supported in Identity Engine | Remove the subscription or replace it with an alternative event |
| `user.account.unlock_token` | No longer triggered in Identity Engine | Remove the subscription |

## New event types available only in Identity Engine

Identity Engine introduces event types that weren't available in Classic Engine. If these events are relevant to your workflows, you can create event hooks with them after you upgrade.

| Event type | Description |
| ---------- | ----------- |
| `device.enrollment.create` | A new device is enrolled |
| `device.lifecycle.activate` | A device is activated |
| `device.lifecycle.deactivate` | A device is deactivated |
| `device.lifecycle.delete` | A device is deleted |
| `device.lifecycle.suspend` | A device is suspended |
| `device.lifecycle.unsuspend` | A device is unsuspended |
| `device.user.add` | A device is added to a user |
| `device.user.remove` | A device is removed from a user |
| `security.authenticator.lifecycle.activate` | An authenticator is activated for the org |
| `security.authenticator.lifecycle.create` | An authenticator is created for the org |
| `security.authenticator.lifecycle.deactivate` | An authenticator is deactivated for the org |
| `security.authenticator.lifecycle.update` | An authenticator is updated for the org |
| `user.mfa.factor.suspend` | A user's MFA factor is suspended |
| `user.mfa.factor.unsuspend` | A user's MFA factor is unsuspended |

See [Event types](/docs/reference/api/event-types/) for the full list of event types that are available for event hook subscriptions.

## Update checklist

Complete these steps before you upgrade your org:

1. List all active event hooks in your Classic Engine org. In the Admin Console, go to **Workflow** > **Event Hooks**.
1. Identify which subscribed event types are affected by the Identity Engine changes in this guide.
1. Update your endpoint code to handle the new payload structure for phone verification events.
1. Remove subscriptions to event types that are no longer available in Identity Engine.
1. Test your updated endpoints in a preview org or with sample Identity Engine payloads.
1. Add event hooks for the new Identity Engine event types, if they're relevant to your workflows, after the upgrade.

## See also

* [Event hooks](/docs/concepts/event-hooks/): Conceptual background on how event hooks work.
* [Event hooks with ngrok](/docs/guides/event-hook-ngrok/): Expose a local app to the internet with ngrok to test your updated endpoint before you upgrade.
* [Event types](/docs/reference/api/event-types/): The full list of event types that are available for event hook subscriptions.
* [Identity Engine limitations](/docs/guides/ie-limitations/): Other Classic Engine features and APIs that change or aren't supported in Identity Engine.
