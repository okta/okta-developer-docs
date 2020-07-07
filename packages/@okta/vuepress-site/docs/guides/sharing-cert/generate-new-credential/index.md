---
title: Generate a new credential for the source app
---

Using the source app's ID, generate a new credential for the source app:

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

<NextSectionLink/>
