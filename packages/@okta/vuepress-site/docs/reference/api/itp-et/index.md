---
title: Identity Threat Protection
category: management
meta:
  - name: description
    content: ITP specific event types
---

# Identity Threat Protection Event Types

This resource contains detailed reference material on event types triggered with the Identity Threat Protection solution. Use the information from these attributes to understand the users, threats, and risk environment for your org.

>**Note:** Not every attribute is documented for the event types. Only those primarily used to assist in reviewing an identity threat interaction. Additionally, attributes and sub-attributes may differ based on the your implementation of the Identity Threat Protection solution.

### user.risk.change

**Description:** Indicates a user's risk level has changed. This event can be used to monitor risk level changes for users. This event is triggered when Okta determines that a user is associated with a risk context or activity.

| Key Event Attributes  | Description                                         | Data Type            | Example Values |
| --------------------- | --------------------------------------------------- | -------------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Risk                  | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                                                | key-value pair       |` {previousLevel=LOW, level=MEDIUM, detectionName=Session Influenced User Risk, reasons=idxGuvnnpQKQ8uVw56TGp23Qg, issuer=OKTA} `        |
| TraceId               | ID generated for the risk request                   | String         | `65d65fa6-b5a9-50e9-b6f1-637b9fb71c50`        |
| **target** (User)         | The user associated with a risk change          | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The entity reporting the user risk change (can be a system principal or a user)                | Object        |         |
| type        | The type of actor object           | String     | User       |

### analytics.feedback.provide

**Description:** An admin has provided feedback on a detection Okta provided which indicated a change in user or session risk. This can be used to monitor feedback provided by admins in response to Okta determined changes in risk. This event is fired when an admin chooses to provide feedback on a detection event in the admin console.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| EventUuid              | The ID of the `user.risk.change` or `session.context.change` event that prompted the Admin feedback.               | String         | `721b1961-f0a6-11ee-bfa6-c1c3bad801v3`        |
| Label              | The type of feedback from the admin, either `true_positive` or `false_positive`                | Enum         |  `true_positive`        |
| **target** (User)         | The user that the feedback is about           | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  The user or admin that is providing the feedback                | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### security.events.provider.receive_event

**Description:** Triggered when an event provider submits a valid SSF for each security event. The event can help Org Admins debug/monitor partner SSF (Shared Signals Framework) submissions. The event contains debug context data about the event provider's risk report.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| partnerRiskReportData              | The SSF submission from an event provider. It includes the issuer of the security event, security event URL, and the security event definition.                   | key-value pairs         | `"{\n  \"issuer\" : \"https://example.eventprovider.com\",\n  \"https://schemas.openid.net/secevent/caep/event-type/session-revoked\" : {\n    \"subject\" : {\n      \"user\" : {\n        \"format\" : \"email\",\n        \"email\" : \"joe.alex@example.com\"\n      },\n      \"device\" : {\n        \"format\" : \"opaque\",\n        \"sub\" : \"1234ABCD-123A-123B-123C-12345ABCDEFG\"\n      }\n    },\n    \"event_timestamp\" : 1709484521,\n    \"reason_admin\" : {\n      \"en\" : \"Malware detected\"\n    }\n  }\n}"`         |
| **target** (User)         |  The user affected by the event           | Object     |        |
| type        | The type of target object     | String     |       |
| **actor**                 |  The security events provider                | Object        |         |
| type        | The type of actor object           | String     | SecurityEventProvider        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### device.signals.status.timeout

**Description:** A registered device associated with at least one user session that hasn't communicated with Okta within the required time interval. Use this event to investigate a potentially insecure device and a compromised user session. This event contains the device unique identifier in the System Log actor object. You can use this information to find other related events.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| deviceSignalsLastReceived              | The date and time of the last receipt of a device signal                  | String         | `"2024-03-13T19:26:53"`       |
| **target** (User)         | The user who still has an active session on that device           | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 | The registered device associated with the user sessions                | Object        |         |
| id       | The ID of the registered device          | string     |  `guv1ibaeaz4lr8Eo70a9`      |
| type        | The type of device          |      |        |

### policy.auth.reevaluate.fail

**Description:** Auth policy re-evaluation has occurred and has resulted in a continuous access violation. Can be used to identify which user, apps, and session were involved in a continuous access violation event. Event fired when continuing access evaluation results in failure.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| CaeEnforceMode             | The UI setting for CAE on whether or not the policy is enforceable. If this is false, Okta logs these events but doesn't take any further action.                  | Boolean         | `true`       |
| Risk            | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                 | key-value pairs         |          |
| ServerStatus            |  Describes the current state of Okta's servers. Other values can be READ_ONLY and SAFE_MODE.                | Enum         | `ACTIVE`         |
| ThreatSuspected            |                  | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one system log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with ???           | Object     |        |
| type        | The type of target object     | String     | User      |
| **target** (Policy Evaluation)         | The policy evaluation ???           | Object     |        |
| type        | The type of target object          | String     | Policy Evaluation       |
| **target.DetailEntry** (Policy Evaluation)       |             |      |        |
| AppInstanceIds         |             |      |        |
| MatchedRuleAction        |             |      |        |
| MatchedRuleAssuranceMet        |             |      |        |
| MatchedRuleDisplayName         |             |      |        |
| MatchedRuleId        |             |      |        |
| PolicyType         |             |      |        |
| DisplayName        | Display name of the target           | String     |        |
| ID        | Unique identifier of the target            | String     | `00u8xst93qEWYx65sx1d7`       |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### policy.continuous_access.evaluate

**Description:** Evaluation of Entity Risk policy. Signal that entity risk policy has been evaluated for an entity for which we have received a risk change event. Event fired when entity risk policy has been evaluated for an entity for which a risk change event was generated.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                 | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            |                  | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one system log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with ???           | Object     |        |
| type        | The type of target object     | String     | User       |
| **target** (Rule)         | ???           | Object     |        |
| type        | The type of target object           | String     | Rule       |
| **target.DetailEntry** (Rule)       |             |      |        |
| RuleAction        |             | Enum     | `TERMINATE_SESSION`       |
| SingleLogOutEnabled        |             | Boolean     | `true`      |
| SingleLogOutSelectionMode        |            | Enum     | `ALL`       |
| DisplayName        | Display name of the target           | String     |        |
| ID        | Unique identifier of the target            | String     | `00u8xst93qEWYx65sx1d7`       |
| **target** (Policy)         |  ???         | Object     |        |
| type        | The type of target object     | String     | Policy      |
| **actor**                 |  ???                 |         |         |
| type        | The type of actor object           | Object     |        |
| **client**                |  ???                |       |         |
| IPAddress              | IP address                |       |         |

### policy.continuous_access.action

**Description:** Entity Risk policy action invocation. Signal that an action associated with an entity risk policy evaluation has been invoked. Event fired when an action associated with an entity risk policy evaluation has been invoked.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                 | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            |                  | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one system log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         | The user associated with ???           | Object      |        |
| type        | The type of target object     | String     | User       |
| **target** (Rule)         | ???           | Object     |        |
| type       | The type of target object           | String     | Rule       |
| **target.DetailEntry** (Rule)       |             |      |        |
| RuleAction        |             | Enum     | `TERMINATE_SESSION`       |
| SingleLogOutEnabled        |             | Boolean     | `true`      |
| SingleLogOutSelectionMode        |            | Enum     | `ALL`       |
| DisplayName        | Display name of the target           | String     |        |
| ID        | Unique identifier of the target            | String     | `00u8xst93qEWYx65sx1d7`       |
| **target** (Policy)         |  ???         | Object      |        |
| type        | The type of target object     | String     | Policy       |
| **target** (PolicyAction)         | ???           | Object     |        |
| type        | The type of target object           | String     | PolicyAction       |
| **target.DetailEntry** (Rule)       |             |      |        |
| PolicyAction        |             | Enum     | `TERMINATE_SESSION`       |
| PolicySingleLogOutEnabled        |             | Boolean     | `true`      |
| PolicySingleLogOutSelectionMode        |            | Enum     | `ALL`       |
| DisplayName        | Display name of the target           | String     |        |
| ID        | Unique identifier of the target            | String     | `00u8xst93qEWYx65sx1d7`       |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                |       |         |
| IPAddress              | IP address                |       |         |

### user.session.context.changed

**Description:** User session context changed. This event indicates that the context in which the session is being used has changed significantly enough from the context in which the event was created, that re-evaluation of policy may be required. Often this indicates a security issue related to the session.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Causes              |                  | Array        | [ipAddress.change]      |
| ExternalSessionId              |                  | String         | `idxncn50DUmRpqWcz3doJX18g`       |
| NewIpAddress            |                   | String         |          |
| PreviousIpAddress              |                  | String         |          |
| Risk            | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                 | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| Source            |                  | String        | `OKTA`         |
| ThreatSuspected            |                  | Boolean         | `false`         |
| TraceId            |  A unique ID that is used across a single flow of ITP events to easily correlate them all into one system log query                | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         |            | Object     |        |
| type        | The type of target object     | String     | User       |
| **target** (Session)         |            | Object     |        |
| type        | The type of target object     | String     | Session      |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### policy.entity_risk.evaluate

**Description:** Evaluation of Entity Risk policy. Signal that entity risk policy has been evaluated for an entity for which we have received a risk change event. Event fired when entity risk policy has been evaluated for an entity for which a risk change event was generated.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                 | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            |                  | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one system log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         |            | Object      |        |
| type        | The type of target object     | String     | User       |
| **target** (Policy)         |            | Object     |        |
| type        | The type of target object     | String     | Policy      |
| **target** (Rule)         |            |      |        |
| type        | The type of target object           | String     | Rule       |
| **target.DetailEntry**        |             |        |        |
| RuleAction         |             | ENUM        | RUN_WORKFLOW       |
| WorkflowId         |             | String     | 572749       |
| DisplayName        | Name of the rule          | String     | `SESSION_INFLUENCED_USER_RISK + MEDIUM`       |
| ID        | Unique identifier of the target            | String     | `00u8xut93qEWYx5sx1d7`       |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### policy.entity_risk.action

**Description:** Entity Risk policy action invocation. Signal that an action associated with an entity risk policy evaluation has been invoked. Event fired when an action associated with an entity risk policy evaluation has been invoked.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| Behaviors             | List of behaviors identified for the current event. `POSITIVE` - the specific behavior is identified. `NEGATIVE` - the specific behavior wasn't identified. See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection).                 | key-value pairs        |  `{New Geo-Location=POSITIVE, New Device=NEGATIVE, New IP=POSITIVE, New State=POSITIVE, New Country=POSITIVE, Velocity=POSITIVE, New City=POSITIVE} `       |
| Risk            | Contains the level of risk (`LOW`, `MEDIUM`, or `HIGH`) and the reasons that contributed to the risk level, See [Risk scoring](https://help.okta.com/okta_help.htm?type=oie&id=csh-risk-scoring).                 | key-value pairs         |`{reasons=Anomalous Geo-Distance, New Device, New ASN, New IP, New State, New Country, New City, level=HIGH}`          |
| ThreatSuspected            |                  | Boolean         | `false`         |
| TraceId            | A unique ID that is used across a single flow of ITP events to easily correlate them all into one system log query                 | String         | `65d55fa6-b5a9-40f9-a6f1-627b9fa71b50`        |
| **target** (User)         |            | Object     |        |
| type        | The type of target object     | String     | User       |
| **target** (Policy)         |            | Object     |        |
| type        | The type of target object     | String     | Policy      |
| **target** (Rule)         |            | Object     |        |
| type       | The type of target object              | String     | Rule       |
| **target.DetailEntry**        |             |      |     |
| RuleAction         |             |      | `TERMINATE_ALL_SESSIONS`      |
| WorkflowAction         |             |      | `TERMINATE_ALL_SESSIONS`      |
| DisplayName        | Name of the rule action         | String     | `USER_REPORTED_SUSPICIOUS_ACTIVITY + HIGH`       |
| ID        | Unique identifier of the target            | String     | `00u8xut93qEWYx5sx1d7`       |
| **target** (PolicyAction)         |            |      |        |
| type        | The type of target object           | String     | PolicyAction       |
| **target.DetailEntry**         |             | Object    |       |
| PolicyAction         |             |  ENUM    | `TERMINATE_ALL_SESSIONS`      |
| PolicyWorkflowId         |             |  ENUM    |       |
| DisplayName        | Name of the policy action         | String     |`TERMINATE_ALL_SESSIONS`         |
| ID        | Unique identifier of the target            | String     | `00u8xut93qEWYx5sx1d7`       |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                |       |         |
| IPAddress              | IP address                |       |         |

### user.session.end

**Description:** This event is triggered when Okta terminates all IDX sessions. If there are 'N' active sessions for a user the event appears 'N' times. All 'N' events contain `externalSessionId` and `System.Transaction.ID` that correlate with the `System.Transaction.ID` under the `user.session.clear` event.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| AppInstanceIds             |                  | String         |          |
| AppInstanceIdsPartialLogout             |                  | String         |          |
| LoggedOutAppInstanceIds             |                  | String         |          |
| LoggedOutAppInstanceIdsPartialLogout              |                  | String         |          |
| LogoutEventType              |                  | String         |          |
| ThreatSuspected             |                   | String         |          |
| **event.System.Transaction**                |                 |         |         |
| ID              |                  | String         |  `c579b0f27865c4b93be9ceb6f00e5373`          |
| **event.AuthenticationContext**                |                 |         |         |
| ExternalSessionId              |                  | String         | `102Oxl7hHhjTMvV2L8MGc_SYR`     |
| **target** (User)         | The user associated with a risk activity            | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  ???                 |  Object       |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### user.session.clear

**Description:**   This event is triggered when an Admin invokes clear sessions by clicking on the "Clear user session". This event appears only once and contains `externalSessionId` and `System.Transaction.ID`.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| ???             |                  | String         |         |
| **event.System.Transaction**                |                 |         |         |
| ID              |                  | String         | `c579b0f27865c4b93be9ceb6f00e5373`         |
| **event.AuthenticationContext**                |                 |         |         |
| ExternalSessionId              |                  | String         | `102Oxl7hHhjTMvV2L8MGc_SYR`           |
| **target** (User)         | The user who had their session cleared            | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### user.authentication.universal_logout

**Description:** This event is triggered when an admin or system account triggers Universal Logout against an app instance. It contains the app instance details for which the Universal Logout API was fired. This event identifies when applications have had Universal Logout triggered for audit or debugging purposes. This event is only fired once. It's only fired for applications that have been configured for Universal Logout. You can configure it under Risk policy, Continuous Access policy, or in an admin-initiated Clear User Session.

| Key Event Properties | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| AppInstanceIds            |A list of application IDs that Okta triggered for Universal Logout                 | Array of IDs         | [0oa1ysra5y0ESChAr0h8]        |
| TraceId            | The `TraceId` is used in continuous access evaluation use cases. A request that triggers a CAE evaluation can ultimately trigger things like CAE action events - and those will be executed from the async jobs. `TraceId` connects together events triggered both by the original request handler and from the async jobs triggered by this handler. | String         | `94384405-51e3-4e13-b8b0-ba857b585a63`         |
| **target** (User)         | The user ???           | Object     |        |
| type        | The type of target object     | String     | User       |
| **actor**                 |  ???                 | Object        |         |
| type        | The type of actor object           |      |        |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |

### workflows.user.delegatedflow.run

**Description:** This event can be used by admins or security team members to monitor the execution of delegated flows in the Workflows platform from the Admin application. The actor field provides the Okta User ID of the user that ran the flow.  The target fields provide context on the Workflows instance as well as the name and flow id of the executed flow. This event only indicates if the flow was successfully triggered and does not provide information about whether the flow encountered an error.

| Key Event Attributes  | Description                                         | Data Type      | Example Values |
| --------------------- | --------------------------------------------------- | -------------- | -------------- |
| **event.system.debugContext.debugData**                |                 |         |         |
| SessionId          |               | String         | `ad995fe6-e721-4a8a-86ac-d942bc59ea41`       |
| **target** (AppInstance)         | The user ???           | Object     |        |
| id        | Unique identifier of the target            | String     | 00u8xut93qEWYx5sx1d7       |
| type        | The type of target object     | String     | AppInstance      |
| **target** (Flow)         | The user ???           | Object     |        |
| id        | Unique identifier of the target            | String     | 00u8xut93qEWYx5sx1d7       |
| type        | The type of target object     | String     | Flow      |
| **actor**                 |  ???                 | Object        |         |
| id        | Unique identifier of the actor            |      |        |
| type        | The type of actor object           |  String    |  User      |
| **client**                |  ???                | Object      |         |
| IPAddress              | IP address                |       |         |
