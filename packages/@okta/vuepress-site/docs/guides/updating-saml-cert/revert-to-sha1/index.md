---
title: Reverting to a SHA1 Certificate
---


If your ISV does not accept certificates with a SHA256 signature, you can revert the settings to use the previous SHA1 certificate by rolling
over the app key to specify the SHA1 certificate you previously associated with your integration.

#### Step 1: List your apps and get the id, name, and label for the app to revert

This step is the same as [Step 1](#step-1-list-your-apps-and-get-the-app-id-name-and-label-for-each-app-to-update), above.

#### Step 2: Retrieve all certificates associated with the app and locate the SHA1 certificate

Use the [List Key Credentials for an Application API](/docs/reference/api/apps/#list-key-credentials-for-application) to list all the credentials.
Pass the app ID (`id`) that was collected in the previous step as the app ID (`aid`) in this API. Then, determine which certificate is the SHA1 certificate by copying the certificate text for each of the returned certificates, and [determine the signature algorithm](#determine-the-signature-algorithm-of-a-certificate)
using the method described below. After determining which certificate is the SHA1 certificate, note the signing key id, `kid`.

The certificate is contained in the element, `x5c` and is not in PEM format; that is, it does not
contain *Begin Certificate* and *End Certificate* lines.  (The certificates shown in this how-to have been altered and are not valid.)

In the sample response shown below, there are two certificates to check to find the SHA1 certificate.

Request: `GET /api/v1/apps/0000000000aaaaaBBBBBo/credentials/keys`

Response:

``` json
{
    "created": "2016-09-27T21:49:49.000Z",
    "lastUpdated": "2016-09-27T21:49:49.000Z",
    "expiresAt": "2026-09-27T21:49:48.000Z",
    "x5c": [
      "MxxDnDCCAoSgAwIBAgIGAVdtoBFfMA0GCSqGSIb3DQEBCwUAMIGOMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxDzANBgNVBAMMBmVrbGVpbjEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNjA5MjcyMTQ4NDlaFw0yNjA5MjcyMTQ5NDhaMIGOMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxDzANBgNVBAMMBmVrbGVpbjEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJrkg2M7P6rH0yJZIYUjcX0RdTi36ItF893dLZoNXigg2mwb1kIs0XpHmN8bS6EHWM/F3MoiiMDh0DpxOIsdY3+XZEII7KWV3D6S73xR6Efps1Q27mNMb8cvpTnTKQlYWv0QPw26JwkB+JoG1hEL5WTeS7CxwLbeHcyf3+ZXO0HEWQG5x9DFKtYVTMlCtQb4go+m9zDBZI4GYvwU3L4ElsZg7GZAeNAg+0Jez5gFObvAz/YsQ6UoZC7/N/TjyDjcW/Df+xdomneJ7/otpiBUNvWhKqoJIunrsmw2TfgDysudYlp0swskiHJfNp3uAZStFqFwjVkxL/1/COUc+DILkf0CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAfo0arD0r9x+s58wA2WjaZFOXY5sGU+gEih4ny9t3rnCqGcB/JJWiv0RBEbRrr/oRyCgpmdOuCT8P6/kesMs9Bhq3IcrZWKkzzE6oLzcq3cODNwUjPwZK0T2M4yCDDNt2X/s52qeFA91KCaojGG8+2AGi8r8vXzRBIDIq1AZuKGNnHWL6woF3lXT2vo2ZOegZ0NUdYz/SPqYy4B7YIRzIgcsYqWk4kcwZmIAK1cTOYTsucvtkhYWXK6rJ70WTUyT7KojW8MJua0Gd5cxHvw+dbNwb6VukvUqOTWz+sBIxg0lBmKudROol57mhB73v0iFaPf5X/w4aS7GmqIohtkHcEA=="
    ],
    "e": "AQAB",
    "n": "muSDYzs_qsfTIlkhhSNxfRF1OLfoi0Xz3d0tmg1eKCDabBvWQizRekeY3xtLoQdYz8XcyiKIwOHQOnE4ix1jf5dkQgjspZXcPpLvfFHoR-mzVDbuY0xvxy-lOdMpCVha_RA_DbonCQH4mgbWEQvlZN5LsLHAtt4dzJ_f5lc7QcRZAbnH0MUq1hVMyUK1BviCj6b3MMFkjgZi_BTcvgSWxmDsZkB40CD7Ql7PmAU5u8DP9ixDpShkLv839OPIONxb8N_7F2iad4nv-i2mIFQ29aEqqgki6euybDZN-APKy51iWnSzCySIcl82ne4BlK0WoXCNWTEv_X8I5Rz4MguR_Q",
    "kid": "X_dQOF8ON5WTRxWrNygEHi18sJe8CKhMOKur6j4pvYg",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "QqqxuINGQFdJ_ObbeBJtUWhngXISll5DHT5Qfzf-JFM"
  },
  {
    "created": "2016-09-27T21:49:19.000Z",
    "lastUpdated": "2016-09-27T21:49:19.000Z",
    "expiresAt": "2043-08-23T20:29:25.000Z",
    "x5c": [
      "MIIClzCCAEFKAwIBAgIGAUCs3gRDMA0GCSqGSIb3DQEBBQUAMIGOMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxDzANBgNVBAMMBmVrbGVpbjEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xMzA4MjMyMDI4MjVaFw00MzA4MjMyMDI5MjVaMIGOMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxDzANBgNVBAMMBmVrbGVpbjEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA3XZGz0vu2tcT/oLax/9HF8bZJ0h1hd/B4GjYbzCSCCI0YuGN9SVic76PlOOtoByehzf7eD2bmsOTeIhiDAumVDdkyg7dIwp4JnJBro0RkWaIX/gTidncA5x6/3MlwjSfzb+kT5fcxr75ZQVjAytP9i3x6cnEybBETivyvlBkElMCAwEAATANBgkqhkiG9w0BAQUFAAOBgQBb4dSU+OcAi53FQw/NJtBeD/h5w75paCoWi3rqCtIgVcx48A2szd+ScmGuDks9sNatUsxJjvj2TnXWYOs9VlD3AX5UIYPqHxCG5kPwpoYvfDnPFBf/zw08CPIgA+bI0JOFB6ul+w5u1EvaksDeIfLxJkCSurYrK2nOPGplF/vVew=="
    ],
    "e": "AQAB",
    "n": "3XZGz0vu2tcT_oLax_9HF8bZJ0h1hd_B4GjYbzCSCCI0YuGN9SVic76PlOOtoByehzf7eD2bmsOTeIhiDAumVDdkyg7dIwp4JnJBro0RkWaIX_gTidncA5x6_3MlwjSfzb-kT5fcxr75ZQVjAytP9i3x6cnEybBETivyvlBkElM",
    "kid": "ZcLGUslsdTn3996YYel6KPvOxZOhNWfly5-q36CByH4o",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "_DXULzisdoprgJ8OhiSN_KUD2rScRDd7pY2HE1ZI_bs"
  }

```

> After you complete step 3, your users can't access the SAML app until you complete step 4.

#### Step 3: Update the key credential for the application with the SHA1 certificate

Use the [Apps API](/docs/reference/api/apps/#update-key-credential-for-application)
to update the key credential for the application to specify the kid of the SHA1 certificate that you retrieved in Step 2.

This step is the same as
[Step 3](#step-3-update-the-key-credential-for-the-app-to-specify-the-new-signing-key-id), above.

#### Step 4: Upload the SHA1 certificate to the ISV

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click on your app integration.
1. Select **Sign-On Options**.
1. Click **View Setup Instructions**, as shown below.<br/>![Accessing SAML Setup Instructions](/img/saml_setup_link.png)
1. Perform the setup for your app again, using the instructions provided. During this setup, you will upload the certificate in a specified format, the metadata, or the certificate fingerprint.


<NextSectionLink/>
