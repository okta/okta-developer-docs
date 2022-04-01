Make sure you have your callback route specified correctly. The Okta Spring Boot Starter leverages Spring Security and defaults to a callback route of `/login/oauth2/code/okta`, which is also what you specified in your Okta app integration earlier on.

> **Note**: The [Spring Boot sample apps](https://github.com/okta/samples-java-spring) instead use `/authorization-code/callback`.