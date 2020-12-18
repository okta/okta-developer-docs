---
title: Generate a CSR
---

* Use the [Apps API](/docs/reference/api/apps/#list-csrs-for-application) to return a list of all apps to use with Outbound SAML apps.
* Use the [IdPs API](/docs/reference/api/idps/#list-signing-csrs-for-idp) to return a list of all IdPs to use with Inbound SAML apps.

You can generate a CSR and receive the response in either JSON or [PKCS#10](https://tools.ietf.org/html/rfc2986) format.

The following request generates a CSR in JSON format to use with Outbound SAML apps.

* For Inbound SAML, change the POST statement to `POST /api/v1/idps/yourIdPID/credentials/csrs/`.

* For PKCS#10 format, change the Accept statement to `Accept: application/pkcs10`.

> **Note:** `Accept` specifies the response format, and `Content-Type` specifies the request format.

### Request

```json
POST /api/v1/apps/yourAppID/credentials/csrs/
Accept: application/json
Content-Type: application/json

{
  "subject": {
    "countryName"            : "US",
    "stateOrProvinceName"    : "California",
    "localityName"           : "San Francisco",
    "organizationName"       : "Your Company, Inc.",
    "organizationalUnitName" : "YourOrgUnit",
    "commonName"             : "IdP Issuer"
  },
  "subjectAltNames":
    {
      "dnsNames": [ "yourorgunit.example.com" ]
    }
}
```

### Response

Collect the values for both the CSR `id` and the `csr` from the response for use in the next steps.

```json
201 Created
Location: https://${yourOktaDomain}/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000

{
  "id": "abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000",
  "created": "2017-04-19T12:50:58.000Z",
  "csr":  "ABCC6jCCAdICAQAwdjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xEDAOBgNVBAsMB0phbmt5Q28xEzARBgNVBAMMCklkUCBJc3N1ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpus1zL9sVhEDhwEcdQFWYerAOkDn+J3OkpXFyTPBUFLDYe21CoQN0TQOl5CgtEa8rViyNj0Drv8bWppojLbEkBO3FY6YqDbqSlU+ZuBlhvwiaxnGBnKeRLH6RoWn/6+I1GwHkJJDGYzVtYfELu92sZnhLzNJFcleI41OK7Ll1fWI+un4N5Ryd2JHHtczo7t9N0hWgulckmXHM+qOk1/0abXGZUV2QMDNVIgDcSswyK/n3Ri1p5ccJGX8sJdYCiihxE+Ms97z+PO7oLVbdVLkRDcSDE0T/dTK8CThI5otvhM4PlEeYbNUa8/9f88bUteA2oxDdTWJVurH6FeMvZ6iFAgMBAAGgLzAtBgkqhkiG9w0BCQ4xIDAeMBwGA1UdEQQVMBOCEWphbmt5LmV4YW1wbGUuY29tMA0GCSqGSIb3DQEBCwUAA4IBAQB3o1VcZ+NnwBzSKITWKnf9Pb0wY8hrHsVo+jAX0eUrotMCSnCIL3hyLOZW+LXvITfaREM6l/L0vKLqbhNto9trmpn9wy+fFqRboC/0zAyIotPiRDBsCVD+UEKea5IIrDAWsq2Guv1RfUcyI79rblwctfNZbIHj5rpoYVpDqYvQpCHRMmQrzKMDb9qVtZVHbAHqTKEDQTLnQbyvwuw/kmaiPMK7SDSHTPpgq+izW2M6Qqqjn8Mz8RNgQcantXvjcb70uAFt1uxkQR4j9K/kRoY7pjR4d/FrAq/oxfnNPQxyvXYr+/MzOxEFdDKts4vSCYqpOLgQs2xpC6vfhAeHGYEFK",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

<NextSectionLink/>
