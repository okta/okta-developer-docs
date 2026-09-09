---
title: Decide what to manage with Terraform
excerpt: Choose which parts of your Okta org are safe to automate with Terraform and which to leave alone.
layout: Guides
---

Choose which parts of your Okta org are safe to automate with Terraform and which to leave alone.

---

#### Learning outcomes

* Decide whether Terraform is a good fit for your team right now.

* Identify which Okta resources are safe to manage with Terraform and which are risky.

#### What you need

* An Okta org

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [introduction page for Okta Terraform automation](/docs/guides/terraform-overview/main/).

## Should you use Terraform

Terraform is best suited for org configuration that changes rarely, needs a review or approval step before it takes effect, or must be reproducible across multiple environments. If your team makes infrequent, ad hoc changes through the Admin Console and doesn't need that level of process, adopting Terraform adds overhead that may not pay off yet.

You don't have to manage your entire org with Terraform to get value from it. Most teams start by automating a small, well-understood slice of their configuration and expand from there as they gain confidence.

## Introducing Terraform to your team

If your team hasn't used Terraform before, introduce it alongside the Admin Console rather than replacing all manual changes at once. Pick a low-risk pilot, such as one of the resources described in [Where to start](#where-to-start), so the team can learn the `plan` and `apply` workflow before automating anything sensitive.

> **Note:** Okta recommends managing any single type of object with either Terraform or the Admin Console, not both. Once a resource is under Terraform management, make changes to it through Terraform to avoid configuration drift.

## Decide what's safe to manage

Some Okta resources are a good fit for Terraform. Others create more risk than benefit when managed as code.

**Safe to manage:** Static, rarely-changing configuration is the best starting point. Examples include group definitions (`okta_group`), group assignment rules (`okta_group_rules`), authentication policies, and global session policies. These resources change infrequently, and putting them under Terraform gives you review history and an audit trail for changes that matter.

**Risky to manage:** Resources with high turnover, or where a bad `apply` immediately breaks a user's access, are riskier to manage with Terraform. The clearest example is group membership. Membership changes constantly as people join, move teams, and leave, and every one of those changes has to go through your Terraform workflow instead of a quick Admin Console edit. A stale configuration or a reverted `apply` can silently remove someone from a group they still need, breaking their access to an app. This is the same trade-off described in [Avoid importing user objects with Terraform](/docs/guides/terraform-import-existing-resources/main/#avoid-importing-user-objects-with-terraform): user-related data is large, changes often, and is usually better left out of your Terraform configuration.

Use this as a general rule: the less often something changes, and the less disruptive a mistake would be, the safer it is to manage with Terraform.

## Where to start

Start with resources that are static and low-risk, and add more as your team gets comfortable with the workflow:

1. [Groups](/docs/guides/terraform-manage-groups) — start with `okta_group` and `okta_group_rules` to define groups and the rules that populate them.
1. Authentication policies and global session policies — these change rarely and benefit the most from review before they take effect.

Once your team is comfortable with the Terraform workflow, see [Manage user access](/docs/guides/terraform-manage-user-access) for guidance on automating the policies that control how users authenticate and access apps.
