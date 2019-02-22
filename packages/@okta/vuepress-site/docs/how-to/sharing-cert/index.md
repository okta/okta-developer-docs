---
title: Share Application Key Credentials for IdPs Across Apps
excerpt: How to share application key credentials between apps
---

# Share Application Key Credentials for IdPs Across Apps

[Application key credential objects](/docs/api/resources/apps#application-key-credential-model)
contain an opaque key ID (`kid`) and corresponding certificate.
To use the [API](/docs/api/resources/apps#clone-application-key-credential)
to share application key credentials between apps, you need to create and use a new credential in one app,
then share and update the credential in another app.

Sharing certificates is useful for Okta orgs that have apps with [sign-on modes](/docs/api/resources/apps#signon-modes) `SAML_2_0`, SAML 1.1, or `WS_FEDERATION`.

### Why Should I Do This?

When configuring multiple apps, you might need them to accept the same identity provider (IdP).
In that case, the assertions from the two apps must be signed by the same key.

### How to Share the Certificate

For this example, assume that you want to share a certificate between two instances of an app: `app1` is the source app, the app from
which you wish to share a certificate, and `app2` is the target app, the app that receives the source app's certificate.

This example also works if the apps are two instances of the same app, or two different apps.

#### 1. Generate a new credential for the source app

Using the source app ID (`app`'s ID), generate a new credential for the source app:

Request: `POST /api/v1/apps/0oa8ae1t5yev2ajDs0h7/credentials/keys/generate?validityYears=2`

Response:

``` json

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


#### 2. Update the source app to use the new certificate

Update the source app with the application key credential's ID, `kid` so that the source app
uses the new credential to sign assertions.

Request: `PUT /api/v1/apps/0oa8ae1t5yev2ajDs0h7`

``` json
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

``` json

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
  },
}
```

> Note: The response has been truncated for clarity.

#### 3. Share the source app's key credential (kid) with the target app

Request:

`POST /api/v1/apps/0oa8ae1t5yev2ajDs0h7/credentials/keys/w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI/clone?targetAid=0oa8ae0dv4RGQvjyZ0h7`

Response:

``` json
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

> Note: If you try to clone a credential that the target app instance already has, the API responds with a 400 error code.


#### 4. Update the target app to use the new credential that you just shared

Update the target app to use the new credential that you just shared.
When you update the target app with the `kid`, the target app starts
using the same certificate to sign assertions.

Request: `PUT /api/v1/apps/0oa8ae0dv4RGQvjyZ0h7`

``` json

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
  },
}

```

> Note: The response has been truncated for clarity.
