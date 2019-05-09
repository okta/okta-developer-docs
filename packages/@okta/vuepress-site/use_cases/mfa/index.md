---
title: Multi-Factor Authentication
excerpt: >-
  Using Okta's Multi-Factor Authentication API to add MFA to an existing
  application.
redirect_from: /docs/guides/add_mfa.html
---

# Introduction

Application developers and organizations are increasingly
implementing multi-factor authentication to add an extra layer of
security to their applications.

<blockquote class="twitter-tweet" lang="en">
<p>In all my years working in this industry I&#39;ve seen exactly 2
effective security technologies stand the test of time: firewalls
and 2fa</p>&mdash; Chris Rohlf (@chrisrohlf) March 8, 2015
</blockquote>


In this guide, we'll show you how to add multi-factor authentication
to your app with Okta.

Okta gives you the flexibility to deploy our built-in
factors, or integrate with existing tokens. Native factors include
SMS, and the Okta Verify app for iOS and Android. Integrations include
Google Authenticator, RSA SecurID, Symantec VIP, and Duo Security.

Let's get started!

<iframe src="https://player.vimeo.com/video/123445568" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Prerequisites

To follow along with this guide, you will need to have your own Okta Developer Edition org and have Postman configured to make API requests to that account.

1.  Creating your Okta Developer Edition org
    If you don't already have one, create your own Okta Developer
    Edition org by visiting: <https://developer.okta.com/signup/>
    and following the instructions.
2.  Setting up the Postman API client
    After you have logged in to your account in your Okta Developer
    Edition org, follow the
    [instructions on the Okta Developer Documentation page for setting up Postman](/code/rest/).

# Overview of API calls used for multi-factor authentication

Below is an introduction to using Okta's Multi-Factor Authentication (MFA)
API to add MFA to an existing application.

In this guide, you will learn the actual HTTPS requests that are
involved in adding MFA to your
application. How use actually make these calls will depend on the
programming language and web framework that your application uses.

If you are writing code in .NET or Java, [Okta has helper libraries](/documentation/)
that will make it easy to add support for Okta to your application
in an idiomatic way.

### Setting up your Okta org for MFA

Before you can start writing code, you'll need to make do a few
things in the administrator UI to your Okta org.

1.  Enable support for MFA.
2.  [Create an API token](/docs/api/getting_started/getting_a_token).

### Enabling MFA in your Okta org

You must enable MFA from the Admin
interface of your Okta org before you can use it from the
Okta API. Here is how to enable MFA for
your Okta org:

1.  Log in to your Okta org as a user with administration.
2.  Click the "Admin" button to get into the administrator interface.
3.  Open the "Security" menu.
4.  Select "Authentication" from the menu.
5.  Click on "Multifactor".
6.  Click the "Edit" button in the "Factor Types" section.
7.  Check the check boxes next to "Google Authenticator" and "SMS
    Authentication".
8.  Click the green "Save" button.

For more information about MFA and the Okta org, see the [MFA](https://help.okta.com/en/prod/Content/Topics/Security/MFA.htm) and [Security Policies](https://help.okta.com/en/prod/Content/Topics/Security/Security_Policies.htm) help topics.

### Creating an API token for your Okta org

Requests made to the Okta API are authenticated via an API
token. [Here is how to create an API token for your Okta
org](/docs/api/getting_started/getting_a_token).

### Set up Postman

If you haven't set up Postman already, you will need to do that
now. Here are [instructions for setting up Postman to work with Okta](/code/rest/).

### Test Postman

Before you get started, you will want to make sure your Postman
setup is configured correctly, a "[Hello World](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)" of sorts. Test your
Postman setup as follows:

1.  Open Postman.
2.  Open the "Collections" section in Postman.
3.  Select the "Users (Okta API)" collection.
4.  Scroll until you see the "GET List Users" request template.
5.  Select the "GET List Users" request template.
6.  Click the blue "Send" button.

You'll know it is working if you get back JSON containing one or more user objects.

### Create a test user

The first step in adding MFA to an existing
application is to create a user account in Okta. Among other
things, creating a user account in Okta allows you to add
MFA to your application without needing to
update your user schemas.

For the purposes of this demonstration, we will be creating a
random user generated using the [Random User Generator](https://randomuser.me/) website:

1.  Generate a random user by loading <https://randomuser.me> in
    your browser.
2.  Copy the random user's data from the website to somewhere you
    can refer to later:
    -   First Name
    -   Last Name
    -   Email Address
3.  Open the **Users (Okta API)** collection in Postman.
4.  Create a user using the "POST Create User without Credentials"
    request template in Postman.
5.  Save the value of the `id` (the User ID) that is returned by Postman, you will
    be using this ID a lot. (In Okta, User ID's start with `00u`)

### Adding MFA

Now that you have created a user account in Okta, you are ready to
setup MFA for that user account. A key part of enabling MFA for a
user is actually verifying that they have a MFA token. In Okta,
this process is known as "Enrollment". Once a MFA token has been
enrolled, we can then "Verify" that they actually have this token
by asking them to answer a challenge using their token.

The process attaching a factor to a user is similar for every type
of factor that Okta supports. In the video we show how to attach a
Google Authenticator factor as well as a phone as a factor using
SMS. In this document we will only cover how to attach a Google
Authenticator factor.

At a high level, the process of attaching a factor to an account is
similar for all factors an works as follows:

1.  Add a factor to the user account.
2.  Enroll the factor.

Once the factor has been enrolled, you can verify it as needed.

### Adding a factor to a user account

Using the User ID that you created earlier, add a Google
Authenticator factor to that user as follows:

1.  Open the **Factors (Okta API)** collection in Postman.
2.  Add a new Google Authenticator Factor to your user with the
    **POST Enroll Google Authenticator Factor** request template in
    Postman. **Important**, be sure to replace the `{userId}`
    template in the request URL with the User ID for the user you
    created previously.
3.  Save the value of the `id` (the Factor ID) that is returned by
    Postman, you will be using this id in the next step.
4.  Copy the URL located in the `href` value of the `qrcode` link
    found in the `\_embedded` object located at the bottom of the
    response in Postman. Open this URL in a new tab of your
    favorite browser.

### Enroll the factor

After adding a factor to an Okta user, the next step is to have
the user setup their factor and then prove that they have done
that by answering a challenge with their token.

Continuing on from the steps above:

1.  Open Google Authenticator on your phone.
2.  Tap the **+** button in Google Authenticator.
3.  Select the **Scan barcode** option.
4.  Scan the QR Code on the browser tab you opened previously.
5.  Switch to Postman on your computer.
6.  From the **Factors (Okta API)** collection, select the **POST
    Activate TOTP Factor** request template.
7.  Replace the `{userId}` and `{factorId}` templates with the
    User ID and Factor ID values that you've copied previously.
8.  In the JSON body, replace the `passCode` value with the
    passcode shown on Google Authenticator.
9.  Click the blue **Send** button.

### Verifying the factor

Now that you've verified the factor, you are ready to start
verifying MFA tokens! Here is how to do that using Postman:

1.  Open the **Factors (Okta API)** collection in Postman.
2.  Select the **POST Verify TOTP Factor** request template.
3.  Replace the `{userId}` and `{factorId}` templates with the
    User ID and Factor ID values that you've copied previously.
4.  In the JSON body, replace the `passCode` value with the
    passcode shown on Google Authenticator.
5.  Click the blue **Send** button.
6.  A successful verification of a token will result in an HTTP
    status code of `200`, with a JSON payload containing the key
    `factorResult` with the value of `SUCCESS`.
    (Unsuccessful verification attempts will result in an HTTP
    status code of `403`, with a JSON payload containing the key `errorCode`).

## Learn more

At this point, you should understand how to use the Okta API to add
MFA to an existing application. You can learn more about using the
Okta MFA API with the following resources.

-   The [design principles for the Okta API](/docs/api/getting_started/design_principles/).
-   The API documentation for the [Okta Factors API](/docs/api/resources/factors/).
-   The API documentation for the [Okta Authentication API](/docs/api/resources/authn/).
