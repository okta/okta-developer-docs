Create a sample app using the Okta Spring Boot starter and Spring Initializr.

1. Navigate to [Spring Initializr](https://start.spring.io) and select **Spring Web** and **Okta** as dependencies. You can do this automatically using [this link](https://start.spring.io/#!type=maven-project&language=java&packaging=jar&jvmVersion=11&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=web,okta).
1. Press **Generate**.
1. Unzip the resulting downloaded demo archive into a suitable location ready to start working on.

> **Note**: This guide was tested with Spring Boot 2.6.

> **Note**: If you're using the Okta CLI, you can also run `okta start spring-boot` to create an app. This command creates an OIDC app in Okta, downloads the [okta-spring-boot-sample](https://github.com/okta-samples/okta-spring-boot-sample), and configures it to work with the OIDC app. This quickstart uses the basic starter app instead, as it's easier to understand the Okta-specific additions if you work through them yourself.