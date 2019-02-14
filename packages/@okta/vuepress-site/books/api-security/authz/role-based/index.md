---
title: Role-Based Access Control - Authorization
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/authz/">&larr; Authorization</a></div>

## Role-Based Access Control {#authz-role-based}

Many organizations have roles and responsibilities that don't quite fit a strict hierarchical structure. For example, a release manager on a development team may have access to deploy their components but their direct supervisor may not. Let's take a look at role-based access control, starting with a simple use case: one user creating another user.

Before we dig into implementation, there are a few questions to consider:

* Who can create the user?
* Where in the hierarchy can the user be?
* What user type can the user be?
* What permissions can the new user have?
* How do I model those permissions?

There are multiple ways this problem can be solved. We can pick a single user or group of users and only give them the permissions to create users and do other administrative tasks. But this is not a scalable approach. We need to have a more generic model for user-types and permissions. There are various approaches to tackle this but we will focus specifically on role-based access control or RBAC and attribute-based access control or ABAC.

To solve this problem, our hypothetical company, Wookie Inc., hires their first IT person, Han. He'll take care of all IT-related tasks. Because Han is an IT admin, he has the rights and privileges to create other users, delete them, and assign them to the right org/department.  As usual, IT admin is the role type and the privileges are the permissions.

Similarly, engineering has Jr/Sr engineers, architects, development managers, and product managers and they all have different privileges. Junior engineers rarely have permission to touch production systems. Architects may have access to specific instances in AWS. Dev managers can change the status of ticket on JIRA. Similar responsibility boundaries and policies exist in every group of every organization.

The roles in an RBAC model are the de facto way of determining what permissions a user or service has. The great thing about RBAC is it enables you to apply both broad and granular access policies. You can use various objects like groups and scopes to make implementation easier.

You define different roles, what those roles can do, and assume some combination of them to users and you're done!

RBAC not only gives great control over how to manage access but is also a great model for auditing access. Once we create a consistent management framework it becomes easier to answer the question: "who has access to what?" RBAC creates a logical model that reflects the structure of system and its responsibilities.

Unfortunately, RBAC still has drawbacks. Imagine a company with 100k employees and thousands of roles with specific permissions or a microservices architecture with thousands of services, each needing fine-grained access to features and functionality of other microservices. Thousands of services each of which has its own unique set of permissions for how and when they can interact with each other. Building for these scenarios with RBAC introduces a lot of complexity:

* The number of roles will explode making management a nightmare.
* The scale makes it hard to validate and audit access. Nothing can stop me from accidentally assigning a user or service to the wrong group giving them wrong privileges.
* To handle this scale, roles become more generic and apply to many users or many services.

And it still doesn't address user specific data.

For example, let's say I am building a banking application. Only bankers who are temporarily authorized by the customer can carry out certain actions for that customer. How can this be enforced in my API? The banker role is generic but the authorization is user specific. The approval condition can be modelled as a user attribute and map to specific actions. These actions could be anything from withdrawing, reading balances, adding account admins, etc.
