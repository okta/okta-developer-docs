---
title: Plan your user migration to Okta
meta:
  - name: description
    content: Create a comprehensive migration plan by answering key questions about your data, migration approach, user experience, and success metrics.
layout: Guides
---

Migrating users to Okta requires careful planning and consideration. This guide helps you create a migration plan by walking through the key questions and decisions you need to address before beginning your migration journey.

---

#### Learning outcomes

Create a comprehensive migration plan that addresses data identification, migration approach, user experience, and success metrics.

#### What you need

- Understand your current user management system and data structure
- Access to your user data for analysis
- Stakeholder involvement from IT, security, and business teams
- Clear business objectives for the migration

---

## Overview

A well-thought-out plan reduces risk, minimizes user disruption, and ensures that your migration meets both business and security objectives. Use this guide to assess your requirements, evaluate your options, and document your migration strategy.

Your migration plan should address four critical areas. Work through each section to document your decisions and create a roadmap for your migration.

- **Data considerations:** Identify the data that you're migrating.
- **Migration type:** Choose the most appropriate way to migrate your information.
- **End-user experience:** Balance seamless user migration against immediate security and feature benefits.
- **Measure success:** Define KPIs balancing migration value, user experience, and security goals.

## Consider your data

Before you can migrate to Okta, you need a clear picture of what you're migrating and where it currently lives.

**Okta recommendation:** Focus your migration on data that's essential for identity and access management (IAM). Okta isn't a data warehouse. Migrate only the user attributes, groups, and credentials needed to control authentication and authorization. Store non-IAM data (such as reporting attributes or org details unrelated to access control) in a separate data warehouse and link it to Okta records. This approach reduces complexity, improves performance, and prevents unnecessary data synchronization.

### Private data and other sensitive information

> **Important:** Information security is a critical issue in today's world, and user information is probably the most important information to keep secure. When preparing to migrate user data to Okta, you must consider all of your company policies and any regulatory concerns regarding personally identifiable information (PII), and user data in general. The European Union's [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/) is an example of regulatory rules that may apply to your migration. Check with your legal department early in the planning process of your migration so that you can include these considerations when developing your plan.

For more information on this, see the following content:

- [How to Keep PII Secure while Migrating Users to the Cloud](https://www.okta.com/gdpr/) (Okta security blog post)
- [Prepare your organization for the GDPR](https://www.okta.com/gdpr/) (Okta data security page)

You may also need to consider the following:

- Will you archive your legacy data?
- Are there any company policies or standards that you have to consider?

### Define your user types

Start by identifying the different types of users in your org, based on the broad kinds of access that they need:

- **Full and part-time employees:** Your internal workforce
- **Customers:** External users who access your products or services
- **Partners:** External collaborators and business partners
- **Contractors:** Temporary workers and consultants

How many of each type of user do you have? Understanding this helps estimate the amount of time you need when implementing your migration.

Also identify any subgroups currently in use for all of your user types. For example, are your employees grouped into sales, marketing, and accounting groups? What about your customers?

### Locate your existing user profile data

Your existing user data could be in any number of on-premises or cloud-based sources, an app database, an incumbent IdP, or a directory service such as Active Directory or LDAP. Most importantly, you need to know exactly where the data is and how to access it.

This also requires that you have permission to access and use the data. You also need to know which system is the source of truth for each data element. For example, various systems might maintain a primary email address for each of your users.

These are the key points to remember:

- Record each system that currently holds user profile data.
- Find out who is responsible for access to each of those systems.
- Obtain permission and access to extract the necessary data.
- Decide if user credentials, groups, and group memberships will be migrated.
- Identify which user attributes are personally identifiable information (PII).
- Define all user attributes that will be migrated to Okta, and the source of truth for each one.
- Determine how long the current system of record will be available.
- See if there are multiple sources that need to combine the full profile.

**Note:** In this phase, the source of truth refers strictly to the migration's data origin, not the user's post-migration management location. After migration, Okta is the default [profile source](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Masters), but you can modify this.

### Map your apps

Identify the apps that each user type can access. Here are some questions to answer:

- What exactly are those apps, and how are they currently accessed?
- Are users given app access based on types or groups, or other user attributes? If so, the use of Okta groups can help with provisioning or app assignment.
- Do integrations exist on the [Okta Integration Network (OIN)](https://www.okta.com/integrations) for those apps?

### Define attribute mappings

Defining where to map each attribute from the source to the target is an important part of your plan. [Okta user profiles](https://help.okta.com/okta_help.htm?id=ext-usgp-about-profiles) include 31 predefined attributes, and you can add more custom attributes as needed.

Using the information you gathered earlier, create a matrix that maps your source attributes to the Okta user profile attributes. Be sure to include these fields:

- **Source field:** The attribute name in your current system
- **Target field:** The corresponding Okta user profile attribute
- **Data type:** String, number, boolean, and so on
- **Data length:** Maximum character length
- **Contains PII:** Whether this field contains personally identifiable information
- **Required field:** Whether this attribute must be populated
- **Unique field:** Whether this attribute must be unique across users
- **Transformation needed:** Any data transformation or formatting required
- **Migration required:** Whether this attribute needs to be migrated or can be ignored

This mapping matrix serves as your blueprint for the actual data migration and helps identify any data quality or compatibility issues early.

## Choose your migration type

Regardless of your federation strategy or the current integration status of your legacy server, your timeline is also a deciding factor. How quickly do you need to move everyone over?

Your migration approach significantly impacts project complexity, timeline, and user experience. Choose the best user migration strategy for your scenario and deadline. Okta supports two primary migration strategies:

- **Bulk Import (Staged Migration):** This is a one-time migration that moves all users and their credentials to Okta at once. After the migration, you can take your legacy system offline. You want to centralize all of your user accounts in Universal Directory. Currently, they're kept in a local store such as Active Directory, a custom database, or another cloud-based identity provider.
> **Note:** For a large-scale migration, a one-time import isn't an easy path. Plan for an initial import with the ability to capture the delta changes. Waiting to migrate millions of users in one day isn't reasonable nor will you be able to allocate time for any potential hiccups (such as low-quality source data, a source system outage, time to process job queues, or write rate limits). Start importing early in the migration process and don't wait until days before going live.
> To help make this easier to assess the true effort, you can perform several smaller bulk imports to process users collectively, by specific groups, or realms.
- **Just-In-Time (JIT) Provisioning:** This is more like a migration program that keeps your legacy system active while gradually migrating users to Okta over time. Users are migrated on-demand when they authenticate.

To help you choose the method, consider the following questions:

- Which migration type best fits your org's needs?
- What are the risks associated with your chosen approach?
- Do you have the technical resources to implement your chosen method?
- If using JIT provisioning, when and how will you decommission the legacy system?

### Bulk imports

The bulk import strategy uses CSV imports or the Okta Users API to migrate a targeted user population in a single operation. This method is best for orgs with smaller user counts or firm cutover dates where maintaining parallel systems is impractical. While it simplifies long-term architecture and allows for immediate legacy decommissioning, it typically requires a scheduled maintenance window.

Bulk imports offer maximum control over data quality before go-live. However, because all users migrate simultaneously, teams should prepare for a potential spike in support volume during the initial launch.

See [Bulk migration with credentials](/docs/guides/migrate-to-okta-bulk/main/) for detailed instructions.

See [Import Users with Inline Password Hooks](/docs/guides/migrate-to-okta-password-hooks/main/) for implementation details on bulk loading the profile and then doing JIT password verification per user.

### Just-In-Time Provisioning

JIT provisioning migrates users dynamically as they authenticate. This could be a custom authentication flow or through SAML or OIDC federation. This strategy is ideal for large user bases or orgs that can't afford downtime, as it eliminates the need for a maintenance window. Because users are created on-the-fly during their first sign-in attempt, both systems run in parallel. This allows for a gradual rollout and the natural filtering of inactive accounts.

While JIT provisioning ensures a transparent transition for users, it introduces higher technical complexity during the migration period. Admins should note that the initial sign-in attempt may be slightly slower due to real-time account creation (though this is still typically under a few seconds).

### Factors to consider

When choosing between these approaches, consider the following factors:

- **Timeline:** How quickly must you complete the migration? Do you have a hard deadline?
- **Risk tolerance:** Can you afford a rollback if issues arise?
- **User base size:** How many users are you migrating?
- **Maintenance windows:** Can you schedule downtime for a one-time migration?
- **Technical complexity:** Does your team have the resources to manage a parallel operation?
- **Business continuity:** What's the impact of a failed migration?
- **User grouping:** Can you group users by type, department, role, or realm to manage the migration in stages?
- **Inactive accounts:** For migration programs, how long will you keep the process running before determining that non-migrated accounts are inactive?
- **App dependencies:** Which apps need to switch over to Okta before you start the migration?
- **Source of truth:** During a migration program, which system is the source of truth while both are active?
- **Credential migration:** Will you migrate existing password hashes, use password import hooks, or require users to reset passwords? Will users need to enroll a phone number or email as an authenticator or as recovery only?

## Plan the end-user experience

How you handle the user experience during migration affects user satisfaction, support burden, and security posture.

### User impact

A seamless migration aims to keep users unaware that their accounts have been migrated. Users continue accessing apps with minimal changes to their experience.

Ideally, a seamless migration has users experiencing little to no disruption. This means that authentication methods remain consistent and apps continue functioning as before. Security policies match the legacy system and users keep existing passwords without reset. You can recreate an app's 1FA or MFA authentication flow from the incumbent user store in Okta or delegate authentication back to the original IdP as required. You also wouldn't need to inform your users of the migration.

A migration provides a practical opportunity to modernize your authentication flow. Rather than attempting to replicate a legacy sign-in experience, use the move to the Okta Sign-In Widget to implement stronger, up-to-date security practices. You can integrate modern authentication patterns like MFA and passwordless flows, which can be difficult to retrofit into an older, custom sign-in interface. In this case, you'd have to take the following steps:

1. Notify users in advance and know who to contact if there's an issue or if they suspect any bad actors.
1. Improve assurance levels: after initial verification, reset their credentials, update the auth flow to MFA and/or passwordless as part of the change.
1. Let users know their account was successfully verified and the new experience has been activated (for example, move from passwords to Okta FastPass or passkey).

If you decide to migrate your users in groups over time rather than in one go, you also want to communicate that for transparency.

Keep these questions in mind:

- Which user experience approach aligns with your business objectives?
- How will you balance user convenience with security improvements?
- What resources do you need to support your chosen approach?
- Will you allow early adopters or advocates to self-migrate?

### Password migration

Users generally won't need to set a new password with the migration. However, if you move towards the Okta-recommended passwordless experience, there are other options to consider:

- **Hashed password import:** Import existing BCRYPT, SHA-1, or SHA-256 password hashes through the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user) so users can keep their current passwords.
- **Password import inline hooks:** Import user profiles without passwords initially, then verify passwords against your legacy system during the first sign-in attempt and migrate them transparently. Users can keep their current passwords.
- **Delegated authentication:** Okta checks passwords against your legacy AD or LDAP server instead of migrating them. Users can keep their current passwords.
  > **Note:** This could be a temporary approach while the incumbent directory is being migrated.
- **Password reset:** Users are set to `STAGED` status and sent activation emails to create passwords.
- **Passwordless migration:** Transition users directly to passwordless authentication (such as passkeys, biometrics) during migration (Okta's recommended approach). This requires a verification of users first, and then enrollment.
- **Multifactor authentication:** Require MFA enrollment as part of the activation process. This improves assurance as part of the authentication flow.

### Other credentials and details

You can import emails and phone numbers from the incumbent system so that one-time password factors don't need to be reset. However, users need to re-verify their device-bound credentials, such as Google Authenticator, WebAuthn, and passkeys.

Users shouldn't need to supply any other details. However, as previously mentioned, this could be an opportunity to collect additional information. This is optional.

### High availability during migration

If you're concerned about users experiencing downtime, you can minimize service disruptions by using IdP coexistence. Since app sessions typically persist independently of the IdP, you can possibly run both providers in parallel during the transition. For environments requiring seamless session continuity across multiple apps, you can federate the IdPs with each other. This IdP chaining approach allows Okta to act as a bridge to your existing provider, ensuring a transparent authentication flow and preventing end-user downtime as you cut over your apps.

### Post-migration user experience

Unless you're changing your app's authentication flow, there's no reason for an app's user experience to change. You can import passwords and send messages to phone, email. You can also customize SMS to match those sent by the previous system.

> **Note:** Okta recommends using its built-in hosted sign-in authentication form for ease and robust security capabilities. It has the flexibility to integrate into a standards-based federation model that matches your brand. Using Okta's multi-function widget, the authentication flow might be different, but aligns with the current experience.

## Define success metrics

Establish clear metrics to measure the success of your migration and ensure that you're meeting business objectives.

- What KPIs will you use to measure migration success?
- How will you track progress throughout the migration?
- Who is accountable for each metric?
- When will you conduct a post-migration review?

Before migrating, document current state metrics so that you can measure improvement:

- Current authentication success rates
- Current support ticket volume for authentication issues
- Current system costs
- Current security policy compliance rates

Then, you can plan your measurement approach by considering these questions:

- Which metrics are most important for your org?
- How will you collect and report on these metrics?
- Who are the stakeholders for each metric?
- What are your target values for each metric?
- How frequently will you measure and report progress?
- What constitutes success for this migration project?

The following sections recommend possible metrics to use for your migration plan.

### Migration completion metrics

Track progress toward migration completion:

- **Active users migrated:** Number and percentage of active users successfully migrated
- **Inactive accounts identified:** Number of stale or inactive accounts discovered and not migrated
- **Zero active accounts lost:** Ensure that no active users are unable to access systems post-migration
- **Apps integrated:** Number of apps configured in Okta
- **Migration timeline:** Actual vs. planned timeline
- **Data accuracy:** Percentage of user records with accurate data

### User disruption metrics

Measure the impact on users during migration:

- **Support tickets:** Volume of migration-related help desk tickets
- **Failed authentications:** Number of users unable to sign in (monitor through log streaming)
- **App access issues:** Users unable to access required apps (monitor with app access reports)
- **User complaints:** Feedback and satisfaction scores
- **Time to resolution:** Average time to resolve migration issues

### Security improvement metrics

Quantify security enhancements achieved through migration:

- **MFA adoption:** Percentage of users with multifactor authentication enabled
- **Password policy compliance:** Users meeting stronger password requirements
- **Risky sign-in attempts prevented:** Number of suspicious authentication attempts blocked
- **Legacy system elimination:** Reduction in security risk surface area

### Business value metrics

Demonstrate the business value delivered by the migration:

- **Cost savings:** Reduction in legacy system costs
- **System decommissioning:** Legacy systems successfully retired or reduced
- **IT efficiency:** Time saved on user management tasks
- **User productivity:** Reduced time spent on authentication issues
- **Compliance improvements:** Better regulatory compliance and audit readiness
- **Time to value:** How quickly the migration delivers measurable benefits

### Operational metrics

Monitor operational performance post-migration:

- **System availability:** Okta uptime and performance
- **Authentication success rate:** Percentage of successful sign-in attempts
- **Provisioning speed:** Time to provision new users and apps
- **API performance:** Response times for Okta API calls

## Document your plan

After working through these four areas, document your decisions in a migration plan that includes the following sections:

1. **Executive summary:** High-level overview and business justification
2. **Data inventory:** What you're migrating and where it currently lives, including the attribute-mapping matrix
3. **Migration approach:** One-time versus migration program with rationale. Consider how to handle users who don't migrate their account within the allotted time, and if those accounts get removed or put into recovery mode.
4. **User experience strategy:** Seamless versus staged with communication plan
5. **Success metrics:** KPIs and measurement approach
6. **Timeline:** Key milestones and dependencies
7. **Roles and responsibilities:** Who is accountable for each area
8. **Risk assessment:** Potential issues and mitigation strategies
9. **Test plan:** How you validate the migration with test data before production
10. **Rollback plan:** How to recover if migration fails

## See also

- [Migrate to Okta](/docs/guides/migrate-to-okta/)
- [Okta Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/)
- [Okta Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/)
- [Password import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook)
- [Okta user profiles](https://help.okta.com/okta_help.htm?id=ext-usgp-about-profiles)
