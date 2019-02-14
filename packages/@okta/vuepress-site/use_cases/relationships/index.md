---
title: Relationships with Linked Objects
excerpt: Create users with relationships.
---
# Relationships with Linked Objects

Users have relationships to each other, like manager and subordinate or customer and sales representative. You can create users with relationships by using the [Linked Objects API](/docs/api/resources/linked-objects).

## Linked Objects and Users

Okta allows you to create up to 200 linked object definitions. These definitions are one-to-many:

* A manager has many subordinates
* A sales representative has many customers
* A case worker has many clients

Of course, most organizations have more than one manager or sales representative. You can create the linked object definition once, then assign the `primary` relationship to as many users as you have people in that relationship. 

You can assign the `associated` relationship for a single `primary` user to as many users as needed. The `associated` user can be related to only one `primary` per linked object definition. But a user can be assigned to more than one linked object definition.

For example, assume that you've created one linked object definition for manager (`primary`) and subordinates (`associated`):

* Joe is Frank's manager.
* Bob is Joe's manager, but Jane's subordinate.
* Jane is the CEO, so she reports to herself.

Thus you can create chains of relationships (Jane > Bob > Joe > Frank), or terminal relationships (Jane is both `primary` and `associated` user).

Then, if you created another linked object relationship for scrum team membership, you could assign relationships to the same four users:

* Bob is the scrummaster for the Identity Scrum Team
* Joe and Frank are both contributors to the team.

Bob can be the `primary` for a Manager:Subordinate, an `associated` user for that same linked object definition, and also the `primary` for the Scrummaster:Contributor linked object definition.

To represent a relationship, create a linked object definition that specifies a `primary` (parent) relationship and an `associated` (child), and then assign each side of that link type to the appropriate user.

To get started, visit  [Linked Objects API](/docs/api/resources/linked-objects).
