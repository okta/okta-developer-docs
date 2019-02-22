---
title: Hierarchical - Authorization
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/authz/">&larr; Authorization</a></div>

## Hierarchical {#authz-hierarchical}

Hierarchical authorization is exactly what it sounds like — authorization determined based on the hierarchy. As you might imagine, within this structure permissions are determined by an entity's place in the hierarchy.

One good example of this is organizational hierarchy. Imagine Wookie Inc. is a social music streaming service specifically for hip hop listeners. Beyond music streaming, it also has its own publishing business that discovers new artists and manages them.

It has the following divisions: Marketing, Talent Management, Engineering, and Services. All of these main divisions have the following sub-divisions:

* Marketing has product, corporate, and partner marketing
* Talent Management has recruiting, contracts, and communications
* Engineering has infrastructure, QA, devops, and core engineering
* Services has support, customer success, and professional services.

In this hierarchical authorization model, the leader of the infrastructure engineering sub-division, should have access and view into everything in that infrastructure org but not necessarily the other sub-orgs like QA/devops and vice versa. Similarly, if we go a level above, the CTO leading the engineering org should have access to that entire org which includes all the sub orgs only in Engineering. Rinse and repeat.

Although it sounds simple, modelling authorization with a hierarchy is not an efficient model unless your app is really simple with barely any authorization decisions to make. Making authorization decisions in this model require expensive recursive database lookups. The most common queries – such as "is this employee in this group?" – require exploring a significant portion of the organization structure and the problem only gets worse as the organization grows.

Essentially, hierarchy is just an organizational chart, not a workable authorization model. It's important to think of hierarchical authorization that way because it's rarely a scalable or complete solution. Every system needs to understand the different roles that can use that system and everything that they are allowed to do within that system.
