---
title: Overview
---

# SAML Apps and SHA256 Certificates

Certificates with a SHA256 signature are supported for SAML 2.0 applications with Okta. You can create new integrations that use SHA256 certificates and update existing integrations from SHA1 certificates to SHA256 certificates. Existing integrations are not changed automatically. The SHA256 certificates and the SHA1 certificates are self-signed.

### Why Should I Do This?

To take advantage of the additional security features of SHA256 certificates.

### New SAML 2.0 App Integrations

New SAML 2.0 app integrations automatically use SHA256 certificates.
As instructed, upload the SHA256 certificate to the ISV.

### Existing SAML 2.0 App Integrations

To update existing app integrations, there are four steps to follow.

  1. List your apps and get the app id, name, and label for each app to update.<br />For each app to update, perform the following steps.<br />
  2. Generate a new application key credential.
  3. Update the key credential for the app to specify the new signing key id.
  4. Upload the new certificate to the ISV. (This step cannot be automated.)

> **Important:** After you complete the first three steps, your users cannot access the application until Step 4 is completed.

### Determine the Signature Algorithm of a Certificate

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

### Obtaining the Certificate for an App from a URL

You can obtain the current certificate for an app from the following URL:

`https://<your org subdomain>-admin.okta.com/admin/org/security/<application id>/cert`

Where:

`<your org subdomain>` is your organization's Okta subdomain.

`<application id>` is the application ID you used in Step 1.

> **Note:** Certificates downloaded with this method contain the Begin Certificate and End Certificate lines.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
