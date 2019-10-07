---
libraryName: Okta Sign-In Page
---

## Okta Sign-In Page Quickstart

The Okta Sign-In Page provides the easiest, most secure way to allow users to authenticate into your application.  The Sign-In Page is hosted by Okta for your Okta org, and is the fastest way to get authentication working in your application. If you need more customization you can host the Sign-In experience within your own application by using the Okta Sign-In Widget (see tab above).

<center><img src="/img/okta-sign-in-page.png" alt="OktaSign-InPage"/></center>

### Using The Sign-In Page

When your application needs to authenticate the user, it will need to redirect the user to the Sign-In Page by making an Authorization Code request to an authorization server in your Okta org. Once the user completes the login form, they will be redirected back to your server with an Authorization Code that can be used to get more information about the user. We have created server-side libraries that do most of this work for you with just a few lines of configuration. Please select your server technology below to get instructions for your server.

To learn more about how this flow works under the hood, please see our [Authentication Guide](/docs/guides/implement-auth-code/).

## Prerequisites

### Add an OpenID Connect Client
* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Web** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting             | Value                                               |
| ------------------- | --------------------------------------------------- |
| Application Name    | My Web App                                          |
| Base URIs           | http://localhost:{port}                             |
| Login redirect URIs | http://localhost:{port}/authorization-code/callback |
| Grant Types Allowed | Authorization Code                                  |

After you have created the application there are three more values you will need to gather:

| Setting       | Where to Find                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------                                                      |
| Client ID     | In the applications list, or on the "General" tab of a specific application.                                                        |
| Client Secret | On the "General" tab of a specific application.                                                                                     |
| Org URL       | <span class="is-signed-in">`https://${yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |

To integrate this flow into your application, select your server technology below.
