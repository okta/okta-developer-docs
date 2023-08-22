When you [created an app integration in the admin console](#create-an-app-integration-in-the-admin-console), you set the sign-in redirect URL to <StackSnippet snippet="signinredirecturi" inline /> and the sign-out redirect URL to <StackSnippet snippet="signoutredirecturi" inline />. The Okta Spring Boot Starter leverages Spring Security which defaults to these values.

> **Note**: The [Spring Boot sample apps](https://github.com/okta/samples-java-spring) instead use `/authorization-code/callback` as the sign-in redirect URL.
