---
title: SimpleSAMLphp
language: PHP
icon: code-php
excerpt: How to use SimpleSAMLphp to add support for Okta via SAML.
layout: guides
meta:
  - name: robots
    content: noindex, nofollow
---

> **Info**: PHP is no longer a supported language at Okta, and this article is no longer updated.

This guide describes how to use [SimpleSAMLphp](https://simplesamlphp.org/) to add support for Okta (through SAML) to applications written in PHP. Note that while the example application in this guide uses plain PHP, the concepts presented here are general enough to use in other PHP frameworks.

In this guide, you install and configure an example application that demonstrates how to use SimpleSAMLphp in a simple PHP application. After you have Okta working with the example application, you need to adapt the example code to your production environment.

It's assumed that you are familiar with the basics of PHP software development as well as using the command line and editing text files.

If you're already familiar with Okta, you can skip to the section titled "Configuring SimpleSAMLphp to work with Okta."

## Configure Okta to work with SimpleSAMLphp

Before you can configure the example application and SimpleSAMLphp you need to set up an Okta application icon that an Okta user selects to sign in to your to your application using SAML through SimpleSAMLphp.

To set up Okta to connect to your application, follow the guide to [Build a Single Sign-On integration](/docs/guides/build-sso-integration/saml2/main/). As you follow the instructions to [Create your integration](/docs/guides/build-sso-integration/saml2/main/#create-your-integration), there are two steps where you do things differently:

* In step \#9: Use **SimpleSAMLphp Example** instead **Example SAML application**.
* In step \#10: Instead of entering the URL: `http://example.com/saml/sso/example-okta-com`

  Use the following URLs:

  * In the **Single sign on URL** field, use `http://localhost/simplesamlphp/www/module.php/saml/sp/saml2-acs.php/example-okta-com`
  * In the **Audience URI (SP Entity ID)** field, use `http://localhost/simplesamlphp/www/module.php/saml/sp/metadata.php/example-okta-com`
  * For the **Relay State** field, use `http://localhost/okta-simplesamlphp-example/?saml_sso=example-okta-com`

## Configure SimpleSAMLphp to work with Okta

Now that you configured the application icon for the SimpleSAMLphp Example in your Okta organization, you are ready to configure SimpleSAMLphp to work with your Okta organization. In this section we use the **Identity Provider metadata** link from the section above to configure SimpleSAMLphp. After you complete the following steps, you have a working example of connecting Okta to a sample PHP application using SimpleSAMLphp.

Start by following the [instructions for installing SimpleSAMLphp](https://simplesamlphp.org/docs/stable/simplesamlphp-install.html).

> **Note:** SimpleSAMLphp is third-party software and isn't supported by Okta.

Depending on the system where you are installing SimpleSAMLphp, your installation might require you to make some custom configuration changes. In particular, this guide assumes that you have PHP running on your local machine (`localhost`) and that you installed SimpleSAMLphp in a directory named `simplesamlphp` in the location specified by the `DocumentRoot` directive in your Apache configuration. If you are developing remotely, or have installed SimpleSAMLphp in a different location, you need to use different configuration URLs that take that into account.

### Notes for installing SimpleSAMLphp on Mac OS X

Getting SimpleSAMLphp working with the example application on Mac OS X takes some additional work, namely: installing the `mcrypt` library for PHP, reconfiguring Apache, and creating some symbolic links.

Install SimpleSAMLphp and the example application:

1. Install SimpleSAMLphp to the `~/simplesamlphp` directory.

   When you follow the directions for installing SimpleSAMLphp, install it to a directory named `simplesamlphp` in your home directory.

   ```bash
   $ cd ~
   $ mkdir simplesamlphp
   $ cd simplesamlphp
   $ git clone https://github.com/jpf/okta-simplesamlphp-example.git
   $ git clone https://github.com/simplesamlphp/simplesamlphp.git
   ```

2. Install php56 and php56-mcrypt with [homebrew](http://brew.sh/).

   ```bash
   $ brew install php56
   $ brew install php56-mcrypt
   ```

3. Edit `httpd.conf` to use the new version of PHP that you installed with homebrew.

   ```bash
   $ sudo $EDITOR /etc/apache2/httpd.conf
   ```

   Find this line:

   ```bash
   LoadModule php5_module libexec/apache2/libphp5.so
   ```

   and change it to this:

   ```bash
   LoadModule php5_module /usr/local/Cellar/php56/5.6.7/libexec/apache2/libphp5.so
   ```

4. Find the `DocumentRoot` for your setup of Apache.

   ```bash
   $ grep ^DocumentRoot /etc/apache2/httpd.conf
   ```

5. `cd` to the `DocumentRoot` directory.

   Assuming that the command above returned `DocumentRoot "/Library/WebServer/Documents"`, then `cd` to that directory

   ```bash
   $ cd /Library/WebServer/Documents
   ```

6. Add symbolic links from `DocumentRoot` to your `simplesamlphp` and `okta-simplesamlphp-example` directories.

   ```bash
   $ sudo ln -s ~/simplesamlphp/simplesamlphp .
   $ sudo ln -s ~/simplesamlphp/okta-simplesamlphp-example .
   ```

Configuring SimpleSAMLphp:

1. `cd` to the directory that you set up earlier.

    ```bash
    $ cd ~/simplesamlphp
    ```

1. Copy the modified SimpleSAMLphp configuration files from the example application to the nested `simplesamlphp` directory.

    ```bash
    $ cp okta-simplesamlphp-example/saml-autoconfig.php simplesamlphp/
    $ mkdir simplesamlphp/config
    $ cp simplesamlphp/config-templates/config.php simplesamlphp/config/
    $ cp okta-simplesamlphp-example/authsources.php simplesamlphp/config/
    $ mkdir simplesamlphp/metadata
    $ cp okta-simplesamlphp-example/saml20-idp-remote.php simplesamlphp/metadata/
    ```

1. Install the PHP dependencies for SimpleSAMLphp using [Composer](https://getcomposer.org/)

    ```bash
    $ brew install homebrew/php/composer
    $ cd ~/simplesamlphp/simplesamlphp
    $ composer install
    ```

1. Open the `config.php` configuration file for SimpleSAMLphp in your favorite text editor.

    Run this command:

    ```bash
    $ $EDITOR config/config.php
    ```

    Then, from inside of your text editor, do the folowing:

    * Search for `baseurlpath` and change the value to `'/simplesamlphp/www/'`.
    * Search for `auth.adminpassword` and change the value to a secure password.
    * Search for `secretsalt` and change the value to something random.

      There is an example command for generating a "secret salt" in the `config.php` file. If that doesn't work for you, try the one below:

      ```bash
      $ dd if=/dev/urandom bs=1 count=48 2> /dev/null | openssl base64
      ```

1. Open the the `saml-autoconfig.php` file for SimpleSAMLphp in your favorite text editor.

    Run this command:

    ```bash
    $ $EDITOR saml-autoconfig.php
    ```

    Then, using your text editor, modify the contents of the `metadata_url_for` array as shown below:

    ```php
    $metadata_url_for = array(
        'example-okta-com'=> '${metadataUrl}'
    );
    ```

    Be sure to replace the contents of `${metadataUrl}` with the link that you copied in step \#10 of the [Setting up a SAML application in Okta](/docs/guides/build-sso-integration/saml2/main/#create-your-integration) instructions that you followed above.

    > **Note:** The contents of `${metadataUrl}` should look similar to this:
    > `https://${yourOktaDomain}/app/a0b1c2deFGHIJKLMNOPQ/sso/saml/metadata`

## Test the SAML integration

Now that you have set up an application icon in your Okta organization and have configured SimpleSAMLphp to work with your Okta organization, it's ready to test. There are two ways to test a SAML application:

1. Start from the example PHP application ("SP initiated").
2. Start from Okta ("IdP initiated").

Use both methods to test your application. In each case, you know if the test worked when you see a screen that looks like the one below:

![Authenticated user](/img/archive/php/example-application-authenticated-user.png "Authenticated user")

1. Sign in from the Okta SimpleSAMLphp example application (This is known as an **SP-initiated sign-in**.)
   * Open the example application in your browser:
        `http://localhost/okta-simplesamlphp-example/`
   * Click the `example-okta-com` link.
2. Sign in from Okta (This is known as an **IdP-initiated" sign-in**.)
   * Sign in to your Okta organization.
   * Click the button for the application that you created earlier "Configuring Okta to work with SimpleSAMLphp" section above: ![SimpleSAMLphp Example](/img/archive/php/simplesamlphp-example-okta-chiclet.png "SimpleSAMLphp Example").

You know that your testing was successful if you are able to get to the "Logged in" page pictured above using both the SP-initated and IdP-initated sign-in flows.

Congratulations on getting Okta working with SimpleSAMLphp!

## Next Steps

At this point, you should be familiar with setting up a SAML-enabled application to work with an Okta organization and how to configure SimpleSAMLphp to work with Okta.

After you have your Okta organization working with the example PHP application, your next step is to take the example code and move it to your production application. The specifics of how this works is different depending on how your application is set up. Pay special attention to the notes in the `index.php` file. For example, on a production system, you can't hard code the contents of the `metadata_url_for` array. They should come from a dynamic datastore.

If you want to learn more about SAML and what to consider when writing a SAML implementation, Okta's in-depth [SAML guidance](https://www.okta.com/integrate/documentation/saml/) is a great place to learn more.
