---
title: Universal Directory
meta:
  - name: description
    content: A high-level, developer-focused overview of Universal Directory.
---

# Universal Directory

Universal Directory (UD) is the foundational data layer for the entire Okta platform. While often associated with SSO, its primary function is to serve as a flexible, API-first, and centralized directory. It acts as the definitive source of truth for all identities, regardless of their origin, providing a unified data model for all other Okta services and custom apps.

## The Core Data Layer for the Okta Platform

Universal Directory isn't a standalone feature but the underlying Data Store that enables all of Okta's services. Every interaction with an Okta service, from authentication to user provisioning, is an interaction with UD's data model.

Admins and developers primarily interact with these core components of Universal Directory (UD).

* **User profiles and the profile editor**: UD stores each user in a single Okta user profile with standard and custom attributes. This profile is the definitive user record.
* **Profile mappings**: Profile mappings are declarative rules that allow for the transformation of defining attributes between Okta and external apps.
* **Groups and group rules:** Effective access management relies on using groups, while group rules help automatically manage group membership that drives downstream app access, admin roles, and policy enforcement. The group rules are based on attributes or other group membership.
* **Directory integrations**: UD integrates with on-premises directories like Active Directory and LDAP using the Okta AD Agent.

Universal Directory further extends its capabilities beyond these core components. You can use UD to integrate with products across our identity security fabric, including principals such as service accounts, apps, and AI agents.

### User Profiles and the Profile Editor

Okta represents each user as a single user object. The profile object within this user object stores the user's attributes. Okta builds this profile on a base schema of 31 standard attributes (such as `firstName`, `lastName`, or `email`), following the [RFC System for Cross-domain Identity Management: Core Schema](https://datatracker.ietf.org/doc/html/rfc7643#section-4.1).

The true power of UD lies in its schema extensibility. Using the **Profile Editor** or the Schema API, you can add custom attributes to the profile object to store any required organizational data. Each custom attribute must be assigned a specific data type (such as string, number, boolean, integer, or array). Attributes can be configured with end user permissions (read-only, read-write) and other constraints, such as being required or unique. This allows you to transform the Okta user profile into the definitive and trusted record for each user. See [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/) and [Schemas API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/).

Okta supports importing users from several sources, primarily through directory services, CSV files, and connected apps. You can also import users through custom sources (see [Build an Anything-as-a-Source custom client integration](https://developer.okta.com/docs/guides/anything-as-a-source/)).  Importing users into UD enables you to automate, secure, and scale identity operations like the [mover-joiner-leaver](https://developer.okta.com/docs/guides/oin-lifecycle-mgmt-overview/#example-of-a-workforce-lifecycle-journey-with-okta) lifecycle management process. See [Import Users](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-import-users-main.htm).

This user profile is separate from the app user profile used for granular attribute mapping. Further, you can designate a single system (like an HR platform) as the primary source for a user's entire profile (profile-level sourcing), while also sourcing specific attributes from different sources (attribute-level sourcing). This provides the flexibility to create a composite user record, no matter the source of an attribute. For example, you can source a user's manager from Workday while sourcing their email address from Active Directory, creating a single profile from multiple authoritative systems.

You can manage the user profiles in Universal Directory from the Admin Console or use the [User API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/).

#### Custom User Profile Types

Beyond simply adding attributes to the default profile, Universal Directory allows you to define entirely new user types. This is a powerful feature for organizations that manage distinct user populations with fundamentally different data requirements.

For example, you could create a `Contractor` user type that has its own unique schema, separate from the default `Employee` user.

* The `Contractor` type might have custom attributes like `contractEndDate`, `vendorID`, and `billingCode`.
* The default user (`Employee`) type would retain custom attributes like `employeeID`, `costCenter`, and `manager`.

By creating a custom user type, you're creating a new, distinct user template with its own set of base and custom attributes. This allows for cleaner data governance and ensures that different types of users, like contractors, are only associated with data relevant to their role. You can manage these types in the **Profile Editor** or through the User Types API, and users can be assigned a specific type upon creation. See [User Types API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserType/).

User profiles can only belong to one user profile type. The user object property [`type`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/createUser!path=type&t=request) defines the custom user profile (or default profile) that the user is associated with.

> **Notes:**
>
> * The default profile object property [`userType`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/getUser!c=200&path=profile/userType&t=response) is a user profile attribute and isn't a reference to the default or custom profile type.
> * *Certain attributes are reserved and can't be used for custom user profiles. See [Review reserved attributes](https://help.okta.com/okta_help.htm?type=oie&id=reserved-attributes).

#### App User Profiles

It's critical to distinguish between the Okta user profile (which can be the default type or a custom type) and an app user profile. The Okta user profile is the central, main profile. When an app is assigned to a user, Okta creates a separate app user profile specific to that app. This secondary profile (for example, `salesforce.userName` or `google.department`) holds the attributes required by the downstream app and allows for granular attribute mapping.

The available custom attributes, however, are determined by the app. You can manage the app user profile type with the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/). Review the [app user profile](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationUsers/#tag/ApplicationUsers/operation/getApplicationUser!c=200&path=profile&t=response) object and the [app user](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationUsers/) object for further details.

You can manage the apps user profiles in Universal Directory from the Admin Console or use the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application).

### Profile Mappings

Profile mappings are declarative rules that allow for the transformation of defining attributes between Okta and external apps.

* **App to Okta:** This mapping is used when an app serves as the source of truth. For instance, you can map the `mobilePhone` attribute from an HR system to the `mobilePhone` attribute in the Okta user profile.
* **Okta to App:** This mapping is used for provisioning. You can map the Okta `department` attribute to the Salesforce `department` attribute. When the attribute is updated in the Okta profile, the corresponding Salesforce profile is automatically updated.

This mapping layer decouples apps from identity sources, enabling you to modify your app stack without disrupting core identity workflows.

See [Profile Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProfileMapping/).

### Groups and Group Rules

Effective access management is achieved through groups, not individual user assignments. Universal Directory supports two primary group types:

* **Okta Groups:** Groups that are created and managed directly within Okta.
* **Groups in apps and directories**: Groups that are imported from external directories such as Active Directory or LDAP, or from apps. Membership is managed in the source directory or app and synchronized to Okta. Only certain apps can import groups into Okta. See [Okta group source types](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-group-types.htm).

See [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/) and [Group Rules API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/GroupRule/).

#### Group Profiles

Just as user profiles store attributes for individual users, you can extend or add to the group profiles by adding attributes. Every group has a base schema with standard attributes like `name` and `description`.

Using the **Profile Editor** or the [Schema API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/), you can extend the group profile with custom attributes to store relevant organizational data. For example, you could add attributes such as:

* `costCenter` (String): To associate the group with a specific financial department.
* `resourceID` (Integer): To link the group to an external app or resource.

This metadata is invaluable for automation and governance. For example, you could use the Groups API to find all groups associated with a particular `costCenter`.

#### Group Rules

The most powerful automation tool for access control is group rules. These are "if-then" expressions evaluated against user profile attributes to automate group membership, app access, app roles, and security policies.

```
IF user.department == "Engineering" AND user.countryCode == "GB"
THEN Add user to "Engineering - London" Group
```

This `Engineering \- London` group can then be assigned to apps (like GitHub and Jira) or linked to specific MFA policies, ensuring that access for new engineers from London is fully automated from the moment their accounts are created.

### Directory Integrations

Directory integrations is a key feature of Universal Directory that allows you to connect your Okta org to existing on-premises user directories. They're essential for orgs that maintain an on-premises footprint.

The most common use case for directory integrations is Active Directory (AD). By deploying the Okta Agent, you can synchronize users, groups, and even passwords from your on-premises AD setup into Okta. This establishes AD as an authoritative source of identity, allowing you to seamlessly extend your existing identity infrastructure to the cloud. Furthermore, this configuration supports bidirectional synchronization, allowing data to be synced from AD into UD and enabling UD to push objects from Okta into AD.

A similar integration is available for Lightweight Directory Access Protocol (LDAP) servers.

These integrations are configured under **Directory** > **Directory Integrations** in the Admin Console or with the [Directories Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration/) and [Directory Agent Pools API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AgentPools/).

## Universal Directory schemas

You can store many different types of data in a user profile such as strings, numbers, dates, lists. A schema is a description of what type of information is stored in a user profile. Each element in a schema is known as an **attribute** and each attribute has the following metadata or properties:

* **Data type:** What kind of data is being stored. Examples include string, number, and Boolean.
* **Display name:** A human readable label to be used in user interfaces
* **Variable name:** The machine-readable identifier for the attribute
* **Description:** A more in-depth description of what the attribute is for
* **Enum:** If the attribute value comes from a fixed list of choices
* **Attribute Length:** How long the value can be, as appropriate for the attribute's data type
* **Attribute required:** If an attribute is required, Okta gives an error if the attribute isn't included.

Schemas define every user profile type: Okta default user profile, custom user profiles, group profiles, and app user profiles. The [Schemas API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/) manages operations for all user profiles. See [User Schema object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/getUserSchema!c=200&path=$schema&t=response), [App User Schema object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/getApplicationUserSchema!c=200&path=$schema&t=response), and [Group Schema object.

## Advanced Use Cases

Centralizing user data in Universal Directory unlocks advanced capabilities for governance, fine-grained access control, and segmentation of your users.

> **Note:** These use cases might require subscribing to additional Okta products. Contact Okta Support for more information.

### Okta Identity Governance

Okta Identity Governance (OIG) is a product that works with Universal Directory by using its attributes and relationships as the foundation for governance processes. In essence, UD provides the identity "state" (who users are, their relationships, and their entitlements), while OIG provides the governance layer to ensure that state is correct and audited.

See [Identity Governance](https://help.okta.com/oie/en-us/content/topics/identity-governance/iga.htm) and [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).

### Realms for Segmenting User Populations

As orgs manage more diverse user populations, such as employees, contractors, partners, and temporary workers, the need to isolate their identity lifecycles becomes critical. Realms are a powerful feature on top of UD that enables you to partition users within a single Okta org, effectively creating sandboxed environments for different groups.

Key capabilities and benefits of realms include:

* **Delegated identity providers**: Each realm can be configured with its own set of identity providers. For example, your employee realm might use Workday as its source of truth, while a contractor realm could use a social IdP like Google or require local Okta-sourced accounts.
* **Customized policies**: Realms allow you to apply unique password and authentication policies for the sign-in experience for each user population.
* **Avoiding org sprawl**: Before realms, the primary solution for this level of isolation was to create and manage multiple, separate Okta orgs, which was costly and complex. Realms provide a more scalable solution within a single org.

For developers, realms are fully manageable using the Realms API (/api/v1/realms). You can programmatically create realms, assign users, and configure realm-specific behaviors, enabling complex, multi-tenant use cases on a unified platform.

See [Realms API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Manage Realms](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/realms/realms.htm).

### Fine-Grained Authentication and Authorization

Custom attributes stored in UD serve as powerful inputs for Okta's policy engines, enabling Attribute-Based Access Control.

* **Fine-Grained Authentication:** An Okta Authentication Policy can reference UD attributes to enforce step-up authentication. For example: if a user has u`ser.clearanceLevel \== "High"`, the policy can require a FIDO2 (WebAuthn) factor, even if they are on a trusted network.
* **Fine-Grained Authorization:** An app sign-on policy can use UD attributes to grant or deny access. For example, for a finance tools app, the policy could allow access if `user.department \== "Finance"`, but deny all others, irrespective of group memberships.

## Why Universal Directory Matters for Developers

For developers, Universal Directory provides a unified, API-first user model. Instead of writing and maintaining custom connectors for Active Directory, LDAP, and various APIs, you can build your app once against Okta's APIs. Okta abstracts away the complexity of federating and sourcing upstream identities, presenting a clean and predictable JSON object for every user. This abstraction layer significantly reduces development time and future-proofs your app against future changes in the org's identity infrastructure.
