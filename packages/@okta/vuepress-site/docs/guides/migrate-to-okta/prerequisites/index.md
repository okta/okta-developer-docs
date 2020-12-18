---
title: Prerequisites
---
## How to plan your migration

Migrating users from one system to another takes careful preparation and planning. A thorough understanding of your current environment and having clear migration goals will provide the basis of a solid plan. 

Additionally, being aware of any risks in your plan will guide you toward successfully testing and deploying your migration.

## Migration Types

A **one-time migration** moves your users with their credentials over to Okta all at once. It is expected that the legacy system could (and should) be taken offline after this migration process completes. 

A **migration program** is one where, for a period of time, the legacy system and Okta run in parallel to migrate users in a more ad-hoc fashion. This can be accomplished using Okta's [Inline Password Hook]() feature. 

It’s important to note that this information is about a migration strategy and not integration. 

> Migration is a move of your users to Okta, but an _integration_ is an ongoing process where one or more of your legacy systems continues to be the source of truth for some or all of your user information.

## Private data and other sensitive information

> **Important:** Information security is a critical issue in today’s world, and user information is probably the most important information to keep secure. When preparing to migrate user data to Okta, you must consider all of your company policies and any regulatory concerns regarding personally identifiable information (PII), and user data in general. The European Union’s [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/) is an example of regulatory rules that may apply to your migration. Check with your legal department early in the planning process for your migration so that you can include these considerations when developing your plan.

For some helpful information on this, see:

* [How to Keep PII Secure while Migrating Users to the Cloud](https://www.okta.com/gdpr/) (Okta security blog post)
* [Prepare your organization for the GDPR](https://www.okta.com/gdpr/) (Okta data security page)

## Get ready to create a plan - Gather information

Before being able to create a plan, you must gather information about your environment and decide on specific goals of the migration project. This includes making a list of the types of users you want to migrate and the applications and other resources that they will need to access through Okta.

### Identify the users to migrate

Start by identifying the types of users you have, based on the broad kinds of access they will need. For example:

* Full and part time employees of your company
* Customers
* Partners
* Contractors

How many of each type of user do you have? Understanding this will help estimate the amount of time you’ll need when implementing your migration.

Also identify any sub-groups currently in use for all of your user types. For example, are your employees grouped into sales, marketing, and accounting groups? What about your customers?

### Locate your existing user profile data

Your user data could be in Active Directory, LDAP, or any number of on-premise or cloud-based applications, but most importantly you need to know exactly where the data is and how to access it. This also requires that you have permission to access and use the data. You’ll also need to know which system is the source of truth for each data element. For example, various systems might maintain a primary email address for each of your users.

Here are the key points to remember:

* Record each system that currently holds user profile data.
* Find out who is responsible for access to each of those systems.
* Obtain permission and access to extract the necessary data.
* Decide if user credentials, groups, and group memberships will be migrated.
* Identify which user attributes are personally identifiable information (PII).
* Define all user attributes that will be migrated to Okta, and the source of truth for each one.

**Note:** The source of truth for attributes at this stage of the migration process means only that we want to clearly define where the user data is coming from for the migration itself, not where it will be managed after the migration. After migration, Okta is the default [profile master](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-masters.htm), but this can be modified.

### User applications

Identify the applications that each user type can access. Here are some questions to answer:

* What exactly are those applications, and how are they currently accessed?
* Are users given access to applications based on types or groups, or other user attributes? If so, the use of Okta groups can help with provisioning or application assignment.
* Do integrations exist on the [OIN (Okta Integration Network)](https://www.okta.com/integrations) for those applications?

### Create a migration plan

After you’ve gathered the necessary information, it’s time to create a migration plan with clear goals in mind. These will provide direction for your plan, as well as offering a way to measure success. Ask yourself these questions:

* How do you want your users to experience the migration?
* How much and what kind of user impact is acceptable?
* Will you archive your legacy data?
* Are there any company policies or standards that you have to take into consideration?
* Is it acceptable to perform a “one-shot” migration? Using this strategy means short-term downtime, but it could lessen the complexity of the plan.
* Is it preferable to perform the migration in stages? Depending on the method you use, it could increase complexity of the plan, but service interruptions would be minimized.

### Define attribute mappings

Defining where to map each attribute from the source to the target is an important part of your plan. [Okta user profiles](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Editor) include 31 predefined attributes, and more custom attributes can be added as needed.

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

Extract the user data from the source (or sources) into an intermediate staging area. Then you’ll need to clean up that data so that it’s consistent and contains only valid information. Careful review of the data in each field will also help avoid errors when migrating to Okta.

For example, verify that the data meets any constraint requirements:

* Data type and length
* Required fields are present
* Unique fields don’t have duplicates

If you discover any issues, use a consistent strategy to remedy for every issue that includes:

* Capturing/recording each type of issue
* Logging each occurrence
* Counting occurrences and total number of issues
* Devising remediation and implementation steps
* Assigning and tracking remediation tasks

### Test your migration plan

Once you have a clean set of data, you can create a realistic set of test data that can be used to test your migration method. Testing will uncover issues with your data or the migration method so that issues can be addressed before going to production.

#### Create a test plan

When creating a test plan, it is important to prepare:

* Data that was at the “tail end” of a process or calculation. This will allow you to see right away if problems occurred in upstream processes.
* Any externally facing data.
* Data that is under regulation/privacy standards.
* Any data that kicks off significant revenue/productivity impacting processes downstream.

#### Create test data

Create test data sets that keep these points in mind:

* Create multiple batches of test data so that you have a varied set of conditions to test against.
* Plan more loads as big configuration and development changes are made.
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

Identify users to roll back by assigning them to an Okta group that identifies the source. Do the users already exist in Okta? If so, an export of the current user data, or a valid data source will be needed.

Note that data migration rollback is for users only. Other items (for example, application assignment) should have their own plan. Isolate these other items by temporarily disabling those features during data migration.

### Next steps

With a plan in place, you’re ready to move on to implementation, which differs according to where your data is coming from and what method you chose to use. For the purpose of this document, we’ve chosen to use the [Okta API](/docs/reference/) and we’ll cover those steps in the next section.
