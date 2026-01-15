---
title: Getting started with IPv6
meta:
  - name: description
    content:  An introduction to Okta's implementation of IPv6, the scope of the implementation, and how you can test this connectivity.
layout: Guides
---

<ApiLifecycle access="beta" />

This guide introduces Okta's implementation of IPv6 and provides guidelines on configuring and testing of the latest version of this internet protocol.

---

#### Learning outcomes

* Understand Okta's implementation of IPv6 and the scope of the implementation.
* Learn how to configure your org to test IPv6
* Learn how to test your org on IPv6

#### What you need

* A preview Okta org. Only preview cells have IPv6 availability

---

## Overview

Internet Protocol version 6 (IPv6) is the most recent version of the internet protocol and is designed to replace IPv4. IPv6 uses 128-bit addresses providing an order of magnitude more IP addresses. The new standard improves security, efficiency, and network auto configuration.

The Okta IPv6 Beta allows communication with an Okta org in an Okta preview cell using Internet Protocol version 6 (IPv6) and Internet Protocol version 4 (IPv4). IPv6 support is opt-in at the org level. It's not enabled cell-wide.

For the Beta, IPv6 will only be available in Preview cells.

>**Note:** You must contact Okta support to enabled IPv6 for your preview org. <!-- Do we want to include the email and sentence about contacting okta through ipv6_beta@okta.com?-->

### Okta IPv6 scope

Only a subset of Okta functionality supports IPv6 during the Beta.

| Status | Feature | Notes |
|--------|---------|-------|
| Supported | Ingress into the cell - Traffic entering | <org>.oktapreview.com<br><org>-admin.oktapreview.com |
| Supported | Admin interface | |
| Supported | End-user functionality - Sign-in | |
| Supported | End-user functionality - Dashboard | |
| Supported | End-user functionality - Settings | |
| Supported | Okta Identity Engine | |
| Supported | Okta Verify | |
| Partial Support for Beta | Network Zones | Any ASN based rules will not work with IPv6 for the Beta |
| Partial Support for Beta | Enhanced Dynamic Zones | Any ASN based rules will not work with IPv6 for the Beta |
| Unsupported | mTLS | |
| Unsupported | PIV / CAC authentication | |
| Unsupported | Custom domains | |
| Unsupported | Any type of egress | Traffic from the cell will use IPv4. Any type of hook (Inline, Event, Web) will use IPv4 to connect |
| Unsupported | Workflows | |
| Unsupported | LDAP interface (LDAPi) | |
| Unsupported | Okta Identity Governance (OIG) | |
| Unsupported | Okta Inbox | |
| Unsupported | Classic Engine | |
| Unsupported | Okta Mobile | |
| Unsupported | Okta Privilege Access (OPA) | |
| Unsupported | Okta Access Gateway (OAG) | |
| Unsupported | Identity Security Posture Management (ISPM) | |
| Unsupported | Multi-org | |

### Service Level Agreement (SLA) and support

During the Beta phase, any preview org with IPv6 enabled is not be subject to an SLA.

Support is also not available for IPv6 Beta orgs.

## Configure your org for IPv6

Ensure the following configurations are made to your preview org to test IPv6:

* Allow listing: If you use allow list access to Okta, you need to update your allow list rules (firewalls, ACLs, and so on) to also allow IPv6 traffic to Okta.

* Network zone configuration: It is your responsibility of to update any network zone configuration that assumes IPv4 is the only supported protocol.

  Some possible examples:

  * If the network zone configuration allows only a certain range of IPv4 addresses. This needs to be updated adding a range of IPv6 addresses that should also be allowed.

  * If you block certain IPv4 addresses, you need to update and block any IPv6 addresses.

## What to test

At minimum, you should test:

* Any and all sign in scenarios applicable to your organization that fall within the scope of the Beta.
* All processes your organization typically performed in the Admin Console.

Be sure to verify any relevant System Log events and inline or event hooks have the expected IPv6 address in the payload.

## Testing your org with IPv6

Use the following procedures to test you org with IPv6.

### Check for IPv6 connectivity

Connecting to Okta using IPv6 requires an IPv6 address and IPv6 connectivity from the browser  to Okta. Use the following site to test IPv6 connectivity:

* [https://test-ipv6.com](https://test-ipv6.com).

#### IPv4 address example

If you only have an IPv4 public IP, the following example output appears from the test URL:

 <div class="three-quarter">

   ![An image of sample output from the test URL that shows IPv4 use](/img/ipv6/ipv4-test.png)

   </div>

#### IPv6 address example

If you have an IPv4 public IP, the following example output appears from the test URL:

 <div class="three-quarter">

   ![An image of sample output from the test URL that shows IPv6 use](/img/ipv6/ipv6-test.png)

   </div>

A readiness score of 10/10 confirms you have an IPv6 address and an IPv6 DNS server.

### Determine if your Org is using IPv6

The System Log shows the IP seen by Okta, and it can be used to verify the IPv6 address shown is the one you expect. <!-- any particular query we can suggest or event type to review?-->

 <div class="three-quarter">

   ![An image of the System Log in the Admin Console that displays an IPv6 IP address](/img/ipv6/ipv6-system-log.png)

   </div>

### <!-- Anything else? -->

## Providing feedback

<!-- did we want to include this? Can external customers access this template? -->

Feedback is critical for the overall success of the Okta IPv6 Beta.

For any testing performed, fill out this [template](https://docs.google.com/document/d/1eIwItY-8AkMktvGSw5owGPyOGysKFIz7CYJOA2YbhOA/edit?tab=t.0) and send your feedback to `ipv6_beta@okta.com`. Include the following:

* A detailed list of what was tested
* If any issues were encountered, provide details of the issues.


