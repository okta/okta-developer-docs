---
title: Understanding SCIM
layout: docs_page
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: System for Cross-domain Identity Management. Understand the the value of provisioning accounts with SCIM and how to set them up in Okta.
---

## SCIM: Provisioning with Okta's Lifecycle Management

Developers at software vendors (ISVs), Okta customers, and IT system-integrators (SI) want to facilitate fast, enterprise-wide deployment of their app by integrating with Okta for user provisioning primarily via the SCIM standard.

This article describes:

* The provisioning actions and use cases that your integration should consider supporting.
* The technical options for how to build the integration (focusing on SCIM).
* The process for building, submitting for Okta Review, and publishing in the OIN (if you want the app available for all Okta customers).

## Understanding Provisioning Use Cases

### The Value of Provisioning

With the proliferation of cloud apps, today’s IT organizations are faced with the prospect of managing user accounts in an ever-expanding number of administrator consoles for each app. This is not a problem if an enterprise has one or two cloud apps, but as the number grows, the situation quickly becomes unmanageable. Cloud app vendors hoping to sell into enterprises need to have an answer to this concern.

Thousands of Okta customers have chosen our Lifecycle Management product as the platform solution to address this challenge of managing the lifecycle of user accounts in their cloud apps, and a key feature of this product is integrations for automated provisioning to those apps. Lifecycle Management (Provisioning) automates many of the traditionally manual tasks required to on-board and off-board employees. New employees are automatically provisioned with user accounts in their apps, profile updates like department changes populate automatically, and inactive employees are automatically deactivated from their apps. By making these actions less time-consuming and error-prone, companies can cut costs, allow new employees to be immediately productive, and reduce the threat of data leakage.

### Provisioning Actions

Provisioning consists of a set of actions between Okta and the cloud app. These actions are building blocks that combine to solve end-to-end use cases. As the developer, you'll need to define the use cases that your target customer wants and the corresponding actions to build into your integration.

The set of actions that an integration can do under the Provisioning umbrella are easily described with the acronym CRUD: the common database operations of Create, Read, Update, and Delete. CRUD actions relate to Provisioning in the following ways:

#### Create Users

Create new users in the downstream application based on values derived from the Okta user profile and Okta group assignment.

#### Read (Import) Users and Groups

Import users & groups from the downstream application in order to match them to existing Okta users, or to create new Okta users from the imported application.

#### Update Users

For an application user that is affiliated with an Okta user, update the downstream user's attributes when the Okta user is updated. Or, update the Okta user attributes if the application functions as the [master](#profile-mastering-users) for the full Okta user profile or specific attributes.

#### Deprovision (Deactivate) Users

Deprovisioning the application user removes access to the downstream application. This can take many forms, such as user disabled, user access permissions changed, or user license pulled. Each application may choose different methods for deactivating a user's access.

For audit purposes, Okta users are never deleted; they are deactivated instead. Because of this, Okta doesn't make delete requests to the user APIs in downstream applications.

#### Sync Password

Okta sets the user's password to either match the Okta password or to be a randomly generated password. Learn more about the overall use case in [Using Sync Password: Active Directory Environments](https://help.okta.com/en/prod/Content/Topics/Security/Security_Using_Sync_Password.htm).

#### Profile Mastering Users

Mastering is a more sophisticated version of read (import) Users. Mastering defines the flow and maintenance of user-object attributes and their lifecycle state. When a profile is mastered from a given resource (application or directory), the Okta user profile's attributes and lifecycle state are derived exclusively from that resource. In other words, an Okta user mastered by Active Directory (or HR system) has an Okta profile.

However, the profile isn't editable in Okta by the user or Okta admin, and derives its information exclusively from Active Directory. If the lifecycle state of the user in Active Directory moves to Disabled, the linked Okta user also switches to the corresponding lifecycle state of Deactivated on the next the read (import).

### Provisioning Use Cases

Provisioning actions can be combined to solve for end-to-end use cases.

#### Directory-as-Master (Downstream Provisioning)

<!-- Images for v2: https://oktawiki.atlassian.net/wiki/pages/viewpage.action?pageId=181895852 -->

In many enterprises, Active Directory (or LDAP) is the system of record for employee identities.
Okta has developed a powerful, lightweight agent to sync with Active Directory to populate employee and group information.
Within Okta, IT admins can leverage features such as [Universal Directory](https://help.okta.com/en/prod/Content/Topics/Directory/About_Universal_Directory.htm) and [group membership rules](https://help.okta.com/en/prod/Content/Topics/Directory/About_Universal_Directory.htm) to map that information when provisioning accounts and permissions in downstream apps.

Subsequently, any updates to an employee's profile, such as a change in department, in either Active Directory or Okta flow into the downstream app. Similarly, removing or deactivating an employee from Active Directory triggers deactivation in the downstream app as well.

Okta supports these common Provisioning use cases:

* Provision downstream apps automatically when new employee joins the company
* Update downstream app automatically when employee profile attributes change
* Remove employee access to downstream app automatically on termination or leave
* Link existing downstream app users with Okta users using one-time app import

#### App-as-Master

While most apps fit the category of a downstream app in the directory-as-master use case, some apps can be the master. This is the App-as-Master use case.

The app-as-master use case typically applies to apps that can be used as the system of record for all employee profile information. An HR app like Workday or Successfactors Employee Central is the most common example. In this scenario, the HR app, not Active Directory, feeds employee profile details downstream into directories like AD and Okta, and apps like Box.

>**Note:** Integrations for the "App-as-Master" use case are significantly more complex than the Directory-as-Master use case and take more time to build and support. This is because these integrations sync a larger number of attributes and lifecycle states, and more directly impact the Okta user profile and downstream apps.

#### Advanced App-as-Master Use Cases

There are several advanced App-as-Master use cases that aren't currently supported by the SCIM-Based Provisioning option, but may be added in the future. Until then, consider out-of-band processes that work around these use cases.

* Attribute-level mastering: The app wants to be the master for some employee attributes like phone number, while letting Okta or another app master other attributes. We call this attribute-level mastering.

* Pre-hire interval: In an HR-as-Master use case, there is sometimes a desire to import the new employee into Okta from the HR app a few days prior to the hire/start date. This gives IT time to set up the employee's apps in advance. A pre-hire interval configuration would specify how many days before the employee's hire date Okta should import the employee.

* Real-time sync/termination: In an HR-as-Master use case, a change in employee status within the HR system may need to be immediately reflected in Okta. Involuntary terminations is one scenario where an employee's access to sensitive apps and content via Okta needs to be cut off within minutes.

* Incremental/delta import: Importing a large number of user profiles from an app into Okta can take minutes, even hours. This can become a major performance and timing issue if frequent updates are needed. Currently, the SCIM-Based Provisioning option doesn't support the ability to import only those user profiles that have changed since the last import. In the future, we may support this via filtering on `meta.lastModified`. ([More information](#filtering-on-metalastmodified))

## Ways to Build Provisioning

Now that you understand the most common provisioning actions and use cases, let's review your options to support provisioning as an app developer. While we outline a few different methods below, Okta recommends all ISVs support [the SCIM standard](http://www.simplecloud.info/).

### Provisioning Options Matrix

Okta has seen broad adoption of the standard in the market amongst our network of app developers over the course of 2016. Okta has doubled down on our investment in our SCIM client and launched our own SCIM provisioning developer program.

| Standard | Recommendation  |  Summary |
|:--|:--|:--|
| SCIM  | **Recommended**  | Supports all of the use cases above.  |
| SAML JIT (Just-in-Time)  | Not Recommended - Limited Functionality  | Just-in-Time Provisioning (JIT) is part of the SAML spec. Supports user/group Create and Update (upon user sign-on) but does not support Deactivate, Read, or Sync Password  |
| Okta API  | Not Recommended - Not Verified by Okta  | Poll Okta API for user & group CRUD operations. Polling Okta API is resource intensive, so provisioning won't be real-time. Poor administrator experience: cannot centralize within Okta  |

### Provisioning to On-Premise Apps

The options above are geared towards cloud apps but we have a solution for on-premise applications as well. See [the product documentation](https://support.okta.com/help/Documentation/Knowledge_Article/46749316-On-Premises-Provisioning-Deployment-Guide) for details about Okta's agent-based provisioning solution.

### SCIM Facade

Sometimes it isn't feasible for the cloud app to natively support a SCIM Server API. An alternative option is to build and host a SCIM facade middleware that translates between the Okta SCIM Client and the cloud app's proprietary API. The Okta integration would be to this SCIM facade.

>**Need help?** Post a question on the [Developer Forum][devforum] or email us at <developers@okta.com>.

## SCIM-Based Provisioning Integration

### Overview

By implementing support for the SCIM standard, an application in the Okta Integration Network can be notified when a user is created, updated, or removed from their application in Okta.

If you haven't heard of SCIM before, here is a good summary from the [Wikipedia article on SCIM](https://en.wikipedia.org/wiki/System_for_Cross-domain_Identity_Management):

"System for Cross-domain Identity Management (SCIM) is an open standard for automating the exchange of user identity information between identity domains, or IT systems."

### Understanding User Provisioning in Okta

Okta is a universal directory that stores identity-related information.  Users can be created in Okta directly
as local users or imported from external systems like Active Directory or a [Human Resource Management Software](https://en.wikipedia.org/wiki/Category:Human_resource_management_software) system.

An Okta user schema contains many different user attributes, but always contains a user name, first name, last name, and email address. This schema can be extended.

Okta user attributes can be mapped from a source into Okta and can be mapped from Okta to a target.

Below are the main operations in Okta's SCIM user provisioning lifecycle:

1. Create a user account.
2. Read a list of accounts, with support for searching for a preexisting account.
3. Update an account (user profile changes, entitlement changes, etc).
4. Deactivate an account.

In Okta, an application instance is a connector that provides Single Sign-On and provisioning functionality with the target application.

### Required SCIM Server Capabilities

Okta supports provisioning to both SCIM 1.1 and SCIM 2.0 APIs.

If you haven't implemented SCIM, Okta recommends that you implement SCIM 2.0.

Okta implements SCIM 2.0 as described in RFCs [7642](https://tools.ietf.org/html/rfc7642), [7643](https://tools.ietf.org/html/rfc7643), [7644](https://tools.ietf.org/html/rfc7644).

If you are writing a SCIM implementation for the first time, an important part of the planning process is determining which of Okta's provisioning features your SCIM API can or should support and which features you do not need to support.

Specifically, you do not need to implement the SCIM 2.0 specification fully to work with Okta. At a minimum, Okta requires that your SCIM 2.0 API implement the features described below:

#### Base URL

The API endpoint for your SCIM API **MUST** be secured via [TLS](https://tools.ietf.org/html/rfc5246) (`https://`), Okta *does not* connect to unsecured API endpoints.

You can choose any Base URL for your API endpoint. If you are implementing a brand new SCIM API, we suggest using `/scim/v2`
as your Base URL; for example: `https://example.com/scim/v2` - however, you must support the URL structure described in the
["SCIM Endpoints and HTTP Methods" section of RFC7644](https://tools.ietf.org/html/rfc7644#section-3.2).

If you have multiple Okta orgs, you can use the same SCIM server for all of them. Implement a subdomain for the SCIM server and each subdomain, for example: `https://subdomain.example.com/scim/v2`, where `subdomain` represent one Okta org. Let's say you have three Okta orgs: company-a.okta.com, company-b.okta.com and company-c.okta.com.

From each org you can pass a base URL containing the name of the org: `https://company-a.example.com/scim/v2`, `https://company-b.example.com/scim/v2` or  `https://company-c.example.com/scim/v2`.

In your SCIM server, you can read which subdomain the request is coming from and identify the org.

#### Authentication

Your SCIM API **MUST** be secured against anonymous access. At the moment, Okta supports authentication against SCIM APIs with one of the following methods:

1. [OAuth 2.0 Authorization Code Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.1)
2. [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
3. Custom HTTP Header

> After a user successfully authorizes Okta using OAuth 2.0, the authorization server of your app will redirect the user back to Okta with either an authorization code or access token.
>
> Okta requires all SCIM applications to support all the following [redirect URI's](https://tools.ietf.org/html/rfc6749#section-3.1.2):
>
> * [http://system-admin.okta1.com:1802/admin/app/cpc/{appName}/oauth/callback](http://system-admin.okta1.com:1802/admin/app/cpc/{appName}/oauth/callback)
> * [https://system-admin.trexcloud.com/admin/app/cpc/{appName}/oauth/callback](https://system-admin.trexcloud.com/admin/app/cpc/{appName}/oauth/callback)
> * [https://system-admin.oktapreview.com/admin/app/cpc/{appName}/oauth/callback](https://system-admin.oktapreview.com/admin/app/cpc/{appName}/oauth/callback)
> * [https://system-admin.okta.com/admin/app/cpc/{appName}/oauth/callback](https://system-admin.okta.com/admin/app/cpc/{appName}/oauth/callback)
> * [https://system-admin.okta-emea.com/admin/app/cpc/{appName}/oauth/callback](https://system-admin.okta-emea.com/admin/app/cpc/{appName}/oauth/callback)
>
> where `{appName}` will be provided after the submission is processed.
>
> Your app MUST support all the redirect URI's listed above.

Okta doesn't support OAuth 2.0 [Resource Owner Password Credentials grant flows](https://tools.ietf.org/html/rfc6749#section-1.3.3).

#### Basic User Schema

Your service must be capable of storing the following four user attributes:

1. User ID (`userName`)
2. First Name (`name.givenName`)
3. Last Name (`name.familyName`)
4. Email (`emails`)

Note that Okta supports more than the four user attributes listed above. However, these four attributes are the base attributes that you must support.  The full user schema for SCIM 2.0 is described in [section 4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-4).

>**Best Practice:** Keep your User ID distinct from the User Email Address. Many systems use an email address as a user identifier, but this is not recommended, as email addresses often change. Using a unique User ID to identify user resources prevents future complications.

If your service supports user attributes beyond those four base attributes, add support for those additional attributes to your SCIM API. In some cases, you might need to configure Okta to map non-standard user attributes into the user profile for your application.

Included in this git repository is a sample application written in Python/Flask, this sample application implements SCIM 2.0. Below is how this sample application defines these attributes:

    userName = db.Column(db.String(250),
                         unique=True,
                         nullable=False,
                         index=True)
    familyName = db.Column(db.String(250))
    middleName = db.Column(db.String(250))
    givenName = db.Column(db.String(250))

In addition to the basic user schema user attributes described above, your SCIM API must also have a unique identifier for each user resource and should also support marking resources as "active" or "inactive."

In the SCIM specification, the `id` attribute is used to uniquely identify resources. [Section 3.1](https://tools.ietf.org/html/rfc7643#section-3.1) of [RFC 7643](https://tools.ietf.org/html/rfc7643) provides more details on the `id` attribute:

> "A unique identifier for a SCIM resource as defined by the service provider.  Each representation of the resource MUST include a non-empty "id" value.  This identifier MUST be unique across the SCIM service provider's entire set of resources.  It MUST be a stable, identifier that can't be reassigned, that is, it doesn't change when the same resource is returned in subsequent requests.  The value of the "id" attribute is always issued by the service provider and MUST NOT be specified by the client.  The string "bulkId" is a reserved keyword and MUST NOT be used within any unique identifier value.  The attribute characteristics are "caseExact" as "true", a mutability of "readOnly", and a "returned" characteristic of "always"."

Our sample application defines `id` as a UUID, since
[RFC 7643](https://tools.ietf.org/html/rfc7643) requires that "this identifier MUST be unique across the SCIM service provider's entire set of resources."

    id = db.Column(db.String(36), primary_key=True)

**Note:** Your SCIM API can use anything as an `id`, provided that the `id` uniquely identifies reach resource, as described in [section 3.1](https://tools.ietf.org/html/rfc7643#section-3.1) of [RFC 7643](https://tools.ietf.org/html/rfc7643).

Finally, your SCIM API must also support marking a resource as "active" or "inactive."

In our sample application, each user resource has a Boolean "active" attribute which is used to mark a user resource as "active" or "inactive":

    active = db.Column(db.Boolean, default=False)

## Publishing Your SCIM-Based Provisioning Integration

In order to allow customers to use your SCIM provisioning integration with Okta, you'll need to get your app published in [the Okta Integration Network](https://www.okta.com/resources/find-your-apps/).

Follow the steps below to test and submit your application for Okta review:

1. [Review Okta's SCIM Docs and Prepare Your App](#step-1-review-oktas-scim-docs-and-prepare-your-app)
2. [Test Your SCIM Server](#step-2-test-your-scim-server)
3. [Submit for Okta Review and Testing](#step-3-submit-for-okta-review-and-testing)
4. [Publish to Okta Integration Network (OIN) in Partner-Built EA](#step-4-publish-to-okta-integration-network-oin-in-partner-built-ea)
5. [Become Okta-Verified in the OIN](#step-5-become-okta-verified-in-the-oin)

> Need help? Post a question on the [Developer Forum][devforum] or email us at <developers@okta.com>.

**Note:** The OIN is for making an integration publicly discoverable and accessible to all Okta customers. However, you can also just use the integration privately within a few named orgs, called the Private App Option. This could be the case if you are a system integrator, customer, or Okta PS integrating to a custom app. If this is the case, follow steps 1-3 and you will be able to indicate in step 3 that you don't want to publish in OIN. Okta will create the submitted integration per usual and assign it to Orgs that you specify as a private app. Note that you cannot use the SCIM template app used for prototyping, as it has limitations that prevent it from being used in production.

### Step 1. Review Okta's SCIM Docs and Prepare Your App

The first step is to build a compliant SCIM server. Even if you already support SCIM, it is important that you review Okta's SCIM docs above, especially the following sections, to understand the specifics of Okta's support for the SCIM standard:

* [Understanding User Provisioning in Okta](#understanding-user-provisioning-in-okta)
* [Required SCIM Server Capabilities](#required-scim-server-capabilities)
* [SCIM Features Not Implemented by Okta](#scim-features-not-implemented-by-okta)

### Step 2. Test Your SCIM Server

#### Testing your SCIM server with Runscope

The easiest way for you to develop and verify your SCIM integration is to make use of an automated test suite that runs on Runscope.

If you are already familiar with Runscope, then import the OKTA SCIM Spec Test JSON API test (for SCIM 1.1 or SCIM 2.0) and configure the `SCIM Base URL` variable to point at the base URL for your SCIM server, for example: `https://example.com/scim/v2`.

* [Okta SCIM 2.0 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-20-SPEC-Test.json)
* [Okta SCIM 1.1 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-11-SPEC-Test.json)

If you are not familiar with Runscope, follow the detailed instructions below to get started with using Runscope to test your SCIM server.

##### Set up Runscope

If you do not have a Runscope account already, we suggest starting with [Runscope's free trial plan for Okta](https://www.runscope.com/okta). Here is how to get started:

1. Download the Okta SCIM Spec Test for your version of SCIM:
    * [Okta SCIM 2.0 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-20-SPEC-Test.json)
    * [Okta SCIM 1.1 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-11-SPEC-Test.json)
    You will use this file to import Okta's SCIM test suite into Runscope.)
2. [Sign up for Runscope](http://www.runscope.com/signup).
3. You may see a tutorial after signing up for Runscope, if so, click "Skip Tutorial".
4. You should now see a screen that says "API Tests".
5. In the lower left of your screen, click the "Import Tests" link.
6. You should now see a title that starts with "Import Tests into &#x2026;"
7. Select "Runscope API Tests" as the format to import
8. Click the "Choose File" button and select the JSON file that you saved in Step 1.
9. Click the blue "Import API Test" button.
10. After the import completes, click the "All Tests" link on the left hand side of your screen.

Now that you've imported Okta's SCIM test suite into Runscope, your next step will be to customize the test suite for the SCIM integration that you are writing.

##### Customize the imported Runscope test for your SCIM integration

After importing Okta's SCIM test suite into Runscope, you will need to configure the test for your SCIM integration. Here is how to do that:

1. You should be looking at the "API Tests" screen in Runscope, if not, click the "Tests" tab on the top of Runscope's user interface.
2. You should see a test named "Okta SCIM 2.0 Tests", if not, follow the "Set up Runscope" steps above.
3. Move your mouse over the "Okta SCIM 2.0 Tests" test, then select the "Edit" link on the lower left of the test.
4. In the "Environment" section of your test, you should see a collapsed "Test Settings" section, click the arrow on the left of "Test Settings" to expand this section.
5. "Initial Variables" should be selected, click the "Add Initial Variable" link and add the following:
    | Variable Name (Case Sensitive) | Example Values              | Notes                                                                                                                                                                                     |
    |:-------------------------------|:----------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | SCIMBaseURL                    | `https://example.com/scim/v2` | For example, if your SCIM integration is hosted on <https://example.com> and uses a prefix of /scim/v2 then the "SCIM Base URL" for your integration would be: `https://example.com/scim/v2`. |
    | auth                           | Bearer abcxyz1234567890     | Basic/Oauth authorization values                                                                                                                                                          |

6. Add the [Initial Script Spec](/standards/SCIM/SCIMFiles/Initial_Script_Spec.txt). If you are developing your SCIM integration in a local development environment, we suggest using the excellent tool [ngrok](https://ngrok.com/) to expose your local development environment to Runscope.
7. Click the "Save" button at the top of the test.

##### Running Okta's SCIM tests against your SCIM server

Now that you have updated your SCIM test in Runscope for your SCIM
server, it is time to run the test:

1. If you followed the steps above, you should now be seeing a "Run Now" button at the top of your test.
2. Click the "Run Now" button.
3. On the left side of your screen, you will see a test show up in the "Recent Test Results" section.
4. Click the top test in the "Recent Test Results" section.
5. If the test is still running, you will see live updates of the test in progress. Once the test is complete, you will see the results of your test.
6. To see the details of tests, click the little arrow next to each test to expand the details of a particular test case. Doing this will allow you to see the **Request** and **Response** for each HTTP request that was made.
7. Since this test is running in your own Runscope instance, we encourage you to update the tests to better fit your own environment.
8. See [Required SCIM Server Capabilities](#required-scim-server-capabilities) for details about your SCIM server needs to implement to pass all of the tests.
9. Keep running this test suite until all the tests pass. Here is an [example of a test suite where all tests pass](https://www.runscope.com/radar/qmovuxkrhtws/f95ac15f-3f22-46c3-8f1a-1001fbf8fb66/history/6a35fabf-5ce5-4e48-a13f-7292b1bd3cc5).

##### Sharing test results from Runscope

As you are developing your SCIM server, you will likely want to share test results with teammates or with Okta.

Here is how to share a test result from Runscope with someone else:

1. Open the test result that you want to share.
2. At the top of the test result, Change the "Private / Shareable" toggle from "Private" to "Shareable".
3. Copy the URL for the test result, it will look something like this:
    `https://www.runscope.com/radar/abcdefghijkl/m01nopq2-3456-7r8s-9012-t34567uvw890/history/123ef4gh-i567-89j0-1k2l-3m4n5o678901`
4. Share that URL with the person that you want to share the test result with. Here is an example test result from Runscope:
    <https://www.runscope.com/radar/qmovuxkrhtws/f95ac15f-3f22-46c3-8f1a-1001fbf8fb66/history/6a35fabf-5ce5-4e48-a13f-7292b1bd3cc5>

#### Testing your SCIM server with Okta

Once you have a SCIM server that passes all of the Runscope tests, test your SCIM integration directly with Okta. To do so, you will first need to sign up for [an Okta developer account](https://developer.okta.com/signup/).

Note: If you are using OAuth Authorization Code Grant flow as your authentication method or need to support the Profile Master action, Okta will need to custom-configure a template app for you. Please request this in your email to <developers@okta.com>.

1. Navigate to the administrator interface in your Okta org by clicking **Admin**.
    ![Admin Button](/img/oin/scim-end-user-ui.png "Admin Button")

2. Click **Applications**, then **Add Application**.
    ![Admin Button](/img/oin/scim-apps.png "Admin Button")

3. Search for "SCIM". You'll see three different SCIM template applications for each SCIM version (1.1 and 2.0) based off of the various authentication methods you could choose to support (Header Auth, Basic Auth, or Bearer Token).
    ![Admin Button](/img/oin/scim-templates.png "Admin Button")

Your QA team should test the use cases in this downloadable spreadsheet: [Okta SCIM Test Plan](/standards/SCIM/SCIMFiles/okta-scim-test-plan.xls).

### Step 3. Submit for Okta Review and Testing

Once you have a functioning SCIM app integration in your developer org, there are a few steps to submit it for Okta review via the OIN Manager.

Your submission provides Okta with all the metadata needed to create a customized app for publication in [the Okta Integration Network](https://www.okta.com/resources/find-your-apps/). Okta will review the submission, create the customized app, run it through our internal QA, and then make it available in your developer org for your own testing.

We recommend completing these steps before actual submission, with detailed instructions in the next section:

1. Check the Profile Attributes and the Mappings for your application.
2. Run the second set of Runscope tests: Okta SCIM 2.0 CRUD Test.
3. Prepare the customer-facing configuration guide.
4. Create a demo video showing working integration (optional)

After performing these steps, navigate to the OIN Manager at [https://oinmanager.okta.com/](https://oinmanager.okta.com/) to complete the submission form and track review status.

#### Check the Attributes for Your Application and their corresponding Mappings

Before submitting your application to Okta, you need to check the attributes that you will include in your SCIM integration and their corresponding mappings. When you add a SCIM template application in your development org, it will come bootstrapped with the default base attributes. These attributes may not all be supported by your application's user schema so it is vital that you go through the steps below to ensure that the application you're submitting to Okta for review reflects the attributes you support.

> **Note:** If you don't update your attributes and mappings before submitting your app for review to Okta, the initial review coming from Okta will always ask you to do so.

##### Deleting Attributes

> **Note:** Before you can delete an attribute, you first have to remove the mapping for that attribute. Not doing so will prevent you from deleting the attribute.

A. Removing the mapping before deleting the attribute

  1. From the Admin UI, open your SCIM template application.

  2. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
    ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

  3. Scroll down until you see the **Attribute Mappings** section. Look for the attribute that you want to delete and then click the **X** button.
    ![Attribute Mappings](/img/oin/scim_check-attributes-2.png "Attribute Mappings")

  4. You will be asked if you would like to remove the mapping for the attribute you selected, click **OK**.
    ![Remove Mapping](/img/oin/scim_check-attributes-3.png "Remove Mapping")

  5. After removing the mapping for the unwanted attributes, click **To Okta** under the settings section.
    ![Provisioning to Okta tab](/img/oin/scim_check-attributes-4.png "Provisioning Tab: Provisioning to Okta")

  Repeat the steps you followed in Step 3 and 4 until you have removed all the mappings for the attributes you want to delete.

B. Deleting attributes from your attribute list

  1. From the Admin UI, open your SCIM template application.
  
  2. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
    ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

  3. Scroll down until you see the Attribute Mappings section. Click **Go to Profile Editor**.
    ![Attribute Mappings - Profile Editor](/img/oin/scim_check-attributes-6.png "Attribute Mappings - Profile Editor")

  4. In the Profile Editor, scroll down to the attribute list.
  
  5. Look for the attribute that you want to delete and then click the **X** button.
    ![Profile Editor - Remove Attribute](/img/oin/scim_check-attributes-7.png "Profile Editor - Remove Attribute")

##### Adding Attributes

1. From the Admin UI, open your SCIM template application.

2. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
  ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

3. Scroll down until you see the Attribute Mappings section. Click **Go to Profile Editor**.
  ![Attribute Mappings - Profile Editor](/img/oin/scim_check-attributes-6.png "Attribute Mappings - Profile Editor")

4. In the Profile Editor, click **Add Attribute**.
  ![Profile Editor - Add Attribute](/img/oin/scim_check-attributes-10.png "Profile Editor - Add Attribute")
  Enter the information for the new attribute that you’re adding and then click Save.
  ![Profile Editor - Add Attribute Dialog](/img/oin/scim_check-attributes-11.png "Profile Editor - Add Attribute Dialog")
  **Note:** The Scope property determines whether the attribute you are adding can be assigned at a Group level or just per user. If you would like the ability for admins to assign a value for this attribute at a Group level, DO NOT check the User personal checkbox.

5. After adding an attribute, proceed to Mapping Attributes to add a mapping for the new attribute you just added.

##### Mapping Attributes

1. From the Admin UI, open your SCIM template application.

2. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
  ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

3. Scroll down until you see the Attribute Mappings section. Look for the attribute that you want to update and then click the **Edit** icon.
  ![Attribute Mappings - Edit Attribute](/img/oin/scim_check-attributes-13.png "Attribute Mappings - Edit Attribute")

4. On the pop-up that appears, there will be two drop-down fields. On the first drop-down, select Map from Okta Profile. On the second drop-down, choose the Okta profile attribute you would like to map the SCIM attribute from. Click Save.
  ![Attributes - Map Attribute](/img/oin/scim_check-attributes-14.png "Attributes - Map Attribute")

5. Repeat the same step for all other SCIM attributes that you would like to modify the mapping for (from Okta to app).

6. After updating the mappings from Okta to your app, click **To Okta** under the settings section.
  ![Provisioning to Okta tab](/img/oin/scim_check-attributes-4.png "Provisioning Tab: Provisioning to Okta")

7. Scroll down until you see the Attribute Mappings section. Look for the attribute that you want to update and then click the **Edit** icon.
  ![Attributes - Edit Attribute](/img/oin/scim_check-attributes-16.png "Attributes - Edit Attribute")

8. On the dialog that appears, there will be two drop-down fields. In the first drop-down menu, select **Map from SCIM 2.0 Test App Profile**. In the second drop-down menu, choose the Okta profile attribute you would like to map the SCIM attribute to. Click **Save**.
  ![Attribute Dialog - Map Attribute](/img/oin/scim_check-attributes-17.png "Attribute Dialog - Map Attribute")

9. Repeat the same step for all other SCIM attributes that you would like to modify the mapping for (from App to Okta).

##### Notes

You should only include the attributes that you support in your current user schema. To ensure that the attributes are being sent properly from and to Okta:

1. When assigning a user to the SCIM app you added in your dev org, make sure that all attributes are populated for that user. After the user is pushed to your app, check that all attributes are populated on your end.

2. If your app supports User Imports, try importing one user from your app. Check the imported user and make sure that the values for supported attributes are reflected in that imported user's account in Okta.

    1. Go to your Admin UI.
    2. Hover over **Directory** and click **People**.
    ![Admin Dashboard - Directory - People](/img/oin/scim_check-attributes-18.png "Dashboard showing Directory to People menu item")
    3. You should see the list of Okta users for your org. Find the user you just imported and click that user's name.
    4. Once the user's account is opened, click Profile. This will show you that user's attributes. Check whether the values for the attributes you support were properly imported for this user.
    ![User Profile Attributes](/img/oin/scim_check-attributes-19.png "User attributes dialog")
  The Profile Mapping template can always be updated in the future.
  As mentioned in the Adding/Deleting Attributes section, you can set whether the attribute you are adding is set per user or both per user and group. This is done via the **Scope** attribute. If you want the attribute you are adding to be strictly set per user, you would need to check the **User personal** checkbox for the Scope attribute. If you want to give admins the ability to set the attribute both per user or per group, don't check this box.
    ![Scope Attribute](/img/oin/scim_check-attributes-20.png "User Scope Attribute check box")

#### Run the Second Set of Runscope Tests: Okta SCIM 2.0 CRUD Test

This is an important test that needs to be run in order to check if the Application can handle the **CR**eate, **U**pdate and **D**eactivate (CRUD) users functionality from Okta. This allows the Application to be tested with actual Okta integration so thereby achieving end to end testing.

The test follows this pattern:

  1. Check the Application added to the Okta org (Preview org or Developer account org)
  2. Adds a new user in Okta.
  3. Assign the user to the application.
  4. Validates in the Application if the user has been created.
  5. Update the user firstName attribute in Okta.
  6. Validates in the Application if the user attribute has been updated.
  7. Deactivate the user in Okta.
  8. Validates in the Application if the user has been deactivated.
  9. Reactivate the user in Okta
  10. Re assign the Application to the user.
  11. Validates the user creation/update in Application.

If you are already familiar with Runscope, then import the [OKTA SCIM 2.0 CRUD](/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt) Test and configure the `SCIM Base URL` variable to point at the base URL for your SCIM server, for example: `https://example.com/scim/v2`.

* [Okta SCIM 2.0 CRUD Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-CRUD-Test.json)

If you are not familiar with Runscope, follow [the detailed instructions](#set-up-runscope) to get started with using Runscope to test your SCIM server.

#### Go through the Okta SCIM Test Plan and pass all applicable test cases

To ensure that your SCIM application works as intended without any issues, your QA team should go through the test cases detailed in this downloadable spreadsheet: [Okta SCIM Test Plan](/standards/SCIM/SCIMFiles/okta-scim-test-plan.xls). It is recommended that you pass all the test cases before submitting your application via the OIN Manager.

>**Note:** The test plan is categorized based on functionality. You only need to go through the test cases that apply to your application. In the spreadsheet you downloaded, filter Column C (Section) and choose the preconditions that apply to your app's use case and the provisioning features that your app supports.

#### Prepare the Customer-Facing Configuration Guide

We recommend preparing the customer-facing configuration guide before beginning to work through the submission document. This guide will be exposed externally in the administrator UI to end customers. For more details, see the [configuration guide guidelines](http://saml-doc.okta.com/Provisioning_Docs/SCIM_Configuration_Guide_Instructions.pdf).

Note: When you are ready, use [this form](https://oinmanager.okta.com/) to submit for Okta review.

### Step 4. Publish to Okta Integration Network (OIN) in Partner-Built EA

Okta recently changed the process by which an ISV can publish their integration into the Okta Integration Network (OIN). Now, before becoming Okta-verified, publish to the OIN in Partner-Built EA. Publishing in Partner-Built allows customers to easily discover your integration in the OIN and work directly with the you (the ISV) to validate and deploy your integration without Okta Interference.

>**Note:** Partner-Built EA application features have been verified and tested by Okta but may not have been deployed or used by a customer in an Okta production environment. We recommend that you fully test these integrations for your own provisioning use-cases before deploying in production for your end users.

In order for an app to be published in the Okta Integration Network in Partner-Built EA, it must meet the following criteria:

* Include an ISV configuration guide explaining:
  * The supported features
  * Step-by-step instructions for setting up the integration
* Gotchas & known issues
* Support and Contact Info
* ISV Support Contact
* ISV Escalation Contact
* Full, permanent test tenant provided to Okta
* RunScope Test Suite
* Final Full QA by Okta

Once Okta completes the QA process and the requisite changes are made (all issues are closed), Okta allows the provisioning integration to enter the Okta Integration Network in Partner-Built EA.

![User interface shows an integration in Partner-Built EA](/img/oin/scim-partner-ea.png "User interface shows an integration in Partner-Built EA")

### Step 5. Become Okta-Verified in the OIN

We require that one joint customer successfully validates the integration is working as expected from their perspective before we make it Okta-Verified in the OIN. The integration needs to be used and validated in production (not preview).

Use this process to involve joint customers in testing a newly developed SCIM integration:

1. Identify joint customers interested in piloting the integration.
2. Integration and configuration review with the joint customer. Partners are responsible for managing the customer identification and testing process. This customer must be live with this integration in production, not preview.
3. The Okta administrator for the customer who is live with the integration sends an email to <oktascimfeedback@okta.com> stating that the integration is working as expected.
4. Once the above steps are complete, Okta changes the status of the integration in OIN to Okta-Verified.

Whether Partner-Built EA or Okta-Verified, when issues arise related to the SCIM integration, the ISV acts as the first point of contact.

![User interface shows an integration in Okta Verified](/img/oin/scim-config-guide.png "User interface shows an integration in Okta Verified")

## Provisioning FAQs

### SCIM Technical Questions

**Our API is similar to SCIM, but is not 100% compliant. Can we still integrate with Okta?**

Unfortunately, your app's SCIM server API must be fully SCIM compliant in order to integrate with Okta.

Okta's SCIM client endpoints are hard coded into a template which adhere directly to [the SCIM spec](http://www.simplecloud.info/).

Not all capabilities of the SCIM spec need to be supported (see [Required SCIM Server Capabilities](#required-scim-server-capabilities) in our SCIM Technical Reference) but the core schema and features do need to be supported.

**SCIM is a new standard. How broadly is it being adopted by cloud app vendors and how confident can I be in the SCIM standard's long-term viability?**

Okta has seen significant SCIM momentum in the market amongst our network of app developers over the past year. Hot new apps like [Slack](https://api.slack.com/scim) and [Lucidchart](https://www.lucidchart.com/techblog/2016/08/04/an-implementers-overview-managing-cloud-identity-with-scim/) are supporting SCIM as well established software companies like [Huddle](https://github.com/Huddle/huddle-apis/wiki/Integrating%20with%20SCIM) and [Citrix](https://developer.citrixonline.com/implementing-scim-apis).

Okta has doubled down on our investment in our SCIM server and launched our own SCIM provisioning developer program. The SCIM standards is strong and is run by Salesforce, Google, and Sailpoint (Okta is also a contributor).

**How should I be managing authentication to my SCIM API?**

Okta recommends using the OAuth 2.0 Authorization Code Grant Flow (aka "three-legged OAuth). Okta doesn't support the Client Credentials or Resource Owner Password Credentials Authorization grant flows. The Authorization Code Grant Flow is more common in SaaS/cloud and is also more secure. In addition to OAuth, Okta also supports basic auth and header token auth options.

**I have a multi-tenant app how do I allow my customers to customize their specific tenant in Okta?**

Use the three-legged OAuth (Authorization Grant flow), so that you know exactly which token/key the customer is using. Another option is by URL. When the customer configures your app in Okta, we can prompt them to add their unique subdomain for your app  (see Zscaler app below).

Okta can use part of this url in the SCIM endpoint for that customer, for example `http://www.company.com/tenantA/scim` or `http://www.company.com/tenantB/scim`. This subdomain field can be configured with Okta after you submit your app for Okta review.

![Example SCIM endpoint with subdomain](/img/oin/scim-scalar.png "Example SCIM endpoint with subdomain")

**Why do I need to implement the type attribute for attributes such as emails/phoneNumbers/addresses?**

The SCIM User Profile allows for an array of emails. The only way to differentiate between emails is to use the `type` sub-attribute.

* When returning multi-valued attributes, service providers SHOULD canonicalize the value returned (e.g., by returning a value for the sub-attribute "type", such as "home" or "work") when appropriate (e.g., for email addresses and URLs).
* Service providers MAY return element objects with the same "value" sub-attribute more than once with a different `type` sub-attribute (e.g., the same email address may be used for work and home) but SHOULD NOT return the same (type, value) combination more than once per attribute, as this complicates processing by the client.
* When defining schema for multi-valued attributes, it is considered a good practice to provide a `type` attribute that MAY be used for the purpose of canonicalization of values. In the schema definition for an attribute, the service provider MAY define the recommended canonical values (see [RFC 7643 Section 7](https://tools.ietf.org/html/rfc7643#section-7)).

See [Section 2.4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-2.4) for more details.

**I only have one email/phone number/address in my user profile. Do I need to implement the array of emails/phone numbers/addresses?**

Yes, the you must return these fields in an array, which is specified in the SCIM spec as a multi-valued attribute: [Section 2.4](https://tools.ietf.org/html/rfc7643#section-2.4).

**Why doesn't Okta support DELETE /Users?**

Okta users are never deleted for compliance and audit purposes; they are deactivated instead. Because of this, Okta never makes an HTTP DELETE request to a user resource on your SCIM API. Instead, Okta makes an HTTP PATCH request to set the active setting to false. You'll need to support the concept of an "active" and "inactive" user in your app.

**How does data validation work with SCIM provisioning? For example, if my app requires phone number in a specific format, how do I ensure that Okta passes the attribute in that format? If a data validation error issue occurs how does error reporting work?**

The SCIM spec specifies valid data formats for a given user profile attribute, however Okta does not rigorously validate that the customer has inputted values meeting those requirements to preserve flexibility.

Therefore, data validation should be handled by your app's SCIM Server. In other words, when Okta provisions user profile to your app, it should check that the data is valid per their special requirements. Error messages sent in the response from your app will be surfaced to the Okta administrator via alerts and tasks in the Okta interface. You should also specify your data requirements in your config guide.

**How much filtering support is needed?**

The filtering capabilities in the SCIM protocol are pretty broad but the common filtering use case with Okta is quite narrow -- determine if a newly created Okta user already exists in your app based on a matching identifier . This means the eq (equals) operator is all you really need to support for now. We "might" eventually support other operators but don't right now.
Note that Okta only supports filtering via the eq operator on the SCIM userName attribute on the SCIM Server side. However, Okta can use any AppUser attribute on the Okta side for passing into the eq operator. Typically this would also be `appuser.userName`, but `appuser.email` or `appuser.randomAttribute` can also work.

### Publishing Questions

**If I submit my app with a set of attributes, and then I want to add attributes during the testing phase of the app, is this acceptable?**

Yes. Add a new app instance in your dev org to test the new attributes and email <developers@okta.com>.

**Once my app has been published, and I add additional attributes, how do I republish my app? Can I republish frequently?**

Yes, you can republish your app, but we recommend you don't do it frequently. Your app goes through Okta's QA process every time you add additional attributes.

### Dev Doc Examples

* Box - <https://developer.box.com/docs/custom-integrations>
* Slack - <https://api.slack.com/>
* OneLogin - <https://developers.onelogin.com/>
* Zendesk - <https://developer.zendesk.com/apps>
