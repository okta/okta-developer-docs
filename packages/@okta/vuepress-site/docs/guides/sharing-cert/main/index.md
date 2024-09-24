---
title: Share application key credentials for IdPs across Apps
excerpt: How to share application key credentials between Apps
layout: Guides
---

This guide explains how to share application key credentials across multiple apps so that the same Identity Provider can authorized the apps.

---

#### Learning outcomes

* Create a new app key credential for your source app and update it to use the new certificate.
* Share this credential with, and use it in, the target app.

#### What you need

A couple of existing Okta apps already set up so that application key credentials can be shared between the apps, for example, [a web app](/docs/guides/sign-into-web-app-redirect/asp-net-core-3/main/).

---

## About application key credentials

[Application key credential objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/#tag/ApplicationSSOCredentialKey/operation/listApplicationKeys) contain an opaque key ID (`kid`) and a corresponding certificate. To use the [API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/#tag/ApplicationSSOCredentialKey/operation/cloneApplicationKey) to share application key credentials between apps, you need to clone an application key credential. You create and use a new credential in one app, and then share and update the credential in another app.

Sharing certificates is useful for Okta orgs that have apps with [sign-on modes](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/listApplications!c=200&path=0/signOnMode&t=response) such as `SAML_2_0`, `SAML_1_1`, or `WS_FEDERATION`.

### Why should I do this

When configuring multiple apps, you might need them to accept the same Identity Provider (IdP). In that case, the assertions from the two apps must be signed by the same key.

For example, a company wants to implement SSO for their Finance app. The company requires two app instances of the Finance app for their implementation, and the Finance app only accepts one SAML Identity Provider. The assertions from the two app instances of Finance need to look identical.

### How to share the certificate

For this example, we assume that you want to share a certificate between two instances of an app:

* `app1` is the source app, the app from which you want to share a certificate.
* `app2` is the target app, the app that receives the source app's certificate.

This example works whether the apps are two instances of the same app or two different apps.

## Generate a new credential for the source app

Using the source app's ID, generate a new application key credential for the source app:

Request: `POST /api/v1/apps/0oa8ae1t5yev2ajDs0h7/credentials/keys/generate?validityYears=2`

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
     wsvXEZ0tDRq/jVhBpoAtfQ8hKLxVBYUCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAfcgMeP
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
  "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "ypBvmMYkQGPqxKL4SMdH9B7IXrtGADrvgEc-GKGQ7XY"
}
```

## Update the source app to use the new certificate

Update the source app with the updated key ID (`kid`) so that the source app uses the new credential to sign assertions.

Request: `PUT /api/v1/apps/0oa8ae1t5yev2ajDs0h7`

```json
{
  "name": "myorg_app1",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  }
}
```

Response:

```json
{
  "id": "0oa8ae1t5yev2ajDs0h7",
  "name": "myorg_app1",
  "status": "ACTIVE",
  "lastUpdated": "2016-09-30T22:23:38.000Z",
  "created": "2016-09-27T22:51:53.000Z",
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "myorg_app1_link": true
    }
  },
  "features": [],
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  }
}
```

> **Note:** The response is truncated for clarity.

## Share the source app's key credential ID with the target app

Share the source app's key ID `kid` with the target app. This clones the X.509 certificate of the application key credential from the source app to the target app. The `targetAid`is the target app's ID.

Request:

`POST /api/v1/apps/0oa8ae1t5yev2ajDs0h7/credentials/keys/w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI/clone?targetAid=0oa8ae0dv4RGQvjyZ0h7`

Response:

```json
{
  "created": "2016-10-03T16:07:02.000Z",
  "lastUpdated": "2016-10-03T16:07:02.000Z",
  "expiresAt": "2018-09-30T22:16:14.000Z",
  "x5c": [
    "MIIDojCCAoqgAwIBAgIGAVd9K1ggMA0GCSqGSIb3DQEBBQUAMIGRMQswCQYDVQQGEwJVUzETMBEGA1
     UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIG
     A1UECwwLU1NPUHJvdmlkZXIxEjAQBgNVBAMMCW15c3RpY29ycDEcMBoGCSqGSIb3DQEJARYNaW5mb0
     Bva3RhLmNvbTAeFw0xNjA5MzAyMjE1MTVaFw0xODA5MzAyMjE2MTRaMIGRMQswCQYDVQQGEwJVUzET
     MBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YT
     EUMBIGA1UECwwLU1NPUHJvdmlkZXIxEjAQBgNVBAMMCW15c3RpY29ycDEcMBoGCSqGSIb3DQEJARYN
     aW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALUSyecgvygBYkjCp3
     dvz1aiYgcCxkTJi/SpuRFcqTcn4na4WeLPjUaTZwvkwQ71rb5MzNfRvNxLutSw7E+VhMtcNh5CcSZa
     J3JT20zHXxvL7fuVqCH9xA/4OPUrqgYNOF4cluBT9Kt1jdAq+XVs2hllm9yTIr0WETb8PvFyjvj+is
     qjRxOxVV638uhKsIhbb8nLghBUT5uoL3gQvBzuHy4WM0exXM+UPvBmRsIHp5CdfN+G6cxkgDN/gQha
     Fd03nStu8cz03VnJQsLy4vW8CkVnBAQdacUYlInStGqm3fB9Piq6oYRhYYANDqkFRlpxK/3HfboUlY
     Xk4+VYMEggXhkCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAEk2kiqV6T1D7ujWq6krMr7FX8j6yEag8
     j/C9X7WkPrCH655/jbi8/Q0+j2QuNJ1iCJLHnHFiKJQfeNv3hfu9PMHG2NldRY1dLElnkFh1PMBQ6R
     Ingas1HlE+V0Q/V8Rq4OI8LjfmXm/MR+5rI/sI46882j1c27XSuONTVPnn4JX+C2zuOBBH+rbn+YNm
     FxJnSPr0LgETr/ojhLo2NAWKkBtNG/qBrDHQbvRdxURKGhLjhWUX6z6pjm1V0QILGibyPjlQazjV25
     k7gMeU+jUFeB+v9eFxJDwQYLakR1xcLkElvGyGQMT16LdjrHJB/itpZw05oJCzDT04E3dmz2TK8w=="
  ],
  "e": "AQAB",
  "n": "tRLJ5yC_KAFiSMKnd2_PVqJiBwLGRMmL9Km5EVypNyfidrhZ4s-NRpNnC-TBDvWtvkzM19G83Eu6
        1LDsT5WEy1w2HkJxJlonclPbTMdfG8vt-5WoIf3ED_g49SuqBg04XhyW4FP0q3WN0Cr5dWzaGWWb
        3JMivRYRNvw-8XKO-P6KyqNHE7FVXrfy6EqwiFtvycuCEFRPm6gveBC8HO4fLhYzR7Fcz5Q-8GZG
        wgenkJ1834bpzGSAM3-BCFoV3TedK27xzPTdWclCwvLi9bwKRWcEBB1pxRiUidK0aqbd8H0-Krqh
        hGFhgA0OqQVGWnEr_cd9uhSVheTj5VgwSCBeGQ",
  "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "wnhwdJl6BWlS4dCqAMSoKZI1QdSfnnUqlchQKl4QTIY"
}
```

> **Note:** If you try to clone a credential that the target app instance already has, the API responds with a 400 error code.

## Update the target app to use the new credential

Update the target app to use the new application key credential that you just shared. When you update the target app with the source app's key ID `kid`, the target app starts using the same certificate to sign assertions.

Request: `PUT /api/v1/apps/0oa8ae0dv4RGQvjyZ0h7`

```json
{
  "name": "myorg_app2",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  }
}
```

Response:

``` json
{
  "id": "0oa8ae0dv4RGQvjyZ0h7",
  "name": "myOrg_app2",
  "label": "App 2",
  "status": "ACTIVE",
  "lastUpdated": "2016-10-03T16:53:50.000Z",
  "created": "2016-09-27T22:53:34.000Z",
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "myorg_app2_link": true
    }
  },
  "features": [],
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  }
}
```

> **Note:** The response is truncated for clarity.

## See also

Read more about sharing application key credentials between apps in our API Reference docs:

* [Application sign-on modes](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/listApplications!c=200&path=0/signOnMode&t=response)
* [Generate a new application key credential](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/#tag/ApplicationSSOCredentialKey/operation/generateApplicationKey)
* [Clone an application key credential](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/#tag/ApplicationSSOCredentialKey/operation/cloneApplicationKey)