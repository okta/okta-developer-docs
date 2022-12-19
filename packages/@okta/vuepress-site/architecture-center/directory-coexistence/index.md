---
layout: Landing
title: Directory Coexistence
---

# Directory Coexistence

Directory coexistence architectures provide solutions for problems around user, group, and device data migration. Often the issues are around switching to Okta over time, or consolidating multiple disparate identity sources (online and on-premises) into one. Whatever the case here, Okta has you covered.

## Background

Okta is a secure cloud-based identity management service that can be used as the single identity store of user and group data for your organization. You can aggregate users from multiple sources, and expose them to applications through a number of protocols.

The migration of users, groups, and device data to Okta Universal Directory can be done over a period of time, or immediately if needed, using Okta directory integrations to interface Okta with your current identity providers.  During the migration, your current identity directories and Okta Universal Directory may coexist. Until you are ready to only use Okta for authentication, your users can sign into Okta and Okta delegates authentication to your current identity provider. Signing in to Okta allows your users to access applications registered with your Okta Organization.

## Prerequisites

If you're new to this reference architecture, or Okta reference architectures in general, make sure you've got the following prerequisites in place. If you've already got the prerequisites in place, move on to our [Use cases](#use-cases).

1. Before you begin this tutorial, the following software must be installed:
   * [Docker](https://docs.docker.com/get-docker/)
   * [Okta CLI](https://cli.okta.com/)
   * [Git](https://git-scm.com/downloads)
   * [ngrok](https://ngrok.com/download)

   > **Note**: Before running  the `git`, `okta`, `docker`, and `ngrok` commands, consider adding the directory path to their executables to your `PATH` environment variable. 

2. You also need a free Okta developer account for purposes of the tutorial exercises. If you don’t already have one, you can create one by visiting [https://developer.okta.com/signup/](https://developer.okta.com/signup/) or by using the Okta CLI as follows:

   1. Open your Terminal/command prompt.
   1. Run `okta register`, and enter your First name, Last name, Email address, and Country.
   1. An activation email is sent to the email address that you enter. Select Activate in your account activation email.
   1. In the resulting screen, create a password for your Okta account. Once your password is entered, your Okta domain (Okta Org URL) is returned, similar to the following. Make note of it.
      ```
      New Okta Account created!
      Your Okta Domain: https://dev-133337.okta.com
      ```

3. Make sure that Docker is running.

<blockquote>
<p><strong>Note</strong>: There are two naming conventions used in this document. Using <code>https://dev-133337.okta.com</code> as an example:</p>
<p>Okta Org = <code>https://dev-133337.okta.com</code><br>
Okta Org name = <code>dev-133337</code></p>
</blockquote>

## Use cases

Directory coexistence provides the ability to solve the following types of problems:

* My organization is switching to Okta but we need to migrate over time.
* My organization has multiple applications and services, each with their own identity provider, for whom we want to consolidate the sources of identity into one.
* My organization recently merged with/acquired another company and we are tasked with merging multiple disparate identity stores into a single identity provider.

The below sections outline basic architectural patterns that can solve the problems described above. Subsequent pages of this resource show how to implement those patterns. Each example progressively adds new concepts.

### Migrate from Active Directory to Okta

The [Migrate from Azure Active Directory to Okta](/architecture-center/ad-to-okta/) tutorial example illustrates how to migrate from a cloud-based identity and access management service to Okta. This example describes how to integrate your current identity system with Okta, using Azure Active Directory as an example. It also explains Just-In-Time (JIT) user identity authentication to migrate users from Azure Active Directory to Okta Universal Directory. When a user logs into their application, the user credentials are checked against the Azure Active Directory. If the user exists in Azure Active Directory, but not in Okta, then the user is mirrored in Okta. If the user already exists in both Azure and Okta, and the information in Azure has been updated, then the user's information in Okta is updated from Azure. The example then shows how to use an application that uses OpenID Connect (OIDC) to redirect to Okta for authentication.

<div class="full">

![Active directory to Okta migration with SAML JIT architecture](/img/ra/directory-coexistence/ad-to-okta.png)

</div>

### Migrate from LDAP to Okta

The [Migrate from LDAP directory to Okta](/architecture-center/ldap-to-okta/) example includes a sample web application that first authenticates directly with an on-premise OpenLDAP Directory Server. The example then goes through the steps to add an Okta LDAP Agent and Okta LDAP Interface to mirror users from the on-premise LDAP directory server into the cloud-based Okta Universal Directory so they can access other applications using delegated authentication with the LDAP directory server. For additional information on configuring the Okta LDAP Agent and Okta LDAP Interface, see [LDAP integration](https://help.okta.com/oie/en-us/Content/Topics/Directory/ldap-agent-main.htm).

<div class="full">

![LDAP to Okta migration with Okta LDAP agent architecture](/img/ra/directory-coexistence/ldap-to-okta.png)

</div>

The example also shows you how to replace the Okta LDAP Interface with OpenID Connect authentication. OpenID Connect makes your application more secure. OpenID Connect removes the handling of user credentials from your application all together and provides additional benefits, such as Single Sign On (SSO). For additional information on OpenID Connect, see [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/). 

### Migrate from on-prem data to Okta

The [Migrate from generic database to Okta](/architecture-center/db-to-okta/) on-premise example has a sample application that uses a generic database to authenticate. In this situation, a typical archiecture would use a CSV file, Okta SCIM (System for Cross-domain Identity Management) connector, and Okta Provisioning Agent, as shown below.

<div class="full">

![database to Okta migration with on-prem provisioning agent architecture](/img/ra/directory-coexistence/db-to-okta.png)

</div>

Our example simplifies this somewhat. User account information is exported from a database to Okta using a script that queries the database for user information. The Okta API is then used to import the users into Okta. The example shows how to update the sample application so it supports OpenID Connect. The OpenID Connect application is configured so users sign in to Okta instead of the generic database. Signing in to Okta allows your users to access applications registered with your Okta Organization, in addition to obtaining other benefits such as Single Sign On (SSO).  The example also shows how to implement an Okta Password Import Inline Hook to handle cases where the password hash in the database is not one of the hashes that Okta user import supports or where a database does not allow export of hashed passwords.