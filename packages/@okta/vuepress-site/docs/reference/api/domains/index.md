---
title: Domains
category: management
---

# Domains API

The Domains API reference is now available at the new [Okta API reference portal](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomDomain/) as Custom Domains API.

Explore the [Okta Public API Collections](https://www.postman.com/okta-eng/workspace/okta-public-api-collections/overview) workspace to get started with the Custom Domains API Postman collection.

<!-- {api content} The Okta Domains API provides operations to manage custom domains for your organization.

## Getting Started

Explore the Domains API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/96fbe3dea3ccd0602186)

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
    "certificateSourceType": "MANUAL",
    "validationStatus": "NOT_STARTED",
    "dnsRecords": [
        {
          "recordType": "TXT",
          "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ]
        },
        {
            "fqdn": "login.sigmanetcorp.us",
            "values": [
                "{yourOktaDomain}.customdomains.okta1.com"
            ],
            "recordType": "CNAME"
        }
    ],
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/verify",
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

<ApiOperation method="post" url="/api/v1/domains/${id}/verify" />

Verifies the Domain and validity of DNS records. Furthermore, if the 'certificateSourceType' in the [Domain](#domain-object) is `OKTA_MANAGED`, then an attempt is made to obtain and install a certificate.  After a certificate is obtained and installed by Okta, Okta manages the certificate including certificate renewal.

#### Request path parameters

Verifies the Domain by the given `id`

|Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id `       | String        | Required. ID of the Domain. |

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
    "certificateSourceType": "MANUAL",
    "validationStatus": "VERIFIED",
    "dnsRecords": [
        {
          "recordType": "TXT",
          "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ]
        },
        {
            "fqdn": "login.example.com",
            "values": [
                "{yourOktaDomain}.customdomains.okta1.com"
            ],
            "recordType": "CNAME"
        }
    ],
   "_links": {
           "certificate": {
               "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/certificate",
               "hints": {
                   "allow": [
                       "PUT"
                   ]
               }
           },
           "self": {
               "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
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

### Create certificate

<ApiOperation method="put" url="/api/v1/domains/${id}/certificate" />

Creates or renews the `MANUAL` certificate for the Domain. If the certificateSourceType in the [Domain](#domain-object) is `OKTA_MANAGED`, it becomes `MANUAL` and Okta no longer manages and renews certificates for this domain since a user-managed certificate has been provided. 

#### Request path parameters

Creates the certificate for the Domain by ID

| Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id `       | String        | Required. ID of the certificate. |

#### Request body
The [certificate](#certificate-object)

#### Response parameters

```http
HTTP/1.1 204 No Content
```

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000163`
* Passing a non-verified Domain returns a `403 Forbidden` status code with error code `E0000165`. You must verify the Domain before creating the certificate.

#### Use examples

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
        "type": "PEM",
        "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5cyk6x63iBJSW\nvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvcqFWxdiW3sh2cItzYtoN1Zfgj5lWG\nOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQmpqi9zaP/aKJklk6LdPFbVLGhuZfm\n34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCla2ifFzjz2FCkMMEc/Y0zUyP+en/m\nbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWgCZQq/AZYj9RxR23IIuRcUJ8TQ2py\noc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKrIBIo+qyHweifpPYW28ipdSbPjiyp\nAMdpbGLDAgMBAAECggEAUXVfT91z6IqghhKwO8QtC5T/+fN06B8rCYSKj/FFoZL0\n0oTiLFuYwImoCadoUDQUE/Efj0rKE2LSgFHg/44IItQXE01m+5WmHmL1ADxsyoLH\nz9yDosKj7jNM7RyV8F8Bg0pL1hU+rU4rhhL/MaS0mx4eFYjC4UmcWBmXTdelSVJa\nkvXvQLT5y86bqh7tqMjM/kALTWRz5CgNJFk/ONA1yo5RTX9S7SIXimBgAvuGqP8i\nMPEhJou7U3DfzXVfvP8byqNdsZs6ZNhG3wXspl61mRyrY+51SOaNLA7Bkji7x4bH\nNw6mJI0IJTAP9oc1Z8fYeMuxT1bfuD7VOupSP0mAMQKBgQDk+KuyQkmPymeP/Wwu\nII4DUpleVzxTK9obMQQoCEEElbQ6+jTb+8ixP0bWLvBXg/rX734j7OWfn/bljWLH\nXLrSoqQZF1+XMVeY4g4wx9UuTK/D2n791zdOgQivxbIPdWL3a4ap86ar8uyMgJu8\nBLXfFBAOc+9myqUkbeO7wt0e6QKBgQDPV04jPtIJoMrggpQDNreGrANKOmsXWxj4\nOHW13QNdJ2KGQpoTdoqQ8ZmlxuA8Bf2RjHsnB2kgGVTVQR74zRib4MByhvsdhvVm\nF2LNsJoIDfqtv3c+oj13VonRUGuzUeJpwT/snyaL+jQ/ZZcYz0jDgDhIODTcFYj8\nDMSD5SHgywKBgHH6MwWuJ44TNBAiF2qyu959jGjAxf+k0ZI9iRMgYLUWjDvbdtqW\ncCWDGRDfFraJtSEuTz003GzkJPPJuIUC7OCTI1p2HxhU8ITi6itwHfdJJyk4J4TW\nT+qdIqTUpTk6tsPw23zYE3x+lS+viVZDhgEArKl1HpOthh0nMnixnH6ZAoGBAKGn\nV+xy1h9bldFk/TFkP8Jn6ki9MzGKfPVKT7vzDORcCJzU4Hu8OFy5gSmW3Mzvfrsz\n4/CR/oxgM5vwoc0pWr5thJ3GT5K93iYypX3o6q7M91zvonDa3UFl3x2qrc2pUfVS\nDhzWGJ+Z+5JSCnP1aK3EEh18dPoCcELTUYPj6X3xAoGBALAllTb3RCIaqIqk+s3Y\n6KDzikgwGM6j9lmOI2MH4XmCVym4Z40YGK5nxulDh2Ihn/n9zm13Z7ul2DJwgQSO\n0zBc7/CMOsMEBaNXuKL8Qj4enJXMtub4waQ/ywqHIdc50YaPI5Ax8dD/10h9M6Qc\nnUFLNE8pXSnsqb0eOL74f3uQ\n-----END PRIVATE KEY-----",
        "certificate": "-----BEGIN CERTIFICATE-----\nMIIFNzCCBB+gAwIBAgISBAXomJWRama3ypu8TIxdA9wzMA0GCSqGSIb3DQEBCwUA\nMDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\nEwJSMzAeFw0yMTAyMTAwNTEzMDVaFw0yMTA1MTEwNTEzMDVaMCQxIjAgBgNVBAMT\nGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAudXMwggEiMA0GCSqGSIb3DQEBAQUAA4IB\nDwAwggEKAoIBAQC5cyk6x63iBJSWvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvc\nqFWxdiW3sh2cItzYtoN1Zfgj5lWGOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQm\npqi9zaP/aKJklk6LdPFbVLGhuZfm34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCl\na2ifFzjz2FCkMMEc/Y0zUyP+en/mbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWg\nCZQq/AZYj9RxR23IIuRcUJ8TQ2pyoc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKr\nIBIo+qyHweifpPYW28ipdSbPjiypAMdpbGLDAgMBAAGjggJTMIICTzAOBgNVHQ8B\nAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB\n/wQCMAAwHQYDVR0OBBYEFPVZKiovtIK4Av/IBUQeLUs29pT6MB8GA1UdIwQYMBaA\nFBQusxe3WFbLrlAJQOYfr52LFMLGMFUGCCsGAQUFBwEBBEkwRzAhBggrBgEFBQcw\nAYYVaHR0cDovL3IzLm8ubGVuY3Iub3JnMCIGCCsGAQUFBzAChhZodHRwOi8vcjMu\naS5sZW5jci5vcmcvMCQGA1UdEQQdMBuCGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAu\ndXMwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEF\nBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggEDBgorBgEEAdZ5AgQC\nBIH0BIHxAO8AdgBc3EOS/uarRUSxXprUVuYQN/vV+kfcoXOUsl7m9scOygAAAXeK\nkmOsAAAEAwBHMEUCIQDSudPEWXk969BT8yz3ag6BJWCMRU5tefEw9nXEQMsh5gIg\nUmfGIuUlcNNI5PydVIHj+zns+SR8P7zfd3FIxW4gK0QAdQD2XJQv0XcwIhRUGAgw\nlFaO400TGTO/3wwvIAvMTvFk4wAAAXeKkmOlAAAEAwBGMEQCIHQkr2qOGuInvonv\nW4vvdI61nraax5V6SC3E0D2JSO91AiBVhpX4BBafRAh36r7l8LrxAfxBM3CjBmAC\nq8fUrWfIWDANBgkqhkiG9w0BAQsFAAOCAQEAgGDMKXofKpDdv5kkID3s5GrKdzaj\njFmb/6kyqd1E6eGXZAewCP1EF5BVvR6lBP2aRXiZ6sJVZktoIfztZnbxBGgbPHfv\nR3iXIG6fxkklzR9Y8puPMBFadANE/QV78tIRAlyaqeSNsoxHi7ssQjHTP111B2lf\n3KmuTpsruut1UesEJcPReLk/1xTkRx262wAncach5Wp+6GWWduTZYJbsNFyrK1RP\nYQ0qYpP9wt2qR+DGaRUBG8i1XLnZS8pkyxtKhVw/a5Fowt+NqCpEBjjJiWJRSGnG\nNSgRtSXq11j8O4JONi8EXe7cEtvzUiLR5PL3itsK2svtrZ9jIwQ95wOPaA==\n-----END CERTIFICATE-----",
        "certificateChain": "-----BEGIN CERTIFICATE-----\nMIIFPjCCBCagAwIBAgISA7RikMlsj36DkLk1CUzjwfYBMA0GCSqGSIb3DQEBCwUA\nMDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\nEwJSMzAeFw0yMTEwMTExOTQ3MjRaFw0yMjAxMDkxOTQ3MjNaMCgxJjAkBgNVBAMT\nHWFuaXRhdGVzdHJhaW4uc2lnbWFuZXRjb3JwLnVzMIIBIjANBgkqhkiG9w0BAQEF\nAAOCAQ8AMIIBCgKCAQEA40EsG7YrFlsH3XdZKirdKKOC7/cca5g9L4rwyA/PlfeU\nB7mJhbQI/a3yZbtY+GjHmedBx15aPtyq+NFZLOkiRCXx0k2zNIJB4yC6Jr/Yp8C2\nrXO6mrCcuqpX7SuDPBtrfdYcIg8G6m0wjj1V1p2/XR8G//CBe8I2XTaTpHsx/VC8\nMNOAA27aSbeX4Nz6TQ69rFuxRG+neUbcz2hQKwroCsCHi6iBmqRkg19Uh8315Cx2\nBUqY0JecpP42KMiktzIoSlqS9yZSuNQh1kP1tPwkEzbs/t3FrfCnnRx5RDr2pJpV\nnonL3sB3TVotS3nFgPNHCfp65O0Bg/3ZpU9IvUpcdQIDAQABo4ICVjCCAlIwDgYD\nVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNV\nHRMBAf8EAjAAMB0GA1UdDgQWBBSzWt3Dvp71cKA2Z54ESjjyM4dp+jAfBgNVHSME\nGDAWgBQULrMXt1hWy65QCUDmH6+dixTCxjBVBggrBgEFBQcBAQRJMEcwIQYIKwYB\nBQUHMAGGFWh0dHA6Ly9yMy5vLmxlbmNyLm9yZzAiBggrBgEFBQcwAoYWaHR0cDov\nL3IzLmkubGVuY3Iub3JnLzAoBgNVHREEITAfgh1hbml0YXRlc3RyYWluLnNpZ21h\nbmV0Y29ycC51czBMBgNVHSAERTBDMAgGBmeBDAECATA3BgsrBgEEAYLfEwEBATAo\nMCYGCCsGAQUFBwIBFhpodHRwOi8vY3BzLmxldHNlbmNyeXB0Lm9yZzCCAQIGCisG\nAQQB1nkCBAIEgfMEgfAA7gB1AG9Tdqwx8DEZ2JkApFEV/3cVHBHZAsEAKQaNsgia\nN9kTAAABfHEcLqAAAAQDAEYwRAIgMlyQ61FjuIKDfATjz0wfkskChD0csVe0TStq\nmC7NbLACICp3CYMvvDiWt1pr5pzCwTQO8F6v0/qNjmH4mjCutAgyAHUARqVV63X6\nkSAwtaKJafTzfREsQXS+/Um4havy/HD+bUcAAAF8cRwvRAAABAMARjBEAiAZd6Vn\n7MLXT7JeIxZrfbNARrf5oCM4UAVjjJeaUhB1MwIgSLW5cVAZvkiwbQW+vIutFjBz\na8cNb/i+nM7RxFW+JPgwDQYJKoZIhvcNAQELBQADggEBAIlHZiHIuOvYFteqpwvR\n0ElqinIpkYsfI+0O5FwHBXz7vMCPGtfdlcX5M10eW3aEBo9lR59mjDMsMufbTb60\nJuSnguelkUoq4WzqjZI+2uy/FTztI5GPpXmXW3IyzbqmCWQt7u8N607g1TYLBaLL\nrbFIhl+LbTJAa//mxI6bb4l/86j/kSjht6U0OIde7ylscb+3MHobbpIWJYp8Jr1D\nubm/0glL46ExnuLbIKojLhDBnG/wHVunB0rJxGh1vPvwD75O1nSIdxuNlVcGwws+\n7wsOyPA1s0VWzrMN1olLMyIPFCwPvfCm1E8Dje1AXMpmyDlqjEoQsoMUH//GKF0S\nTgM=\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFFjCCAv6gAwIBAgIRAJErCErPDBinU/bWLiWnX1owDQYJKoZIhvcNAQELBQAw\nTzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\ncmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjAwOTA0MDAwMDAw\nWhcNMjUwOTE1MTYwMDAwWjAyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNTGV0J3Mg\nRW5jcnlwdDELMAkGA1UEAxMCUjMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQC7AhUozPaglNMPEuyNVZLD+ILxmaZ6QoinXSaqtSu5xUyxr45r+XXIo9cP\nR5QUVTVXjJ6oojkZ9YI8QqlObvU7wy7bjcCwXPNZOOftz2nwWgsbvsCUJCWH+jdx\nsxPnHKzhm+/b5DtFUkWWqcFTzjTIUu61ru2P3mBw4qVUq7ZtDpelQDRrK9O8Zutm\nNHz6a4uPVymZ+DAXXbpyb/uBxa3Shlg9F8fnCbvxK/eG3MHacV3URuPMrSXBiLxg\nZ3Vms/EY96Jc5lP/Ooi2R6X/ExjqmAl3P51T+c8B5fWmcBcUr2Ok/5mzk53cU6cG\n/kiFHaFpriV1uxPMUgP17VGhi9sVAgMBAAGjggEIMIIBBDAOBgNVHQ8BAf8EBAMC\nAYYwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMBIGA1UdEwEB/wQIMAYB\nAf8CAQAwHQYDVR0OBBYEFBQusxe3WFbLrlAJQOYfr52LFMLGMB8GA1UdIwQYMBaA\nFHm0WeZ7tuXkAXOACIjIGlj26ZtuMDIGCCsGAQUFBwEBBCYwJDAiBggrBgEFBQcw\nAoYWaHR0cDovL3gxLmkubGVuY3Iub3JnLzAnBgNVHR8EIDAeMBygGqAYhhZodHRw\nOi8veDEuYy5sZW5jci5vcmcvMCIGA1UdIAQbMBkwCAYGZ4EMAQIBMA0GCysGAQQB\ngt8TAQEBMA0GCSqGSIb3DQEBCwUAA4ICAQCFyk5HPqP3hUSFvNVneLKYY611TR6W\nPTNlclQtgaDqw+34IL9fzLdwALduO/ZelN7kIJ+m74uyA+eitRY8kc607TkC53wl\nikfmZW4/RvTZ8M6UK+5UzhK8jCdLuMGYL6KvzXGRSgi3yLgjewQtCPkIVz6D2QQz\nCkcheAmCJ8MqyJu5zlzyZMjAvnnAT45tRAxekrsu94sQ4egdRCnbWSDtY7kh+BIm\nlJNXoB1lBMEKIq4QDUOXoRgffuDghje1WrG9ML+Hbisq/yFOGwXD9RiX8F6sw6W4\navAuvDszue5L3sz85K+EC4Y/wFVDNvZo4TYXao6Z0f+lQKc0t8DQYzk1OXVu8rp2\nyJMC6alLbBfODALZvYH7n7do1AZls4I9d1P4jnkDrQoxB3UqQ9hVl3LEKQ73xF1O\nyK5GhDDX8oVfGKF5u+decIsH4YaTw7mP3GFxJSqv3+0lUFJoi5Lc5da149p90Ids\nhCExroL1+7mryIkXPeFM5TgO9r0rvZaBFOvV2z0gp35Z0+L4WPlbuEjN/lxPFin+\nHlUjr8gRsI3qfJOQFy/9rKIJR0Y/8Omwt/8oTWgy1mdeHmmjk7j1nYsvC9JSQ6Zv\nMldlTTKB3zhThV1+XWYp6rjd5JW1zbVWEkLNxE7GJThEUG3szgBVGP7pSWTUTsqX\nnLRbwHOoq7hHwg==\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFYDCCBEigAwIBAgIQQAF3ITfU6UK47naqPGQKtzANBgkqhkiG9w0BAQsFADA/\nMSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\nDkRTVCBSb290IENBIFgzMB4XDTIxMDEyMDE5MTQwM1oXDTI0MDkzMDE4MTQwM1ow\nTzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\ncmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwggIiMA0GCSqGSIb3DQEB\nAQUAA4ICDwAwggIKAoICAQCt6CRz9BQ385ueK1coHIe+3LffOJCMbjzmV6B493XC\nov71am72AE8o295ohmxEk7axY/0UEmu/H9LqMZshftEzPLpI9d1537O4/xLxIZpL\nwYqGcWlKZmZsj348cL+tKSIG8+TA5oCu4kuPt5l+lAOf00eXfJlII1PoOK5PCm+D\nLtFJV4yAdLbaL9A4jXsDcCEbdfIwPPqPrt3aY6vrFk/CjhFLfs8L6P+1dy70sntK\n4EwSJQxwjQMpoOFTJOwT2e4ZvxCzSow/iaNhUd6shweU9GNx7C7ib1uYgeGJXDR5\nbHbvO5BieebbpJovJsXQEOEO3tkQjhb7t/eo98flAgeYjzYIlefiN5YNNnWe+w5y\nsR2bvAP5SQXYgd0FtCrWQemsAXaVCg/Y39W9Eh81LygXbNKYwagJZHduRze6zqxZ\nXmidf3LWicUGQSk+WT7dJvUkyRGnWqNMQB9GoZm1pzpRboY7nn1ypxIFeFntPlF4\nFQsDj43QLwWyPntKHEtzBRL8xurgUBN8Q5N0s8p0544fAQjQMNRbcTa0B7rBMDBc\nSLeCO5imfWCKoqMpgsy6vYMEG6KDA0Gh1gXxG8K28Kh8hjtGqEgqiNx2mna/H2ql\nPRmP6zjzZN7IKw0KKP/32+IVQtQi0Cdd4Xn+GOdwiK1O5tmLOsbdJ1Fu/7xk9TND\nTwIDAQABo4IBRjCCAUIwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYw\nSwYIKwYBBQUHAQEEPzA9MDsGCCsGAQUFBzAChi9odHRwOi8vYXBwcy5pZGVudHJ1\nc3QuY29tL3Jvb3RzL2RzdHJvb3RjYXgzLnA3YzAfBgNVHSMEGDAWgBTEp7Gkeyxx\n+tvhS5B1/8QVYIWJEDBUBgNVHSAETTBLMAgGBmeBDAECATA/BgsrBgEEAYLfEwEB\nATAwMC4GCCsGAQUFBwIBFiJodHRwOi8vY3BzLnJvb3QteDEubGV0c2VuY3J5cHQu\nb3JnMDwGA1UdHwQ1MDMwMaAvoC2GK2h0dHA6Ly9jcmwuaWRlbnRydXN0LmNvbS9E\nU1RST09UQ0FYM0NSTC5jcmwwHQYDVR0OBBYEFHm0WeZ7tuXkAXOACIjIGlj26Ztu\nMA0GCSqGSIb3DQEBCwUAA4IBAQAKcwBslm7/DlLQrt2M51oGrS+o44+/yQoDFVDC\n5WxCu2+b9LRPwkSICHXM6webFGJueN7sJ7o5XPWioW5WlHAQU7G75K/QosMrAdSW\n9MUgNTP52GE24HGNtLi1qoJFlcDyqSMo59ahy2cI2qBDLKobkx/J3vWraV0T9VuG\nWCLKTVXkcGdtwlfFRjlBz4pYg1htmf5X6DYO8A4jqv2Il9DjXA6USbW1FzXSLr9O\nhe8Y4IWS6wY7bCkjCWDcRQJMEhg76fsO3txE+FiYruq9RUWhiF1myv4Q6W+CyBFC\nDfvp7OOGAN6dEOM4+qR9sdjoSYKEBpsr6GtPAQw4dy753ec5\n-----END CERTIFICATE-----"
}' "https://${yourOktaDomain}/api/v1/domains/{id}/certificate"
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

<ApiOperation method="get" url="/api/v1/domains/${id}" />

Fetches your Domain

#### Request path parameters

Fetches the Domain by ID

| Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id`        | String        | Required. ID of the Domain.  |

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
    "certificateSourceType": "OKTA_MANAGED",
    "validationStatus": "COMPLETED",
    "dnsRecords": [
        {
          "recordType": "TXT",
          "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ],
          "expiration": "2021-11-23T02:04:28.000Z"
        },
        {
          "recordType": "CNAME",
          "fqdn": "login.example.com",
            "values": [
                "{yourOktaDomain}.customdomains.okta1.com"
            ]
        }
    ],
    "publicCertificate": {
        "subject": "CN=login.example.com",
        "fingerprint": "73:68:82:7B:83:2E:48:29:A5:5E:E8:40:41:80:B3:AA:03:C4:42:43:05:73:45:BC:AA:47:00:23:A3:70:E5:C4",
        "expiration": "2021-05-11T05:13:05.000Z"
    },
    "_links": {
        "certificate": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/certificate",
            "hints": {
                "allow": [
                    "PUT"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
            "hints": {
                "allow": [
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/verify",
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
            "certificateSourceType": "MANUAL",
            "validationStatus": "COMPLETED",
            "_links": {
                "self": {
                    "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
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

<ApiOperation method="delete" url="/api/v1/domains/${id}" />

Deletes your Domain

#### Request path parameters

Deletes a Domain by ID

| Parameter  | Type | Description |
| --------- | ------------ | ---------- |
| `id`        | String        | Required. ID of the Domain.   |


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

The Domain object defines the following properties:

| Property                | Type          | Description |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `certificateSourcetype` | String            | Required. Certificate source type that indicates whether the certificate is provided by the user or Okta.  Accepted values: `MANUAL`, `OKTA_MANAGED`.|
| `domain`                | String              | Required. Custom Domain name                                                                                      |

#### Domain example

```json
{
    "domain": "login.example.com",
    "certificateSourceType": "MANUAL"
}
```

### DomainResponse object

The DomainResponse object defines the following properties:

| Property                  | Type                                                           | Description                                                                               |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `certificateSourceType`   | String                                                       | Certificate source type that indicates whether the certificate is provided by the user or Okta.                                     |
| `dnsRecords`              | Array of [DNSRecord](#dnsrecord-object)                        | TXT and CNAME records to be registered for the Domain
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
    "certificateSourceType": "MANUAL",
    "validationStatus": "COMPLETED",
    "dnsRecords": [
        {
          "recordType": "TXT",
          "fqdn": "_oktaverification.login.example.com",
            "values": [
                "79496f234c814638b1cc44f51a782781"
            ]
        },
        {
          "recordType": "CNAME",
          "fqdn": "login.example.com",
            "values": [
                "{yourOktaDomain}.customdomains.okta1.com"
            ],
        }
    ],
    "publicCertificate": {
        "subject": "CN=login.example.com",
        "fingerprint": "73:68:82:7B:83:2E:48:29:A5:5E:E8:40:41:80:B3:AA:03:C4:42:43:05:73:45:BC:AA:47:00:23:A3:70:E5:C4",
        "expiration": "2021-05-11T05:13:05.000Z"
    },
    "_links": {
        "certificate": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/certificate",
            "hints": {
                "allow": [
                    "PUT"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
            "hints": {
                "allow": [
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3/verify",
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

The DomainListResponse object defines list of domains with a subset of the properties for each domain:

| Property                  | Type                                                           | Description                                                                               |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `domains`                  | Array of [DomainResponse](#domainresponse-object)             | Describes the domains       |

#### DomainListResponse example

```json
{
    "domains": [
        {
            "id": "OcDz6iRyjkaCTXkdo0g3",
            "domain": "login.example.com",
            "certificateSourceType": "MANUAL",
            "validationStatus": "COMPLETED",
            "_links": {
                "self": {
                    "href": "https://{yourOktaDomain}/api/v1/domains/OcDz6iRyjkaCTXkdo0g3",
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

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current status of an application using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only.

| Type | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| certificate        | [Creates a certificate](#create-certificate)                           |
| self               | The actual Domain                                                                               |
| verify             | [Verifies the Domain](#verify-domain) and transitions the Domain status to `VERIFIED`    |

### DNSRecord object

The DNSRecord object defines the following properties:

| Property                | Type                                   | Description                           |
|-------------------------|----------------------------------------|---------------------------------------|
| `expiration`            | String                                 | (Optional) TXT record expiration               |
| `fqdn`                  | String                                 | DNS record name                       |
| `recordType`            | String                         | Record type can be `TXT` or `CNAME`   |
| `values`                | Array                             | DNS verification value                |

### CertificateMetadata object

The CertificateMetadata object defines the following properties:

| Property                | Type                                                           | Description                                 |
|-------------------------|----------------------------------------------------------------|---------------------------------------------|
| `expiration`            | String                                                         | Certificate expiration                      |
| `fingerprint`           | String                                                         | Certificate fingerprint                     |
| `subject`               | String                                                         | Certificate subject                         |

### Certificate object

The certificate object defines the following properties:

| Property                | Type                                                           | Description                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| `certificate`           | String                                                     | Required. Certificate content                  |
| `certificateChain`      | String                                                     | Required. Certificate chain                   |
| `privateKey`           | String                                                         | Required. Certificate private key           |
| `type`                | String                                                         | Required. Certificate type. Accepted value: `PEM` |

#### Certificate example
```json
{
    "type": "PEM",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5cyk6x63iBJSW\nvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvcqFWxdiW3sh2cItzYtoN1Zfgj5lWG\nOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQmpqi9zaP/aKJklk6LdPFbVLGhuZfm\n34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCla2ifFzjz2FCkMMEc/Y0zUyP+en/m\nbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWgCZQq/AZYj9RxR23IIuRcUJ8TQ2py\noc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKrIBIo+qyHweifpPYW28ipdSbPjiyp\nAMdpbGLDAgMBAAECggEAUXVfT91z6IqghhKwO8QtC5T/+fN06B8rCYSKj/FFoZL0\n0oTiLFuYwImoCadoUDQUE/Efj0rKE2LSgFHg/44IItQXE01m+5WmHmL1ADxsyoLH\nz9yDosKj7jNM7RyV8F8Bg0pL1hU+rU4rhhL/MaS0mx4eFYjC4UmcWBmXTdelSVJa\nkvXvQLT5y86bqh7tqMjM/kALTWRz5CgNJFk/ONA1yo5RTX9S7SIXimBgAvuGqP8i\nMPEhJou7U3DfzXVfvP8byqNdsZs6ZNhG3wXspl61mRyrY+51SOaNLA7Bkji7x4bH\nNw6mJI0IJTAP9oc1Z8fYeMuxT1bfuD7VOupSP0mAMQKBgQDk+KuyQkmPymeP/Wwu\nII4DUpleVzxTK9obMQQoCEEElbQ6+jTb+8ixP0bWLvBXg/rX734j7OWfn/bljWLH\nXLrSoqQZF1+XMVeY4g4wx9UuTK/D2n791zdOgQivxbIPdWL3a4ap86ar8uyMgJu8\nBLXfFBAOc+9myqUkbeO7wt0e6QKBgQDPV04jPtIJoMrggpQDNreGrANKOmsXWxj4\nOHW13QNdJ2KGQpoTdoqQ8ZmlxuA8Bf2RjHsnB2kgGVTVQR74zRib4MByhvsdhvVm\nF2LNsJoIDfqtv3c+oj13VonRUGuzUeJpwT/snyaL+jQ/ZZcYz0jDgDhIODTcFYj8\nDMSD5SHgywKBgHH6MwWuJ44TNBAiF2qyu959jGjAxf+k0ZI9iRMgYLUWjDvbdtqW\ncCWDGRDfFraJtSEuTz003GzkJPPJuIUC7OCTI1p2HxhU8ITi6itwHfdJJyk4J4TW\nT+qdIqTUpTk6tsPw23zYE3x+lS+viVZDhgEArKl1HpOthh0nMnixnH6ZAoGBAKGn\nV+xy1h9bldFk/TFkP8Jn6ki9MzGKfPVKT7vzDORcCJzU4Hu8OFy5gSmW3Mzvfrsz\n4/CR/oxgM5vwoc0pWr5thJ3GT5K93iYypX3o6q7M91zvonDa3UFl3x2qrc2pUfVS\nDhzWGJ+Z+5JSCnP1aK3EEh18dPoCcELTUYPj6X3xAoGBALAllTb3RCIaqIqk+s3Y\n6KDzikgwGM6j9lmOI2MH4XmCVym4Z40YGK5nxulDh2Ihn/n9zm13Z7ul2DJwgQSO\n0zBc7/CMOsMEBaNXuKL8Qj4enJXMtub4waQ/ywqHIdc50YaPI5Ax8dD/10h9M6Qc\nnUFLNE8pXSnsqb0eOL74f3uQ\n-----END PRIVATE KEY-----",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIFNzCCBB+gAwIBAgISBAXomJWRama3ypu8TIxdA9wzMA0GCSqGSIb3DQEBCwUA\nMDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\nEwJSMzAeFw0yMTAyMTAwNTEzMDVaFw0yMTA1MTEwNTEzMDVaMCQxIjAgBgNVBAMT\nGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAudXMwggEiMA0GCSqGSIb3DQEBAQUAA4IB\nDwAwggEKAoIBAQC5cyk6x63iBJSWvtgsOBqIxfO8euPHcRnyWsL9dsvnbNyOnyvc\nqFWxdiW3sh2cItzYtoN1Zfgj5lWGOVXbHxP0VaNG9fHVX3+NHP6LFHQz92BzAYQm\npqi9zaP/aKJklk6LdPFbVLGhuZfm34+ijW9YsgLTKR2WTaZJK5QtamVVmP+VsSCl\na2ifFzjz2FCkMMEc/Y0zUyP+en/mbL71K+VnpZdlEC1s38EvjRTFKFZTKVw5wpWg\nCZQq/AZYj9RxR23IIuRcUJ8TQ2pyoc3kIXPWjiIarSgBlA8G9kCsxgzXP2RyLwKr\nIBIo+qyHweifpPYW28ipdSbPjiypAMdpbGLDAgMBAAGjggJTMIICTzAOBgNVHQ8B\nAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB\n/wQCMAAwHQYDVR0OBBYEFPVZKiovtIK4Av/IBUQeLUs29pT6MB8GA1UdIwQYMBaA\nFBQusxe3WFbLrlAJQOYfr52LFMLGMFUGCCsGAQUFBwEBBEkwRzAhBggrBgEFBQcw\nAYYVaHR0cDovL3IzLm8ubGVuY3Iub3JnMCIGCCsGAQUFBzAChhZodHRwOi8vcjMu\naS5sZW5jci5vcmcvMCQGA1UdEQQdMBuCGWFuaXRhdGVzdC5zaWdtYW5ldGNvcnAu\ndXMwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEF\nBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggEDBgorBgEEAdZ5AgQC\nBIH0BIHxAO8AdgBc3EOS/uarRUSxXprUVuYQN/vV+kfcoXOUsl7m9scOygAAAXeK\nkmOsAAAEAwBHMEUCIQDSudPEWXk969BT8yz3ag6BJWCMRU5tefEw9nXEQMsh5gIg\nUmfGIuUlcNNI5PydVIHj+zns+SR8P7zfd3FIxW4gK0QAdQD2XJQv0XcwIhRUGAgw\nlFaO400TGTO/3wwvIAvMTvFk4wAAAXeKkmOlAAAEAwBGMEQCIHQkr2qOGuInvonv\nW4vvdI61nraax5V6SC3E0D2JSO91AiBVhpX4BBafRAh36r7l8LrxAfxBM3CjBmAC\nq8fUrWfIWDANBgkqhkiG9w0BAQsFAAOCAQEAgGDMKXofKpDdv5kkID3s5GrKdzaj\njFmb/6kyqd1E6eGXZAewCP1EF5BVvR6lBP2aRXiZ6sJVZktoIfztZnbxBGgbPHfv\nR3iXIG6fxkklzR9Y8puPMBFadANE/QV78tIRAlyaqeSNsoxHi7ssQjHTP111B2lf\n3KmuTpsruut1UesEJcPReLk/1xTkRx262wAncach5Wp+6GWWduTZYJbsNFyrK1RP\nYQ0qYpP9wt2qR+DGaRUBG8i1XLnZS8pkyxtKhVw/a5Fowt+NqCpEBjjJiWJRSGnG\nNSgRtSXq11j8O4JONi8EXe7cEtvzUiLR5PL3itsK2svtrZ9jIwQ95wOPaA==\n-----END CERTIFICATE-----",
    "certificateChain": "-----BEGIN CERTIFICATE-----\nMIIFPjCCBCagAwIBAgISA7RikMlsj36DkLk1CUzjwfYBMA0GCSqGSIb3DQEBCwUA\nMDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\nEwJSMzAeFw0yMTEwMTExOTQ3MjRaFw0yMjAxMDkxOTQ3MjNaMCgxJjAkBgNVBAMT\nHWFuaXRhdGVzdHJhaW4uc2lnbWFuZXRjb3JwLnVzMIIBIjANBgkqhkiG9w0BAQEF\nAAOCAQ8AMIIBCgKCAQEA40EsG7YrFlsH3XdZKirdKKOC7/cca5g9L4rwyA/PlfeU\nB7mJhbQI/a3yZbtY+GjHmedBx15aPtyq+NFZLOkiRCXx0k2zNIJB4yC6Jr/Yp8C2\nrXO6mrCcuqpX7SuDPBtrfdYcIg8G6m0wjj1V1p2/XR8G//CBe8I2XTaTpHsx/VC8\nMNOAA27aSbeX4Nz6TQ69rFuxRG+neUbcz2hQKwroCsCHi6iBmqRkg19Uh8315Cx2\nBUqY0JecpP42KMiktzIoSlqS9yZSuNQh1kP1tPwkEzbs/t3FrfCnnRx5RDr2pJpV\nnonL3sB3TVotS3nFgPNHCfp65O0Bg/3ZpU9IvUpcdQIDAQABo4ICVjCCAlIwDgYD\nVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNV\nHRMBAf8EAjAAMB0GA1UdDgQWBBSzWt3Dvp71cKA2Z54ESjjyM4dp+jAfBgNVHSME\nGDAWgBQULrMXt1hWy65QCUDmH6+dixTCxjBVBggrBgEFBQcBAQRJMEcwIQYIKwYB\nBQUHMAGGFWh0dHA6Ly9yMy5vLmxlbmNyLm9yZzAiBggrBgEFBQcwAoYWaHR0cDov\nL3IzLmkubGVuY3Iub3JnLzAoBgNVHREEITAfgh1hbml0YXRlc3RyYWluLnNpZ21h\nbmV0Y29ycC51czBMBgNVHSAERTBDMAgGBmeBDAECATA3BgsrBgEEAYLfEwEBATAo\nMCYGCCsGAQUFBwIBFhpodHRwOi8vY3BzLmxldHNlbmNyeXB0Lm9yZzCCAQIGCisG\nAQQB1nkCBAIEgfMEgfAA7gB1AG9Tdqwx8DEZ2JkApFEV/3cVHBHZAsEAKQaNsgia\nN9kTAAABfHEcLqAAAAQDAEYwRAIgMlyQ61FjuIKDfATjz0wfkskChD0csVe0TStq\nmC7NbLACICp3CYMvvDiWt1pr5pzCwTQO8F6v0/qNjmH4mjCutAgyAHUARqVV63X6\nkSAwtaKJafTzfREsQXS+/Um4havy/HD+bUcAAAF8cRwvRAAABAMARjBEAiAZd6Vn\n7MLXT7JeIxZrfbNARrf5oCM4UAVjjJeaUhB1MwIgSLW5cVAZvkiwbQW+vIutFjBz\na8cNb/i+nM7RxFW+JPgwDQYJKoZIhvcNAQELBQADggEBAIlHZiHIuOvYFteqpwvR\n0ElqinIpkYsfI+0O5FwHBXz7vMCPGtfdlcX5M10eW3aEBo9lR59mjDMsMufbTb60\nJuSnguelkUoq4WzqjZI+2uy/FTztI5GPpXmXW3IyzbqmCWQt7u8N607g1TYLBaLL\nrbFIhl+LbTJAa//mxI6bb4l/86j/kSjht6U0OIde7ylscb+3MHobbpIWJYp8Jr1D\nubm/0glL46ExnuLbIKojLhDBnG/wHVunB0rJxGh1vPvwD75O1nSIdxuNlVcGwws+\n7wsOyPA1s0VWzrMN1olLMyIPFCwPvfCm1E8Dje1AXMpmyDlqjEoQsoMUH//GKF0S\nTgM=\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFFjCCAv6gAwIBAgIRAJErCErPDBinU/bWLiWnX1owDQYJKoZIhvcNAQELBQAw\nTzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\ncmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjAwOTA0MDAwMDAw\nWhcNMjUwOTE1MTYwMDAwWjAyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNTGV0J3Mg\nRW5jcnlwdDELMAkGA1UEAxMCUjMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQC7AhUozPaglNMPEuyNVZLD+ILxmaZ6QoinXSaqtSu5xUyxr45r+XXIo9cP\nR5QUVTVXjJ6oojkZ9YI8QqlObvU7wy7bjcCwXPNZOOftz2nwWgsbvsCUJCWH+jdx\nsxPnHKzhm+/b5DtFUkWWqcFTzjTIUu61ru2P3mBw4qVUq7ZtDpelQDRrK9O8Zutm\nNHz6a4uPVymZ+DAXXbpyb/uBxa3Shlg9F8fnCbvxK/eG3MHacV3URuPMrSXBiLxg\nZ3Vms/EY96Jc5lP/Ooi2R6X/ExjqmAl3P51T+c8B5fWmcBcUr2Ok/5mzk53cU6cG\n/kiFHaFpriV1uxPMUgP17VGhi9sVAgMBAAGjggEIMIIBBDAOBgNVHQ8BAf8EBAMC\nAYYwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMBIGA1UdEwEB/wQIMAYB\nAf8CAQAwHQYDVR0OBBYEFBQusxe3WFbLrlAJQOYfr52LFMLGMB8GA1UdIwQYMBaA\nFHm0WeZ7tuXkAXOACIjIGlj26ZtuMDIGCCsGAQUFBwEBBCYwJDAiBggrBgEFBQcw\nAoYWaHR0cDovL3gxLmkubGVuY3Iub3JnLzAnBgNVHR8EIDAeMBygGqAYhhZodHRw\nOi8veDEuYy5sZW5jci5vcmcvMCIGA1UdIAQbMBkwCAYGZ4EMAQIBMA0GCysGAQQB\ngt8TAQEBMA0GCSqGSIb3DQEBCwUAA4ICAQCFyk5HPqP3hUSFvNVneLKYY611TR6W\nPTNlclQtgaDqw+34IL9fzLdwALduO/ZelN7kIJ+m74uyA+eitRY8kc607TkC53wl\nikfmZW4/RvTZ8M6UK+5UzhK8jCdLuMGYL6KvzXGRSgi3yLgjewQtCPkIVz6D2QQz\nCkcheAmCJ8MqyJu5zlzyZMjAvnnAT45tRAxekrsu94sQ4egdRCnbWSDtY7kh+BIm\nlJNXoB1lBMEKIq4QDUOXoRgffuDghje1WrG9ML+Hbisq/yFOGwXD9RiX8F6sw6W4\navAuvDszue5L3sz85K+EC4Y/wFVDNvZo4TYXao6Z0f+lQKc0t8DQYzk1OXVu8rp2\nyJMC6alLbBfODALZvYH7n7do1AZls4I9d1P4jnkDrQoxB3UqQ9hVl3LEKQ73xF1O\nyK5GhDDX8oVfGKF5u+decIsH4YaTw7mP3GFxJSqv3+0lUFJoi5Lc5da149p90Ids\nhCExroL1+7mryIkXPeFM5TgO9r0rvZaBFOvV2z0gp35Z0+L4WPlbuEjN/lxPFin+\nHlUjr8gRsI3qfJOQFy/9rKIJR0Y/8Omwt/8oTWgy1mdeHmmjk7j1nYsvC9JSQ6Zv\nMldlTTKB3zhThV1+XWYp6rjd5JW1zbVWEkLNxE7GJThEUG3szgBVGP7pSWTUTsqX\nnLRbwHOoq7hHwg==\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFYDCCBEigAwIBAgIQQAF3ITfU6UK47naqPGQKtzANBgkqhkiG9w0BAQsFADA/\nMSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\nDkRTVCBSb290IENBIFgzMB4XDTIxMDEyMDE5MTQwM1oXDTI0MDkzMDE4MTQwM1ow\nTzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\ncmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwggIiMA0GCSqGSIb3DQEB\nAQUAA4ICDwAwggIKAoICAQCt6CRz9BQ385ueK1coHIe+3LffOJCMbjzmV6B493XC\nov71am72AE8o295ohmxEk7axY/0UEmu/H9LqMZshftEzPLpI9d1537O4/xLxIZpL\nwYqGcWlKZmZsj348cL+tKSIG8+TA5oCu4kuPt5l+lAOf00eXfJlII1PoOK5PCm+D\nLtFJV4yAdLbaL9A4jXsDcCEbdfIwPPqPrt3aY6vrFk/CjhFLfs8L6P+1dy70sntK\n4EwSJQxwjQMpoOFTJOwT2e4ZvxCzSow/iaNhUd6shweU9GNx7C7ib1uYgeGJXDR5\nbHbvO5BieebbpJovJsXQEOEO3tkQjhb7t/eo98flAgeYjzYIlefiN5YNNnWe+w5y\nsR2bvAP5SQXYgd0FtCrWQemsAXaVCg/Y39W9Eh81LygXbNKYwagJZHduRze6zqxZ\nXmidf3LWicUGQSk+WT7dJvUkyRGnWqNMQB9GoZm1pzpRboY7nn1ypxIFeFntPlF4\nFQsDj43QLwWyPntKHEtzBRL8xurgUBN8Q5N0s8p0544fAQjQMNRbcTa0B7rBMDBc\nSLeCO5imfWCKoqMpgsy6vYMEG6KDA0Gh1gXxG8K28Kh8hjtGqEgqiNx2mna/H2ql\nPRmP6zjzZN7IKw0KKP/32+IVQtQi0Cdd4Xn+GOdwiK1O5tmLOsbdJ1Fu/7xk9TND\nTwIDAQABo4IBRjCCAUIwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYw\nSwYIKwYBBQUHAQEEPzA9MDsGCCsGAQUFBzAChi9odHRwOi8vYXBwcy5pZGVudHJ1\nc3QuY29tL3Jvb3RzL2RzdHJvb3RjYXgzLnA3YzAfBgNVHSMEGDAWgBTEp7Gkeyxx\n+tvhS5B1/8QVYIWJEDBUBgNVHSAETTBLMAgGBmeBDAECATA/BgsrBgEEAYLfEwEB\nATAwMC4GCCsGAQUFBwIBFiJodHRwOi8vY3BzLnJvb3QteDEubGV0c2VuY3J5cHQu\nb3JnMDwGA1UdHwQ1MDMwMaAvoC2GK2h0dHA6Ly9jcmwuaWRlbnRydXN0LmNvbS9E\nU1RST09UQ0FYM0NSTC5jcmwwHQYDVR0OBBYEFHm0WeZ7tuXkAXOACIjIGlj26Ztu\nMA0GCSqGSIb3DQEBCwUAA4IBAQAKcwBslm7/DlLQrt2M51oGrS+o44+/yQoDFVDC\n5WxCu2+b9LRPwkSICHXM6webFGJueN7sJ7o5XPWioW5WlHAQU7G75K/QosMrAdSW\n9MUgNTP52GE24HGNtLi1qoJFlcDyqSMo59ahy2cI2qBDLKobkx/J3vWraV0T9VuG\nWCLKTVXkcGdtwlfFRjlBz4pYg1htmf5X6DYO8A4jqv2Il9DjXA6USbW1FzXSLr9O\nhe8Y4IWS6wY7bCkjCWDcRQJMEhg76fsO3txE+FiYruq9RUWhiF1myv4Q6W+CyBFC\nDfvp7OOGAN6dEOM4+qR9sdjoSYKEBpsr6GtPAQw4dy753ec5\n-----END CERTIFICATE-----"
}
```
-->