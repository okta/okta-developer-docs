---
title: Sign in to your SPA with the embedded Okta Sign-In Widget
---

<ApiLifecycle access="ie" /><br>

<StackSelector />

<StackSnippet snippet="nutrition" />

## About using the Sign-In Widget with your SPA app

<StackSnippet snippet="intro" />

## Create an Okta app integration

<StackSnippet snippet="create-app-integration" />

### Okta org app integration configuration settings

You need two pieces of information from your org and app integration for your React app:

* **Client ID**: From the **General** tab of your app integration, save the generated **Client ID** value.
* **Issuer**: From the **General** tab of your app integration, save the **Okta domain** value. Use your Okta domain value for the [issuer](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) setting that represents the authorization server. Use `https://{yourOktaDomain}/oauth2/default` as the issuer for your app if you're using an Okta Integrator Free Plan organization. See [Issuer configuration](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) if you want to use another Okta custom authorization server.

## Install the SDK

<StackSnippet snippet="download-sample" />

## Load the Sign-In Widget

<StackSnippet snippet="load-app" />

## Basic sign-in flow

<StackSnippet snippet="basic-sign-in" />

## Run the sample application

<StackSnippet snippet="run-sample" />

## Next steps

<StackSnippet snippet="next-steps" />

## See also

<StackSnippet snippet="see-also" />
