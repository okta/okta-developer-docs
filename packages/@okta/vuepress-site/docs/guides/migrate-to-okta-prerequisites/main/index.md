---
title: Migrate to Okta - Prerequisites
meta:
  - name: description
    content: Create a plan for migrating existing users to Okta.
layout: Guides
---

This guide provides you with information to create a plan for migrating existing users to Okta.

## Prepare and plan for the migration

Migrating users from one system to another takes careful preparation and planning. A thorough understanding of your current environment and having clear migration goals provides the basis of a solid plan.

Also, being aware of any risks in your plan guides you toward successfully testing and deploying your migration.

## Migration types

A **one-time migration** moves your users with their credentials over to Okta all at once. It’s expected that the legacy system could (and should) be taken offline after this migration process completes.

A **migration program** is one where, for a period of time, the legacy system and Okta run in parallel to migrate users in a more impromptu fashion. You can accomplish this using the [Password import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook) feature.

It's important to note that this information is about a migration strategy and not integration.

> **Note**: Migration is a move of your users to Okta, but an _integration_ is an ongoing process where one or more of your legacy systems remains the source of truth for some or all of your user information.

## Private data and other sensitive information

> **Important**: Information security is a critical issue in today's world, and user information is probably the most important information to keep secure. When preparing to migrate user data to Okta, you must consider all of your company policies and any regulatory concerns regarding personally identifiable information (PII), and user data in general. The European Union's [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/) is an example of regulatory rules that may apply to your migration. Check with your legal department early in the planning process for your migration so that you can include these considerations when developing your plan.

For some helpful information on this, see:

* [How to Keep PII Secure while Migrating Users to the Cloud](https://www.okta.com/gdpr/) (Okta security blog post)
* [Prepare your organization for the GDPR](https://www.okta.com/gdpr/) (Okta data security page)

## Get ready to create a plan&mdash;gather information

Before being able to create a plan, you must gather information about your environment and decide on specific goals of the migration project. This includes making a list of the types of users you want to migrate and the apps and other resources that they’ll need to access through Okta.

### Identify the users to migrate

Start by identifying the types of users you have based on the broad kinds of access they need. For example:

* Full and part-time employees of your company
* Customers
* Partners
* Contractors

How many of each type of user do you have? Understanding this helps estimate the amount of time you need when implementing your migration.

Also identify any subgroups currently in use for all of your user types. For example, are your employees grouped into sales, marketing, and accounting groups? What about your customers?

### Locate your existing user profile data

Your user data could be in Active Directory, LDAP, or any number of on-premise or cloud-based apps. Most importantly, you need to know exactly where the data is and how to access it. This also requires that you have permission to access and use the data. You also need to know which system is the source of truth for each data element. For example, various systems might maintain a primary email address for each of your users.

Here are the key points to remember:

* Record each system that currently holds user profile data.
* Find out who is responsible for access to each of those systems.
* Obtain permission and access to extract the necessary data.
* Decide if user credentials, groups, and group memberships will be migrated.
* Identify which user attributes are personally identifiable information (PII).
* Define all user attributes that will be migrated to Okta, and the source of truth for each one.

**Note:** The source of truth for attributes at this stage of the migration process means only that Okta wants to clearly define where the user data is coming from for the migration itself, not where it will be managed after the migration. After migration, Okta is the default [profile source](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Masters), but this can be modified.

### User applications

Identify the applications that each user type can access. Here are some questions to answer:

* What exactly are those applications, and how are they currently accessed?
* Are users given access to applications based on types or groups, or other user attributes? If so, the use of Okta groups can help with provisioning or application assignment.
* Do integrations exist on the [OIN (Okta Integration Network)](https://www.okta.com/integrations) for those applications?

### Create a migration plan

After you've gathered the necessary information, it's time to create a migration plan with clear goals in mind. These provide direction for your plan, and offering a way to measure success. Ask yourself these questions:

* How do you want your users to experience the migration?
* How much and what kind of user impact is acceptable?
* Will you archive your legacy data?
* Are there any company policies or standards that you have to consider?
* Is it acceptable to perform a "one-shot" migration? Using this strategy means short-term downtime, but it could lessen the complexity of the plan.
* Is it preferable to perform the migration in stages? Depending on the method you use, it could increase the complexity of the plan, but service interruptions would be minimized.

### Define attribute mappings

Defining where to map each attribute from the source to the target is an important part of your plan. [Okta user profiles](https://help.okta.com/okta_help.htm?id=ext-usgp-about-profiles) include 31 predefined attributes, and more custom attributes can be added as needed.

Using the information you gathered earlier, create a matrix that maps your source attributes to the Okta user profile attributes, and be sure to include these fields:

* Source field
* Target field
* Data type
* Data length
* Does this field contain PII or other sensitive data?
* Is this a required field?
* Is this a unique field?
* Does the data need transformation of some kind?
* Is mapping required? (Can it be ignored during migration?)

### Validate data quality

Extract the user data from the source (or sources) into an intermediate staging area. Then you need to clean up that data so that it's consistent and contains only valid information. Careful review of the data in each field also helps avoid errors when migrating to Okta.

For example, verify that the data meets any constraint requirements:

* Data type and length
* Required fields are present
* Unique fields don't have duplicates

If you discover any issues, use a consistent strategy to remedy for every issue that includes:

* Capturing/recording each type of issue
* Logging each occurrence
* Counting occurrences and total number of issues
* Devising remediation and implementation steps
* Assigning and tracking remediation tasks

### Test your migration plan

Once you have a clean set of data, you can create a realistic set of test data that can be used to test your migration method. Testing uncovers issues with your data or the migration method so that issues can be addressed before going to production.

#### Create a test plan

When creating a test plan, it’s important to prepare the following:

* Data that was at the "tail end" of a process or calculation. This allows you to see right away if problems occurred in upstream processes.
* Any externally facing data.
* Data that is under regulation/privacy standards.
* Any data that kicks off significant revenue/productivity impacting processes downstream.

#### Create test data

Create test data sets that keep these points in mind:

* Create multiple batches of test data so that you have a varied set of conditions to test against.
* Plan more loads as significant configuration and development changes are made.
* Plan progressively larger loads for performance indicators.

#### Run your tests

Finally, when running your tests, ensure you execute all test cases and capture failed test cases in a defect log with details. For example:

* Use case number
* Issue description
* Test status
* Ticket status
* Priority
* Error category: AD, Okta, HR, or other specifics to your environment
* Notes/proposed resolution

> **Note:** It can be helpful to output errors in a format that can be the input for another run.

### Create a rollback plan

Identify users to roll back by assigning them to an Okta group that identifies the source. Do the users exist in Okta? If so, an export of the current user data, or a valid data source is needed.

Data migration rollback is for users only. Other items (for example, application assignment) should have their own plan. Isolate these other items by temporarily disabling those features during data migration.

### Next steps

With a plan in place, you're ready to move on to implementation, which differs according to where your data is coming from and what method you chose to use. In this document, use the [Okta API](/docs/reference/). Those steps are covered in the next section.

Have a look at our migration guides:

* [Bulk migration with credentials](/docs/guides/migrate-to-okta-bulk/)
* [Import Users with Inline Password Hooks](/docs/guides/migrate-to-okta-password-hooks/)