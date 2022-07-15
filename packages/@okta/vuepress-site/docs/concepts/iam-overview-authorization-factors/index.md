---
title: Authorization Factors
---
# Authorization Factors

Your solution must control what resources authenticated users can see and use. This requires your admins to define rules for allowing users and groups to access specific resources, and have those [rules enforced](#access-control).

Authorization and authentication are related and often spoken of together, but they're different concepts. Authentication verifies the identity of a user or service, and authorization determines their access rights. Although they work together, they are managed differently and sometimes by different teams. Consider handling them separately in your design for more flexibility in how you manage the two, and to simplify your architecture, design, and administration. Also consider basing your authorization and authentication on the OAuth 2.0 and OIDC standards respectively for high security.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

## Assigning and managing access permissions

Your admins need to assign roles and permissions, set access policies, and support your users and customers. Consider combining some of this functionality with identity management in your design.

Consider the following in your design:

- Strategies for granting access to your resources, such as Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC), If you don't plan to support RBAC, decide how to support admin-like capabilities.

- Means to assign IAM roles (such as *admin*) or privileges to users for all customers and domains, or for specific domains.

- Means for admins to define and manage access policies for users, groups, devices, apps, and other entities in their respective domains.

- Provisions for your customers and partners to assign and manage roles, permissions, and policies for their users, to reduce your admin workload. You and your customers can use common admin interfaces by limiting what functions and data customer admins can see and use. Examples might include assigning user roles, permissions, and policies; creating and managing user groups and associated permissions and policies; and reporting data to support users and other stakeholders in their domain.

- Provisions for your admins to manage roles, permissions, and policies for your users and customers. Examples might include those listed for customer admins above for your domain, plus create, configure, and administer customer accounts, and support your customers and customer admins.

## Access control

The authorization facilities above determine what privileges a given user has at a given time, but don't apply them. *Access control* is the mechanism for granting or denying individual access requests based on current policies, user authentication and authorizations, request info, and other factors. Your application developers implement access control checks throughout their code to enforce security requirements whenever access to a particular resource is limited.

The best strategies for access control depend on your applications' requirements and designs. You can choose from a variety of models, and use different ones and more than one at a time, depending on the situation. Here are a few to consider:

- **Attribute-Based Access Control (ABAC)**, also known as **Policy-Based Access Control (PBAC):** Grant or deny access based on policies that combine any number and type of attributes.

- **Discretionary Access Control (DAC):** Grant or deny access based on a policy established by a resource's owner.

- **Dynamic Access Control (DAC):** A Windows Server feature that allows an admin to apply and manage access and auditing for domain-based file servers based on Active Directory attributes. For example, you can use DAC to limit access to a particular resource to users who are in the office. Although this is a Windows Server feature, you can apply the general strategy in IAM solutions that run on any platform.

- **Mandatory Access Control (MAC):** A type of access control in which the operating system or database constrains the ability of a requestor to access, update, or use a file system resource based on criteria established by the resource's owners (who are typically sysadmins). Unix and Linux file permissions are an example.

- **Role-Based Access Control (RBAC):** A policy-neutral access control mechanism based on roles and privileges; everyone who holds a given role has the privileges associated with the role. Common examples are admins and super admins.

- **Rule-Based Access Control** (not to be confused with Role-Based or Attribute-Based Access Control): Evaluate access requests against a specific set of rules. Rule-based access controls are preventative; they're commonly added on to other types of access control to prevent unauthorized access, such as limiting access to a particular data set to clients on the company's internal network.

- **Time-based Access Control:** Only allow a resource to be accessed during certain times of the day and week. The term is commonly associated with network Access Control Lists (ACLs), but you can apply the general strategy in IAM solutions that run on any platform.

Consider providing APIs and SDKs that allow other elements of your IAM solution, your applications, and other consumers, to access authorization functions and data as permitted.

## How Okta can help

Okta provides authorization facilities that allow you to meet or exceed your application\'s general architecture and authorization requirements. Here are a few of the ways that Okta can help:

- You can assign different kinds of admin roles with different scopes, such as super admin, organization admin, application admin, and API access management admin, whose capabilities and scope are limited. Each has a unique set of permissions and restrictions. See [Standard administrator roles and permissions](https://help.okta.com/en/prod/Content/Topics/Security/administrators-admin-comparison.htm).

- Okta bases authorization and access control on the OAuth 2.0 protocol standard for maximum security and compatibility with contemporary systems. See [API Access Management with Okta](https://developer.okta.com/docs/concepts/api-access-management/) and [Protect your API endpoints](https://developer.okta.com/docs/guides/protect-your-api/aspnetcore3/main/) for details.

- You can choose from multiple access control models, such as Attribute-Based Access Control (ABAC) and Role-Based Access Control (RBAC), and use them in different situations and combinations.

- Your admins can use policies to control how different sets of users are authorized.

- You can use Okta's default authorization server, or build custom authorization servers to implement different OAuth scopes, claims, and access policies. See [Authorization Servers](https://developer.okta.com/docs/concepts/auth-servers/).

**Next step: [Architectural Factors](/docs/concepts/iam-overview-architectural-factors/).**
