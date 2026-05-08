---
title: Manage Identity Threat Protection with Okta AI resources using Terraform
meta:
  - name: description
    content: Learn how to create, import, and modify Identity Threat Protection with Okta AI resources using Terraform automation.
layout: Guides
---

This guide shows you how to manage Identity Threat Protection with Okta AI (ITP) resources with Terraform.

---

#### Learning outcomes

Use Terraform to configure ITP resources in your org, such as policies, shared signals, user risks, and network zones.

#### **What you need**

* An Okta Identity Engine org that's subscribed to Identity Threat Protection with Okta AI (also limited support to Okta orgs with Adaptive MFA)
* Terraform CLI version 1.14.7 or later
* [Okta Terraform provider 6.9.0](https://registry.terraform.io/providers/okta/okta/latest/docs) or later
* Familiarity with the Terraform terms: configuration, resources, state, and commands (see [Terraform overview](https://developer.okta.com/docs/guides/terraform-overview/main/))
* A Terraform [API service app integration](https://developer.okta.com/docs/guides/terraform-enable-org-access/main/#create-an-api-service-app-to-manage-terraform-access) in your org

---

## Identity Threat Protection resources

Identity Threat Protection with Okta AI (ITP) is a continuous identity threat detection and response solution that detects and responds to threats as they occur. ITP continuously evaluates users and their sessions, receiving risk signals from the Okta risk engine and security event providers. When ITP identifies changes in a user's risk, network zone, device, or behavior, it launches automated mitigation and remediation actions, such as Universal Logout. See [Identity Threat Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview).

The [Okta Terraform provider](https://registry.terraform.io/providers/okta/okta/latest) now supports ITP resource configuration, and existing IAM resource configuration, such as groups, users, devices, and authentication services. The following ITP resources can be managed through the Okta Terraform provider:

* **Network zones**: Configure boundaries to control access based on location, IP, or ASN.
* **Policies**: Define policies for continuous threat evaluation.
* **Behavior detection rules**: Define rules for the sign-on policy.
* **User risk**: Define user risk levels that require mitigation.
* **Shared Signals**: Configure third-party security vendor connections to receive security-related events.

> **Note:** The following ITP configurations aren't available through the Okta Terraform provider:
> * **Universal Logout**: Configure remediation action for apps, such as Universal Logout, through the Admin Console. See [Configure Universal Logout in ITP](https://help.okta.com/okta_help.htm?type=oie&id=csh-universal-logout).
> * **Bot protection**: Configure bot protection through the [Okta APIs](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/botprotection) or the Admin Console. See [Bot protection](https://help.okta.com/oie/en-us/content/topics/itp/bot-protection.htm).
> * **Workflows**: Configure ITP Workflows through the Okta Workflows console. See [Workflows for Identity Threat Protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-workflows-for-itp).
> * **Custom admin roles for ITP**: Configure custom admin roles for ITP through the Admin Console. See [Admin roles for ITP](https://help.okta.com/okta_help.htm?type=oie&id=csh-itp-rbac).

Before you can configure ITP with Terraform, you need to set up Terraform access for ITP resources.

## Set up Terraform access for ITP

When you set up your [Terraform API service app integration](https://developer.okta.com/docs/guides/terraform-enable-org-access/main/#create-an-api-service-app-to-manage-terraform-access) in your org, you need to grant the app the appropriate permissions and OAuth 2.0 scopes to manage the resources.

### Admin role

Grant the super admin role (`SUPER_ADMIN`) to your Terraform API service app integration in Okta to manage the ITP resources. See [Assign admin roles](https://developer.okta.com/docs/guides/terraform-enable-org-access/main/#assign-admin-roles).

### **Scopes**

1. Grant the following OAuth 2.0 scopes to your Terraform API service app integration in Okta. See [Grant API scopes](https://developer.okta.com/docs/guides/terraform-enable-org-access/main/#grant-api-scopes).
    * `okta.userRisk.manage`
    * `okta.securityEventsProviders.manage`
    * `okta.networkZones.manage`
    * `okta.policies.manage`
    * `okta.behaviors.manage`

2. Add the same scopes to your Okta provider Terraform configuration:

    ```bash
    provider "okta" {
      org_name = "[ORG NAME e.g. dev-123456]"
      base_url = "[okta.com|oktapreview.com]"
      client_id = "[APP CLIENT_ID]"
      private_key_id = "[PRIVATE KEY ID - KID]"
      private_key = "[PRIVATE KEY]"
      scopes = "okta.userRisk.manage, okta.securityEventsProviders.manage,okta.apps.manage, okta.networkZones.manage, okta.policies.manage"
    }
    ```

### Terraform files

For guidance on organizing your files, see [Organizing your configuration](/docs/guides/terraform-organize-configuration/main/). Consider organizing your Terraform code so that related resources are grouped. For example, you could create a Terraform file called `policies.tf` that contains all of your policy resources, and `ssf.tf` to configure your shared signal vendors.

## Manage ITP resources in Terraform

Use the following sections to configure network zones, risk policies, and shared signal receptors for your ITP implementation.

### Network zones

Network zones define security boundaries for your org. You can use these zones in policies to allow or restrict access based on geographical location, specific IP addresses, or Autonomous System Numbers (ASNs).

See [network zones](https://help.okta.com/okta_help.htm?type=oie&id=ext-network-zones) in the product documentation and the [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/networkzone).

To create a network zone for a specific IP range or a dynamic location, use the `okta_network_zone` resource. See [Terraform resource: okta_network_zone](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/network_zone).

**Example:** IP and dynamic network zones

```bash
# IP-based network zone for trusted office locations
resource "okta_network_zone" "office_network" {
  name     = "Corporate Office"
  type     = "IP"
  gateways = ["192.168.1.0/24", "10.0.0.0/8"]
  proxies  = ["203.0.113.1"]
  usage    = "POLICY"
  }

# Dynamic zone to block traffic from specific countries
resource "okta_network_zone" "blocked_countries" {
  name              = "High Risk Regions"
  type              = "DYNAMIC"
  usage             = "BLOCKLIST"
  dynamic_locations = ["IR", "KP"] }
```

### Policies

ITP policies assess risk by continuously evaluating sessions. See the following resources to configure [session violation detection](#session-violation-detection-policy), [session violation enforcement](#session-violation-enforcement-policy), and [entity risk](#entity-risk-policy) policies.

For more information on policies, see [Session protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation) and [Entity risk policy](https://help.okta.com/okta_help.htm?type=oie&id=csh-entity-risk-policy) in the product documentation.

### Session violation detection policy

Okta ITP is configured with a default session violation policy (`SESSION_VIOLATION_DETECTION`) that continuously detects changes to IP addresses or device context. You can't create or edit this policy, but you can modify the corresponding session violation policy rule. Use the `okta_session_violation_policy` data source to retrieve and configure the `okta_session_violation_policy_rule`.

1. Before configuring the `okta_session_violation_policy_rule` resource, you need to import the existing system rule. You can use the [List all policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/listpolicies) API operation to find the `SESSION_VIOLATION_DETECTION` policy ID, and the [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/listpolicyrules) API to find the  `SESSION_VIOLATION_DETECTION` policy rule ID.

1. Import the object to your Terraform state. See [`okta_session_violation_policy_rule` import example](https://github.com/okta/terraform-provider-okta/blob/master/examples/resources/okta_session_violation_policy_rule/) in the `terraform-provider-okta` GitHub repository.

    ```bash
    terraform import okta_session_violation_policy_rule.svp_rule <policy_id>/<rule_id>
    ```

3. Configure your session violation policy rule. See [Terraform data source: okta_session_violation_policy](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/session_violation_policy) and [Terraform resource: okta_session_violation_policy_rule](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/session_violation_policy_rule).

    **Example:** Configure the session violation policy rule.

    ```bash
    data "okta_session_violation_policy" "sv_policy" {
    }

    resource "okta_session_violation_policy_rule" "sv_rule" {
      policy_id = data.okta_session_violation_policy.sv_policy.id
      name = "My Session Violation Rule"
      min_risk_level = "HIGH"
      policy_evaluation_enabled = true
    }
    ```

Alternatively, you can add an import block to your `.tf` file. See [Import existing resources](https://developer.okta.com/docs/guides/terraform-import-existing-resources/main/).

**Example:** Import and configure the default session violation policy rule in your `.tf` file.

```bash
# In your .tf file

import {
  to = okta_session_violation_policy_rule.svp_rule
  id = "<id>"
}

resource "okta_session_violation_policy_rule" "svp_rule" {
    policy_id                 = data.okta_session_violation_policy.svp.id
    name                      = "Session Violation Rule"
    min_risk_level            = "HIGH"
    policy_evaluation_enabled = true
}
```

### Session violation enforcement policy

There’s only one immutable session-violation enforcement policy (`POST_AUTH_SESSION`) in an ITP-enabled Okta org. You can modify the corresponding policy rule for the `POST_AUTH_SESSION` policy. This policy and rule allow you to enforce the session protection policy with a remediation action. Use the `okta_post_auth_session_policy` data source to retrieve and configure the `okta_post_auth_session_policy_rule`.

1. Before configuring the `okta_post_auth_session_policy_rule` resource, you need to import the existing system default rule. You can use the [List all policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/listpolicies) API operation to find the `POST_AUTH_SESSION` policy ID, and the [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/listpolicyrules) API to find the `POST_AUTH_SESSION` policy rule ID.

1. Import the object to your Terraform state. See [okta_post_auth_session_policy_rule example](https://github.com/okta/terraform-provider-okta/tree/master/examples/resources/okta_post_auth_session_policy_rule) in the terraform-provider-okta GH repository.

    **Example:** Import the default session violation enforcement policy rule.

    ```bash
    terraform import okta_post_auth_session_policy_rule.pas_rule <policy_id>/<rule_id>
    ```

1. Configure your session violation policy rule. See [Terraform data source: okta_post_auth_session_policy](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/post_auth_session_policy) and [Terraform resource: okta_post_auth_session_policy_rule](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/post_auth_session_policy_rule).

    **Example:** Configure the session violation policy rule.

    ```bash
    data "okta_post_auth_session_policy" "pas_policy" {
    }

    resource "okta_post_auth_session_policy_rule" "pas_rule" {
      policy_id = data.okta_post_auth_session_policy.pas_policy.id
      name = "My Session Auth Enforcement Rule"
      terminate_session = true
    }
    ```

### Entity risk policy

An ITP-enabled Okta org contains one immutable system entity risk (`ENTITY_RISK`) policy. You can add a policy rule to the `ENTITY_RISK` system policy. This entity risk policy rule allows you to customize your response to risk changes for an entity (typically, a user). Use the [`okta_entity_risk_policy`](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/entity_risk_policy) data source to retrieve and configure the [`okta_entity_risk_policy_rule`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/entity_risk_policy_rule) resource.

See [Entity risk policy](https://help.okta.com/okta_help.htm?type=oie&id=csh-entity-risk-policy) in the product documentation.

> **Note**: An ITP-enabled Okta org contains a default immutable entity risk policy rule with `priority` 99. This rule is intended as a catch-all if none of the higher-priority rules are triggered. Therefore, you must create your custom rule with a higher priority (lower number in the `priority` field, for example: `priority < 99`).

1. Configure your entity risk policy rule. See [Terraform data source: okta_entity_risk_policy](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/entity_risk_policy) and [Terraform resource: okta_entity_risk_policy_rule](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/entity_risk_policy_rule).

    **Example:** Configure an entity risk rule.

    ```bash
    data "okta_entity_risk_policy" "er_policy" {
    }

    resource "okta_entity_risk_policy_rule" "er_high_rule" {
      policy_id = data.okta_entity_risk_policy.er_policy.id
      name = "High Risk - Terminate Sessions"
      risk_level = "HIGH"
      terminate_all_sessions = true
    }
    ```

### Behavior detection rules

Behavior detection rules are used to configure location, device, IP address, or velocity behavior rules for a sign-on policy. Use the `okta_behavior` or `okta_behaviors` data sources to retrieve and configure the `okta_behavior` resource.

> **Note**: If you have existing behavior rule configurations, you need to import the behavior rule resources before configuring them.

See [About Behavior Detection](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-behavior-detection) in the product documentation.

1. Configure the `okta_behavior` resource. See [okta_behavior](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/behavior).

    **Example**: Configure behavior detection rules.

    ```bash
    resource "okta_behavior" "my_location" {
      name                      = "My Location"
      type                      = "ANOMALOUS_LOCATION"
      number_of_authentications = 50
      location_granularity_type = "LAT_LONG"
      radius_from_location      = 20
    }

    resource "okta_behavior" "my_city" {
      name                      = "My City"
      type                      = "ANOMALOUS_LOCATION"
      number_of_authentications = 50
      location_granularity_type = "CITY"
    }

    resource "okta_behavior" "my_device" {
      name                      = "My Device"
      type                      = "ANOMALOUS_DEVICE"
      number_of_authentications = 50
    }

    resource "okta_behavior" "my_ip" {
      name                      = "My IP"
      type                      = "ANOMALOUS_IP"
      number_of_authentications = 50
    }

    resource "okta_behavior" "my_velocity" {
      name     = "My Velocity"
      type     = "VELOCITY"
      velocity = 25
    }
    ```

2. Add the behavior-detection conditions to your global session policy rule. Use the [`okta_policy_rule_signon`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/policy_rule_signon) resource to add your behavior.

    **Example**: Configure the behaviour rule to a global session policy rule.

    ```bash
    data "okta_policy" "global_policy" {
      name = "Global session policy"
      type = "OKTA_SIGN_ON"
    }
    resource "okta_policy_rule_signon" "global_policy_rule" {
      access             = "CHALLENGE"
      authtype           = "RADIUS"
      name               = "Example Policy Rule"
      network_connection = "ANYWHERE"
      policy_id          = okta_policy_signon.global_policy.id
      status             = "ACTIVE"
      risc_level         = "HIGH"
      behaviors          = [data.okta_behavior.my_device.id]
      factor_sequence {
        primary_criteria_factor_type = "token:hotp" // TOTP
        primary_criteria_provider    = "CUSTOM"
        secondary_criteria {
          factor_type = "token:software:totp" // Okta Verify
            provider    = "OKTA"
        }
        secondary_criteria { // Okta Verify Push
          factor_type = "push"
          provider    = "OKTA"
        }
        secondary_criteria { // SMS
          factor_type = "sms"
          provider    = "OKTA"
       }
      }
    }
    ```

### User risk

User risk levels are determined based on behavioral patterns and entity-level signals. If you want to manually set a user’s risk level, use the [`okta_user_risk`](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/user_risk) data source to retrieve and configure the [`okta_user_risk`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/user_risk) resource.

1. Before configuring the `okta_user_risk` resource, you may want to import the user's current risk level to avoid overwriting an existing unknown user risk level. You can use the [List all users](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user/other/listusers) API operation to find the user ID.

1. (Optional) Import the user risk object to your Terraform state. See [okta\_user\_risk example](https://github.com/okta/terraform-provider-okta/tree/master/examples/resources/okta_user_risk) in the terraform-provider-okta GH repository.

    **Example:** Import the existing user risk level.

    ```bash
    terraform import okta_user_risk.example <user_id>
    ```

    > **Note:** You don't need to import the user if you want to configure the user's risk level. However, you might want to review their current risk level before overwriting it.

1. Configure the user's risk level. See [Terraform data source: okta_user_risk](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/user_risk) and [Terraform resource: okta_user_risk](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/user_risk).

    **Example:** Configure a user's risk level.

    ```bash
    resource "okta_user_risk" "example" {
      user_id = okta_user.example.id
      risk_level = "HIGH"
    }
    ```

### Shared Signals

The Shared Signals Framework (SSF) allows Okta to receive security events from third-party vendors (such as EDR or CASB providers). This provides ITP with a broader context of the user’s security posture outside of Okta.

### SSF receiver

You can set up Okta as an SSF receiver by configuring a security events provider resource to connect Okta and the SSF transmitting vendor. Use the `okta_security_events_provider` resource to establish the connection with your security vendor.

See [Configure a shared signal receiver](https://help.okta.com/okta_help.htm?type=oie&id=csh-config-shared-signal-provider) in the product documentation.

**Example:** Configure the security events provider resource.

```bash
resource "okta_security_events_provider" "example_issuer" {
  name = "Security Events Provider with an issuer and a JWKS URL"
  type = "okta"
  is_enabled = "ACTIVE"
  settings {
    issuer   = "Issuer"
    jwks_url = "https://example.okta.com/jwks/path"
  }
}

```

## Apply the configuration

After your Terraform configuration is complete, run the standard deployment flow:

1. Initialize the Terraform configuration:

   ```bash
   terraform init
   ```

1. Review the Terraform configuration changes to apply:

   ```bash
   terraform plan
   ```

1. Execute the configuration to create or update the ITP resources in your Okta org:

   ```bash
   terraform apply
   ```

Review your Okta org for the configuration changes by filtering for ITP events in the System Logs. See [Identity Threat Protection Event Types](https://developer.okta.com/docs/reference/api/itp-et/).

## Additional resources

* [Identity Threat Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview) product documentation
* [Okta Terraform Provider GitHub repository](https://github.com/okta/terraform-provider-okta/tree/master)
* [Okta Admin Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy)
* Contact [Okta Support](https://support.okta.com)