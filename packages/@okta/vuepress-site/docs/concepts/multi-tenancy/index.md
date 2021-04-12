---
title: Multi-tenant solutions
---

<div class="multi-tenancy">

# Multi-tenant solutions

Organizations that need to manage a diverse set of user types should consider
the Okta multi-tenant solution. This doc provides an overview of the
solution, identifies reasons why organizations may want to consider it, and
lists the different multi-tenant configurations available.

## Acme Bank example

Acme Bank, a fictitious bank, is used throughout this doc to explain the
details and key concepts around multi-tenancy. The company came to Okta to
centralize and improve their existing identity management infrastructure.
To meet the needs and demands of their employees, customers, and partners,
they built their solution with a multi-tenant configuration.

## What is a tenant?
A tenant is a single instance of software and supporting infrastructure that
supports a group of users. Tenant's can represent any entity that
interfaces with the organization such as its employees, customers, or partners.
A tenant supports both a business-to-customer (B2C) and business-to-business
(B2B) model where users can be either be direct customers or another
organization's customers.

### A tenant within Identity Access Management
A tenant can also be considered as an isolated island of data that is separate
and private from other tenants. In the context of identity management, each
tenant has its own security policies, user registration settings, user groups,
roles, and rules that determine application access. An illustration of these
different types of data is shown below:

<div class="image-at-70">

![What is a tenant?](/img/multi-tenancy/what-is-a-tenant.png "Examples of Acme Bank's tenants")

</div>

## Why would you want more than one tenant

An organization can create a new tenant for a variety of reasons. For example
they may want to:

* Separate user administration and application access for internal employees
  from outside customers
* Store customer data in the country of origin due to regulations and data
residency requirements
* Satisfy a unique set of requirements (for example, distinct branding emails,
onboarding videos) for a business with their own set of users
* Increase isolation, performance, and scalability for an organization with a large
user base

## Types of tenants

Tenants can comprise one or more of the following entities:

* Individual customers
* A business entity
* Employees
* Contractors
* External partners

Examples of organizations and their tenants are shown below:

<div class="image-at-100">

![Types of tenants](/img/multi-tenancy/tenant-types.png "Examples of three Okta customers and their tenants.")

</div>

### Acme Bank's tenants

Acme Bank defined their tenants as:

<div class="image-at-70">

![Acme Bank tenant examples](/img/multi-tenancy/acme-bank-tenant-examples.png
 "Acme Bank tenant examples")

</div>

## Okta multi-tenant configuration options

### Before we begin

This doc assumes a basic knowledge of the Okta data model and uses Okta
terminology such as "org" and "Universal Directory" when describing key
concepts and configurations. For more information on these entities and how
they relate to each another, see the following resources:

* [What is an Okta org?](/docs/concepts/okta-organizations/)
* [Overview of the Okta data model](/docs/concepts/okta-data-model/)
* [Terminology section in this doc](#relevant-terminology)

### Overview

Okta has a highly adaptable and configurable solution for customers looking to
implement multi-tenancy. Depending on the solution, a tenant can take the form
of an org container, user groups within an org, or a customer-defined entity
that is separate from the Okta platform. What form the tenant takes within Okta’s
platform is ultimately decided by the customer. Okta offers four main
configurations for multi-tenancy. They are:

* [Configuration 1: Host tenants in a single org using Universal Directory (UD)](#configuration-1)
* [Configuration 2: Host tenants in separate orgs (for example, hub-and-spoke](#configuration-2)
* [Configuration 3: Mixed. Host tenants in both single and separate orgs](#configuration-3)
* [Configuration 4: Host tenants in a single org not using UD](#configuration-4)

## Configuration 1

Host tenants in a single org using Universal Directory (UD)

### Summary

This configuration hosts all tenants in a single org. Customers have two
ways to do this:

* Roll your own custom solution
* Use the [okta-dac](https://docs.idp.rocks/) project

Since a tenant doesn't exist as a separate entity within the org, both methods
require abstracting tenants through the use of the org’s users and user groups.

### When to choose this configuration

Okta customers should choose this configuration when:

* Cost is the driver.
* Their users use a single version of all applications.
* User self-registration is the same for all users in all tenants.
* All tenants have a relatively small number of password policies (>1000).
* None of their customers and users have data residency requirements.
* All branding communications and onboarding experiences are the same for all
  users.
* It's acceptable to support unique usernames for each tenant by storing them
  in the Okta platform with custom naming conventions (for example, `app-1-johndoe`,
  `app-2-johndoe`).

### How tenants are built

In this configuration there is one org for all tenants. For example, Acme Bank
configures one org for all of their individual customers, business customers, and
partners. Regardless of how this configuration is implemented, tenants are
typically created using groups. A group or collection of groups represent the
users in a tenant. Groups are assigned to applications that give application
access to all users within that group.

Acme Bank offers products, website portals, and other wealth management apps
to their customers and partners. Below is a diagram that lays out
how these products, users, and groups would be organized within the Okta org.

<div class="image-at-100">

![Single org example](/img/multi-tenancy/single-org-overview-example.png
 "Conceptual model of how an org is organized with a single org configuration")

</div>

#### User types

A recommended strategy is to create user types that allow a hierarchy of users
with increasing permissions. As shown in the above diagram, three types of
users are defined:

* [User](#user)
* [Admin User](#admin-user)
* [Super User (Admin of Admins)](#super-user)

#### User

These people are users of the tenant. They can be individual customers in a
customer's tenant, customers of a financial technology company, or employees of
the Okta customer. Users have the ability to access products and applications
assigned to them. Depending on the setup, they can also manage their own profile
settings including updating passwords and enrolling in multifactor
authentication (MFA).

#### Admin user

Admin users manage users of a tenant. Their responsibilities include:

* Adding and updating users within the tenant
* Assigning admin roles to other users
* Configuring Identity Providers
* Verifying email domains

#### Super user

These users can create new tenants and tenant admins. They are used by
the Okta customer to manage tenants in their org.

### The okta-dac project

The okta-dac project is one such implementation of this configuration. This
project enables multi-tenancy in a single org and is maintained by Okta team
members and supported by the developer community. This project (Okta
Multi-Tenant Admin) supports the following functionality:

* Multi-tenancy in a single org
* Users can be admins of their own tenants
* Tenant admins can self-configure their own Identity Providers for their tenants
* Tenant admins can manage their own user base

This doc briefly summarizes the Okta Multi-Tenant Admin. For more
detailed information on okta-dac as it relates to architecture,
setup, and deployment, see the project’s main
[site](https://docs.idp.rocks/).

#### Application architecture

okta-dac consists of the following components:

* [Okta org](#okta-org)
* [Tenants API](#tenants-api)
* [Delegated Admin Console (DAC)](#delegated-admin-console)
* [Okta End-User dashboard](#end-user-dashboard)
* [Admin Console](#admin-console)

#### Okta org

A container object that stores applications and a tenant’s users and groups

#### Tenants API

An API that is used by the Delegated Admin Console (DAC) and the Okta End-User
dashboard. The Tenants API wraps the
[Okta API](https://developer.okta.com/docs/reference/api-overview/) that is
used to manage the Okta org’s data.

#### Delegated Admin Console

A tool (DAC) that is used to manage users of a tenant. The tool is split
into two UI's that include:

* **Super Admin UI:** Used to create new tenants and their first admin user.
Used by Super Admins.
* **Tenant Admin UI:** Used to manage users of a specific tenant. Used by
the Admin user of a tenant.

#### Okta End-User Dashboard

A dashboard used to access applications and products

#### Admin console

A [console](/docs/guides/quickstart/cli/using-console/)
used to manage user authentication settings and application access.
Although you can manage users and groups through the Admin Console,
it isn't recommended when using okta-dac due to the project's specific
naming conventions and unique organizational constraints.

The diagram below illustrates how these components work together:

<div class="image-at-50">

![Okta project Framework](/img/multi-tenancy/dac-framework.png
 "Architectural framework showing how the okta-project is organized.")

</div>

#### Customizations

The DAC, Okta End-User Dashboard, and Admin Console are default UI’s provided
by Okta. Since these tools use Tenant and Okta APIs to manage the Okta org,
Okta customers can plug in their own custom UI's.

#### From logical to physical

The Delegated Admin Console and Okta End-User Dashboard use the Tenant API to
convert the org's inherently more flattened layout into abstract concepts
such as tenants and products. Concepts such as products and tenants become
applications, groups, and users (people) under the physical structure of
the org. Following the previous examples, this conversion looks
like the following:

<div class="image-at-60">

![Conceptual to physical](/img/multi-tenancy/tenant-to-org-translate.png
 "Illustrates how the conceptual model is translated to the actual org model")

</div>

> **Note:** okta-dac isn't an official Okta product and doesn't
qualify for any support. It's recommended to work with your preferred Okta
Solution Provider to integrate this code within your existing portal.

#### More information

See [okta-dac](https://docs.idp.rocks/) for more information.

## Configuration 2

Host tenants in separate orgs (for example, hub-and-spoke)

### Summary

This configuration separates tenants into separate containers (orgs).
The most popular architecture for this configuration is known as hub-and-spoke.

### When to use this configuration

Reasons why organizations choose this configuration include:

* **Data residency requirements:** The data in tenants can more easily be
isolated when placed into separate orgs. This isolation becomes relevant
when user data is required to reside only in the user’s country (for
example, government regulations).
* **Strong delegated admin support:** Although there is delegated admin
support in [okta-dac](#the-okta-dac-project), the number of delegated
responsibilities that are supported is limited. Splitting customers and
partners into separate orgs offer the maximum level of delegated
responsibility support.
* **Out-of-the-box duplicate name support:** This configuration offers
native support for duplicate usernames, since duplicate usernames can exist
in different orgs.
* **Branding emails:** Branding emails, onboarding videos, and other
communications are set at the org level. As a result, this configuration
supports unique forms of communications per tenant.
* **Performance:** For large enterprise customers, there are performance
advantages to spreading tenant user authentications into multiple orgs.
* **Analytics:** Reading analytics and tracking user adoption for each
tenant is exponentially easier when tenants are separated into orgs.
* **Unique DNSs:** Customers in each tenant may want to customize their
DNS and "post sign-in" redirect page. In this case, a tenant per org natively
supports this functionality.

### Implementations

The Okta supported design for a multi-org, multi-tenant configuration is
the hub-and-spoke setup.

### Hub-and-spoke physical layout

The two main components of the hub-and-spoke layout are:

* **Spoke:** Org that contains users, user groups, and applications specific to
 that tenant. Spokes are responsible for lifecycle management and
 the authentication of its users.

* **Hub:** Org that contains shared users, user groups, and applications. Spokes
access shared applications and platform services through the hub. Hubs provide
shared directory services, authentication, sign-in policies, and authorization
services to spokes in a centralized way. In addition, hubs can route users
to different spokes for authentication access to other spoke’s specific
applications.

#### Connecting the spokes to the hubs

Using the Org2Org connector, spokes can add users and give access to shared
applications and services through the hub.

#### Diagram

A diagram illustrating the hub-and-spoke configuration is shown below:

<div class="image-at-90">

![Multi-org layout](/img/multi-tenancy/multi-org-configuration-layout.png
 "Diagram showing how the layout of the hub-and-spoke model")

</div>

#### More information

To discover more about the hub-and-spoke architecture visit the following links:

* [Different Ways To Architect Multitenancy in Okta](https://www.okta-from-the-field.com/post/different-ways-to-architect-multitenancy-in-okta)
* [Okta for Global, Distributed Organizations](https://www.okta.com/resources/whitepaper/okta-for-global-distributed-organizations/)
* [An Identity Framework for Higher Education Systems](https://www.okta.com/resources/whitepaper/an-identity-framework-for-higher-education-systems/)

## Configuration 3

Hybrid - host tenants in both single and separate orgs

### Summary

Okta supports a hybrid configuration that mixes the setups described in both the
first and second configurations. How this configuration is set up varies from
customer to customer. One example of this hybrid configuration lays out orgs
in a hub-and-spoke pattern like configuration 2. A spoke on this configuration
can be composed of single or multiple tenants. See the diagram below for an
illustrated example of this setup:

<div class="image-at-90">

![Hybrid configuration](/img/multi-tenancy/hybrid-configuration.png
 "Diagram illustrating the configuration of a hybrid configuration")

</div>

### When to use this option

Depending on the requirements, business customers may require the data
isolation, customizations, and other features provided by a single org.
Other customers may not have these demands and can be placed on a shared
org with other customers. This hybrid configuration supports both types of
customers.

## Configuration 4

Host tenants in a single org not using Universal Directory

### Summary

In this configuration, the customer assumes responsibility for managing
users, groups, and application access outside of the Okta org. Okta’s Universal
Directory (UD) isn't used to store the tenants’ users and groups. See below
for an illustrated example of this
configuration.

<div class="image-at-80">

![Hybrid configuration](/img/multi-tenancy/custom-centric-configuration.png
 "Diagram showing a full custom implementation")

</div>

## Reference

### Additional resources

Additional multi-tenancy resources are below:

* [The Secret Features of Okta Access Gateway: Part 1: Multi-data Center and Multi-Tenancy](https://www.okta.com/blog/2020/02/the-secret-features-of-okta-access-gateway-part-1-multi-data-center-and-multi-tenancy-1/)

### Relevant terminology

#### Org

The Okta idenity solution is centered around an org. An org is a private container
of data that holds all the resources necessary to manage user authentication.
It is comprised of three main objects:

* Applications
* Groups
* People (Users)

The Okta org is also a place that stores lists of available Identity Providers
(IdPs), factors (for MFAs), password policies, and other security related
features.

The diagram below illustrates a simplified view of the Okta org.

<div class="image-at-70">

![Okta org](/img/multi-tenancy/okta-org.png "Diagram of the okta org")

</div>

</div>
