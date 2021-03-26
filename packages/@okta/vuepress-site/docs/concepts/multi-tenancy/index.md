---
title: Multi-tenant solutions
---

<div class="multi-tenancy">

# Multi-tenant solutions

<div class="title-subtext">
What is multi-tenancy? Does my company need it? If so, how should it
be configured to meet my company’s needs?
</div>

## Acme Bank example

<section class="acme-bank-container">
<div class="acme-bank-text">
Acme Bank is a fictitious banking company which had come to Okta to
centralize and improve their existing identity management infrastructure.
To meet the needs and demands of their employees, customers, and partners,
they built their solution with a multi-tenant configuration. Acme Bank is
used through this guide to explain details and key concepts around
multi-tenancy.
</div>
<div class="acme-bank-image">

![Acme Bank Logo](/img/multi-tenancy/acme-bank-logo.png "The logo of Acme Bank")

</div>
</section>

## What is a tenant?
A tenant is a single instance of software and supporting infrastructure that
supports a group of users. These groups can represent any entity that
interfaces with the organization such as its employees, customers or partners.
This entity can be an individual user (B2C) or another company (B2B) with its
own set of users.

### A tenant within Identity Access Management
A tenant can also be considered as an isolated island of data that is separate
and private from other tenants. In the context of identity management, each
tenant has its own security policies, user registration settings, user groups,
roles and rules that determine application access. An illustration of these
different types of data are shown below:

<div class="image-at-70">

![What is a tenant?](/img/multi-tenancy/what-is-a-tenant.png "Examples of Acme Bank's tenants")

</div>

## Why would you want more than one tenant

An organization can create a new tenant for a variety of reasons. For example
they may want to:

<div class="modern-list">

* Separate out user administration and application access for internal employees
  from outside customers.
* Store customer data in the country of origin due to regulations and data
residency requirements.
* Satisfy a unique set of requirements (e.g. distinct branding emails,
onboarding videos) for a business with their own set of users.
* Increase isolation, performance, and scalability for an organization with a large
user base.

</div>

## Types of tenants

Tenants can comprise of one or more of the following entities:

<div class="modern-numbered-list">

* Individual customers
* A business entity
* Employees
* Contractors
* External partners

</div>

Examples of organizations and their tenants are shown below:

<div class="image-at-100">

![Types of tenants](/img/multi-tenancy/tenant-types.png "Examples of three Okta customers and their tenants.")

</div>

### Acme Bank's tenants

Acme Bank has defined their tenants as:

<div class="image-at-70">

![Acme Bank tenant examples](/img/multi-tenancy/acme-bank-tenant-examples.png
 "Acme Bank tenant examples")

</div>

## How to configure multi-tenancy in Okta

### Before we begin

This guide assumes a basic knowledge of the Okta entity model and uses Okta
terminology such as “org” and “Universal Directory” in describing key
concepts and configurations. For more information on these entities and how
they relate to each another, see the following resources:

<div class="modern-list">

* [What is an Okta org?](/docs/concepts/okta-organizations/)
* [Overview of the Okta data model](/docs/concepts/okta-data-model/)
* [Terminology section in this guide](#relevant-terminology)

</div>

### Overview

Okta has a highly adaptable and configurable solution for customers looking to
implement multi-tenancy. Depending on the solution, a tenant can take the form
of an org container, user groups within an org, or a customer defined entity
separate from the Okta platform. What form the tenant takes within Okta’s
platform is ultimately decided by the customer. Okta offers four main
configurations for multi-tenancy.  They are:

<div class="modern-list">

* [Configuration 1: Host tenants in a single org using Universal Directory (UD)](#configuration-1)
* [Configuration 2: Host tenants in separate orgs (e.g. Hub and Spoke](#configuration-2)
* [Configuration 3: Mixed. Host tenants in both single and separate orgs](#configuration-3)
* [Configuration 4: Host tenants in a single org NOT using UD](#configuration-4)

</div>

## Configuration 1

<div class="heading-2-subtext">Host tenants in a single org using Universal
Directory (UD)</div>

### Summary

This configuration hosts all tenants in a single org. Customers have two
ways to do this:

<div class="modern-list">

* Roll your own custom solution
* Use the [okta-dac](https://docs.idp.rocks/) project

</div>

<div class="padded-line"></div>

Since a tenant doesn't exist as a separate entity within the org, both methods
require abstracting tenants through use of the org’s users and user groups.

### When to choose this configuration

Okta customers should choose this configuration when:

<div class="modern-numbered-list">

* Cost is the driver
* Their users use a single version of all applications
* User self registration is same for all users in all tenants
* All tenants will have a relatively small number of password policies (>1000)
* None of their customers and users have data residency requirements
* All branding communications and onboarding experiences are same for all
  users
* It is acceptable to support unique usernames for each tenant by storing them
  in the Okta platform with custom naming conventions (e.g. app-1-johndoe,
  app-2-johndoe).

</div>

### How tenants are built

In this configuration there is one org for all tenants. For example, Acme Bank
configures one org for all their individual customers, business customers, and
partners. Regardless of how this configuration is implemented, tenants are
typically created using groups. A group or collection of groups represent the
users in a tenant. Groups are assigned to applications which give application
access to all users within that group.  

Acme Bank offers products, website portals, and other wealth management apps
to their customers and partners.  Below is a diagram laying out
how these products, users, and groups would be organized within the Okta org.

<div class="image-at-100">

![Single org example](/img/multi-tenancy/single-org-overview-example.png
 "Conceptual model of how an org is organized with a single org configuration")

</div>

#### User types

A recommended strategy is to create user types that allow a hierarchy of users
with increasing permissions. As shown in the above diagram, three types of
users are defined:

<div class="modern-list">

* [User](#user)
* [Admin User](#admin-user)
* [Super User (Admin of Admins)](#super-user)

</div>

#### User

These people are users of the tenant.  They can be individual customers in a
customers tenant, customers of a fintech company, or employees of the Okta
customer. Users have the ability to access products and applications assigned to
them. Depending on the setup they can also manage their own profile settings
including updating passwords and enrolling in multi-factor authentication
(MFA).

#### Admin user

Admin users manage users of a tenant.  Their responsibilities include:

<div class="modern-list">

* Adding and updating users within the tenant
* Assigning admin roles to other users
* Configuring identity providers
* Verifying email domains

</div>

#### Super user

These users can create new tenants and tenant admins. They are used by
the Okta customer to manage tenants in their org.

### The okta-dac project

The okta-dac project is one such implementation of this configuration. This
project enables multi-tenancy in a single org and is maintained by Okta team
members and supported by the developer community. This project (aka Okta
Multi-Tenant Admin) supports the following functionality:

<div class="modern-list">

* Multi-tenancy in a single org
* Users can be admins of their own tenants
* Tenant admins can self configure their own Identity Providers for their tenants
* Tenant admins can manage their own user base

</div>

This guide will briefly summarize the Okta Multi-Tenant Admin. For more
detailed information on okta-dac as it relates to architecture,
setup, and deployment, see the project’s main
[site](https://docs.idp.rocks/).

#### Application Architecture

okta-dac consists of the following components:

<div class="modern-numbered-list">

* [Okta org](#okta-org)
* [Tenants API](#tenants-api)
* [Delegated Admin Console (aka DAC)](#delegated-admin-console)
* [End user dashboard](#end-user-dashboard)
* [Admin console](#admin-console)

</div>

#### Okta org

Container object that stores applications and a tenant’s users and groups.

#### Tenants API

API used by Delegated Admin Console (DAC) and End user dashboard.  The
Tenants API wraps the
[Okta API](https://developer.okta.com/docs/reference/api-overview/)
used to manage the Okta org’s data.

#### Delegated Admin Console

A tool (aka DAC) to manage users of a tenant.  The tool is split into two UIs which
include:

<div class="modern-list">

* **Super Admin UI:**  Used to create new tenants and their first admin user.
Used by super admin users.
* **Tenant Admin UI:** Used to manage users of a specific tenant.  Used by
the Admin user of a tenant.

</div>

#### End user dashboard

A dashboard used by a users to access applications and products.

#### Admin console

A [console](/docs/guides/quickstart/cli/using-console/)
used to manage user authentication settings and application access.
Although users and groups can be managed via this UI, when using
okta-dac it is not recommended due to the project's specific
naming conventions and unique organizational constraints.

The diagram below illustrates how these components work together:

<div class="image-at-50">

![Okta project Framework](/img/multi-tenancy/dac-framework.png
 "Architectural framework showing how the okta-project is organized.")

</div>

#### Customizations

The DAC, End User Dashboard, and Admin Console are default UI’s provided by
Okta. Since these tools use Tenant and Okta APIs to manage the Okta org,
Okta customers can plug in their own custom UIs.

#### From logical to physical

The Delegated Admin Console and End User Dashboard use the Tenant API to
convert the org's inherently more flattened layout into abstract concepts
such as tenants and products. Concepts such as products and tenants become
applications, groups, and users (people) under the physical structure of
the org.  Following the previous examples, this conversion would look
like the following:

<div class="image-at-60">

![Conceptual to physical](/img/multi-tenancy/tenant-to-org-translate.png
 "Illustrates how the conceptual model is translated to the actual org model")

</div>

<div class="padded-line"></div>

> **Note:** okta-dac is not an official Okta product and does not
qualify for any support. It's recommended to work with your preferred Okta
Solution Provider to integrate this code within your existing portal.

#### More information

For more information about okta-dac visit
[here](https://docs.idp.rocks/).

## Configuration 2

<div class="heading-2-subtext">Host tenants in separate orgs (e.g. Hub and Spoke)</div>

### Summary

This configuration separates tenants into separate containers (aka orgs).
The most popular architecture for this configuration is known as Hub and Spoke.

### When to use this configuration

Reasons why organizations choose this configuration include:

* **Data residency requirements:** The data in tenants can more easily be
isolated when placed into separate orgs.  This isolation becomes relevant
when user data is required to reside only in the user’s country (e.g.
government regulations).
* **Strong delegated admin support:**  Although there is delegated admin
support in [okta-dac](#the-okta-dac-project), the amount of supported delegated
responsibilities is limited.  Splitting customers and partners into separate
orgs offer the maximum level of delegated responsibility support.
* **Out-of-the-box duplicate name support:** This configuration offers
native support for duplicate usernames, since duplicate usernames can exist
in different orgs.
* **Branding emails:**  Branding emails, onboarding videos, and other
communications are set at the org level. As a result, this configuration
supports unique forms of communications per tenant.  
* **Performance:**  For large enterprise customers, there are performance
advantages to spreading tenant user authentications into multiple orgs.
* **Analytics:** Reading analytics and tracking user adoption for each
tenant is exponentially easier when tenants are separated into orgs.
* **Unique DNSs:** Customers in each tenant may want to customize their
DNS and "post sign-in" redirect page. In this case, a tenant per org natively
supports this functionality.

### Implementations

The Okta supported design for a multi-org, multi-tenant configuration is
the Hub and Spoke setup.

### Hub and spoke physical layout

The two main components of the hub and spoke layout are:

* **Spoke:**  Org containing users, user groups, and applications specific to
 that tenant. Spokes are responsible for lifecycle management and
 authentication of its users.

* **Hub:** Org containing shared users, user groups, and applications.  Spokes
access shared applications and platform services through the hub. Hubs provide
shared directory services, authentication, sign-in policies, and authorization
services to spokes in a centralized way. In addition, hubs can route users
to different spokes for authentication access to other spoke’s specific
applications.

#### Connecting the spokes to the hubs

Using the Org2Org connector, spokes can add users and give access to shared
applications and services through the hub.

#### Diagram

A diagram illustrating the hub and spoke configuration is shown below:

<div class="image-at-90">

![Multi-org layout](/img/multi-tenancy/multi-org-configuration-layout.png
 "Diagram showing how the layout of the hub and spoke model")

</div>

#### More information

To discover more about the hub and spoke architecture visit the following links:

<div class="modern-list">

* [Different Ways To Architect Multitenancy in Okta](https://www.okta-from-the-field.com/post/different-ways-to-architect-multitenancy-in-okta)
* [Okta for Global, Distributed Organizations](https://www.okta.com/resources/whitepaper/okta-for-global-distributed-organizations/)
* [An Identity Framework for Higher Education Systems](https://www.okta.com/resources/whitepaper/an-identity-framework-for-higher-education-systems/)

</div>

## Configuration 3

<div class="heading-2-subtext">Hybrid - host tenants in both single and separate orgs</div>

### Summary

Okta supports a hybrid configuration that mixes the setups described in both the
first and second configurations. How this configuration is setup will vary from
customer to customer. One example of this hybrid configuration lays out orgs
in a hub and spoke pattern like configuration 2.  A spoke on this configuration
can comprise of single or multiple tenants.  See the diagram below for an
illustrated example of this setup:

<div class="image-at-90">

![Hybrid configuration](/img/multi-tenancy/hybrid-configuration.png
 "Diagram illustrating the configuration of a hybrid configuration")

</div>

### When to use this option

Depending on the requirements, business customers may require the data
isolation, customizations, and other features provided by a single org.
Other customers may not have these demands and can be placed on a shared
org with other customers.  This hybrid configuration supports both these
types of customers.

## Configuration 4

<div class="heading-2-subtext">Host tenants in a single org NOT using UD</div>

### Summary

In this configuration, the customer assumes responsibility for managing
users, groups, and application access outside of the Okta org. Okta’s User
Directory (UD) is not used to store the tenants’ users and groups.  See below
for an illustrated example of this
configuration.

<div class="image-at-80">

![Hybrid configuration](/img/multi-tenancy/custom-centric-configuration.png
 "Diagram showing a full custom implementation")

</div>

## Reference

### Additional resources

Additional multi-tenant resources are below:

<div class="modern-list">

* [The Secret Features of Okta Access Gateway: Part 1: Multi-data Center and Multi-Tenancy](https://www.okta.com/blog/2020/02/the-secret-features-of-okta-access-gateway-part-1-multi-data-center-and-multi-tenancy-1/)

</div>

### Relevant terminology

#### Org

The Okta idenity solution is centered around an org. An org is a private container
of data that holds all the resources necessary to manage user authentication.
It is comprised of three main objects:

<div class="modern-list">

* Applications
* Groups
* People (Users)

</div>

<div class="padded-line"></div>

The Okta org is also a place that stores lists of available Identity Providers
(IdPs), factors (for MFAs), password policies, and other security related
features.

The diagram below illustrates a simplified view of the Okta org.

<div class="image-at-70">

![Okta org](/img/multi-tenancy/okta-org.png "Diagram of the okta org")

</div>

</div>
