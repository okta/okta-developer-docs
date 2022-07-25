---
title: Identity management factors
---
# Identity management factors

Every authorized user has a unique combination of sign-in credentials, parent organization, policies, access privileges, and other properties. Your solution's identity management elements store this data, and [provide services](#identity-processing-and-administration) that use, manage, and report it.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

## Identity storage

Your identity storage facilities maintain data about registered users, groups, devices, policies, apps, and other resources that's needed to authenticate users and authorize their access. Your applications and all elements of your solution rely on this data, so distributed access to it is important.

Consider the following in your identity storage design:

- A central directory for storing and maintaining user, customer, and resource data.

- Capacity for at least as many users as your business plans to support, with concurrent access by a large fraction of them. Consider growth and long-term plans in your choice of technologies and design to ensure that your solution can accommodate future requirements.

- Organize users in hierarchical groups to facilitate administering users with common properties, and provide for assigning roles, permissions, and policies to groups that are inherited by their members.

- Maintain data about users, groups, apps, devices, and other entities in profiles that uniquely identify the entities and contain data about them.

- Maintain data about customers and partners, external users, external Identity Providers, and user-IdP relationships.

- Maintain policies to control how users and customers are handled.

- Disable (hide), but never delete, obsolete data to meet audit, regulatory, and IAM behavior analysis requirements. Make the data available to authorized personnel and entities.

- Log all actions taken for key data to support troubleshooting, administration, and auditing. Make the data available to authorized personnel.

- Provide APIs and SDKs that allow all elements of your IAM solution, applications, and other consumers to access identity data as authorized.

## Identity processing and administration

Consider facilities such as these to use and manage data in your directory:

- User registration and management, such as add a user, update a user profile, and reset a password. Consider allowing users to perform these tasks for themselves to save time, create a positive user experience, and reduce admin workload.

- User device registration and management, such as add a new device, update device info, and remove an obsolete device. Consider allowing users to perform these tasks for themselves too, for the same reasons.

- Progressive profiling to incrementally collect information and update user profiles after the users begin using your apps. You can use this to reduce how much data you collect when they register and collect reliable user demographic data later.

- Facilities for admins to create and manage user, group, and other profiles, and manage profile attributes within the scope of their authority.

- Common admin interfaces for you and your customers to manage and support their user registrations, profiles, roles, permissions and reporting. You can limit what functions different customer admins can see and use.

- Provisions for your admins to manage and support your users and customers. Examples might include those listed for customer admins above for your domain, plus create, configure, and administer customer accounts.

- Facilities to automate frequently performed IT and HR admin workflow procedures to minimize the time, effort, and errors to perform them.

- APIs and SDKs that allow all elements of your IAM solution, your applications, and other consumers, to access your identity functions as authorized.

- Customizable online help and other documentation of your solution to facilitate its use, help new admins come up to speed on and use your admin features, and minimize your admin workload.

- Online technical documentation to help application developers use your APIs and SDKs.

## How Okta can help

Okta is a cloud-based IAM platform that is built around a centralized directory of user and customer profiles and other data. You can use its features to address all of the identity challenges above.

### Okta identity storage

Okta has two main identity storage and management facilities: [Identity Engine](#okta-identity-engine) and [Universal Dictionary](#okta-universal-directory). See [Okta Data Model](/docs/concepts/okta-data-model/) for how they model data.

#### Okta Identity Engine

The *Okta Identity Engine* is a set of customizable building blocks for enrolling, authenticating, and authorizing users. Identity Engine helps control access to your resources, issue related events, and customizes access for your organization.

You can use Identity Engine features to:

- Define, store, and administer user identity and other data.

- Authenticate users to allow only authorized users to access the right apps and data in approved ways.

- Employ a variety of means to authenticate users, such as multifactor authentication (MFA) and biometrics, to address a flexible set of needs.

- Authenticate your end users using email, rather than specify a password (*passwordless authentication*), for higher security and better user experience.

- Capture additional information about users after they register (*progressive profiling*) to request less data when they register and collect reliable user demographic data later.

- Set up policies to control how users are authenticated.

- Organize and administer users in hierarchical groups, and assign roles, permissions, and policies to groups that are inherited by their members.

- Use CAPTCHA to block access from bots.

- View and manage policies, reset passwords, and view and manage profiles of all users using its API and admin user interfaces.

Learn more:

- [Okta Identity Engine Overview](/docs/guides/oie-intro/) elaborates on Identity Engine's benefits, deployment models, SDKs, and sample apps.

- [Okta Identity Engine](https://help.okta.com/okta_help.htm?type=oie&id=csh-oie) has links for learning more about OIE.

#### Okta Universal Directory

The *Universal Directory (UD)* is a full-featured directory that can mirror data in Active Directory (AD), LDAP, CSV directories, social media, and other external Identity Providers. This allows UD to serve as a single source of truth for all user data. Additionally, it allows you to combine user profiles from all of your identity sources and centralize user policy, profile, and password management.

The Universal Directory has per-group administration. You can manage external identities in UD, internal identities in AD, and mirror them in UD. You can give an application owner admin control over accounts in their domain, and give IT admin control over internal accounts. You can manage users with its REST APIs, and you can use its real-time data and reports for analysis. Its LDAP interface eliminates the need for local LDAP authentication.

Using Universal Directory:

- Store an unlimited number of users and attributes from sources like Active Directory, LDAP, and external IdPs, and delegate authentication to them.

- Add any number of directories or domains.

- Store, manage, and apply business and authentication policies that control how you handle different sets of users, including customer and partner users.

- Set consistent user access policies with a central policy engine, create policies based on unique user contexts, and employ any combination of MFA factors.

- Maintain user device information in device profiles that you associate with user profiles.

- Define, store, and administer user roles, permissions, policies, and other data.

- Organize users in hierarchical groups, and assign roles, permissions, and policies to them that are inherited by their members.

- Use its out-of-the-box connections with HR systems like Workday, SaaS apps like G Suite, CSV files, and third-party Identity Providers.

- Get a real-time syslog to troubleshoot and address security issues and use pre-built reports to see how end users use apps and services. You can download or export your data to CSV files, sync it with Security Information and Event Management systems, or access it through its API.

- Admins can view and manage policies, reset passwords, and view and manage profiles of all users in their domains using its API and admin user interfaces.

- Obsolete data is disabled without being deleted and can be provided to authorized admins.

- You can replace your on-premise LDAP and Active Directory.

Learn more:

- [Universal Directory](https://www.okta.com/products/universal-directory/) lists major features and benefits of Universal Directory.

### Profiles and progressive profiling

Okta stores user identity information in user profiles that authorized users and admins can view, manage, and update. You can use progressive profiling to update profile data after users register.

#### Okta user profiles

A typical user profile contains attributes such as a user's first name, last name, username, and email address. A user is any person who is authorized to access your applications, and can be an employee, customer, partner, or other entity.

Okta supports four types of user profiles:

- **Okta user profiles** contain information about individual end users. They have include default base attributes, and you can add custom attributes.

- **Okta group profiles** contain information about specific user groups. They have base attributes for name and description, and you can add custom attributes.

- **Okta app user profiles** define the attributes that can be pushed to or imported from particular apps in the Universal Directory. It has both base and custom attributes.

- **Okta custom user profiles** are based on Okta user profiles and are used for different types of users, such as administrators, contractors, help desk, and so on. (You can have up to ten user types, with a separate custom user profile for each.) Custom user profiles also have default base attributes, and you can add custom attributes.

Your admins can create and manage user types, Okta profiles, and custom attributes. Profile data is available for authentication, authorization, and access control, and your apps can access it through the API.

Learn more:

- [User profiles](https://developer.okta.com/docs/concepts/user-profiles/) elaborates on Okta user profiles and profile types, user mappings, custom profile types, how the Universal Directory handles them, and more, and has links to more information.

- [Work with profiles and attributes](https://help.okta.com/okta_help.htm?id=ext_Directory_Manage_Profile_Attributes) has links to more detailed information about managing profiles and attributes.

#### Progressive profiling

*Progressive profiling* allows you to add information to user profiles, or have Okta request additional info, after users register. Use it to require less data when users register, and collect reliable user demographic data later. You can also use it to have Okta request additional data if profile requirements change, such as if an application requires new app profile data.

Learn more:

- [How to Use Progressive Profiling as a Privacy Tool](https://www.okta.com/blog/2019/02/how-to-use-progressive-profiling-as-a-privacy-tool/) elaborates on progressive profiling.

- [Configuring Progressive Profiling for Your Custom Apps](https://www.okta.com/blog/2019/01/configuring-progressive-profiling-for-your-custom-apps/) explains how you can collect additional data if profile requirements change.

- [Work with profiles and attributes](https://help.okta.com/okta_help.htm?id=ext_Directory_Manage_Profile_Attributes) has links to information about managing profiles and attributes.

### Okta organizations and groups

Okta manages users in [organizations](#okta-organizations) and uses [groups](#okta-groups) to facilitate user administration.

#### Okta organizations

An Okta organization (org) is a root object and a container for all other Okta objects. It contains users, groups, applications and other resources, and policy and configurations for your Okta environment.

Every org has users and apps. These are the only mandatory items that you must configure for your org to use Okta. You can create users in Okta, import users through directory integrations or application integrations. Applications are connections to public apps (such as Office 365) or proprietary applications (such as your own apps).

Okta orgs host pages on subdomains, and a unique URL is assigned to each org. The typical org URL is the tenant name (the subdomain), and then the domain name. Each org has an admin URL to sign in to the Admin Console. You can [customize the organization and admin URLs](/docs/guides/custom-url-domain/main/).

There are two types of organizations &mdash; production and preview:

- Preview orgs allow you to see the next release early and play with Beta features. Some Beta and Early Access (EA) features are made available by invitation. Some are self-service features that you can turn on yourselves. All preview orgs include all Generally Available (GA) features.

- Production orgs are stable releases and don't contain Beta features. They include both self-service EA features and those EA features made available by request, and all GA features.

Learn more:

- [Okta organizations](/docs/concepts/okta-organizations/) elaborates on org URLs, types, and GA and EA feature types, org federation, multiple-org configurations, and rate limits.

#### Okta groups

Groups help you simplify managing users who have common or shared traits. For example, you can create a group named Sales and grant group members access to the Sales Documentation folder on your org file server to make it easier for your sales team to access shared sales documentation. Group data typically resides in the directory. You can also limit the scope of app sign-in roles to a group, such as configure policies to implement MFA for remote, temporary, or contract employees.

With Okta, you can define group membership in one directory and then use your groups in multiple connected systems. In on-premises systems, applications can connect to and query for groups from a central directory. Cloud applications often lack a common Active Directory, but Okta lets you use groups with these types of applications.

Learn more:

- [About groups](https://help.okta.com/okta_help.htm?type=oie&id=ext_Directory_Groups) elaborates on groups and their use for policies, SAML provisioning, and use cases.

### Okta workflow management

Okta Lifecycle Management and Okta Workflows are workflow management features to automate routine IT and HR procedures to minimize the time, effort, and errors to perform them.

#### Okta Lifecycle Management

Use *Okta Lifecycle Management (OLM)* to automate user provisioning, updates, and deprovisioning of application access in response to user lifecycle events such as new hire onboarding, role change, and company exit.

You can use Okta Lifecycle Management's features to:

- Use more than 190 workplace apps on the Okta Integration Network (OIN) to automate functions such as create, update, and deactivate accounts across your apps.

- Configure provisioning for both on-premise and cloud-based apps in OIN.

- Create and maintain group rules that allow admins to set policies for group membership, application permissions, automated provisioning, and more.

- Push groups and their memberships to provisioned third-party apps.

- Automatically respond to user lifecycle events, such as alert a user or change their status if they are inactive for too long or their sign-in credentials are about to expire.

- Create and run reports to confirm user access, check unassignments, and detect orphan accounts.

Learn more:

- [Automated Provisioning and More: Why You Should Adopt Okta Lifecycle Management](https://www.okta.com/blog/2020/04/automated-provisioning-and-more-why-you-should-adopt-okta-lifecycle-management/) describes OLM's benefits.

#### Okta Workflows

*Okta Workflows* is a stand-alone design console for building automated business processes, especially for identity-related use cases. Use it to build custom data- and event-driven workflows. It has a wide range of third-party apps and functions for performing common business processes, including lifecycle management. For example, you can create automated flows to provision and deprovision app accounts, sequence actions with logic and timing, resolve identity creation conflicts, and log and send notifications for lifecycle events.

Using Okta Workflows, you can:

- Have as many flows as you need.

- Use its pre-built flow templates as-is, tailor them to meet your needs, or build your own flows.

- Trigger any given flow with an application event (such as adding a user to an application in Okta), with a scheduled event, or when an API endpoint is called.

- Create helper (child) flows to modularize your flows to facilitate development and maintenance.

Learn more:

- [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf) has links for learning more about Workflows.

**Next step: [Authentication Factors](/docs/concepts/iam-overview-authentication-factors/).**
