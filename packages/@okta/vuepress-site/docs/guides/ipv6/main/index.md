---
title: Getting started with IPv6
meta:
  - name: description
    content:  An introduction to Okta's implementation of IPv6, the scope of the implementation, and how you can test this connectivity.
layout: Guides
---

<ApiLifecycle access="beta" />

This guide introduces Okta's implementation of IPv6 and provides guidelines on configuring and testing of this new internet protocol.

## Learning outcomes

* Understand Okta's implementation of IPv6 and the scope of the implementation.
* Learn how to configure your org to test IPv6.
* Learn how to test your org on IPv6.

## What you need

* A preview of Okta org. Only preview cells have IPv6 availability.

## Overview

Internet protocol version 6 (IPv6) is the most recent version of the internet protocol and is designed to replace IPv4. IPv6 uses 128-bit addresses providing an order of magnitude more IP addresses. The new standard improves security, efficiency, and network auto configuration.

The Okta IPv6 Beta allows communication with an Okta org in a preview cell using IPv6 and IPv4. IPv6 support is opt-in at the org level. It's not enabled cell-wide.

For the Beta, IPv6 is only available in preview cells.

> **Note:** Contact Okta Support to enable IPv6 for your preview org.

<!-- Do we want to include the email and sentence about contacting okta through ipv6_beta@okta.com? -->

### Okta IPv6 scope

Only a subset of Okta functionality supports IPv6 during the Beta.

| Status | Feature | Notes |
|--------|---------|-------|
| Supported | Ingress into the cell - Traffic entering | `{yourOktaDomain}.oktapreview.com`<br>`{yourOktaDomain}-admin.oktapreview.com` |
| Supported | Admin interface | |
| Supported | End-user functionality - Sign-in | |
| Supported | End-user functionality - Dashboard | |
| Supported | End-user functionality - Settings | |
| Supported | Okta Identity Engine | |
| Supported | Okta Verify | |
| Partial support for Beta | Network Zones | ASN-based rules don’t work with IPv6 for the Beta |
| Partial support for Beta | Enhanced Dynamic Zones | ASN-based rules don’t work with IPv6 for the Beta |
| Unsupported | mTLS | |
| Unsupported | PIV / CAC authentication | |
| Unsupported | Custom domains | |
| Unsupported | Any type of egress | Traffic from the cell uses IPv4. Any type of hook (inline, event, web) use IPv4 to connect |
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

During the Beta phase, any preview org with IPv6 enabled isn’t subject to an SLA.

Support is also not available for IPv6 Beta orgs.

## Configure your org for IPv6

Ensure that the following configurations are made to your preview org to test IPv6:

* Allow listing: If you use allowlist access to Okta, you need to update your allowlist rules (firewalls, ACLs, and so on) to also allow IPv6 traffic to Okta.

* Network zone configuration: It is your responsibility of to update any network zone configuration that assumes IPv4 is the only supported protocol.

  Some possible examples:

  * If the network zone configuration allows only a certain range of IPv4 addresses. This configuration needs updating to add a range of IPv6 addresses that are also allowed.

  * If you block certain IPv4 addresses, you need to update and block any IPv6 addresses.

## What to test

At minimum, you should test:

* All sign-in scenarios applicable to your org that falls within the scope of the Beta.
* All processes in your org that are typically performed in the Admin Console.

Be sure to verify that any relevant System Log events and inline or event hooks have the expected IPv6 address in the payload.

## Test your org with IPv6

Use the following procedures to test your org with IPv6.

### Check for IPv6 connectivity

Connecting to Okta using IPv6 requires an IPv6 address and IPv6 connectivity from the browser to Okta. Use the following site to test IPv6 connectivity:

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

A readiness score of 10/10 confirms that you have an IPv6 address and an IPv6 DNS server.

### Determine if your Org is using IPv6

The System Log shows the IP seen by Okta, and it can be used to verify the IPv6 address shown is the one you expect. <!-- any particular query we can suggest or event type to review? -->

<div class="three-quarter">

![An image of the System Log in the Admin Console that displays an IPv6 IP address](/img/ipv6/ipv6-system-log.png)

</div>

## Provide feedback

<!-- did we want to include this? Can external customers access this template? -->

Feedback is critical for the overall success of the Okta IPv6 Beta.

For any testing performed, fill out this [template](https://docs.google.com/document/d/1eIwItY-8AkMktvGSw5owGPyOGysKFIz7CYJOA2YbhOA/edit?tab=t.0) and send your feedback to `ipv6_beta@okta.com`. Include the following:

* A detailed list of what was tested
* If any issues were encountered, provide details of the issues.
