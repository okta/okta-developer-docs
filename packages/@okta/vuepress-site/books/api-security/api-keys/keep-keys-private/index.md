---
title: Keep Your Credentials Private - Managing API Credentials
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/api-keys/">&larr; Managing API Credentials</a></div>

## Keep Your Credentials Private {#api-keys-keep-keys-private}

No matter whether you are using an API or building your own, the advice applies to you: Never put an API secret into your code. Never ever!

The biggest problem with storing credentials in source code is that once a credential is in source code it's exposed to any developers who have access to that code, including your version control provider.

Many people use GitHub to host their source code — what happens when you push company code containing sensitive credentials? That means GitHub staff can now view your credentials; it's a security risk. If that project is later shared with contractors, partners, customers, or even made public, your secret is no longer secret. The same is true for open source projects — accidentally publishing test API tokens or other sensitive data will cause enormous problems. There are attackers who scan GitHub commits looking for sensitive data like Amazon Web Services API tokens and then use these credentials to do things like mine cryptocurrencies, form botnets, and enable fraud.

If you can't store your credentials in source code, how should you authenticate to your databases or 3rd party APIs? The short answer is to use environment variables instead. What that means is ignoring what you see in sample code (where secrets are entered directly into source) and instead loading secrets from environment variables which are managed from outside your source code and will not be stored in version control and every team member's text editor.

Below are two short snippets of sample code that demonstrate how important it is to use environment variables to store credentials.

Below we have some example Python code from Twilio. In this example, the `AC01a2bcd3e4fg567h89012i34jklmnop5` string is the "username" or "account ID" and the the `01234567890a12b34c567890de123fg4` string is the API token.

    from twilio.rest import Client

    account_sid = "AC01a2bcd3e4fg567h89012i34jklmnop5"
    auth_token = "01234567890a12b34c567890de123fg4"
    client = Client(account_sid, auth_token)

As you can see above, these API credentials are hard-coded into the program's source. This is a big no-no. Instead, as an example of what you *should* do, take a look at this example code from SendGrid, which uses the "os.environ.get" method in Python to grab the SendGrid API token from the `SENDGRID_API_KEY` environment variable.

    import os
    import sendgrid
    from sendgrid.helpers.mail import *

    apikey=os.environ.get('SENDGRID_API_KEY')
    sg = sendgrid.SendGridAPIClient(apikey)

By pulling sensitive credentials from environment variables, which can be managed by configuration management and secret management software, your application code will remain credential-free.

Using environment variables to store secrets is an incredibly important first step to take in securing your code.
