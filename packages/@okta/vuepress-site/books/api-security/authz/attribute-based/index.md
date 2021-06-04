---
title: Attribute-Based Access Control - Authorization
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/authz/">&larr; Authorization</a></div>

## Attribute-Based Access Control {#authz-attribute-based}

The pattern must be obvious by now – in ABAC, access is defined by the attributes on the user or service, and a policy that enforces what actions these attributes are allowed to perform. As we saw in the above section, implementing RBAC is relatively simple but maintaining it over time becomes cumbersome as the system grows and permissions get more fine-grained. With ABAC, it's the opposite. Implementing it can be a herculean task but once complete, maintaining it is relatively simple and efficient.

With RBAC, every action that can be carried out in a system is tied to a complex set of role combinations. If a new role is introduced, every action that this new role can access must be updated. However with ABAC, you can create a central policy engine in which you define complex boolean logic for what attributes are allowed to do based on various conditions. ABAC is a great model for fine-grained (deep/specific) access control whereas RBAC is good for coarse-grained (broad/generic) access control.

It's also important to note that attributes can be about anything or anyone:

* There can be user or subject attributes like name, ID, role, department, status
* There can be attributes to actions like CRUD: add, edit, remove, approve
* There can be resource attributes like the bank example we covered earlier: bank account, bank balance, or resource clarification like top secret, public access
* There can also be attributes about the context of an interaction: time, location, device

Let's revisit the Wookie Inc. example from the RBAC section. We created a simple RBAC management model for an IT admin As the organization grows and enters new markets, the access requirements also go up, introducing all sorts of complexity:

* HIPAA regulations specify only HIPAA certified users can look at user data
* To handle scale, Wookie Inc. decides to move to a microservices architecture
* Other compliance requirements mean that Wookie Inc. has to have a way to audit everything, including APIs.
* They have decided to open up some of their APIs for public access.

All of these requirements aren't uncommon for companies to address as they grow. Let's take a deeper look at the last one on the list: exposing APIs for public consumption. This can be third party developers that want to build against the platform or customers that need to build custom workflows. Either way, making sure the right user has the right privileges is incredibly important and difficult to implement. Unlike a product where actions are simple and what a user can do is based on roles, API actions are more granular.

This adds more complexity to API authorization Take a simple music playlist API, can the consumers of my API:

* Read what songs are in a users playlist?
* Add or delete songs from a playlist?
* Change the description?
* Change the playlist order? Sort it?

Even in the simplest of scenarios, authorization can get complex quickly.

All of these actions can be modelled as attributes of the resource that's being accessed. For example, being able to add, edit user details are attributes of the user resource. When writing code, I need a better way to model these attributes. We can utilize scopes here. If you recall, back in the Authentication chapter, OAuth 2.0 had the concept of scopes. We can use that model again here:

* User scopes: read:name, edit:name, read:email, edit:email
* Playlist scopes: read:playlist, edit:playlist, edit:description, sort:playlist

The naming convention can be anything you prefer. You could also model some of these as read_name, edit_name, etc.

We now have a model for all the resource types and the various actions that can be carried out on these resources. You can also take this a step further and define more granular attributes: playlists can be public or private. Songs can be explicit or non-explicit.

We can repeat the same model for users also. Users can:

* Be Account admins
* Be in listen only mode
* Be paid subscribers
* Be the primary account holder
* Have genre preferences.

These attributes can be defined on the user object however you like:

```
/users
    id
    Name
    admin
      yes or no
    subscription
      free, family, premium
    /preferences
    /profile
    /playlists
```

These are all user attributes and I can model the actions on them using scopes in a similar fashion:

* `read:account_status`, `edit:listening_mode`, `edit:genre_preferences`
* `edit:subscription`, `read:subscription`, `read:genre_preferences`

At the same time, you can use these user attributes to enforce access:

* Access to social groups in Wookie Inc. can be enforced based on genre preferences or subscription status
* Allowing users to skip songs and that can be based on their mode and subscription status

Using this model, you can now architect a simple model for making authorization decisions. ABAC has a standardized architecture that we can use. Let's take an simple example: Leia is a free user that wants to edit Han's workout playlist. Editing playlists depends on a simple factor: It is only available to paid members.

How would this flow?

There are multiple ways to architect this but ABAC proposes the following architecture:

* Policy Enforcement Point (PEP) - Think of this as a gateway. Its protecting all the resources and all requests are routed to this point to make a decision. It takes the incoming HTTP request and creates an authorization specific request.
* Policy Decision Point (PDP) - This is really the brain of the architecture. It consumes the authorization request sent from PEP, breaks it down, and evaluates all the attributes: Who is accessing? What attributes do they have? What are they requesting? With all this data in hand, it can consult various sources like a database or a 3rd party system like Okta or LDAP to make a decision.

Using this, let's see how Leia's request to edit Han's playlist will be evaluated:

Leia presses the "Edit Playlist" Button → Request is routed to PEP → PEP constructs an authorization request → PEP requests edit:playlist, edit:description scopes along with some identifying information like user id → PDP uses this information to lookup policy, user info, and returns allow or deny.

While this is a simple example, from it we can extrapolate more complex requests and apply the same architecture for an entire system. For APIs, the PEP is usually the API Gateway. This gateway can then rely on an internal policy engine or potentially using information from a 3rd party identity provider to act as the PDP.

ABAC is a powerful and flexible approach for API authorization that requires an early investment but scales efficiently as your requirements and use cases increase. As a general rule of thumb to decide if ABAC is better than RBAC, estimate how granular your authorization must be. Starting with RBAC for a limited set of roles and actions is a safe choice but as the number of roles and permissions increase, ABAC becomes a better choice. ABAC is also great at establishing governance policies and implementing legal/data protection compliance requirements.

The OAuth 2.0 framework is specifically designed for ABAC that works for many use cases, especially for APIs. When you combine it with tools like JWTs and OpenID Connect, you have a token which represents an authenticated user, additional context information such as their profile, and the scopes to which they have authorization. The OAuth 2.0 extensions allow you to implement RBAC + ABAC and scale as your API and use cases grow.
