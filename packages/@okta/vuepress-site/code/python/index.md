---
title: Add user authentication to your Python app
language: Python
integration: back-end
icon: code-python
meta:
  - name: description
    content: Our guide shows you how to add user authentication to your Python app with examples using Flask.
---

## Get started with Python Flask + Okta

These resources walk you through adding user authentication to your Python Flask app in minutes.

<ul class='language-ctas'>
   <li>
      <a href='/docs/guides/sign-into-web-app-redirect/python/main/' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sign users in quickstart</span>
      </a>
   </li>
   <!-- <li>
    <a href='/docs/guides/protect-your-api/python/main/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Protect your API quickstart</span>
    </a>
  </li> -->
   <li>
      <a href='https://github.com/okta/samples-python-flask' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sample app</span>
      </a>
   </li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[Flask redirect authentication sample app](https://github.com/okta/samples-python-flask): See [Okta-hosted login](https://github.com/okta/samples-python-flask/tree/master/okta-hosted-login) for a redirect configuration.

## Okta Classic Engine Python SDKs

The [Okta Management Python SDK](https://github.com/okta/okta-sdk-python) can be used in your server-side code to create and update users, groups, and more.

```bash
pip install okta
```

## Recommended Guides

Okta-hosted Sign-In Widget guide:

[Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/python/main/)

Other guides:

* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [Python Developer Blog posts](https://developer.okta.com/blog/tags/python/) for further useful topics.
