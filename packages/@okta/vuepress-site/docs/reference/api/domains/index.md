---
title: Domains
category: management
---

# Domains API

<ApiLifecycle access="ea" />

The Okta Domains API provides operations to manage custom domains for your organization.

## Getting Started

Explore the Domains API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6540fce00064f4f440d3)

## Domain operations

The Domains API has the following CRUD operations:
* [Create Domain](#create-domain)
* [Verify Domain](#verify-domain)
* [Create Certificate](#create-certificate)
* [Get Domain](#get-domain)
* [Get all Domains](#get-all-domains)
* [Delete Domain](#delete-domain)



### Create Domain

<ApiOperation method="post" url="/api/v1/domains" />

Creates your domain

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body
The [Domain](#domain-object)

#### Response body

The [DomainResponse](#domainresponse-object)

#### Usage examples

The following request creates a domain with a given name.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "domain": "login.example.com",
    "certificateSourceType": "MANUAL"
}' "https://${yourOktaDomain}/api/v1/domains"
```

##### Response

```json
{
    "id": "OcDz6iRyjkaCTXkdo0g3",
    "domain": "login.example.com",
    "validationStatus": "NOT_STARTED",
    "dnsRecords": [
        {
            "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ],
            "recordType": "TXT"
        },
        {
            "fqdn": "login.sigmanetcorp.us",
            "values": [
                "${yourOktaDomain}.customdomains.okta1.com"
            ],
            "recordType": "CNAME"
        }
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```
### Verify Domain

<ApiOperation method="post" url="/api/v1/domains/{id}/verify" />

Verifies the Domain.

#### Request path parameters

Verifies the Domain by the given `id`

|Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id `       | URL        | Required. ID of the Domain. String. |


#### Request query parameters
N/A

#### Request body
N/A

#### Response body

The [DomainResponse](#domainresponse-object)


#### Use examples

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/domains/{id}/verify"
```

##### Response
```json
{
    "id": "OcDz6iRyjkaCTXkdo0g3",
    "domain": "login.example.com",
    "validationStatus": "VERIFIED",
    "dnsRecords": [
        {
            "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ],
            "recordType": "TXT"
        },
        {
            "fqdn": "login.example.com",
            "values": [
                "${yourOktaDomain}.customdomains.okta1.com"
            ],
            "recordType": "CNAME"
        }
    ],
   "_links": {
           "certificate": {
               "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/certificate",
               "hints": {
                   "allow": [
                       "PUT"
                   ]
               }
           },
           "self": {
               "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
               "hints": {
                   "allow": [
                       "GET",
                       "DELETE"
                   ]
               }
           }
   }
}
```
### Create Certificate

<ApiOperation method="put" url="/api/v1/domains/{id}/certificate" />

Creates the Certificate for the Domain

#### Request path parameters

Creates the Certificate for the Domain by ID

| Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id `       | URL        | Required. ID of the Certificate. String. |


#### Request query parameters
N/A

#### Request body
The [Certificate](#certificate-object)

#### Response parameters

```http
HTTP/1.1 204 No Content
```

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000163`
* Passing a non-verified Domain returns a `403 Forbidden` status code with error code `E0000165`. You must verify the Domain before creating the Certificate.

#### Use examples

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
        "type": "PEM",
        "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5cyk6x63iBJSW\nvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvcqFWxdiW3sh2cItzYtoN1Zfgj5lWG\nOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQmpqi9zaP/aKJklk6LdPFbVLGhuZfm\n34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCla2ifFzjz2FCkMMEc/Y0zUyP+en/m\nbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWgCZQq/AZYj9RxR23IIuRcUJ8TQ2py\noc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKrIBIo+qyHweifpPYW28ipdSbPjiyp\nAMdpbGLDAgMBAAECggEAUXVfT91z6IqghhKwO8QtC5T/+fN06B8rCYSKj/FFoZL0\n0oTiLFuYwImoCadoUDQUE/Efj0rKE2LSgFHg/44IItQXE01m+5WmHmL1ADxsyoLH\nz9yDosKj7jNM7RyV8F8Bg0pL1hU+rU4rhhL/MaS0mx4eFYjC4UmcWBmXTdelSVJa\nkvXvQLT5y86bqh7tqMjM/kALTWRz5CgNJFk/ONA1yo5RTX9S7SIXimBgAvuGqP8i\nMPEhJou7U3DfzXVfvP8byqNdsZs6ZNhG3wXspl61mRyrY+51SOaNLA7Bkji7x4bH\nNw6mJI0IJTAP9oc1Z8fYeMuxT1bfuD7VOupSP0mAMQKBgQDk+KuyQkmPymeP/Wwu\nII4DUpleVzxTK9obMQQoCEEElbQ6+jTb+8ixP0bWLvBXg/rX734j7OWfn/bljWLH\nXLrSoqQZF1+XMVeY4g4wx9UuTK/D2n791zdOgQivxbIPdWL3a4ap86ar8uyMgJu8\nBLXfFBAOc+9myqUkbeO7wt0e6QKBgQDPV04jPtIJoMrggpQDNreGrANKOmsXWxj4\nOHW13QNdJ2KGQpoTdoqQ8ZmlxuA8Bf2RjHsnB2kgGVTVQR74zRib4MByhvsdhvVm\nF2LNsJoIDfqtv3c+oj13VonRUGuzUeJpwT/snyaL+jQ/ZZcYz0jDgDhIODTcFYj8\nDMSD5SHgywKBgHH6MwWuJ44TNBAiF2qyu959jGjAxf+k0ZI9iRMgYLUWjDvbdtqW\ncCWDGRDfFraJtSEuTz003GzkJPPJuIUC7OCTI1p2HxhU8ITi6itwHfdJJyk4J4TW\nT+qdIqTUpTk6tsPw23zYE3x+lS+viVZDhgEArKl1HpOthh0nMnixnH6ZAoGBAKGn\nV+xy1h9bldFk/TFkP8Jn6ki9MzGKfPVKT7vzDORcCJzU4Hu8OFy5gSmW3Mzvfrsz\n4/CR/oxgM5vwoc0pWr5thJ3GT5K93iYypX3o6q7M91zvonDa3UFl3x2qrc2pUfVS\nDhzWGJ+Z+5JSCnP1aK3EEh18dPoCcELTUYPj6X3xAoGBALAllTb3RCIaqIqk+s3Y\n6KDzikgwGM6j9lmOI2MH4XmCVym4Z40YGK5nxulDh2Ihn/n9zm13Z7ul2DJwgQSO\n0zBc7/CMOsMEBaNXuKL8Qj4enJXMtub4waQ/ywqHIdc50YaPI5Ax8dD/10h9M6Qc\nnUFLNE8pXSnsqb0eOL74f3uQ\n-----END PRIVATE KEY-----",
        "certificate": "-----BEGIN CERTIFICATE-----\nMIIFNzCCBB+gAwIBAgISBAXomJWRama3ypu8TIxdA9wzMA0GCSqGSIb3DQEBCwUA\nMDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\nEwJSMzAeFw0yMTAyMTAwNTEzMDVaFw0yMTA1MTEwNTEzMDVaMCQxIjAgBgNVBAMT\nGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAudXMwggEiMA0GCSqGSIb3DQEBAQUAA4IB\nDwAwggEKAoIBAQC5cyk6x63iBJSWvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvc\nqFWxdiW3sh2cItzYtoN1Zfgj5lWGOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQm\npqi9zaP/aKJklk6LdPFbVLGhuZfm34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCl\na2ifFzjz2FCkMMEc/Y0zUyP+en/mbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWg\nCZQq/AZYj9RxR23IIuRcUJ8TQ2pyoc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKr\nIBIo+qyHweifpPYW28ipdSbPjiypAMdpbGLDAgMBAAGjggJTMIICTzAOBgNVHQ8B\nAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB\n/wQCMAAwHQYDVR0OBBYEFPVZKiovtIK4Av/IBUQeLUs29pT6MB8GA1UdIwQYMBaA\nFBQusxe3WFbLrlAJQOYfr52LFMLGMFUGCCsGAQUFBwEBBEkwRzAhBggrBgEFBQcw\nAYYVaHR0cDovL3IzLm8ubGVuY3Iub3JnMCIGCCsGAQUFBzAChhZodHRwOi8vcjMu\naS5sZW5jci5vcmcvMCQGA1UdEQQdMBuCGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAu\ndXMwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEF\nBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggEDBgorBgEEAdZ5AgQC\nBIH0BIHxAO8AdgBc3EOS/uarRUSxXprUVuYQN/vV+kfcoXOUsl7m9scOygAAAXeK\nkmOsAAAEAwBHMEUCIQDSudPEWXk969BT8yz3ag6BJWCMRU5tefEw9nXEQMsh5gIg\nUmfGIuUlcNNI5PydVIHj+zns+SR8P7zfd3FIxW4gK0QAdQD2XJQv0XcwIhRUGAgw\nlFaO400TGTO/3wwvIAvMTvFk4wAAAXeKkmOlAAAEAwBGMEQCIHQkr2qOGuInvonv\nW4vvdI61nraax5V6SC3E0D2JSO91AiBVhpX4BBafRAh36r7l8LrxAfxBM3CjBmAC\nq8fUrWfIWDANBgkqhkiG9w0BAQsFAAOCAQEAgGDMKXofKpDdv5kkID3s5GrKdzaj\njFmb/6kyqd1E6eGXZAewCP1EF5BVvR6lBP2aRXiZ6sJVZktoIfztZnbxBGgbPHfv\nR3iXIG6fxkklzR9Y8puPMBFadANE/QV78tIRAlyaqeSNsoxHi7ssQjHTP111B2lf\n3KmuTpsruut1UesEJcPReLk/1xTkRx262wAncach5Wp+6GWWduTZYJbsNFyrK1RP\nYQ0qYpP9wt2qR+DGaRUBG8i1XLnZS8pkyxtKhVw/a5Fowt+NqCpEBjjJiWJRSGnG\nNSgRtSXq11j8O4JONi8EXe7cEtvzUiLR5PL3itsK2svtrZ9jIwQ95wOPaA==\n-----END CERTIFICATE-----"
    }'
"https://${yourOktaDomain}/api/v1/domains/{id}/certificate"
```

##### Response

```http
HTTP/1.1 204 No Content
```
##### Response (Domain not verified)

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000165",
    "errorSummary": "Domain not verified.",
    "errorLink": "E0000165",
    "errorId": "oae6TRc74XJQ_icufbqg1sKEQ",
    "errorCauses": [
        {
            "errorSummary": "Could not verify the specified custom domain. Make sure the TXT record matches the expected value."
        }
    ]
}
```
### Get Domain

<ApiOperation method="get" url="/api/v1/domains/{id}" />

Fetches your Domain

#### Request path parameters

Fetches the Domain by ID

| Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id`        | URL        | Required. ID of the Domain. String.  |


#### Request query parameters
N/A

#### Request body
N/A

#### Response body

* The [DomainResponse](#domainresponse-object).
* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000163`

#### Use examples

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/domains/{id}"
```

##### Response
```json
{
    "id": "OcDz6iRyjkaCTXkdo0g3",
    "domain": "login.example.com",
    "validationStatus": "COMPLETED",
    "dnsRecords": [
        {
            "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ],
            "recordType": "TXT"
        },
        {
            "fqdn": "login.example.com",
            "values": [
                "${yourOktaDomain}.customdomains.okta1.com"
            ],
            "recordType": "CNAME"
        }
    ],
    "publicCertificate": {
        "subject": "CN=login.example.com",
        "fingerprint": "73:68:82:7B:83:2E:48:29:A5:5E:E8:40:41:80:B3:AA:03:C4:42:43:05:73:45:BC:AA:47:00:23:A3:70:E5:C4",
        "expiration": "2021-05-11T05:13:05.000Z"
    },
    "_links": {
        "certificate": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/certificate",
            "hints": {
                "allow": [
                    "PUT"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
            "hints": {
                "allow": [
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

##### Response example (Domain not found)

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000163",
    "errorSummary": "Domain ID not found.",
    "errorLink": "E0000163",
    "errorId": "oaef65fglSvQSiUujoOXI_dAA",
    "errorCauses": [
        {
            "errorSummary": "Could not find custom domain with the given id."
        }
    ]
}
```

### Get all Domains

<ApiOperation method="get" url="/api/v1/domains" />

List all verified custom Domains for the org

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body
N/A

#### Response body

The [DomainListResponse](#domainlistresponse-object)

#### Use examples

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/domains"
```

##### Response
```json
{
    "domains": [
        {
            "id": "OcDz6iRyjkaCTXkdo0g3",
            "domain": "login.example.com",
            "validationStatus": "COMPLETED",
            "_links": {
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
                    "hints": {
                        "allow": [
                            "GET",
                            "DELETE"
                        ]
                    }
                }
            }
        }
    ]
}
```
### Delete Domain

<ApiOperation method="delete" url="/api/v1/domains/{id}" />

Deletes your Domain

#### Request path parameters

Deletes a Domain by ID

| Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id`        | URL        | Required. ID of the Domain. String.   |


#### Request query parameters
N/A

#### Request body
N/A

#### Response parameters

```http
HTTP/1.1 204 No Content
```

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000163`

#### Use examples

```http
HTTP/1.1 204 No Content
```

##### Response example (Domain not found)

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000163",
    "errorSummary": "Domain ID not found.",
    "errorLink": "E0000163",
    "errorId": "oaef65fglSvQSiUujoOXI_dAA",
    "errorCauses": [
        {
            "errorSummary": "Could not find custom domain with the given id."
        }
    ]
}
```

## Domain API objects

### Domain object

#### Domain properties

The Domain object defines the following properties:


| Property                | Type          | Description |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `certificateSourcetype` | `MANUAL`             | Required. Certificate source type that indicates whether the Certificate is provided by the user. Accepted value: `MANUAL`|
| `domain`                | String              | Required. Custom Domain name                                                                                      |




#### Domain example

```json
{
    "domain": "login.example.com",
    "certificateSourceType": "MANUAL"
}
```
### DomainResponse object

#### DomainResponse properties

The DomainResponse object defines the following properties:


| Property                  | Type                                                           | Description                                                                               |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `dnsRecords`              | [DNSRecords](#dnsrecords-object)                               | TXT and CNAME records to be registered for the Domain                                     |
| `domain`                  | String                                                         | Domain name                                                                               |
| `id`                      | String                                                         | Domain ID                                                                                 |
| `_links`                  | [Links](#links-object)                                         | Link relations for this object                                                            |
| `publicCertificate`       | [CertificateMetadata](#certificatemetadata-object)             | (Optional) Certificate metadata for the Domain                                           |
| `validationStatus`        | String                                                         | Status of the domain. Accepted values: `NOT_STARTED`, `IN_PROGRESS`, `VERIFIED`, `COMPLETED` |


#### DomainResponse example

```json
{
    "id": "OcDz6iRyjkaCTXkdo0g3",
    "domain": "login.example.com",
    "validationStatus": "COMPLETED",
    "dnsRecords": [
        {
            "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ],
            "recordType": "TXT"
        },
        {
            "fqdn": "login.example.com",
            "values": [
                "https://${yourOktaDomain}.customdomains.okta1.com"
            ],
            "recordType": "CNAME"
        }
    ],
    "publicCertificate": {
        "subject": "CN=login.example.com",
        "fingerprint": "73:68:82:7B:83:2E:48:29:A5:5E:E8:40:41:80:B3:AA:03:C4:42:43:05:73:45:BC:AA:47:00:23:A3:70:E5:C4",
        "expiration": "2021-05-11T05:13:05.000Z"
    },
    "_links": {
        "certificate": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/certificate",
            "hints": {
                "allow": [
                    "PUT"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
            "hints": {
                "allow": [
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### DomainListResponse object

#### DomainListResponse properties

The DomainListResponse object defines several properties:


| Property                  | Type                                                           | Description                                                                               |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `domain`                  | String                                                         | Domain name                                                                               |
| `id`                      | String                                                         | Domain ID                                                                                 |
| `_links`                  | [Links](#links-object)                                         | Link relations for this object                                                            |
| `validationStatus`        | String                                                         | Status of the Domain. Accepted values: `NOT_STARTED`, `IN_PROGRESS`, `VERIFIED`, `COMPLETED` |


#### DomainListResponse example
```json
{
    "domains": [
        {
            "id": "OcDz6iRyjkaCTXkdo0g3",
            "domain": "login.example.com",
            "validationStatus": "COMPLETED",
            "_links": {
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
                    "hints": {
                        "allow": [
                            "GET",
                            "DELETE"
                        ]
                    }
                }
            }
        }
    ]
}
```

### Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current status of an application using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only.

| Type | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| certificate        | [Creates a Certificate](#create-certificate)                           |
| self               | The actual Domain                                                                               |
| verify             | [Verifies the Domain](#verify-domain) and transitions the Domain status to `VERIFIED`    |

### DNSRecords object

The DNSRecords object defines the following properties:

#### DNSRecords properties

| Property                | Type                                   | Description                           |
|-------------------------|----------------------------------------|---------------------------------------|
| `fqdn`                  | String                                 | DNS record name                       |
| `recordType`            | `TXT`, `CNAME`                         | Record type can be `TXT` or `CNAME`   |
| `values`                | Array                    | DNS verification value                |

### CertificateMetadata object

The CertificateMetadata object defines the following properties:

#### CertificateMetadata properties

| Property                | Type                                                           | Description                                 |
|-------------------------|----------------------------------------------------------------|---------------------------------------------|
| `expiration`            | String                                               | Certificate expiration                      |
| `fingerprint`           | String                                                         | Certificate fingerprint                     |
| `subject`               | String                                                         | Certificate subject                         |



### Certificate object

The Certificate object defines the following properties:

#### Certificate properties

| Property                | Type                                                           | Description                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| `certificate`           | String                                                     | Required. Certificate content                  |
| `certificateChain`      | String                                                     | Optional. Certificate chain                   |
| `privateKey`           | String                                                         | Required. Certificate private key           |
| `type`                | `PEM`                                                         | Required. Certificate type. Accepted value: `PEM` |

#### Certificate example
```json
{
    "type": "PEM",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5cyk6x63iBJSW\nvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvcqFWxdiW3sh2cItzYtoN1Zfgj5lWG\nOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQmpqi9zaP/aKJklk6LdPFbVLGhuZfm\n34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCla2ifFzjz2FCkMMEc/Y0zUyP+en/m\nbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWgCZQq/AZYj9RxR23IIuRcUJ8TQ2py\noc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKrIBIo+qyHweifpPYW28ipdSbPjiyp\nAMdpbGLDAgMBAAECggEAUXVfT91z6IqghhKwO8QtC5T/+fN06B8rCYSKj/FFoZL0\n0oTiLFuYwImoCadoUDQUE/Efj0rKE2LSgFHg/44IItQXE01m+5WmHmL1ADxsyoLH\nz9yDosKj7jNM7RyV8F8Bg0pL1hU+rU4rhhL/MaS0mx4eFYjC4UmcWBmXTdelSVJa\nkvXvQLT5y86bqh7tqMjM/kALTWRz5CgNJFk/ONA1yo5RTX9S7SIXimBgAvuGqP8i\nMPEhJou7U3DfzXVfvP8byqNdsZs6ZNhG3wXspl61mRyrY+51SOaNLA7Bkji7x4bH\nNw6mJI0IJTAP9oc1Z8fYeMuxT1bfuD7VOupSP0mAMQKBgQDk+KuyQkmPymeP/Wwu\nII4DUpleVzxTK9obMQQoCEEElbQ6+jTb+8ixP0bWLvBXg/rX734j7OWfn/bljWLH\nXLrSoqQZF1+XMVeY4g4wx9UuTK/D2n791zdOgQivxbIPdWL3a4ap86ar8uyMgJu8\nBLXfFBAOc+9myqUkbeO7wt0e6QKBgQDPV04jPtIJoMrggpQDNreGrANKOmsXWxj4\nOHW13QNdJ2KGQpoTdoqQ8ZmlxuA8Bf2RjHsnB2kgGVTVQR74zRib4MByhvsdhvVm\nF2LNsJoIDfqtv3c+oj13VonRUGuzUeJpwT/snyaL+jQ/ZZcYz0jDgDhIODTcFYj8\nDMSD5SHgywKBgHH6MwWuJ44TNBAiF2qyu959jGjAxf+k0ZI9iRMgYLUWjDvbdtqW\ncCWDGRDfFraJtSEuTz003GzkJPPJuIUC7OCTI1p2HxhU8ITi6itwHfdJJyk4J4TW\nT+qdIqTUpTk6tsPw23zYE3x+lS+viVZDhgEArKl1HpOthh0nMnixnH6ZAoGBAKGn\nV+xy1h9bldFk/TFkP8Jn6ki9MzGKfPVKT7vzDORcCJzU4Hu8OFy5gSmW3Mzvfrsz\n4/CR/oxgM5vwoc0pWr5thJ3GT5K93iYypX3o6q7M91zvonDa3UFl3x2qrc2pUfVS\nDhzWGJ+Z+5JSCnP1aK3EEh18dPoCcELTUYPj6X3xAoGBALAllTb3RCIaqIqk+s3Y\n6KDzikgwGM6j9lmOI2MH4XmCVym4Z40YGK5nxulDh2Ihn/n9zm13Z7ul2DJwgQSO\n0zBc7/CMOsMEBaNXuKL8Qj4enJXMtub4waQ/ywqHIdc50YaPI5Ax8dD/10h9M6Qc\nnUFLNE8pXSnsqb0eOL74f3uQ\n-----END PRIVATE KEY-----",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIFNzCCBB+gAwIBAgISBAXomJWRama3ypu8TIxdA9wzMA0GCSqGSIb3DQEBCwUA\nMDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\nEwJSMzAeFw0yMTAyMTAwNTEzMDVaFw0yMTA1MTEwNTEzMDVaMCQxIjAgBgNVBAMT\nGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAudXMwggEiMA0GCSqGSIb3DQEBAQUAA4IB\nDwAwggEKAoIBAQC5cyk6x63iBJSWvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvc\nqFWxdiW3sh2cItzYtoN1Zfgj5lWGOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQm\npqi9zaP/aKJklk6LdPFbVLGhuZfm34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCl\na2ifFzjz2FCkMMEc/Y0zUyP+en/mbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWg\nCZQq/AZYj9RxR23IIuRcUJ8TQ2pyoc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKr\nIBIo+qyHweifpPYW28ipdSbPjiypAMdpbGLDAgMBAAGjggJTMIICTzAOBgNVHQ8B\nAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB\n/wQCMAAwHQYDVR0OBBYEFPVZKiovtIK4Av/IBUQeLUs29pT6MB8GA1UdIwQYMBaA\nFBQusxe3WFbLrlAJQOYfr52LFMLGMFUGCCsGAQUFBwEBBEkwRzAhBggrBgEFBQcw\nAYYVaHR0cDovL3IzLm8ubGVuY3Iub3JnMCIGCCsGAQUFBzAChhZodHRwOi8vcjMu\naS5sZW5jci5vcmcvMCQGA1UdEQQdMBuCGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAu\ndXMwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEF\nBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggEDBgorBgEEAdZ5AgQC\nBIH0BIHxAO8AdgBc3EOS/uarRUSxXprUVuYQN/vV+kfcoXOUsl7m9scOygAAAXeK\nkmOsAAAEAwBHMEUCIQDSudPEWXk969BT8yz3ag6BJWCMRU5tefEw9nXEQMsh5gIg\nUmfGIuUlcNNI5PydVIHj+zns+SR8P7zfd3FIxW4gK0QAdQD2XJQv0XcwIhRUGAgw\nlFaO400TGTO/3wwvIAvMTvFk4wAAAXeKkmOlAAAEAwBGMEQCIHQkr2qOGuInvonv\nW4vvdI61nraax5V6SC3E0D2JSO91AiBVhpX4BBafRAh36r7l8LrxAfxBM3CjBmAC\nq8fUrWfIWDANBgkqhkiG9w0BAQsFAAOCAQEAgGDMKXofKpDdv5kkID3s5GrKdzaj\njFmb/6kyqd1E6eGXZAewCP1EF5BVvR6lBP2aRXiZ6sJVZktoIfztZnbxBGgbPHfv\nR3iXIG6fxkklzR9Y8puPMBFadANE/QV78tIRAlyaqeSNsoxHi7ssQjHTP111B2lf\n3KmuTpsruut1UesEJcPReLk/1xTkRx262wAncach5Wp+6GWWduTZYJbsNFyrK1RP\nYQ0qYpP9wt2qR+DGaRUBG8i1XLnZS8pkyxtKhVw/a5Fowt+NqCpEBjjJiWJRSGnG\nNSgRtSXq11j8O4JONi8EXe7cEtvzUiLR5PL3itsK2svtrZ9jIwQ95wOPaA==\n-----END CERTIFICATE-----"
}
```
