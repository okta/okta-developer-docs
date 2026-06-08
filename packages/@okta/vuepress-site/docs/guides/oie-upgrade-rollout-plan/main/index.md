---
title: Plan your upgrade rollout
---

<ApiLifecycle access="ie" />

Upgrading from Classic Engine to Okta Identity Engine (Identity Engine) involves more than a single click in the Identity Engine Upgrade Hub. Before scheduling your production upgrade, decide how to sequence the upgrade across orgs, how to migrate users to the new flows gradually, and how to handle features that don't carry over to Identity Engine. Okta recommends an iterative approach rather than upgrading everything at once.

---

#### Learning outcome

Build a rollout plan that covers org upgrade sequencing, user segment rollout, and feature replacement for features that aren't supported in Identity Engine.

#### What you need

* Access to the Admin Console for each org you plan to upgrade
* A list of all Okta orgs in your tenant and their purpose (preview, sandbox, production)
* An understanding of how your apps integrate with Okta (redirect, embedded widget, or embedded SDK)
* Completed Identity Engine Upgrade Hub action items for each org

---

## Sequence your org upgrades

If your organization has more than one Okta org, upgrade them in stages rather than simultaneously.

| Org type | Recommended order | Why |
| --- | --- | --- |
| Preview org | First | Rehearse the upgrade, validate configuration changes, and run your test matrix before upgrading the production org. |
| Non-production or sandbox orgs | Second | Validate app-specific flows and integrations in a real Identity Engine environment. |
| Production org | Last | Apply only after preview and sandbox validation passes. |

Each org is upgraded independently through the self-service process in the Identity Engine Upgrade Hub. The upgrade takes only a few minutes and requires no downtime, but you must complete all Identity Engine Upgrade Hub action items in an org before scheduling it. Wait at least one week after upgrading your preview org before scheduling production.

See [Self-service upgrade process](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/self-service/self-service-process.htm).

## Roll out to user segments

After your org is upgraded, your embedded Sign-In Widget or SDK-based apps don't have to switch all users to Identity Engine flows at once. You can run Classic Engine and Identity Engine flows side by side while you validate, then gradually shift traffic.

The following strategies support a gradual rollout:

| Strategy | How it works | Best for |
| --- | --- | --- |
| Code-based routing | Add conditional logic in your app to direct users to the Classic Engine or Identity Engine flow based on a flag, group membership, or user attribute. | Embedded Sign-In Widget or SDK-based apps |
| Network load balancing | Route traffic to separate app instances—one running the Classic Engine code path, one running the Identity Engine code path. | Large-scale apps with multiple server instances |
| Incremental scaling | Start with a small percentage of users on Identity Engine flows and increase it over time. | Controlled risk reduction in production |

Whichever strategy you choose, follow this sequence:

1. Start with internal users or a small test group.
2. Validate sign-in, registration, MFA enrollment, and password recovery end-to-end.
3. Monitor for issues in the System Log and from user feedback.
4. Gradually increase the proportion of users on Identity Engine flows.
5. Remove Classic Engine flow code after all users have been fully migrated and validated.

## Replace Integrated Windows Authentication

Integrated Windows Authentication (IWA) routing rules must be removed before you can upgrade. The Identity Engine Upgrade Hub blocks the upgrade if any IWA routing rules exist in your org.

To prepare:

* Identify all IWA routing rules in the Admin Console.
* Delete each routing rule before scheduling the upgrade.
* Plan a replacement authentication method. Common replacements are desktop SSO with Okta FastPass or certificate-based authentication.
* After the upgrade and Okta FastPass migration are complete, decommission IWA agents and servers.

See [Delete IWA routing rules](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/dt-remove-iwa-routing-rules.htm).

## Replace Device Trust

Classic Engine Device Trust isn't supported in Identity Engine. The replacement is Okta Verify with managed certificates and Okta FastPass.

Start by identifying whether your org uses Device Trust for Desktop, mobile, or both, then plan the migration path for each.

After you [remove the IWA routing rules](#replace-integrated-windows-authentication) and complete the upgrade, migrate desktop devices to Okta FastPass:

1. Configure Device Integration and establish a new Certificate Authority.
2. Import the new CA into your Device Management software.
3. Deploy the CA to all managed devices.
4. Roll out Okta Verify to all devices.
5. Decommission legacy IWA agents and servers.
6. Remove Classic Engine Device Trust platforms.

Mobile device migration is a separate process. See [Device Trust upgrade considerations for desktop](https://help.okta.com/oie/en-us/Content/Topics/identity-engine-upgrade/dt-upgrade-considerations-desktop.htm) for more details.

## Replace Okta Mobile

Okta Mobile is deprecated and unavailable after the Identity Engine upgrade. Before upgrading, make sure that all affected users are enrolled in Okta Verify.

* Identify which users currently rely on Okta Mobile.
* Communicate the deprecation timeline to those users.
* Deploy and enroll Okta Verify for all mobile users before the upgrade date.
* Confirm that Okta Verify enrollment is complete before scheduling the org upgrade.

See [Prepare Okta Mobile users for upgrade](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/prepare-om-users-for-upgrade.htm).

## Update authenticator policies after the upgrade

Identity Engine replaces Classic Engine MFA factors with an authenticator model. Most policy changes can wait until after a one-week validation period, but two checks should happen immediately.

| Timing | Action | Details |
| --- | --- | --- |
| Immediately after upgrade | Verify global session policy settings | If **Any factor used to meet the Authentication Policy requirements** is selected but **Require secondary factor** is cleared, apps that call Okta APIs may expect a secondary factor that Identity Engine no longer enforces. |
| Immediately after upgrade | Validate MFA | Confirm that email, phone, and other authenticators work as expected for test users. |
| After one-week validation | Add or remove authenticators | Configure new Identity Engine authenticators as needed. |
| After one-week validation | Modify authenticator enrollment policy | Update enrollment rules for the new authenticator model. |
| After one-week validation | Enable new Identity Engine features | Wait until validation confirms stability before enabling new capabilities. |

Use the following table to map Classic Engine policy concepts to their Identity Engine equivalents:

| Classic Engine | Identity Engine equivalent | What to do |
| --- | --- | --- |
| MFA enrollment policy | Authenticator enrollment policy | Review and reconfigure authenticator settings. |
| Sign-on policy factors | Authentication policy authenticator constraints | Map each Classic Engine factor to its Identity Engine authenticator. |
| Factor Sequencing | Authenticator possession and verification | Update policy rules for the new authenticator model. |

See [Post-upgrade checklist](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/post-upgrade-checklist.htm).

## Rollout checklist

After you complete your planning, confirm that all items are done before scheduling the upgrade.

**Before upgrading:**

* Identify all orgs that need to be upgraded and confirm the sequence.
* Plan your user segment rollout strategy if you use embedded apps.
* Identify Device Trust usage and plan the replacement path.
* Delete IWA routing rules from all orgs before scheduling.
* Enroll all Okta Mobile users in Okta Verify and communicate the deprecation timeline.
* Complete all Upgrade Hub action items in each org.

**After upgrading:**

* Verify global session policy settings immediately after the upgrade.
* Validate MFA and authenticator enrollment for test users.
* Make no other policy changes for at least one week.
* After one week, update authenticator enrollment policies.
* After one week, enable new Identity Engine features as needed.
* Remove Classic Engine flow code from embedded apps after all users have migrated.

## See also

* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/)
* [Plan embedded auth app upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades/main/)
* [Understand authenticator enrollment policy changes after the upgrade](/docs/guides/oie-upgrade-mfa-enroll-policy/main/)
* [Identity Engine limitations](/docs/guides/ie-limitations/main/)
* [Self-service upgrade process](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/self-service/self-service-process.htm)
* [Post-upgrade checklist](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/post-upgrade-checklist.htm)
