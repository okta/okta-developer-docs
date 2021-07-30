---
title: Create and sign the JWT
---

> **Note:** Okta SDKs support creating and signing the JWT and requesting an access token. If you are using an Okta SDK, you can skip this section and the <GuideLink link="../get-access-token">Get an access token</GuideLink> section.

Create and sign the JWT with your private key for use as a JWT assertion in the request for a scoped access token. You can create this `client_credentials` JWT in several ways.

For testing purposes, use [this tool](https://www.jsonwebtoken.dev) to generate and sign a JWT. This tool supports both JWT and PEM formats. For a production use case, see [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/jwt-with-private-key/) for both a Java and a JavaScript example of signing the JWT.

> **Note:** After the service app has Okta-scoped grants, only an admin with Super Admin role permissions can rotate the keys.

You can use the following [JWT claims](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt) in the request for a scoped access token:

* `alg` &mdash; one of the supported algorithm values: RS265, RS384, RS512, ES256, ES384, or ES512. This is required for Okta to successfully verify the token using the signing keys provided in the <GuideLink link="../create-serviceapp-grantscopes">previous step</GuideLink>. The `alg` parameter goes in the header of the JWT rather than a claim in the payload of the body.
* `aud` &mdash; the full URL of the resource that you're using the JWT to authenticate to
* `exp` &mdash; the expiration time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp). This value must be a maximum of only an hour in the future.
* `jti` &mdash; (Optional) A unique identifier of the token. This value is used to prevent the JWT from being replayed. The claim is a case-sensitive string.
* `iat` &mdash; (Optional) the issuing time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp)
* `iss` &mdash; the issuer of the token. This value must be the same as the `client_id`.
* `sub` &mdash; the subject of the token. This value must be the same as the `client_id`.

1. For this example, include the following parameters in the payload of the JWT:

    * `aud` &mdash; `https://{yourOktaDomain}.com/oauth2/v1/token`
    * `iss` &mdash; `client_id`
    * `sub` &mdash; `client_id`
    * `exp` &mdash; `1614664267`

    **Payload example**

```json
{
    "aud": "https://{yourOktaDomain}/oauth2/v1/token",
    "iss": "0oar95zt9zIpYuz6A0h7",
    "sub": "0oar95zt9zIpYuz6A0h7",
    "exp": "1614664267"
}
```

2. In the **Signing Key** box, paste the public and private key that you generated in the <GuideLink link="../create-publicprivate-keypair">Create a public/private key pair</GuideLink> step.

3. For the key format, use either the default of **JWT** or switch to **PEM**, and then click **Generate JWT**.

4. The signed JWT appears. Copy the JWT for use in the <GuideLink link="../get-access-token">Get an access token</GuideLink> step.

<NextSectionLink/>
