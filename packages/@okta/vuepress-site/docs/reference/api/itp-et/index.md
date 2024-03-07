---
title: Identity Threat Protection
category: management
meta:
  - name: description
    content: ITP specific event types
---

# Identity Threat Protection

This resource contains detailed reference material on event types triggered with the Identity Threat Protection solution. Use these details to understand the threats ...

### user.risk.change

**Description:** Indicates a user's risk level has changed. This event type can be used to monitor risk level changes for users. This event is triggered when Okta determines that a user is associated with activity or context that indicate risk.

| Key Event Attributes  | Description                                         | Data Type            | Example Values |
| --------------------- | --------------------------------------------------- | -------------------- | -------------- |
| Risk                  |                                                     | key-value pair       |` {previousLevel=LOW, level=MEDIUM, detectionName=Session Influenced User Risk, reasons=idxGuvnnpQKQ8uVw56TGp23Qg, issuer=OKTA} `        |
| TraceId               | Id generated for the risk request                   | String         | String         |
| target (User)         | The user associated with a risk activity            | String         | String         |
| actor                 |  ???                 | String         | String         |
| client                |  ???                | String         | String         |

### user.risk.change

**Description:** Indicates a user's risk level has changed. This event type can be used to monitor risk level changes for users. This event is triggered when Okta determines that a user is associated with activity or context that indicate risk.

| Key Event Attributes  | Description                                         | Data Type            | Example Values |
| --------------------- | --------------------------------------------------- | -------------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| DtHash               |                 |         |         |
| RequestId              |                 |         |         |
| RequestUri              |                 |         |         |
| Uri             |                 |         |         |
| Risk                  |                                                     | key-value pair       |` {previousLevel=LOW, level=MEDIUM, detectionName=Session Influenced User Risk, reasons=idxGuvnnpQKQ8uVw56TGp23Qg, issuer=OKTA} `        |
| TraceId               | Id generated for the risk request                   | String         | String         |
| **target** (User)         | The user associated with a risk activity            |      |        |
| alternateId        |            |      |        |
| DetailEntry         |             |      |        |
| DisplayName        |            |      |        |
| ID        |             |      |        |
| Type        |            |      |        |
| **actor**                 |  ???                 |         |         |
| alternateId        |            |      |        |
| DetailEntry         |             |      |        |
| DisplayName        |            |      |        |
| ID        |             |      |        |
| Type        |            |      |        |
| **client**                |  ???                |       |         |
| IPAddress              |                |       |         |

### analytics.feedback.provide

**Description:** An admin has provided feedback on a detection Okta provided which indicated a change in user or session risk. This can be used to monitor feedback provided by admins in response to Okta determined changes in risk. This event is fired when an admin chooses to provide feedback on a detection event in the admin console.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| RequestId               | Id generated for the risk request                   | String         | String         |
| RequestUri              | Id generated for the risk request                   | String         | String         |
| target (User)         | The user associated with a risk activity            | String         | String         |
| actor                 |                   | String         | String         |
| client                |                   | String         | String         |

### security.events.provider.receive_event

**Description:** Triggered when an event provider submits a valid SSF for each security event. The event can help Org Admins debug/monitor partner SSF (Shared Signals Framework) submissions. The event contains debug context data about the event provider's risk report.


### device.signals.status.timeout

**Description:** A registered device associated with at least one user session hasn't communicated with Okta within the required time interval. Use this event to investigate a potentially insecure device and compromised user session. This event contains the device unique identifier in the System Log actor object. You can use this information to find other related events.

### policy.auth.reevaluate.fail

**Description:** Auth policy re-evaluation has occurred and has resulted in a continuous access violation. Can be used to identify which user, apps, and session were involved in a continuous access violation event. Event fired when continuing access evaluation results in failure.

### policy.continuous_access.evaluate

**Description:** Evaluation of Entity Risk policy. Signal that entity risk policy has been evaluated for an entity for which we have received a risk change event. Event fired when entity risk policy has been evaluated for an entity for which a risk change event was generated.

### policy.continuous_access.action

**Description:** Entity Risk policy action invocation. Signal that an action associated with an entity risk policy evaluation has been invoked. Event fired when an action associated with an entity risk policy evaluation has been invoked.

### user.session.context.changed

**Description:** User session context changed. This event indicates that the context in which the session is being used has changed significantly enough from the context in which the event was created, that re-evaluation of policy may be required. Often this indicates a security issue related to the session.

### policy.entity.risk.evaluate

**Description:** Evaluation of Entity Risk policy. Signal that entity risk policy has been evaluated for an entity for which we have received a risk change event. Event fired when entity risk policy has been evaluated for an entity for which a risk change event was generated.

### policy.entity.risk.action

**Description:** Entity Risk policy action invocation. Signal that an action associated with an entity risk policy evaluation has been invoked. Event fired when an action associated with an entity risk policy evaluation has been invoked.

### user.session.end

**Description:** This event is triggered when Okta terminates all IDX sessions. If there are 'N' active sessions for an user the event will appear 'N' times. All 'N' events contain externalSessionId and System.Transaction.ID that correlates with the System.Transaction.ID under the user.session.clear event

### user.session.clear

**Description:**   This event is triggered when Admin invokes to clear sessions by clicking on the "Clear user session". This event appears only once and contains "externalSessionId" and "System.Transaction.ID".

### user.authentication.universal_logout

**Description:** This event is triggered when an admin or system account triggers Universal Logout against an app instance. It contains the app instance details for which the Universal Logout API was fired. This event identifies when applications have had Universal Logout triggered for audit or debugging purposes. This event is only fired once. It's only fired for applications that have been configured for Universal Logout. You can configure it under Risk policy, Continuous Access policy, or in an admin-initiated Clear User Session

### workflows.users.delegatedflow.run

**Description:** This event can be used by admins or security team members to monitor the execution of delegated flows in the Workflows platform from the Admin application. The actor field provides the Okta User ID of the user that ran the flow.  The target fields provide context on the Workflows instance as well as the name and flow id of the executed flow. This event only indicates if the flow was successfully triggered and does not provide information about whether the flow encountered an error.