---
title: Decide what to manage with Terraform
excerpt: Choose which parts of your Okta org are safe to automate with Terraform and which to leave alone.
layout: Guides
---

Not every part of your Okta org is a good fit for Terraform. Use this guide to decide whether to adopt it and which resources to automate first.

---

#### Learning outcomes

* Decide whether Terraform is a good fit for your team.

* Identify which Okta resources are safe to automate and which carry more risk.

#### What you need

* An Okta org

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [introduction page for Okta Terraform automation](/docs/guides/terraform-overview/main/).

## Decide whether to use Terraform

Terraform works best for configuration that changes rarely, needs a review step before it takes effect, or must be reproducible across environments. If your team makes infrequent, ad hoc changes through the Admin Console, adopting Terraform adds process overhead that might not provide the intended benefit.

You don't need to manage your entire org with Terraform to get value from it. Start with a small, well-understood set of resources and expand as your team gains confidence.

## Introduce Terraform to your team

If your team hasn't used Terraform before, run it alongside the Admin Console instead of replacing all manual changes at once. Choose a low-risk pilot from [Where to start](#where-to-start) so your team learns the `plan` and `apply` workflow before automating anything sensitive.

## Decide what's safe to manage

Some Okta resources are a good fit for Terraform. Others create more risk than benefit when you manage them as code.

* **Safe to manage:** Static, rarely changing configuration, such as group definitions (`okta_group`), group assignment rules (`okta_group_rules`), authentication policies, and global session policies. These resources change infrequently, so putting them under Terraform gives you a review history and an audit trail.

* **Risky to manage:** Resources with high turnover, or where a bad `apply` immediately breaks a user's access. Group membership is the clearest example: assigning users with `okta_group_memberships` or `okta_user_group_memberships` (see [Manage groups](/docs/guides/terraform-manage-groups)) means every join, transfer, or departure has to go through your Terraform workflow instead of a quick Admin Console edit, and a stale configuration or a reverted `apply` can silently remove someone from a group they still need. This is the same trade-off behind the guidance in [Avoid importing user objects with Terraform](/docs/guides/terraform-import-existing-resources/main/#avoid-importing-user-objects-with-terraform).

  Managing app sign-on policy rules one at a time is risky for a different reason. Individual `okta_app_signon_policy_rule` resources often cause priority drift, where the actual rule order in your org no longer matches your Terraform configuration and every `plan` shows changes that never resolve. See [Migrate to consolidated app sign-on policy rules](/docs/guides/terraform-migrate-consolidated-app-sign-on-policy-rules) for a resource that avoids this.

A resource is a safer candidate for Terraform when it changes infrequently and a mistake there wouldn't cause much damage.

## Where to start

Start with static, low-risk resources, and add more as your team gets comfortable with the workflow:

1. [Groups](/docs/guides/terraform-manage-groups): Start with `okta_group` and `okta_group_rules` to define groups and the rules that populate them.
1. Authentication policies and global session policies: These change rarely and benefit the most from review before they take effect.

Once your team is comfortable with the workflow, see [Manage user access](/docs/guides/terraform-manage-user-access) to automate sign-in and access policies.
