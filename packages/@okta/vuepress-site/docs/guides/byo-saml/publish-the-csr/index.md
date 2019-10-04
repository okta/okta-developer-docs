---
title: Publish the CSR
---


- Use the [Apps API](/docs/reference/api/apps/#publish-csr-for-application) to publish the certificate for Outbound SAML apps.
- Use the [IdPs API](/docs/reference/api/idps/#publish-signing-csr-for-idp) to publish the certificate for Inbound SAML apps.

Base64 encoding and both PEM and CER certificate formats are supported.

- For CER format, change the Content-Type statement to `Content-Type: application/x-x509-ca-cert`.
- For Base64-encoded format, add the statement `Content-Transfer-Encoding: base64` after the Content-Type statement.

Collect the returned Key ID (`credentials.signing.kid`) to use in the next step.

The following request publishes a CSR with a certificate in PEM format.

```
MIIFgDCCA2igAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARP
...
ZZc+BUqujfMzY+coqgn0gCRUSIKy/Jrj7VJkbrnq6zjbb1FVFqBE5pSgf9Pbhald
++kto/WJsmtwBQmZmwP87YAeWoDMkCSSN+mtX13kJYp0pLTu3wwHZj5V1vt9Bv2k
WIUayqnunOUqjF7ZcOr3UegJHPFEJ9VaDpMQR3nBTVce+xbi2NgV3m+lLQc4s7xc
FjGQoNZ/hJ+xBkcXaoxvpOyMV7Z2VHOV5UC8CLcU5Bwc6p+GB0R+RF6YATOwwX1D
Ox5WhmQExOF7xtxFb93mPe0g+voSLNZjsQYUHDs30T+iVmUbp+SQE7HofPB4JTO7
ZRUaagvFUo1EO9m1xnjpLDIa7+M=


201 Created
Location: https://${yourOktaDomain}/api/v1/apps/0oa1ysid1U3iyFqLu0g4/credentials/keys/ElsCzR8nbPamANBFu7QPRvtLD6Q3O1KQNJ92zkfFJNw
Content-Type: application/json;charset=UTF-8

{
  "created": "2017-03-15T00:03:43.000Z",
  "lastUpdated": "2017-03-15T00:03:43.000Z",
  "expiresAt": "2018-03-25T11:58:43.000Z",
  "x5c": [
    "MIIFgDCCA2igAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzE1MTE...RF6YATOwwX1DOx5WhmQExOF7xtxFb93mPe0g+voSLNZjsQYUHDs30T+iVmUbp+SQE7HofPB4JTO7ZRUaagvFUo1EO9m1xnjpLDIa7+M="
  ],
  "e": "AQAB",
  "n": "vQ3U2VsfmF9yYs-JxJlgjPm12d4LUZZZf7WEopc1CAdtqxiA7hPQGzdvKBKR-xGLYUeMY3vQ1nObiIFGci1kvtPbiwWoafPS8zNupMIvEZ5b9zANUtuuvaBnQN0VOABt9crKvhMQIGj6k1Uz0bPooiwNt0Fz9jr_JsuD1-OSrot6Nro-AH8otGvlineMOR380CbKuJVQvOqRlRne-M6VEY_aX96RZfBBOFEKstJfemV-uimd8QyIuv6iazoVcJ9qVMKbfqJ0Na1W1_zAC0SgvScgzF6058GatFdfHYyl-EXIp0-MCfpjcH-gR5fOPo4052gOvWpBSiW6HTOCG-cjJw",
  "kid": "your-key-id",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "6ZA0gDvExTUMszE4Dvs72pEj396Q7vOHJkQQrdSddVE"
}
```



<NextSectionLink/>
