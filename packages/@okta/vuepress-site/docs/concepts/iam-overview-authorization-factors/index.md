---
title: Authorization factors
---
# Authorization factors

Your solution must control what resources authenticated users can see and use. This requires your admins to define rules for allowing users and groups to access specific resources and have those [rules enforced](#access-control).

Authorization and authentication are related and often spoken of together, but they're different concepts. Authentication verifies the identity of a user or service, and authorization determines their access rights. Although they work together, they are managed differently and sometimes by different teams. Consider managing them separately in your design for more flexibility, and to simplify your architecture, design, and administration. Also consider basing your authorization and authentication on the OAuth 2.0 and OIDC standards respectively for high security.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

## Assign and manage access permissions

Your admins need to assign roles and permissions, set access policies, and support your users and customers.

Consider the following in your design:

- Strategies for granting access to your resources, such as Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC). If you don't plan to support RBAC, decide how to provide admin-like capabilities.

- A way to assign IAM roles (such as *admin*) or privileges to users for all or specific customers and domains.

- A way for admins to define and manage access policies for users, groups, devices, apps, and other entities in their respective domains.

- Provisions for your customers and partners to assign and manage user roles, permissions, and policies to reduce your admin workload. You and your customers can use common admin interfaces that limit what functions and data customer admins can see and use. Examples include:

    * Assigning user roles, permissions, and policies
    * Creating and managing user groups and associated permissions and policies
    * Reporting data to support users and other stakeholders in a specific domain

- Provisions for your admins to manage roles, permissions, and policies for your users and customers. Examples include those listed for customer admins above for your domain, plus:

    * Creating, configuring, and administering customer accounts
    * Supporting your customers and customer admins

## Access control

The authorization facilities described above determine what privileges a given user has at a given time, but don't grant them. *Access control* is the mechanism for granting or denying individual access requests based on current policies, user authentication and authorizations, request info, and other factors. Your application developers implement access control checks throughout their code to enforce security requirements whenever access to a particular resource is limited.

The best strategies for access control depend on your applications' requirements and designs. You can choose from a variety of models, and use different strategies and more than one at a time, depending on the situation. Here are a few to consider:

- **Attribute-Based Access Control (ABAC)**, also known as **Policy-Based Access Control (PBAC):** Grant or deny access based on policies that combine any number and type of attributes.

- **Discretionary Access Control (DAC):** Grant or deny access based on a policy established by a resource's owner.

- **Dynamic Access Control (DAC):** A Windows Server feature that allows an admin to apply and manage access and auditing for domain-based file servers based on Active Directory attributes. For example, you can use DAC to limit access to a particular resource to users who are in the office. Although this is a Windows Server feature, you can apply the general strategy in IAM solutions that run on any platform.

- **Mandatory Access Control (MAC):** A type of access control in which the operating system or database constrains the ability of a requestor to access, update, or use a file system resource. This access is based on criteria established by the resource's owners (who are typically sysadmins). Unix and Linux file permissions are an example.

- **Role-Based Access Control (RBAC):** A policy-neutral access control mechanism based on roles and privileges. Everyone who holds a given role has the privileges associated with the role. Common examples are admins and super admins.

- **Rule-Based Access Control** (not to be confused with Role-Based or Attribute-Based Access Control): Evaluate access requests against a specific set of rules. Rule-based access controls are preventative. They're commonly added on top of other types of access control. This helps to prevent unauthorized access, such as limiting clients' access to a particular data set when they are on the company's internal network.

- **Time-based Access Control:** Only allow a resource to be accessed during certain times of the day and week. The term is commonly associated with network Access Control Lists (ACLs), but you can apply the general strategy in IAM solutions that run on any platform.

Consider providing APIs and SDKs that allow other elements of your IAM solution, your applications, and other consumers to access authorization functions and data as permitted.

## How Okta can help

Okta provides authorization facilities that allow you to meet or exceed your application's general architecture and authorization requirements. Here are a few ways that Okta can help:

- You can assign different kinds of admin roles with different scopes, such as super admin, organization admin, application admin, and API access management admin, whose capabilities and scope are limited. Each has a unique set of permissions and restrictions. See [Standard administrator roles and permissions](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison).

- Okta bases authorization and access control on the OAuth 2.0 protocol standard for maximum security and compatibility with contemporary systems. See [API Access Management with Okta](/docs/concepts/api-access-management/) and [Protect your API endpoints](/docs/guides/protect-your-api/aspnetcore3/main/).

- You can choose from multiple access control models, such as Attribute-Based Access Control (ABAC) and Role-Based Access Control (RBAC), and use them in different situations and combinations.

- Your admins can use policies to control how different sets of users are authorized.

- You can use the org authorization server, use the "default" authorization server in your org, or build additional custom authorization servers to implement different OAuth scopes, claims, and access policies. See [Authorization Servers](/docs/concepts/auth-servers/) and [Create an Authorization Server](/docs/guides/customize-authz-server/main/).

**Next step: [Architectural Factors](/docs/concepts/iam-overview-architectural-factors/).**
