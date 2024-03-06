---
title: Identity Threat Protection with Okta AI Event Type Reference
category: management
---

# Identity Threat Protection with Okta AI Event Types

Event types are the primary method of categorization within the Okta eventing platform. They allow consumers to group notable system occurrences based on behavior. This resource contains detailed reference material on event types for the Identity Threat Protection solution.

### user.risk.change

Description: Indicates a user's risk level has changed. This event type can be used to monitor risk level changes for users. This event is triggered when Okta determines that a user is associated with activity or context that indicate risk.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| Risk                  |                                                     | key-value pair | {previousLevel=LOW, level=MEDIUM, detectionName=Session Influenced User Risk, reasons=idxGuvnnpQKQ8uVw56TGp23Qg, issuer=OKTA}         |
| TraceId               | Id generated for the risk request                   | String         | String         |
| target (User)         | The user associated with a risk activity            | String         | String         |
| actor                 |                   | String         | String         |
| client                |                   | String         | String         |

### analytics.feedback.provide

Description: An admin has provided feedback on a detection Okta provided which indicated a change in user or session risk. This can be used to monitor feedback provided by admins in response to Okta determined changes in risk. This event is fired when an admin chooses to provide feedback on a detection event in the admin console.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| RequestId               | Id generated for the risk request                   | String         | String         |
| RequestUri              | Id generated for the risk request                   | String         | String         |
| target (User)         | The user associated with a risk activity            | String         | String         |
| actor                 |                   | String         | String         |
| client                |                   | String         | String         |