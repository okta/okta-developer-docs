---
title: Sign users in to your web app using the redirect model
excerpt: Configure your Okta org and your web app to use Okta's redirect sign-in flow.
language: PHP
integration: back-end
icon: code-php
layout: Guides
meta:
  - name: robots
    content: noindex, nofollow
---

> **Info**: This topic was archived on February 9 2024 and is no longer updated. PHP is no longer a supported language at Okta.

Add a user sign-in flow to a server-side web application with Okta's [redirect model](/docs/concepts/redirect-vs-embedded/#redirect-authentication).

---

**Learning outcomes**

* Implement a simple redirect to an Okta-hosted sign-in page
* Configure a server-side web application to use Okta
* Test that users can sign in and sign out
* Define which parts of an application require authentication and which don't

**What you need**

* An [Okta Developer Edition org](/signup/)
* A recent version of [PHP](https://www.php.net/) and [composer](https://getcomposer.org/) installed.

**Sample code**

[Quickstart sample app](https://github.com/okta-samples/okta-php-app-quickstart)

---

## Overview

The easiest and most secure way to add a user sign-in flow to your server-side web application is to use an Okta-hosted Sign-In Widget. When a user attempts to sign in, the application redirects them to the widget hosted on an Okta web page. After they've signed in successfully, Okta redirects them back to the application. This is known as the [redirect authentication deployment model](/docs/concepts/redirect-vs-embedded/#redirect-authentication).

> **Note**: To use the redirect model in a _single-page application (SPA)_, see [Sign users in to your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/). To use the redirect model in a _mobile app_, see [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/).

Use this quickstart to learn how to perform these tasks:

1. [Create an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console).
1. [Create and configure a new web application to use Okta](#create-and-configure-a-new-web-application-to-use-okta).
1. [Test that a user can sign in and sign out](#test-that-a-user-can-sign-in-and-sign-out).
1. [Configure different levels of access for specific areas of the site](#configure-different-levels-of-access-for-specific-areas-of-the-site).

> **Tip**: You need your Okta org domain to follow this tutorial. It looks like `dev-123456.okta.com` or `trial-123456.okta.com`. See [Find your Okta domain](/docs/guides/find-your-domain/). Where you see `${yourOktaDomain}` in this guide, replace it with your Okta domain.

## Create an app integration in the Admin Console

An **app integration** represents your application in your Okta org. Use it to configure how your application connects with Okta services.

Follow these steps to create an app integration for your application:

1. Open the Admin Console for your org.
   1. [Sign in to your Okta organization](/login) with your administrator account.
   [[style="list-style-type:lower-alpha"]]
   1. Click **Admin** in the upper-right corner of the page.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type**, then click **Next**.

   > **Note:** You can break the sign-in or sign-out flows for your application if you choose the wrong application type.

1. Enter an **App integration name**. For example, **My first web application**.
1. Enter the callback URLs for the local development of your application.
   1. Enter `http://localhost:8080/authorization-code/callback` for **Sign-in redirect URIs**.
   [[style="list-style-type:lower-alpha"]]
   1. Enter `http://localhost:8080` for **Sign-out redirect URIs**.

   > **Note:** The values suggested here are those used in the sample app.

1. Select **Allow everyone in your organization to access** for **Controlled access**.
1. Click **Save** to create the app integration.

The configuration page for the new app integration appears. Keep this page open.

> **Note:** For a complete guide to all the options not explained in this guide, see [Create OIDC app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-oidc).

### Note your client ID and client secret

Make a note of two values that you use to configure your web application. Both are in the configuration pane for the app integration that you've created:

* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Client Secret**: Found on the **General** tab in the **Client Credentials** section.

Moving on, where you see `${clientId}` and `${clientSecret}` in this guide, replace them with your client ID and client secret.

## Create and configure a new web application to use Okta

Now that you have created the app integration and noted the configuration settings noted, you:

* [Create a web application](#create-a-web-application).
* [Add the required packages to your application](#add-the-required-packages-to-your-application)
* [Configure your application to use Okta](#configure-your-application-to-use-okta)
* [Add the pages and logic for a user to sign in and sign out](#add-the-pages-and-logic-for-a-user-to-sign-in-and-sign-out)

### Create a web application

1. Create a directory called `public` to put your project files in.
1. Create an empty file inside it called `index.php`.

   ```bash
   mkdir quickstart
   cd quickstart
   mkdir public
   touch public/index.php
   ```

### Add the required packages to your application

Install the `phpdotenv` library to manage the config file for this project:

```bash
composer require vlucas/phpdotenv
```

### Configure your application to use Okta

Earlier you [noted the client ID and client secret](#note-your-client-id-and-client-secret) values generated for your app integration. Add these and your Okta domain to your application's configuration.

1. Create an `.env` file in the root of your project. Add the following, replacing the placeholders with your own values.

   ```properties
   OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/default
   OKTA_OAUTH2_CLIENT_ID=${clientId}
   OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
   OKTA_OAUTH2_REDIRECT_URI=http://localhost:8080/authorization-code/callback
   ```

1. Set up a basic router and load those values in `index.php`:

   ```php
   <?php
   require_once(__DIR__.'/../vendor/autoload.php');

   $dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
   $dotenv->load();

   session_start();

   $path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
   switch($path) {
     // TODO: define routes here
      default:
         echo 'not found';
         die();
   }
   ```

### Add the pages and logic for a user to sign in and sign out

There are two ways that a user can start the sign-in process:

* Clicking a sign-in link or button
* Trying to access a protected page, such as their profile page.

In both cases, the application redirects the browser to the Okta-hosted sign-in page. See [Redirect to the sign-in page](#redirect-to-the-sign-in-page).

After the user signs in, Okta redirects the browser to the sign-in redirect URI you entered earlier. Similarly, after a user signs out, Okta redirects the browser to the sign-out redirect URI. Both sign-in and sign-out redirect URIs are called **callback routes**. Users don't see callback routes, and they aren't the user's final destination. However, your application does need to implement them. See [Define a callback route](#define-a-callback-route).

After the user signs in, Okta returns some of their profile information to your app. The default profile items (called **claims**) returned by Okta include the user's email address, name, and preferred username. These are sent in an [ID token](/docs/reference/api/oidc/#id-token-payload) as part of the redirect to the sign-in redirect URL. See [Get the user's information](#get-the-users-information).

#### Redirect to the sign-in page

Create a link for the user to start the sign-in process and be redirected to Okta.

1. Open **public** > **index.php**.
1. Add `index()` to display a sign-in link if there isn't an ID token in the session:

   ```php
   function index() {
       if(empty($_SESSION['okta_id_token'])) {
           ?>
           <a href="/signin">Sign In</a>
           <?php
       } else {
           ?>
           Hello, <?= htmlspecialchars($_SESSION['name']) ?>
           <?php
       }
   }
   ```

1. Replace the `TODO: define routes here` placeholder with the following route handler for `/`:

   ```php
   switch($path) {
       case '/':
           index();
           break;
      default:
         echo 'not found';
         die();
   }
   ```

   Note that the handler calls `index()` to check if it should display the sign-in link.

1. Add code to handle the `Sign In` click.
   1. Add a route handler for `/signin` to the switch statement in the previous step:
   [[style="list-style-type:lower-alpha"]]

      ```php
      ...
      case '/signin':
          start_oauth_flow();
          break;
      ...
      ```

   1. Add the code for `start_oauth_flow()` to the end of `index.php`. This starts the [OAuth Authorization Code with PKCE flow](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce) and redirects the user to Okta:

      ```php
      function start_oauth_flow() {
          // Generate a random state parameter for CSRF security
          $_SESSION['oauth_state'] = bin2hex(random_bytes(10));

          // Create the PKCE code verifier and code challenge
          $_SESSION['oauth_code_verifier'] = bin2hex(random_bytes(50));
          $hash = hash('sha256', $_SESSION['oauth_code_verifier'], true);
          $code_challenge = rtrim(strtr(base64_encode($hash), '+/', '-_'), '=');

          // Build the authorization URL by starting with the authorization endpoint
          $authorization_endpoint = $_ENV['OKTA_OAUTH2_ISSUER'].'/v1/authorize';
          $authorize_url = $authorization_endpoint.'?'.http_build_query([
              'response_type' => 'code',
              'client_id' => $_ENV['OKTA_OAUTH2_CLIENT_ID'],
              'state' => $_SESSION['oauth_state'],
              'redirect_uri' => $_ENV['OKTA_OAUTH2_REDIRECT_URI'],
              'code_challenge' => $code_challenge,
              'code_challenge_method' => 'S256',
              'scope' => 'openid profile email',
          ]);

          header('Location: '.$authorize_url);
      }
      ```

> **Note:** To customize the Okta sign-in form, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

#### Define a callback route

When you [created an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console), you set the sign-in redirect URL to `http://localhost:8080/authorization-code/callback` and the sign-out redirect URL to `http://localhost:8080`. In this sample, only the sign-in callback requires additional code.

1. Add a route handler for the sign-in callback URI to the switch statement:

   ```php
   ...
   case '/authorization-code/callback':
       authorization_code_callback_handler();
       break;
   ...
   ```

1. Define the handler function `authorization_code_callback_handler()` at the end of the file. This reads the authorization code in the query string and then exchanges it for an access token and optional refresh token and ID token.

   ```php
   function authorization_code_callback_handler() {

     if(empty($_GET['state']) || $_GET['state'] != $_SESSION['oauth_state']) {
       throw new Exception("state does not match");
     }

     if(!empty($_GET['error'])) {
       throw new Exception("authorization server returned an error: ".$_GET['error']);
     }

     if(empty($_GET['code'])) {
       throw new Exception("this is unexpected,
         the authorization server redirected without a code or an error");
     }

     // Exchange the authorization code for an access token by making a request to the token endpoint
     $token_endpoint = $_ENV['OKTA_OAUTH2_ISSUER'].'/v1/token';

     $ch = curl_init($token_endpoint);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
       'grant_type' => 'authorization_code',
       'code' => $_GET['code'],
       'code_verifier' => $_SESSION['oauth_code_verifier'],
       'redirect_uri' => $_ENV['OKTA_OAUTH2_REDIRECT_URI'],
       'client_id' => $_ENV['OKTA_OAUTH2_CLIENT_ID'],
       'client_secret' => $_ENV['OKTA_OAUTH2_CLIENT_SECRET'],
     ]));
     $response = json_decode(curl_exec($ch), true);

     if(isset($response['error'])) {
       throw new Exception("token endpoint returned an error: ".$response['error']);
     }

     if(!isset($response['access_token'])) {
       throw new Exception("token endpoint did not return an error or an access token");
     }

     // Save the tokens in the session
     $_SESSION['okta_access_token'] = $response['access_token'];

     if(isset($response['refresh_token']))
       $_SESSION['okta_refresh_token'] = $response['refresh_token'];

     if(isset($response['id_token']))
       $_SESSION['okta_id_token'] = $response['id_token'];

     header('Location: /');
   }
   ```

#### Get the user's information

Since you requested the scopes `openid profile email`, Okta also returns an ID token along with the access token. You can parse out the claims in the ID token to find the user's profile information.

For example, after the user is signed in, you can extract the user's name from the ID token and show it in the app. Change `index()` to:

   ```php
   function index() {
       if(empty($_SESSION['okta_id_token'])) {
           ?>
               <a href="/signin">Sign In</a>
           <?php
       } else {
           $claims = json_decode(base64_decode(explode('.', $_SESSION['okta_id_token'])[1]), true);
           $_SESSION['name'] = $claims['name'];

           ?>
               Hello, <?= htmlspecialchars($_SESSION['name']) ?>
           <?php
       }
   }
   ```

> **Note**: Because your app received the ID token in exchange for the authorization code, it's OK to skip the normal checks needed for an ID token that your app received in a redirect.

> **Note:** The claims that you see may differ depending on the scopes requested by your app. See [Configure your application to use Okta](#configure-your-application-to-use-okta) and [Scopes](/docs/reference/api/oidc/#scopes).

## Test that a user can sign in and sign out

Your site now has enough content to sign a user in with Okta, prove they've signed in, and sign them out. Test it by starting your server and signing a user in.

1. Start your app with the built-in PHP server:

   ```bash
   php -S 127.0.0.1:8080 -t public
   ```

1. Open a browser and go to `http://localhost:8080`.
1. Click **Sign In**. The browser redirects you to Okta to sign in using the Sign-In Widget.
1. After you've signed in, check that your user's name appears.

> **Note**: If you're signed in as an administrator in the same browser already, it displays your name. You can open an incognito window and create a test user in the Admin Console to use.

### Troubleshooting

When troubleshooting errors in `authorization_code_callback_handler()`, use `var_dump()` to echo the response to a token request to the page. For example:

```php
if(isset($response['error'])) {
    var_dump($response);
    throw new Exception("token endpoint returned an error: ".$response['error']);
}

if(!isset($response['access_token'])) {
    var_dump($response);
    throw new Exception("token endpoint didn't return an error or an access token");
}
```

Use the [/token](/docs/reference/api/oidc/#token) reference docs to understand the issue. If the response is `NULL`, echo the response from the curl call to the page:

```php
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'grant_type' => 'authorization_code',
    'code' => $_GET['code'],
    'code_verifier' => $_SESSION['oauth_code_verifier'],
    'redirect_uri' => $_ENV['OKTA_OAUTH2_REDIRECT_URI'],
    'client_id' => $_ENV['OKTA_OAUTH2_CLIENT_ID'],
    'client_secret' => $_ENV['OKTA_OAUTH2_CLIENT_SECRET'],
]));
$data = curl_exec($ch);
var_dump($data);
echo $token_endpoint."\n";
echo curl_error($ch)."\n";
$response = json_decode($data, true);
```

## Configure different levels of access for specific areas of the site

Your application can require authentication for the entire site or just for specific routes. Routes that don't require authentication are accessible without signing in, which is also called anonymous access.

### Require authentication for everything

Some apps require user authentication for all routes, for example a company intranet.

The framework that you're using determines how to implement this. For example, with the minimal `switch` statement router, check for the ID token in the session before the router and show the sign-in link if it's missing:

```php
if(empty($_SESSION['okta_id_token'])) {
  ?>
    <a href="/signin">Sign In</a>
  <?php
  die();
}

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($path) {
```


### Require authentication for a specific route

Your website may have a protected portion that is only available to authenticated users.

1. Move the code that checks for the ID token in the session into a new function, `require_signin()`:

   ```php
   function require_signin() {
     if(empty($_SESSION['okta_id_token'])) {
       ?>
         <a href="/signin">Sign In</a>
       <?php
       die();
     }
   }
   ```

1. Call the `require_signin()` function from any specific route that you want protected. For example, call it from `index()` to protect the home page:

   ```php
   function index() {
     require_signin();
     ...
   }
   ```

### Allow anonymous access

Your website may enable anonymous access for some content but require a user to sign in for other content or to take some other action. For example, an ecommerce site might allow a user to browse anonymously and add items to a cart, but require a user to sign in for checkout and payment.

Any routes that you don't explicitly protect have anonymous access.

## Next steps

* [Protect your API endpoints](/docs/guides/protect-your-api/).
* [Custom domain and email address](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/).
* [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/)
* [Multi-tenant solutions](/docs/concepts/multi-tenancy/)
* [PHP Sample Applications for Okta](https://github.com/okta/samples-php)

Okta Developer Blog:

* [Build a Simple Laravel App with Authentication](https://developer.okta.com/blog/2019/09/05/laravel-authentication)
* [Build Simple Login in PHP](https://developer.okta.com/blog/2018/12/28/simple-login-php)

