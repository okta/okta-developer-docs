---
title: Okta Data Model
---

# Okta Data Model

This page provides a high-level overview of the Okta data model.

Entities inside Okta are referred to as resources. Each Okta resource contains:

* Attributes, such as `name` or `created`.

* Links (URLs) that describe relationships or actions that you can take on the resource. For example, a `self` link on a user references itself, and a `deactivate` link moves the lifecycle state of the user.

* A Profile that allows you to store information about the object. For example, a user profile has an `email` attribute that contains the value for the email address.

When you sign up for Okta, a private data space is created for you that is represented as an **organization** in Okta. As an Okta customer, you own your organization and everything in it: applications, directories, users, groups, policies, and so on.

A top-level directory resource is available for your user base in your organization. You can host directories either inside Okta or replicate outside user directories, as in the case of Active Directory or LDAP.

Your end users are modeled inside Okta as [**Users**](/docs/reference/api/users/). Users are associated with an email address and a username. The username must be unique, but it can be changed (and often is when, for example, someone changes their name). The email address doesn't need to be unique and often isn't. Uniqueness for a user is determined by their Okta user ID.

A [**Group**](/docs/reference/api/groups/) is made up of users found within a directory. It can be thought of as a label applied to a set of users. A user can be a member of multiple groups. Groups are useful for representing roles, relationships, and can even be used for subscription tiers.

An [**Application**](/docs/reference/api/apps/) holds information about the protocol in which it wants Okta to communicate, policies for accessing the application, and which users can use the application after identifying themselves.

The relationship between an application and a user is stored in Okta as an [AppUser](/docs/reference/api/apps/#assign-user-to-application-for-sso). This allows for **mappings** between profile values where they are different. For example, application1 may refer to a user's last name as `lastName` and application2 may refer to last name as `surname`. The AppUser stores the value as necessary for the application.

A [**Policy**](/docs/reference/api/policy/) specifies the **rules** of how your organization behaves for certain actions. Policies have conditions that need to be met to apply actions. Your Okta organization contains policies for how to gain access to an application, what the user needs to do to reset their password, and to enroll into multifactor authentication, for example.

An [**authorization server**](/docs/reference/api/authorization-servers/) in your Okta organization provides applications tokens that allow those applications to access either your API or Okta resources. This is done with protocols such as OAuth 2.0, OpenID Connect, and SAML.

A resource that contains other resources is known as a **collection**. Collections support additional behavior, such as pagination, sort ordering, and searching. So the users collection would contain an array of `User` resources.
