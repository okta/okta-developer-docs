---
title: Optional Settings
---
There are a few additional settings that you can play with while testing shared SSO that involve the use of the `prompt` parameter. See [Parameter details](https://developer.okta.com/docs/reference/api/oidc/#parameter-details) for more information on using the `prompt` parameter.

## Always prompt for sign in regardless of session
If you are using the same Okta domain for both of your apps, the default behavior when a session already exists is that the user is silently authenticated without a sign-in prompt. If your second application requires a prompt for sign-in regardless of session, you can configure this by passing in the `prompt=login` parameter.

<StackSelector snippet="promptsignin" />

## Check for a valid session
You can also check if the browser has a valid session by using the `prompt=none` parameter. The `prompt=none` parameter guarantees that the user isn't prompted for credentials. Either the requested tokens are obtained or if the session is invalid or doesn't exist, the application receives an OAuth error response. See [Parameter details](https://developer.okta.com/docs/reference/api/oidc/#parameter-details) for more information on using the `prompt` parameter.

If your application requires that the user signs in to the first app first, then you can use the `prompt=none` parameter in the second app to check whether the user is already signed in to the first app. 

<StackSelector snippet="checkvalidsession" />

## Clear the session
To clear a session, add the following code to both of your apps:

<StackSelector snippet="clearsession" />

<NextSectionLink>Next Steps</NextSectionLink>

