---
title: SAML-enable your Python application
language: Python
icon: code-python
excerpt: >-
  Guidance on how to SAML-enable your Python application using open source
  PySAML2.
---

> **Note:** We encourage the use of OpenID Connect for authentication rather than SAML. While [both SAML and OpenID Connect](https://www.okta.com/identity-101/whats-the-difference-between-oauth-openid-connect-and-saml/) are industry standards for federated authentication, they have different strengths and weaknesses. OpenID Connect is built on the [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) protocol and uses an additional JSON Web Token (JWT), called an ID token, to standardize areas that OAuth 2.0 leaves up to choice, such as scopes and endpoint discovery. It is specifically focused on user authentication and is widely used to enable users to sign in to consumer websites and mobile apps. [SAML](/docs/concepts/saml/) is independent of OAuth. Rather than a JWT, SAML relies on an exchange of authentication and authorization data (in XML SAML format) between Identity Providers and Service Providers to verify the user's identity and permissions, then grants or denies their access to services. It is more commonly used to help enterprise users sign in to multiple applications using a single sign in.

This guide describes how to use [PySAML2](https://github.com/rohe/pysaml2) to add support
for Okta (via SAML) to applications written in Python. Please note that while the example in this guide uses
[Flask](http://flask.pocoo.org/), the concepts presented here are general enough to use in other Python frameworks.

This guide describes how to install and configure an example
application that demonstrates how to use PySAML2 in a Flask application.
After you have Okta working with the example application,
adapt the example code for your production environment.

>Note: The library is not Okta's and is not supported by Okta.

This guide assumes that you are familiar with the basics of Python
software development: using the command line, editing text files,
using [virtualenv](https://virtualenv.pypa.io/en/latest/), and using
[pip](https://en.wikipedia.org/wiki/Pip_%28package_manager%29).

If you're already familiar with Okta, you can skip to the
section titled "Configuring PySAML2 to work with Okta."


## Configuring Okta to work with PySAML2

Before you can configure your application and PySAML2 set up an
Okta chiclet (application icon) that enables an Okta user to sign in to your to your application with SAML and PySAML2.

To set up Okta to connect to your application, follow the
[Build a Single Sign-On Integration](/docs/guides/build-sso-integration/saml2/overview/)
guide. As noted in the [Create your integration](/docs/guides/build-sso-integration/saml2/create-your-app/) instructions, there are two steps to change:

* *In step \#9*: Use ***PySAML2 Example*** instead of ***Example SAML application*** .
* *In step \#10*: When entering the URL

  ```bash
  http://example.com/saml/sso/example-okta-com
  ```

  use the following:

  ```bash
  http://localhost:5000/saml/sso/example-okta-com
  ```

  **Note:** "5000" is the port that Flask uses by default, if you are using a different port number, change "5000" to the port number you are using.


## Configuring PySAML2 to work with Okta

Now that you have configured the PySAML2 Example "chiclet" in your Okta organization, you
are ready to configure PySAML2 to work with your Okta organization. In this
section we use the "Identity Provider metadata" link from the
section above to configure PySAML2. After completing
the following steps, you will have a working example of connecting Okta to a sample Python application using PySAML2.

1.  Install platform-dependent prerequisites:

    > **Note:** These instructions assume that you are running on a recent version of your operating system.

    For Mac OS X:

    ```bash
    brew install libffi libxmlsec1
    ```

    For RHEL:

    ```bash
    sudo yum install libffi-devel xmlsec1 xmlsec1-openssl
    ```

2.  Download the example application for Python:

    ```bash
    $ git clone git@github.com:jpf/okta-pysaml2-example.git
    ```

3.  `cd` to the `okta-pysaml2-example` directory.

    ```bash
    $ cd okta-pysaml2-example
    ```

4.  Open the `app.py` file in your favorite text editor.

    ```bash
    $ $EDITOR app.py
    ```

5.  After opening the `app.py` file, modify the contents of the `metadata_url_for` dictionary as shown below.

    ``` python
    metadata_url_for = {
        'example-okta-com': '${metadata_url}'
    }
    ```

6.  Be sure to replace the contents of `${metdata_url}` with the link
    that you copied in step \#10 of the
    "[Setting up a SAML application in Okta](/docs/guides/customize-authz-server/)"
    instructions that you followed above!

    Note: The contents of `${metadata_url}` should look similar to: `https://${yourOktaDomain}/app/a0b1c2deFGHIJKLMNOPQ/sso/saml/metadata`

7.  Install the dependencies; for example, Python SAML SP:

    ```bash
    $ virtualenv venv
    $ source venv/bin/activate
    $ pip install -r requirements.txt
    ```

8.  Start the Python example:

    ```bash
    $ python app.py
    ```

## Test the SAML integration

Now that you have set up an application in your Okta organization and have
configured PySAML2 to work with your Okta organization, it is ready to test.

There are two ways to test a SAML application:

1. Starting from the example Python application ("SP initiated").
2. Starting from Okta ("IdP initiated").

You will use both methods to test your application. In each case, you will know iff the
test worked when you see a screen that looks like the one below:

![Authenticated user](/img/pysaml2-authenticated-user.png "Authenticated user")


1.  Login from the Okta PySAML2 example application (This is
    known as an **SP-initiated login**.)

    -   Start the example application from the command line:

    	```bash
    	$ source venv/bin/activate
	$ python app.py
	```

    -   Open the example application in your browser:
        `http://localhost:5000/`

    -   Click on the link for your Okta IdP.


2.  Login from Okta (This is known as an **IdP-initiated" login**.)

    -   Start the example application from the command line:

    	```bash
    	$ source venv/bin/activate
	$ python app.py
	```

    -   Sign in to your Okta organization.

    -   Click the button for the application you created earlier
        "Configuring Okta to work with PySAML2" section
above:![PySAML2 Example](/img/pysaml2-example-okta-chiclet.png "PySAML2 Example")

If you can to get to the "Logged in" page using both of the
methods above, the test are successful.

Congratulations on getting Okta working with PySAML2!

## Next Steps

At this point, you should be familiar with setting up a SAML enabled application
to work with an Okta organization and how to configure PySAML2 to work with Okta.

After you have your Okta organization working with the example Python
application, the next step is to take the example code and move
it to your production application. The specifics of how this works is
different depending on how your application is set
up. Pay special attention to the notes in the `app.py` file. For
example, on a production system, the contents of the
`metadata_url_for` dictionary cannot be hard coded, but must come
from a dynamic datastore.

If you want to learn more about SAML and what to consider when writing a SAML implementation, Okta's
in-depth [SAML guidance](https://www.okta.com/integrate/documentation/saml/)
is a great place to learn more.

Finally, if you got this far in this guide and still have questions,
please reach out to me at: joel.franusic@okta.com.
