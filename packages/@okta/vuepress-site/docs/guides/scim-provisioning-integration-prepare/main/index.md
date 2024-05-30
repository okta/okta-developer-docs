---
title: Prepare your SCIM API service
excerpt: Prepare a SCIM-compliant API server to host your SCIM service, and test it to make sure it is working correctly.
meta:
  - name: description
    content: Prepare a SCIM-compliant API server to host your SCIM service, and test it to make sure it is working correctly.
layout: Guides
---

Use this guide to prepare a SCIM-compliant (System for Cross-domain Identity Management) API server to host your SCIM service. Then, test your server to ensure that it's functional.

## Preparation

The first step in delivering your SCIM integration is preparing a SCIM-compliant API server to host your SCIM service.

Okta supports lifecycle provisioning using either version 2.0 and version 1.1 of the SCIM protocol.

If your service already supports the SCIM protocol, you should still review the [Okta SCIM reference](/docs/reference/scim/) documentation. The SCIM reference helps you to understand how Okta implements the SCIM protocol.

If you haven't yet implemented SCIM, Okta recommends that you use [version 2.0 of the SCIM protocol](/docs/reference/scim/scim-20/).

## Features

Another important part of the planning process is determining which Okta provisioning features your SCIM API can or should support. At a minimum, Okta requires that your SCIM version 2.0 API implements the following features.
<!-- no toc -->
- [API endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Basic user schema](#basic-user-schema)
- [Unique ID](#unique-id)
- [Active resources](#active-resources)

### API endpoints

The API endpoint for your SCIM API must be secured using the [Transport Layer Security](https://tools.ietf.org/html/rfc5246) protocol. Connections through this secure layer are routed by using the `https://` prefix for your URL.

Use the URL structure described in the ["SCIM Endpoints and HTTP Methods" section of RFC7644](https://tools.ietf.org/html/rfc7644#section-3.2).

### Authentication

Your SCIM API must be secured against anonymous access.

Okta supports authentication against SCIM APIs using any one of the following methods:

- OAuth 2.0 [Authorization Code grant flow](https://tools.ietf.org/html/rfc6749#section-4.1)
- [Basic authentication](https://www.w3.org/Protocols/HTTP/1.0/spec.html#BasicAA)
- A custom HTTP header

If you’re using OAuth 2.0, then after successfully authorizing Okta to use your SCIM API, your application's authorization server redirects the user back to Okta, with either an authorization code or an access token.

> **Note:**  It's up to your SCIM API authorization server (AS) to support and send a refresh token along with the access token. Okta supports refresh tokens for SCIM connections, if the SCIM API AS also supports refresh tokens.

If you’re going to publish your integration to the OIN catalog, Okta requires that all SCIM applications support the following [redirect URIs](https://tools.ietf.org/html/rfc6749#section-3.1.2):

- `https://system-admin.okta.com/admin/app/cpc/${appName}/oauth/callback`
- `https://system-admin.okta-emea.com/admin/app/cpc/${appName}/oauth/callback`
- `https://system-admin.oktapreview.com/admin/app/cpc/${appName}/oauth/callback`
- `https://system-admin.trexcloud.com/admin/app/cpc/${appName}/oauth/callback`
- `http://system-admin.okta1.com:1802/admin/app/cpc/${appName}/oauth/callback`

Where the `${appName}` is an identifier provided to you after you create your app integration instance in Okta.

Obtain the `${appName}` from the Admin Console URL when you select **Applications** > **Applications** > your app instance. The Admin Console URL has the following format:

```html
https://${orgSubDomain}-admin.${oktaEnvironment}.com/admin/app/${appName}/instance/{instanceID}/#tab-general
```

The `${appName}` is the string between `/app/` and `/instance/` in the URL.

> **Note:** If you have issues locating your `${appName}` identifier, send an email to <oin@okta.com>.

### Base URL

You can choose any base URL for your API endpoint. A base URL can't contain the underscore `_` character.

If you're implementing a new SCIM API, Okta suggests using `/scim/v2/` as your base URL. For example: `https://example.com/scim/v2/`.

If you have multiple Okta orgs using your service, you can use the same SCIM server for all of them. To do so, one way is to implement a 1:1 client to tenant subdomain for each org running on the SCIM server. For example, if you have three Okta orgs:

- company-a.okta.com
- company-b.okta.com
- company-c.okta.com

You can pass a base URL containing the name of the org:

- `https://company-a.example.com/scim/v2`
- `https://company-b.example.com/scim/v2`
- `https://company-c.example.com/scim/v2`

On your SCIM server, read which subdomain the request is coming from and route the request to the appropriate tenant for the Okta org.

### Basic user schema

Okta requires that your SCIM implementation stores the following four user attributes:

- User ID: `userName`
- First Name: `name.givenName`
- Last Name: `name.familyName`
- Email: `emails`

>**Note:** Keep your User ID value distinct from the user's email address. Many systems use an email address as a user identifier, but this isn't recommended, as email addresses often change. Using a distinct User ID to identify user resources prevents future issues.

Okta supports more than those four user attributes. However, these are the base attributes that you must support. The full schema of user attributes supported by SCIM 2.0 is described in [section 4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-4).

If your integration supports more than the four base user attributes, you can add them to your SCIM API. Sometimes, you might need to configure Okta to map non-standard user attributes to the user profile for your app.

See [Check the attributes and corresponding mappings](/docs/guides/scim-provisioning-integration-connect/main/#check-the-attributes-and-corresponding-mappings), or [Add custom attributes to an Okta user profile](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Editor_Tasks).

### Unique ID

In addition to the basic user schema attributes, your SCIM API must also specify a unique identifier for each SCIM resource, including users and groups. Okta uses this unique identifier to link the Okta profile with the SCIM resource.

[Section 3.1](https://tools.ietf.org/html/rfc7643#section-3.1) of the SCIM specification asserts that the `id` attribute is used to identify resources. The unique identifier has the following properties and behaviors:

- Assigned a value by the Service Provider (your application) for each SCIM resource
- Always issued by the Service Provider (your application) and not specified by the client (Okta)
- Must be included in every representation of the resource
- Can’t be empty
- Must be unique across the SCIM Service Provider's entire set of resources
- Can't be reassigned
- Must be a stable identifier, meaning that it doesn't change when the same resource is returned in subsequent API requests
- Must be case-sensitive and read-only
- Can't be hidden from the API request

As a best practice, generate a global unique identifier (GUID) for this value.

**Note:** You can't use the string `bulkId` within any unique identifier value. It’s a reserved keyword.

### Active resources

Okta user management requires that your SCIM API supports an `active` attribute for each user resource that can be set to `true` or `false` to denote a resource as active or inactive.

## Example implementations

There are numerous examples of how to implement SCIM servers and applications. Here are a few to get you started:

- [scimify](https://toolkit.okta.com/apps/scimify/): a PHP application for Okta that supports both SCIM 1.1 and SCIM 2.0 servers with operations for /Users, /Groups, and /ServiceProviderConfig endpoints
- [Apache Directory SCIMple](https://github.com/apache/directory-scimple): Apache's Java EE implementation of the SCIM version 2.0 specification
- [django-scim2](https://github.com/15five/django-scim2): a SCIM 2.0 Service Provider implementation (for Django)
- [go-scim](https://github.com/imulab/go-scim): building blocks for servers implementing SCIM v2

A full list of implementations, both open-source and proprietary, is available at [SCIM 2.0 Implementations](https://scim.cloud/#Implementations2).

## SCIM facade

Sometimes it isn't feasible for your cloud-based application to natively support a SCIM API. An alternative is to build and host your own SCIM facade middleware. It can translate between the Okta SCIM API connection and the cloud application's proprietary API. The Okta integration connection is then made to this SCIM facade.

## Provision to on-premises applications

This provisioning guide targets cloud-based apps. For on-premises apps, see [Provision on-premises provisioning](https://help.okta.com/okta_help.htm?id=ext_OPP_configure) for details about the Okta agent-based provisioning solution.

## Test your SCIM API

To test your SCIM integration, run an automated test suite that's built on the [BlazeMeter Runscope](https://www.runscope.com/) API monitoring tool.

### Set up Runscope

If you don't have a Runscope account, you can sign up with a [free trial to Runscope](https://www.runscope.com/okta) for Okta developers.

If you’re developing your SCIM integration in a local environment and need to expose it to Runscope for testing, use the [ngrok](https://ngrok.com/) tool. It allows you to route external address requests to your local web server.

To get started using Runscope to test your SCIM API:

1. Download the Okta SCIM specification test file that corresponds to the version of SCIM you set up on your server. Use this file to import the Okta SCIM test suite into Runscope.

    - [Okta SCIM 2.0 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-20-SPEC-Test.json)
    - [Okta SCIM 1.1 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-11-SPEC-Test.json)

1. If you're new to Runscope, your dashboard displays sample Runscope tutorials. Click **Skip Tutorial**. A page titled **API Tests** appears.
1. In the lower left of your page, click **Import Test**. A new page appears, titled **Import Tests into &#x2026;**.
1. Select **API Monitoring Tests** as the import format.
1. Click **Choose File** and select the JSON file that you saved in step 1.
1. Click **Import API Test**.
1. After the import is finished, click **All Tests** on the left of your page.

After you've imported the Okta SCIM test suite into Runscope, customize the test suite with the variables for your SCIM implementation.

## Customize the imported Runscope test for your SCIM integration

After importing the Okta SCIM test suite into Runscope, you need to configure the test settings for your SCIM integration:

1. Look at the **API Tests** window in Runscope (click the **Tests** tab at the top of the Runscope user interface). A test named **Okta SCIM X.X Spec Test** appears (where X.X corresponds to the SCIM version of the JSON file you uploaded).
1. Click **Edit** on the test panel.
1. The **Okta SCIM X.X SPEC Test** window appears. Under the **Environment** section of your test, there's a collapsed section labeled **Test Settings**. Click the small arrow to expand this section.
1. Select the **Initial Variables** tab.

   <div class="half border">

   ![Initial Variables tab](/img/oin/scim_test-init_variables.png "Showing the location of the Initial Variables tab")

   </div>

1. Click **Add Initial Variable** and add the following case-sensitive variables:

    | Variable name | Example values | Notes |
    |:-|:-|:-|
    | SCIMBaseURL | `https://example.com/scim/v2`  `https://example.com/scim/v1` | For example, if your SCIM integration is hosted on <https://example.com> and uses a prefix of /scim/v2 then the *SCIMBaseURL* value for your integration would be: `https://example.com/scim/v2`. |
    | auth | Bearer abcxyz1234567890 | OAuth 2.0 Bearer token or basic authentication code. |
    Click **Save**.

1. In a new browser window, open the [Initial Script Spec](/standards/SCIM/SCIMFiles/Initial_Script_Spec.txt) text file and copy all the text to your clipboard.
1. Back in the Runscope **Environment** panel, select the **Initial Script** tab, and then paste the text into the script console on this tab.

   <div class="three-quarter border">

   ![Initial Script tab](/img/oin/scim-test_init-script.png "Showing the location of the Initial Script tab")

   </div>

    This script sets up several randomly generated variable values that are used during the testing process:

    | Variable name | Example value | Notes |
    |:-|:-|:-|
    | InvalidUserEmail | `abcdefgh@example.com` | A specific email address considered invalid by the test. |
    | randomEmail | `Runscope300Hfluaklab151@example.com` | A valid email address. |
    | randomFamilyName | `Hfluaklab151` | A valid family name. |
    | randomGivenName | `Runscope300` | A valid first name. |
    | randomUsername | `Runscope300Hfluaklab151@example.com` | A valid username. |
    | randomUsernameCaps |  `RUNSCOPE300HFLUAKLAB151@example.com` | The random username in all caps to test case sensitivity. |
    | UserIdThatDoesNotExist | `010101001010101011001010101011` | A specific UUID considered invalid by the test. |

    A "Script ON" label appears on your **Test Settings** page. The label shows that the script is accepted and runs before the first request in the test.

1. Click **Save**.

## Run Okta SPEC tests against your SCIM server

> **Note:** Create at least one user in your SCIM server before running the Okta SCIM API test suite.

After you've customized your SCIM test in Runscope with the details of your SCIM server, you can run the test:

1. Click **Run Now** at the top of your test.

    On the left side of your page, the test appears in the **Recent Test Runs** section.

1. Click **View Progress** in the **Recent Test Runs** section.
1. While the test runs, it displays live updates of the test in progress.

    During the test phase, several more variables are created, based on results returned from your SCIM server.

    | Variable name | Example value | Notes |
    |:-|:-|:-|
    | ISVUserid | `29cb3ed0-b0da-498a-ba0c-f146f15a65d5` | The first UUID returned from a GET request to your `/Users` endpoint. |
    | idUserOne | `323da8f8-21b8-4b25-8322-90673d9e1bc7` | A UUID of a test user created on your SCIM server. |
    | randomUserEmail | `Runscope300Hfluaklab151@example.com` | An email address returned from your SCIM server. |

1. To see the details of tests, click the name of each particular test case to expand the section. The details have information on the **Request**, **Response**, and **Connection** for each HTTP request involved in the test. Each test sends a composed GET or POST request to your SCIM server. The HTTP status received in response determines the success or failure of each test.
1. After the test is completed, the main panel displays the results of your test.

Since this test is running in your own Runscope instance, you can modify the tests to better fit your own environment. Then complete the test run it again. If you need more technical details, see the [SCIM Reference](/docs/reference/scim/), or check out [Test your SCIM API](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api).

## Share test results from Runscope

As you refine your SCIM implementation, you can share API test results with your teammates or with people outside of your organization:

1. From your Runscope dashboard, open the test results that you want to share.
2. At the top of the test result, change the **Private | Shareable** toggle from **Private** to **Shareable**.
3. Copy the URL for the test result, it looks something like this:
    `https://www.runscope.com/radar/abcdefghijkl/m01nopq2-3456-7r8s-9012-t34567uvw890/history/123ef4gh-i567-89j0-1k2l-3m4n5o678901`.
    The test results can be viewed in detail, but the test can't be edited or rerun by people outside of your team.

## Next steps

Now that you have a SCIM-compliant API server on which to host your SCIM service, the next step is to [configure Okta to your SCIM API service](/docs/guides/scim-provisioning-integration-connect/).