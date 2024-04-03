---
title: Identity Threat Protection
category: management
meta:
  - name: description
    content: ITP specific event types
---

# Identity Threat Protection Event Types

This resource contains detailed reference material on event types triggered with the Identity Threat Protection solution. Use the information from these properties to understand the users, threats, and risk environment for your org.

>**Note:** Not every property is documented for the event types. Only those primarily used to assist in reviewing an identity threat interaction. Also, objects and properties may differ based on your implementation of the Identity Threat Protection solution.

### user.risk.change

**Description:** This event type indicates that a user's risk level has changed. It can be used to monitor risk level changes for users. The event is triggered when Okta determines that a user is associated with a risk context or activity.

| Key event properties  | Description                                         | Data type            | Example values |
| --------------------- | --------------------------------------------------- | -------------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Risk                  | Contains the level of risk for a user entity (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level. The `detectionName` key defines the risks monitored by Okta. The `level` key defines the current risk. The `previousLevel` key defines the previous risk level of the user entity. The `issuer` defines the source of the risk detection. See [Detections](https://help.okta.com/okta_help.htm?type=oie&id=csh-detections).                             | key-value pair       |` {previousLevel=LOW, level=MEDIUM, detectionName=Session Influenced User Risk, reasons=Associated sessionId is suspected to be hijacked, issuer=OKTA} `        |
| TraceId               | A unique identifier to track all events associated with the risk                | String         | `65d65fa6-b5a9-50e9-b6f1-637b9fb71c50`        |
| **target** (User)         | The user associated with a risk change          | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The entity reporting the user risk change (can be a system principal, end user, or org administrator)                | Object        |         |
| type        | The type of actor object           | String     | User       |

### analytics.feedback.provide

**Description:** This event triggers when an admin provides feedback on a user or session risk detection. It can be used to monitor feedback provided by admins in response to Okta-determined changes in risk.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| EventUuid              | The ID of the `user.risk.change` or `session.context.change` event that prompted the Admin feedback.               | String         | `721b1961-f0a6-11ee-bfa6-c1c3bad801v3`        |
| Label              | The type of feedback from the admin, either `true_positive` or `false_positive`                | Enum         |  `true_positive`        |
| **target** (User)         | The user that the feedback is about           | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The user or admin that is providing the feedback                | Object        |         |
| type        | The type of actor object           |      |        |

### security.events.provider.receive_event

**Description:** This event is triggered when an event provider submits a valid Shared Signals Framework (SSF) security event. It can help org admins debug/monitor partner SSF submissions. The event contains debug context data about the event provider's risk report.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| partnerRiskReportData              | The SSF submission from an event provider. It includes the issuer of the security event, the security event URL, and the security event definition.                   | key-value pairs         | `"{  "issuer" : "https://example.eventprovider.com", "https://schemas.openid.net/secevent/caep/event-type/session-revoked" : { "subject" : { "user" : { "format" : "email", "email\" : "joe.alex@example.com" }, "device" : { "format" : "opaque", "sub" : "1234ABCD-123A-123B-123C-12345ABCDEFG" }},    "event_timestamp" : 1709484521, "reason_admin" : {"en" : "Malware detected" }  }}"`         |
| **target** (User)         |  The user affected by the event           | Object     |        |
| type        | The type of target object     | String     |       |
| **actor**                 |  The security events provider                | Object        |         |
| type        | The type of actor object           | String     | SecurityEventProvider        |

### device.signals.status.timeout

**Description:** This event is triggered when a registered device that is associated with at least one user session hasn't communicated with Okta within the required time interval. Use this event to investigate a potentially insecure device and compromised user session. The event contains the device unique identifier in the System Log actor object. You can use this information to find other related events.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| deviceSignalsLastReceived              | The date and time of the last receipt of a device signal                  | String         | `"2024-03-13T19:26:53"`       |
| **target** (User)         | The user who still has an active session on that device           | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 | The registered device associated with the user sessions                | Object        |         |
| id       | The ID of the registered device          | string     |  `guv1ibaeaz4lr8Eo70a9`      |

### policy.auth_reevaluate.fail

**Description:** This event is triggered when an authentication policy detects a Continuous Access violation and it results in failure. It's used to determine the user, apps, and session that were involved in a continuous access violation.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{ New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE } `       |
| CaeEnforceMode             | The Continuous Access evaluation (CAE) UI setting that determines whether the policy is enforceable. If this is false, Okta logs these events but doesn't take any further action.                  | Boolean         | `true`       |
| Risk            | Contains the level of risk for a particular request (`LOW`, `MEDIUM`, or `HIGH`) and the `reasons` that contributed to the risk level.               | key-value pairs         | `{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`        |
| ServerStatus            |  Describes the current state of the Okta servers. Other values can be `READ_ONLY` and `SAFE_MODE`.                | Enum         | `ACTIVE`         |
| ThreatSuspected            | If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                 | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user session associated with the failed policy evaluations          | Object     |        |
| type        | The type of target object     | String     | User      |
| **target** (Policy Evaluation)         | The reevaluated policy         | Object     |        |
| type        | The type of target object          | String     | Policy Evaluation       |
| **target.DetailEntry** (Policy Evaluation)       |             |      |        |
| AppInstanceIds         | The apps affected by a continuous access violation event            | Array     |  `["0oa4mczwb7SfcTQ9N0g7", "0oa4yvb15qhL8RKA30g7"]`   |
| MatchedRuleAction        | The action of the rule that matched the evaluation. Values can be `ALLOW` or `DENY`.           | Enum     | `ALLOW`      |
| MatchedRuleAssuranceMet        | Whether the matched rule evaluated to passing all authenticator assurances. This value is `null` if the `MatchedRuleAction` is `DENY`.           | Boolean      | `false`       |
| MatchedRuleDisplayName         | The matched rule's display name            | String     |        |
| MatchedRuleId        | The unique identifier of the matched rule            | String     | `0pr4yyl6a8D97WIRC0a7 `      |
| PolicyType         | The evaluated policy type            |  ENUM    |  `OKTA_SIGN_ON `     |
| DisplayName        | Displays the name of the evaluated policy          | String     |        |
| ID        | Unique identifier of the target            | String     | `00u8xst93qEWYx65sx1d7`       |
| **actor**                 |  The target user if synchronous and the system principal if asynchronous                  | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  The client of the actor                  | Object      |         |
| IPAddress              | IP address                |       |         |

### policy.continuous_access.evaluate

**Description:** This event triggers when Okta detects a risk change event, and then evaluates the entity risk policy.

| Key event properties | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk for a particular request (`LOW`, `MEDIUM`, or `HIGH`) and the `reasons` that contributed to the risk level.                | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            | If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                   | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with the risk change           | Object     |        |
| type        | The type of target object     | String     | User       |
| **target** (Rule)         | The rule associated with the continuous access evaluation            | Object     |        |
| type        | The type of target object           | String     | Rule       |
| **target.DetailEntry** (Rule)       |             |      |        |
| RuleAction        | The configured action to respond to the risk. Values include `TERMINATE_SESSION` or `RUN_WORKFLOW`.             | Enum     | `TERMINATE_SESSION`       |
| SingleLogOutEnabled        | For a `RuleAction` of `TERMINATE_SESSION`, and if `true`, a continuous access evaluation violation enforces application logout.          | Boolean     | `true`      |
| SingleLogOutSelectionMode        | For a `RuleAction` of `TERMINATE_SESSION`, the options of the application logout, either all applications, specific applications, or none. Values can be: `NONE`, `ALL`, or `SPECIFIED`.           | Enum     | `ALL`       |
| WorkflowId         | The unique identifier of the workflow if the `RuleAction` is `RUN_WORKFLOW`.           | String     | 572749       |
| DisplayName        | Display the name of the target rule           | String     | Test Rule      |
| ID        | Unique identifier of the target rule           | String     | `00u8xst93qEWYx65sx1d7`       |
| **target** (Policy)         |  The continuous access evaluation policy        | Object     |        |
| type        | The type of target object     | String     | Policy      |
| **actor**                 |  The target user if synchronous and the system principal if asynchronous                |         |         |
| type        | The type of actor object           | Object     |        |
| **client**                |  The client of the actor                |       |         |
| IPAddress              | IP address of the client                |       |         |

### policy.continuous_access.action

**Description:** This event is triggered when an action that's associated with an entity risk policy evaluation is invoked.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk for a particular request (`LOW`, `MEDIUM`, or `HIGH`) and the `reasons` that contributed to the risk level.                | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            | If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                    | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with the risk change           | Object      |        |
| type        | The type of target object     | String     | User       |
| **target** (Rule)         | The rule associated with the continuous access evaluation           | Object     |        |
| type       | The type of target object           | String     | Rule       |
| **target.DetailEntry** (Rule)       |             |      |        |
| RuleAction        | The configured action to respond to the risk. Values include `TERMINATE_SESSION` or `RUN_WORKFLOW`.            | Enum     | `TERMINATE_SESSION`       |
| SingleLogOutEnabled        | For a `RuleAction` of `TERMINATE_SESSION`, and if `true`, a continuous access evaluation violation enforces application logout             | Boolean     | `true`      |
| SingleLogOutSelectionMode        | For a `RuleAction` of `TERMINATE_SESSION`, the options of the application logout, either all applications, specific applications, or none. Values can be: `NONE`, `ALL`, or `SPECIFIED`.           | Enum     | `ALL`       |
| WorkflowId         | The unique identifier of the workflow if the `RuleAction` is `RUN_WORKFLOW`.           | String     | 572749       |
| DisplayName        | Displays the name of the rule           | String     | Entity Risk Policy       |
| ID        | Unique identifier of the rule            | String     | `00u8xst93qEWYx65sx1d7`       |
| **target** (Policy)         |  The continuous access evaluation policy         | Object      |        |
| type        | The type of target object     | String     | Policy       |
| **target** (PolicyAction)         | The action associated with the continuous access evaluation           | Object     |        |
| type        | The type of target object           | String     | PolicyAction       |
| **target.DetailEntry** (PolicyAction)       |             |      |        |
| PolicyAction        | The configured action to respond to the risk. Values include `TERMINATE_SESSION` or`RUN_WORKFLOW`.              | Enum     | `TERMINATE_SESSION`       |
| PolicySingleLogOutEnabled        |  For a `PolicyAction` of `TERMINATE_SESSION`, and if `true`, a continuous access evaluation violation enforces application logout             | Boolean     | `true`      |
| PolicySingleLogOutSelectionMode        | For a `PolicyAction` of `TERMINATE_SESSION`, the options of the application logout, either all applications, specific applications, or none. Values can be: `NONE`, `ALL`, or `SPECIFIED`.           | Enum     | `ALL`       |
| PolicySingleLogoutAppInstanceIds          | A list of apps that will that will be logged out if the `PolicySingleLogOutMode` mode is `SPECIFIED`.            | Array     | `[ "0oa1gkh63g214r0Hq0g4", "0oa1gjh63g214q0Iq3g3" ]`      |
| WorkflowId         | The unique identifier of the workflow if the `PolicyAction` is `RUN_WORKFLOW`.           | String     | 572749       |
| DisplayName        | Displays the name of the action          | String     | `TERMINATE_SESSION`       |
| ID        | Unique identifier of the continuous access evaluation policy           | String     | `00u8xst93qEWYx65sx1d7`       |
| **actor**                 |  The target user if synchronous and the system principal if asynchronous                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  The client of the actor                 |       |         |
| IPAddress              | IP address of the client                |       |         |

### user.session.context.change

**Description:** This event indicates that the current session context has changed from the session context when the event was created, and that a reevaluation of policy may be required. This can indicate a security issue related to the session.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Causes              | The cause of the change in session context. The values can be an `ipAddress.change` or `deviceContext.change`.                 | Array        | `["ipAddress.change"]`     |
| ExternalSessionId              | The ID of the session that had the context change                 | String         | `idxncn50DUmRpqWcz3doJX18g`       |
| NewIpAddress            | The new IP address for an `ipAddress.change` cause or the new IP address for a device context change.               | String         | `145.126.159.223 `       |
| PreviousIpAddress              | The previous IP address for an `ipAddress.change` cause or the new IP address for a device context change.                 | String         |  `67.46.211.18 `       |
| changedDeviceSignals              | The change in device signals for the session.               | key-value pairs       | `{ "device.profile.managed":{ "oldValue":true, "newValue":false},"device.provider.wsc.fireWall":{"oldValue":"GOOD", "newValue":"NONE"}} ` |
| Risk            | Contains the level of risk for the current request (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level. The `detectionName` key defines the risks monitored by Okta. The `level` key defines the current risk. The `issuer` defines the source of the risk detection. See [Detections](https://help.okta.com/okta_help.htm?type=oie&id=csh-detections).               | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| Source            | The source of the session context change                 | String        | `OKTA`         |
| ThreatSuspected            | If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                   | Boolean         | `false`         |
| TraceId            |  A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user session with a change in context           | Object     |        |
| type        | The type of target object     | String     | User       |
| **target** (Session)         | The session of the user with a change in context           | Object     |        |
| type        | The type of target object     | String     | Session      |
| **target** (Device)         | For `deviceContext.change` in an asynchronous flow, the device with a change in context          | Object     |        |
| type        | The type of target object     | String     | Session      |
| **actor**                 |  For `ipAddress.change` and `deviceContext.change` in a synchronous flow, the user. For `deviceContext.change` in an asynchronous flow, the system principal             | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  The user client with the context change, except in the case of a device context change when a user isn't interacting with Okta. In that scenario, the client is Okta Verify.              | Object      |         |
| IPAddress              | IP address                |       |         |

### policy.entity_risk.evaluate

**Description:** This event triggers when Okta receives a risk event and then evaluates the entity risk policy.

| Key event properties | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk for a particular request (`LOW`, `MEDIUM`, or `HIGH`) and the `reasons` that contributed to the risk level.                   | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            | If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                   | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with the risk change            | Object      |        |
| type        | The type of target object     | String     | User       |
| **target** (Policy)         | The entity risk policy           | Object     |        |
| type        | The type of target object     | String     | Policy      |
| **target** (Rule)         | The rule of the entity risk policy           |      |        |
| type        | The type of target object           | String     | Rule       |
| **target.DetailEntry**        |             |        |        |
| RuleAction         | The configured action to respond to the risk. Values include `TERMINATE_ALL_SESSIONS` or `RUN_WORKFLOW`. If the action is `TERMINATE_ALL_SESSIONS`, no further properties appear. If the action is `RUN_WORKFLOW`, the `WorkflowId` appears.            | ENUM        | `RUN_WORKFLOW`       |
| WorkflowId         | The unique identifier of the workflow if the `RuleAction` is `RUN_WORKFLOW`.           | String     | 572749       |
| DisplayName        | The name of the rule        | String     | Test rule     |
| ID        | Unique identifier of the rule          | String     | `00u8xut93qEWYx5sx1d7`       |
| Type | The target type | String | `Rule` |
| **actor**                 |  The target user if synchronous and the system principal if asynchronous                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                | The client of the actor                | Object      |         |
| IPAddress              | IP address                |       |         |

### policy.entity_risk.action

**Description:** Entity risk policy action invocation. Signals that an action associated with an evaluation of an entity risk policy has been invoked.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk for a particular request (`LOW`, `MEDIUM`, or `HIGH`) and the `reasons` that contributed to the risk level.                    | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            | If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                   | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with the risk change           | Object     |        |
| type        | The type of target object     | String     | User       |
| **target** (Policy)         | The entity risk policy           | Object     |        |
| type        | The type of target object     | String     | Policy      |
| **target** (Rule)         | The rule of the entity risk policy           | Object     |        |
| type       | The type of target object              | String     | Rule       |
| **target.DetailEntry**        |             |      |     |
| RuleAction         | The configured action to respond to the risk. Values include `TERMINATE_ALL_SESSIONS` or `RUN_WORKFLOW`. If the action is `TERMINATE_ALL_SESSIONS`, no further properties appear. If the action is `RUN_WORKFLOW`, the `WorkflowId` appears.            | ENUM        | `RUN_WORKFLOW`       |
| WorkflowId         | The unique identifier of the workflow if the `RuleAction` is `RUN_WORKFLOW`.           | String     | 572749       |
| DisplayName        | Name of the rule         | String     | Test rule     |
| ID        | Unique identifier of the rule           | String     | `00u8xut93qEWYx5sx1d7`       |
| type        | The type of target object           | String     | Rule       |
| **target** (PolicyAction)         |            |      |        |
| type        | The type of target object           | String     | PolicyAction       |
| **target.DetailEntry**         |             | Object    |       |
| PolicyAction         | The configured action to respond to the risk. Values include `NULL` (Logging Mode), `TERMINATE_ALL_SESSIONS`, and `RUN_WORKFLOW`.             |  ENUM    | `TERMINATE_ALL_SESSIONS`      |
| PolicySingleLogOutEnabled         | Identifies if single logout is enabled. This property appears if `PolicyAction` is `TERMINATE_SESSION`.          | Boolean    | `true`      |
| PolicySingleLogOutSelectionMode         | The mode of logout. Values can be `NONE`, `ALL`, or `SPECIFIED`. This property appears if `PolicyAction` is `TERMINATE_SESSION`.           | ENUM    | `ALL`       |
| PolicySingleLogoutAppInstanceIds          | A list of apps that will that will be logged out if the `PolicySingleLogOutMode` mode is `SPECIFIED`.            | Array     | `[ "0oa1gkh63g214r0Hq0g4", "0oa1gjh63g214q0Iq3g3" ]`      |
| PolicyWorkflowId         | The unique identifier of the workflow if the `PolicyAction` is `RUN_WORKFLOW`.           |  String    | 572749      |
| DisplayName        | Name of the policy action         | String     |`TERMINATE_ALL_SESSIONS`         |
| ID        | Unique identifier of the entity risk policy            | String     | `00u8xut93qEWYx5sx1d7`       |
| type        | The type of target object           | string     | PolicyAction       |
| **actor**                 |  The target user if synchronous and the system principal if asynchronous                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  The client of the actor                |       |         |
| IPAddress              | IP address                |       |         |

### user.session.end

**Description:** This event is triggered when Okta terminates all IDX sessions for a user. A separate event is logged for each of the user's active sessions. Each event contains `externalSessionId` and `System.Transaction.ID` values that correlate with the `System.Transaction.ID` for the `user.session.clear` event.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| EndedSessionId             |  The session ID that is ended for the target user                 | String         |  `idxffK-esRDSrC5m0ly-Kma9A `       |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one System Log query                  | String         | `e1214f29-e6b3-4698-b3be-4bccaadf1937`         |
| ThreatSuspected             |  If ThreatInsight is running and detects a request as suspicious, the value for this property is `true`.                   | Boolean         |          |
| Url                        | The log-out URL from the end user or admin actor                  | String         |          |
| **event.System.Transaction**                |                 |         |         |
| ID              | For an admin actor, this ID correlates with `user.session.clear` or `user.authentication.universal_logout` events. For a system principal actor, this ID correlates to the `user.authentication.universal_logout` event.               | String         |  `c579b0f27865c4b93be9ceb6f00e5373`          |
| **target** (User)         | The user associated with a risk activity            | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The end user, the Admin (in the case of an explicit Admin action), or the system principal (i the case of a continuous access evaluation)               |  Object       |         |
| type        | The type of actor object           |      |        |
| **client**                |  The client of the system principal actor                | Object      |         |
| IPAddress              | IP address                |       |         |

### user.session.clear

**Description:**   This event triggers when an admin invokes clear sessions from the user profile. This event appears only one time and contains `externalSessionId` and `System.Transaction.ID`.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.System.Transaction**                |                 |         |         |
| ID              | This ID correlates with all associated `user.session.end` events                | String         | `c579b0f27865c4b93be9ceb6f00e5373`         |
| **event.AuthenticationContext**                |                 |         |         |
| ExternalSessionId              | The ID of the admin invoking the clear session action                 | String         | `102Oxl7hHhjTMvV2L8MGc_SYR`           |
| **target** (User)         | The user who had their session cleared by the admin            | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The admin user invoking the clear session action                 | Object        |         |
| type        | The type of actor object           | String        |  User      |
| **client**                |  The client of the admin actor                | Object      |         |
| IPAddress              | IP address                |       |         |

<!-- | **event.system.debugContext.debugData**                |                 |         |         |
| Url             | ???                 | String         |         |-->

### user.authentication.universal_logout

**Description:** This event triggers when Okta or an admin invokes Universal Logout against an app instance. It contains the app instance details for which the Universal Logout API was triggered. This event indicates when apps have had Universal Logout triggered for audit or debugging purposes. This event is only triggered once. It's only triggered for apps that have been configured for Universal Logout. You can configure it in an Entity risk policy or Continuous Access, or invoke it manually from the user profile.

| Key event properties | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| AppInstanceIds            |A list of application IDs that Okta triggered for Universal Logout                 | Array of IDs         | ["0oa1ysra5y0ESChAr0h8"]        |
| TraceId            | The `TraceId` is used in continuous access evaluation use cases. A request that triggers a CAE evaluation can ultimately trigger things like CAE action events - and those are executed from the async jobs. `TraceId` connects together events triggered both by the original request handler and from the async jobs triggered by this handler. | String         | `94384405-51e3-4e13-b8b0-ba857b585a63`         |
| **target** (User)         | The user impacted by the universal logout          | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The admin or system principal that triggers universal logout                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  The client of the system principal actor for continuous access evaluation and entity risk policy actions, or the client of the admin triggering the clear user sessions action.                 | Object      |         |
| IPAddress              | IP address                |       |         |

### workflows.user.delegatedflow.run

**Description:** This event can be used by admins or security team members to monitor the execution of delegated flows in the Workflows platform from the Admin Console. The actor field provides the Okta User ID of the user that ran the flow. The target fields provide context on the Workflows instance and the name and flow ID of the executed flow. This event only indicates if the flow was successfully triggered and doesn't provide information about whether the flow encountered an error.

| Key event properties  | Description                                         | Data type      | Example values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| SessionId          | Session ID              | String         | `ad995fe6-e721-4a8a-86ac-d942bc59ea41`       |
| **target** (AppInstance)         | The Okta Workflows app        | Object     |        |
| id        | Unique identifier of the Okta Workflows app         | String     | 00u8xut93qEWYx5sx1d7       |
| type        | The type of target object     | String     | AppInstance      |
| **target** (Flow)         | The workflow instance of the executed flow         | Object     |        |
| id        | Unique identifier of the target instance           | String     | 00u8xut93qEWYx5sx1d7       |
| type        | The type of target object     | String     | Flow      |
| **actor**                 |  The user that runs the flow                | Object        |         |
| id        | Unique identifier of the user that runs the flow           |      |        |
| type        | The type of actor object           |  String    |  User      |

<!-- | **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         | -->
