---
title: Creating Your External Service
---

The external service is the customer-provided piece of software that Okta calls when the inline hook fires. In the case of the Import Inline Hook, Okta sends the user profile information of the user being imported, and the external service can send back commands to change profile attributes and to determine whether to treat the user as a match for an already existing user.

Okta defines the REST API contract for the requests it sends to your custom code and for the responses your custom code can send back, but it's your responsibility to arrange hosting of the external service and to code the software for it.

### Create HTTPS Server

Your service needs to implement an HTTPS server, which Okta will send requests to. For the HTTPS server, you need to have available an SSL key pair (PEM file) and it corresponding certificate (cert file).

<StackSelector snippet="create-https"/>

### Check Authorization Header

The requests that Okta sends to your external service always include an authorization header containing a secret string. You set the value of this string when you register your external service, and Okta then sends it with every request. This serves as an API access key for your service. Your code should always check for the presence of the authorization header and confirm that it's value is correct. Processing should not proceed if the auhorization header cannot be verified.

<StackSelector snippet="check-auth"/>

### Deserialize JSON Payload

<StackSelector snippet="deserialize"/>


### Check for Conflict in `login` Attribute

<StackSelector snippet="detect-conflict"/>


### Formulate Commands to Return

<StackSelector snippet="build-commands-object"/>

### Serialize Response and Send

<StackSelector snippet="serialize"/>

<NextSectionLink />

