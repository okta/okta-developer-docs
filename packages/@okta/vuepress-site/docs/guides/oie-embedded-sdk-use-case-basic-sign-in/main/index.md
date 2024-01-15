---
title: Basic sign-in flow using the password factor
---

<ApiLifecycle access="ie" />

> **Note:** A request context for the browser client is required when a server-side web application uses an embedded SDK as a proxy between itself and Okta. This context contains values (geolocation, IP address, and user agent) that inform a secure response. However, these values are currently taken from the server rather than the client. As a result, network zones and behaviors that drive their conditions based on these request context values don’t currently work.

Enable a password-only sign-in flow in your application using an Embedded SDK.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

**Learning outcomes**

* Add a sign-in flow to an application requiring only a password

**What you need**

<StackSnippet snippet="whatyouneed" />

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

To configure your app in Admin Console so it requires only a password, see <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
