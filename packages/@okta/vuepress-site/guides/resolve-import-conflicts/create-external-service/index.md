---
title: Creating Your External Service
---

The external service is the customer-provided piece of software that Okta calls when the inline hook fires. In the case of the Import Inline Hook, Okta sends the user profile information of the user being imported in the payload of the call in the payload of the call in the payload of the call. The externals service can respond with  commands to change profile attributes and to set whether to treat the user as a match for an existing user.

Okta defines the REST API contract for the requests it sends to the external service and for the responses the external service can send back, but it's your responsibility to arrange hosting of the external service and to code the software for it.

### Create HTTPS Server

Your service needs to implement an HTTPS server, for Okta to send requests to. To create an HTTPS server, you need to have available an SSL key pair (PEM file) and its corresponding certificate (cert file).

<StackSelector snippet="create-https"/>

### Check Authorization Header

The requests that Okta sends to your external service will always include an authorization header containing a secret string. You set the value of this string when you register your external service. It serves as an API access key for your service. Your code should always check for the presence of the authorization header and confirm that it's value is correct. Processing should not proceed if the auhorization header cannot be verified.

<StackSelector snippet="check-auth"/>

### Deserialize JSON Payload

The information about the user being imported, as well as related contextual information, is contained in the JSON payload of the request from Okta. To make it available for pocessing, you can deserialize the JSON into objects.

<StackSelector snippet="deserialize"/>


### Check for Conflict in `login` Attribute

<StackSelector snippet="detect-conflict"/>


### Formulate Commands to Return

<StackSelector snippet="build-commands-object"/>

### Serialize Response and Send

<StackSelector snippet="serialize"/>

<NextSectionLink />

