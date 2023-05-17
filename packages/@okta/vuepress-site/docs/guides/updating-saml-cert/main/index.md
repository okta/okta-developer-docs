---
title: Upgrade SAML apps to SHA256
excerpt: Upgrade SAML Apps to SHA256
layout: Guides
---

This guide explains how to upgrade older Okta SAML apps from SHA1 certificates to the newer and more secure SHA256 certificate format.

---

**Learning outcomes**

* Find out which certificate your SAML app uses and learn to download your certificate.
* Use the [Apps API](/docs/reference/api/apps/#list-applications) to return data on the apps that need updating and generate new credentials for each app.
* Update the apps to use the new certificate.
* Learn how to revert to SHA1 if necessary.

**What you need**

* A SAML app to upgrade. See [Building a SAML SSO integration](/docs/guides/build-sso-integration/saml2/main/#prepare-a-saml-integration).

---

## About SAML apps and SHA256 certificates

Certificates with a SHA256 signature are supported for SAML 2.0 applications with Okta. You can create new integrations that use SHA256 certificates and update existing integrations from SHA1 certificates to SHA256 certificates. Existing integrations are not changed automatically. The SHA256 certificates and the SHA1 certificates are self-signed.

### Why should I do this?

To take advantage of the additional security features of SHA256 certificates.

### New SAML 2.0 app integrations

New SAML 2.0 app integrations automatically use SHA256 certificates.

As instructed below, upload the SHA256 certificate to the ISV.

### Existing SAML 2.0 app integrations

To update existing app integrations, you first need to list your apps and get the app id, name, and label for each app to update. Then for each app to update, perform the following steps:

1. Generate a new application key credential.
1. Update the key credential for the app to specify the new signing key id.
1. Upload the new certificate to the ISV (this step cannot be automated.)

These steps are covered in detail below.

> **Important:** For each app, after you complete the first two steps, your users cannot access the application until Step three is completed.

### Determine the signature algorithm of a certificate

You can find the signature algorithm of a certificate either by using the command line or by uploading your certificate to a free, online certificate decoder service.

If you have OpenSSL installed, from the command line run:

`openssl x509 -text -noout -in <your certificate>`

Where:

`<your certificate>` is the certificate filename relative to the current directory. The certificate must be in PEM format. Use a plain text editor
like Notepad or Textedit to save the certificate text from the `x5c` element returned from an API call, and add the **Begin Certificate** and **End Certificate** lines with the hyphens to the top and bottom of the file, as shown below. Trailing white spaces, such as a space or carriage return, at the end of the file make the certificate invalid. (The certificate shown below has been altered and is not valid.)

```
MIIDojCCAoqgAwIBAgIGAVd8z8kEMA0GCSqGSIb3DQEBBQUAMIGRMQswCQYDVQQGEwJVUz
ETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UE
CgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEjAQBgNVBAMMCW15c3RpY29ycDEcMB
oGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNjA5MzAyMDM1MTRaFw0xODA5MzAy
MDM2MTRaMIGRMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWEKQGA1UEBw
wNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIx
EjAQBgNVBAMMCW15c3RpY29ycDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCAS
IwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIJsMX3q/IMqFTPfhGJHILgRGHrrvYnZ
zL2snGvC4CssqBC1Az6PIAE+RtO1vT+6v1sRevHMICbi/ut4xB29C3fo33Y3syerVHEJD9
sZ4Ht0/NjTSHrznjTjE2Ij2/1JuZY/XF+Kp8/bR+rP3Fa3mlcKJZqnwcdII3F6bbW8HPyz
s8D8ytJJU1yc9xcm0rp+xqswWvRS9TMTRiV61OhE8ilMj+vjScIDQwOqD1LX0uiiQnjRIL
rkK2NSUbFc9PC3oVELrWqZdloDCQd+xTI0TlxV6/i50K56o0YGWIne1IYdfazuK0tXTE8k
wsvXEZ0tDRq/jVhBpoAtfQ8hKLxVEFKCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAfcgMeP
D2nCGUImDmK7GcKIAH6fJCVfcpyHNZLYChB38yJgJ3F30mFZ0W/PM9pIW8ktLKh1lBp59p
RwC4ITbpMMoWwK2EU/edocmi8qeVpG3ldXs5IeEMIoKt2c7Ndh8dTsj+fPdXDpF0iKPXtA
3wgPvWxgioW6xCvePo98isevN7WGEEdEVzjdNdR7e4nPvJfKeGncvifV2rw0WOUIZQa524
AQdfoY2fEKn9eFwPxFsKx1WV5nc6+WU5gcSkhmbzF+HohLCjVFMWwsUQNY
```

Use a free CSR and Certificate Decoder service and enter the contents of your certificate. These tools are readily found through a web search. Be
sure to note the certificate format that the decoder service requires.

The Signature Algorithm is either *sha256WithRSAEncryption* or *sha1WithRSAEncryption*.

### Obtaining the certificate for an app from a URL

You can obtain the current certificate for an app from the following URL:

`https://<your org subdomain>-admin.okta.com/admin/org/security/<application id>/cert`

Where:

`<your org subdomain>` is your organization's Okta subdomain.

`<application id>` is the application ID you used in Step 1.

> **Note:** Certificates downloaded with this method contain the **Begin Certificate** and **End Certificate** lines.

## Get the app info

Use the [List Apps API](/docs/reference/api/apps/#list-applications) to return a list of all apps.

For each app to update, collect the `id`, `name`, and `label` elements.

Request: `GET /api/v1/apps`

Truncated Response:

```json

{
    "id": "0000000000aaaaaBBBBBo",
    "name": "appname",
    "label": "Application Name",
    "status": "ACTIVE",
    "lastUpdated": "2015-01-24T00:09:01.000Z",
    "created": "2014-01-06T23:42:40.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": true,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      },
      "revealPassword": true,
      "signing": {
        "kid": "ZcLGUsl4Xn3996YYel6KPvOxZOhNWfly5-q36CByH4o"
      }
    },
    "settings": {
      "app": {
        "instanceType": null
      },
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      }
    }
  }

```

## Generate a new application key credential

Use the [Apps API](/docs/reference/api/apps/#generate-new-application-key-credential)
to generate new credentials. Pass each app ID (`id`) that was collected in the above step as the app ID (`aid`) to this API. If you have no company policy for credential expiration, 10 years is suggested.

Request: `POST /api/v1/apps/0000000000aaaaaBBBBBo/credentials/keys/generate?validityYears=10`

Response:

```json

{
  "created": "2016-09-30T20:36:15.000Z",
  "lastUpdated": "2016-09-30T20:36:15.000Z",
  "expiresAt": "2018-09-30T20:36:14.000Z",
  "x5c": [
    "MIIDojCCAoqgAwIBAgIGAVd8z8kEMA0GCSqGSIb3DQEBBQUAMIGRMQswCQYDVQQGEwJVUz
     ETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UE
     CgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEjAQBgNVBAMMCW15c3RpY29ycDEcMB
     oGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNjA5MzAyMDM1MTRaFw0xODA5MzAy
     MDM2MTRaMIGRMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBw
     wNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIx
     EjAQBgNVBAMMCW15c3RpY29ycDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCAS
     IwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIJsMX3q/IMqFTPfhGJHILgRGHrrvYnZ
     zL2snGvC4CssqBC1Az6PIAE+RtO1vT+6v1sRevHMICbi/ut4xB29C3fo33Y3syerVHEJD9
     sZ4Ht0/NjTSHrznjTjE2Ij2/1JuZY/XF+Kp8/bR+rP3Fa3mlcKJZqnwcdII3F6bbW8HPyz
     s8D8ytJJU1yc9xcm0rp+xqswWvRS9TMTRiV61OhE8ilMj+vjScIDQwOqD1LX0uiiQnjRIL
     rkK2NSUbFc9PC3oVELrWqZdloDCQd+xTI0TlxV6/i50K56o0YGWIne1IYdfazuK0tXTE8k
     wsvXEZ0tDRq/jVhBpoAtfQ8hKLxVEFKCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAfcgMeP
     D2nCGUImDmK7GcKIAH6fJCVfcpyHNZLYChB38yJgJ3F30mFZ0W/PM9pIW8ktLKh1lBp59p
     RwC4ITbpMMoWwK2EU/edocmi8qeVpG3ldXs5IeEMIoKt2c7Ndh8dTsj+fPdXDpF0iKPXtA
     3wgPvWxgioW6xCvePo98isevN7WGEEdEVzjdNdR7e4nPvJfKeGncvifV2rw0WOUIZQa524
     AQdfoY2fEKn9eFwPxFsKx1WV5nc6+WU5gcSkhmbzF+HohLCjVFMWwsUQNYpPBtzY9gM45G
     /bIs7EizkKT1ew0SRDI+Ws9roUKsquCWJWiAGxVEqheQvf4dauAOtqGQ=="
  ],
  "e": "AQAB",
  "n": "gmwxfer8gyoVM9-EYkcguBEYeuu9idnMvayca8LgKyyoELUDPo8gAT5G07W9P7q_WxF6
        8cwgJuL-63jEHb0Ld-jfdjezJ6tUcQkP2xnge3T82NNIevOeNOMTYiPb_Um5lj9cX4qn
        z9tH6s_cVreaVwolmqfBx0gjcXpttbwc_LOzwPzK0klTXJz3FybSun7GqzBa9FL1MxNG
        JXrU6ETyKUyP6-NJwgNDA6oPUtfS6KJCeNEguuQrY1JRsVz08LehUQutapl2WgMJB37F
        MjROXFXr-LnQrnqjRgZYid7Uhh19rO4rS1dMTyTCy9cRnS0NGr-NWEGmgC19DyEovFUFhQ",
  "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg9jrI",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "ypBvmMYkQGPqxKL4SMdH9B7IXrtGADrvgEc-GKGQ7XY"
}
```

> After you update the key credential, your users can't access the SAML app until you upload the new certificate to the ISV.

## Update the key credential for the app to specify the new signing key id

Call the [Apps API](/docs/reference/api/apps/#update-key-credential-for-application) with the app ID you obtained above. In the body, include
the app name and the app label obtained earlier, the key ID that you generated, and the value *SAML_2_0* for the sign on mode.

Request:

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "appname",
  "label": "Application Name",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg9jrI"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/${aid}"

```

## Upload the new certificate to the ISV

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select your app integration.
1. Select **Sign-On Options**.
1. Click **View Setup Instructions**.
1. Perform the setup for your app integration again by using the instructions provided. During this setup, you can upload the certificate in a specified format, the metadata, or the certificate fingerprint.

## Revert to a SHA1 certificate

If your ISV does not accept certificates with a SHA256 signature, you can revert the settings to use the previous SHA1 certificate by rolling
over the app key to specify the SHA1 certificate you previously associated with your integration.

### Step 1: List your apps and get the ID, name, and label for the app to revert

This step is the same as [shown earlier](#get-the-app-info).

### Step 2: Retrieve all certificates associated with the app and locate the SHA1 certificate

Use the [List Key Credentials for an Application API](/docs/reference/api/apps/#list-key-credentials-for-application) to list all the credentials.
Pass the app ID (`id`) that was collected in the previous step as the app ID (`aid`) in this API. Then, determine which certificate is the SHA1 certificate by copying the certificate text for each of the returned certificates, and [determine the signature algorithm](#determine-the-signature-algorithm-of-a-certificate)
using the method described below. After determining which certificate is the SHA1 certificate, note the signing key id, `kid`.

The certificate is contained in the element, `x5c` and is not in PEM format; that is, it does not
contain **Begin Certificate** and **End Certificate** lines.  (The certificates shown in this how-to have been altered and are not valid.)

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

### Step 3: Update the key credential for the application with the SHA1 certificate

Use the [Apps API](/docs/reference/api/apps/#update-key-credential-for-application)
to update the key credential for the application to specify the kid of the SHA1 certificate that you retrieved in Step 2.

This step is the same as
[shown earlier](#update-the-key-credential-for-the-app-to-specify-the-new-signing-key-id).

### Step 4: Upload the SHA1 certificate to the ISV

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select your app integration.
1. Select **Sign-On Options**.
1. Click **View Setup Instructions**.
1. Perform the setup for your app integration again by using the instructions provided. During this setup, you can upload the certificate in a specified format, the metadata, or the certificate fingerprint.

## See also

* [SAML overview](https://developer.okta.com/docs/concepts/saml/)
* [SAML FAQ](https://developer.okta.com/docs/concepts/saml/faqs/)
* [Building a SAML SSO integration](https://developer.okta.com/docs/guides/build-sso-integration/saml2/before-you-begin/)