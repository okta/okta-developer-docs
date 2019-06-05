---
title: Creating Your External Service
---

When you enable an Import Inline Hook for an app, every time a user profile is imported from that app, Okta calls the external service you create. 

You implement your external service as an HTTPS server with an Internet-accessible endpoint. It's your responsibility to arrange hosting of your code on a system external to Okta. Okta defines the REST API contract for the requests it sends to your custom code, as well as for the responses your custom code can send back.

### Create HTTPS Server

Your service needs to function as an HTTPS server. You need an SSL key pair and certificate for your HTTPS server.

<StackSelector snippet="create-https"/>

### Check Authorization Header

Headers of requests coming from Okta include an authorization header set to a secret string you provide to Okta when you register your external service. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure.

For every request that comes in, your code should check for the presence of the authorization header and confirm that its value matches the pre-set string you have decided on. Processing should not proceed if the auhorization header cannot be verified.

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

