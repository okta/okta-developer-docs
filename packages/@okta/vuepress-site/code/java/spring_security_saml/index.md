---
title: Spring Security SAML
language: Java
icon: code-spring
excerpt: >-
  Guidance on how to SAML-enable your application using open source Spring
  Security library.
---

This guide describes how to use Spring Security SAML to add support for Okta (through SAML) to Java applications that use Spring Boot. In this guide, you learn how to install and configure an Okta SAML application.

This guide assumes that you are familiar with the basics of Java software development: editing text files, using the command line, and running Maven or Gradle.

## Requirements

Make sure that the following are installed before starting:

- [SDKMAN](https://sdkman.io/) (for Java 17)

## Configure Okta to work with Spring Security SAML

To begin, you'll need an Okta developer account. You can create one at [developer.okta.com/signup](https://developer.okta.com/signup) or install the [Okta CLI](https://cli.okta.com) and run `okta register`.

Then, log in to your account and go to **Applications** > **Create App Integration**. Select **SAML 2.0** and click **Next**. Name your app something like `Spring Boot SAML` and click **Next**.

Use the following settings:

* Single sign on URL: `http://localhost:8080/login/saml2/sso/okta`
* Use this for Recipient URL and Destination URL: ✅ (the default)
* Audience URI: `http://localhost:8080/saml2/service-provider-metadata/okta`

Then click **Next**. Select the following options:

* I'm an Okta customer adding an internal app
* This is an internal app that we have created

Select **Finish**.

Okta will create your app, and you will be redirected to its **Sign On** tab. Scroll down to the **SAML Signing Certificates** and go to **SHA-2** > **Actions** > **View IdP Metadata**. You can right-click and copy this menu item's link or open its URL. Copy the resulting link to your clipboard. It should look something like the following:

```
https://dev-13337.okta.com/app/<random-characters>/sso/saml/metadata
```

Go to your app's **Assignment** tab and assign access to the **Everyone** group.

## Create a Spring Boot app with SAML support

Spring Boot 3 requires Java 17. You can install it with SDKMAN:

```shell
sdk install java 17-open
```

Create a brand-new Spring Boot app using [start.spring.io](https://start.spring.io). Select the following options:

* Project: **Gradle**
* Spring Boot: **3.0.0 (SNAPSHOT)**
* Dependencies: **Spring Web**, **Spring Security**, **Thymeleaf**

You can also use [this URL](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.0.0-SNAPSHOT&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=web,security,thymeleaf) or HTTPie:

```shell
https start.spring.io/starter.zip bootVersion==3.0.0-SNAPSHOT \
  dependencies==web,security,thymeleaf type==gradle-project \
  baseDir==spring-boot-saml | tar -xzvf -
```

Open the project in your favorite IDE and complete the following steps.

Add `src/main/java/com/example/demo/HomeController.java` to populate the authenticated user's information.

```java
package com.example.demo;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String home(@AuthenticationPrincipal Saml2AuthenticatedPrincipal principal, Model model) {
        model.addAttribute("name", principal.getName());
        model.addAttribute("emailAddress", principal.getFirstAttribute("email"));
        model.addAttribute("userAttributes", principal.getAttributes());
        return "home";
    }

}
```

Create a `src/main/resources/templates/home.html` file to render the user's information.

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="https://www.thymeleaf.org"
      xmlns:sec="https://www.thymeleaf.org/thymeleaf-extras-springsecurity6">
<head>
    <title>Spring Boot and SAML</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
</head>
<body>

<h1>Welcome</h1>
<p>You are successfully logged in as <span sec:authentication="name"></span></p>
<p>Your email address is <span th:text="${emailAddress}"></span>.</p>
<p>Your authorities are <span sec:authentication="authorities"></span>.</p>
<h2>All Your Attributes</h2>
<dl th:each="userAttribute : ${userAttributes}">
    <dt th:text="${userAttribute.key}"></dt>
    <dd th:text="${userAttribute.value}"></dd>
</dl>

<form th:action="@{/logout}" method="post">
    <button id="logout" type="submit">Logout</button>
</form>

</body>
</html>
```

Create a `src/main/resources/application.yml` file to contain your metadata URI.

```yaml
spring:
  security:
    saml2:
      relyingparty:
        registration:
            assertingparty:
              metadata-uri: <your-metadata-uri>
```

Then, change `build.gradle` to use `thymeleaf-extras-springsecurity6` instead of `thymeleaf-extras-springsecurity5` and add Spring Security SAML's dependency:

```groovy
implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity6'
implementation 'org.springframework.security:spring-security-saml2-service-provider'
```

### Run the app and authenticate

Run your Spring Boot app from your IDE or using the command line:

```shell
./gradlew bootRun
```

Open `http://localhost:8080` in your favorite browser and log in with the credentials you used to create your account.

You should see a successful result in your browser.

![Login success](/img/spring-security-saml-login.png "Login success")

If you try to log out, it won't work. Let's fix that.

### Add a logout feature

Spring Security's SAML support has a [logout feature](https://docs.spring.io/spring-security/reference/servlet/saml2/logout.html) that takes a bit to configure. First, edit your application on Okta and navigate to **General** > **SAML Settings** > **Edit**.

Continue to the **Configure SAML** step and **Show Advanced Settings**. Select **Enable Single Logout** and use the following values:

* Single Logout URL: `http://localhost:8080/logout/saml2/slo`
* SP Issuer: `http://localhost:8080/saml2/service-provider-metadata/okta`

You'll need to create a certificate to sign the outgoing logout request. You can create a private key and certificate using OpenSSL. Answer at least one of the questions with a value, and it should work.

```shell
openssl req -newkey rsa:2048 -nodes -keyout local.key -x509 -days 365 -out local.crt
```

Copy the generated files to your app's `src/main/resources` directory. Configure `signing` and `singlelogout` in `application.yml`:

```yaml
spring:
  security:
    saml2:
      relyingparty:
        registration:
          okta:
            signing:
              credentials:
                - private-key-location: classpath:local.key
                  certificate-location: classpath:local.crt
            singlelogout:
              binding: POST
              response-url: "{baseUrl}/logout/saml2/slo"
            assertingparty:
              metadata-uri: <your-metadata-uri>
```

Upload the `local.crt` to your Okta app and finish its configuration. Restart and the logout button should work.

![Logout success](/img/spring-security-saml-logout-success.png "Logout success")

### Customize authorities with Spring Security SAML

You might notice when you log in, the resulting page shows you have a `ROLE_USER` authority. However, when you assigned users to the app, you gave access to `Everyone`. You can configure your SAML app on Okta to send a user's groups as an attribute. You can add other attributes like name and email too.

Edit your Okta app's SAML settings and fill in the **Group Attribute Statements** section.

* Name: `groups`
* Name format: `Unspecified`
* Filter: `Matches regex` and use `.*` for the value

Just above, you can add other attribute statements. For instance:

* email > `user.email`
* firstName > `user.firstName`
* lastName > `user.lastName`

Save these changes.

Then, create a `SecurityConfiguration` class that overrides the default configuration and uses a converter to translate the values in the `groups` attribute into Spring Security authorities.

```java
package com.example.demo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.saml2.provider.service.authentication.OpenSaml4AuthenticationProvider;
import org.springframework.security.saml2.provider.service.authentication.OpenSaml4AuthenticationProvider.ResponseToken;
import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
import org.springframework.security.saml2.provider.service.authentication.Saml2Authentication;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain configure(HttpSecurity http) throws Exception {

        OpenSaml4AuthenticationProvider authenticationProvider = new OpenSaml4AuthenticationProvider();
        authenticationProvider.setResponseAuthenticationConverter(groupsConverter());

        // @formatter:off
        http
            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().authenticated()
            )
            .saml2Login(saml2 -> saml2
                .authenticationManager(new ProviderManager(authenticationProvider))
            )
            .saml2Logout(withDefaults());
        // @formatter:on

        return http.build();
    }

    private Converter<OpenSaml4AuthenticationProvider.ResponseToken, Saml2Authentication> groupsConverter() {

        Converter<ResponseToken, Saml2Authentication> delegate =
            OpenSaml4AuthenticationProvider.createDefaultResponseAuthenticationConverter();

        return (responseToken) -> {
            Saml2Authentication authentication = delegate.convert(responseToken);
            Saml2AuthenticatedPrincipal principal = (Saml2AuthenticatedPrincipal) authentication.getPrincipal();
            List<String> groups = principal.getAttribute("groups");
            Set<GrantedAuthority> authorities = new HashSet<>();
            if (groups != null) {
                groups.stream().map(SimpleGrantedAuthority::new).forEach(authorities::add);
            } else {
                authorities.addAll(authentication.getAuthorities());
            }
            return new Saml2Authentication(principal, authentication.getSaml2Response(), authorities);
        };
    }
}
```

Finally, modify your `build.gradle` file to force the latest version of Open SAML that works with Spring Security 6.

```groovy
repositories {
    ...
    maven { url "https://build.shibboleth.net/nexus/content/repositories/releases/" }
}

dependencies {
    constraints {
        implementation "org.opensaml:opensaml-core:4.1.1"
        implementation "org.opensaml:opensaml-saml-api:4.1.1"
        implementation "org.opensaml:opensaml-saml-impl:4.1.1"
    }
  ...
}
```

Now, if you restart your app and log in, you should see your user's groups as authorities. _Huzzah!_

![Groups as authorities](/img/spring-security-saml-groups-as-authorities.png "Groups as authorities")

## Next Steps

At this point, you should be familiar with setting up SAML-enabled applications to work with an Okta organization and how to configure Spring Security SAML to work with Okta.

After you have Okta working with the example Spring Security SAML application, the next step is to take the example code and move it to your production application. The specifics of how this works is different depending on how your application is set up.

One quick way to see this app working in a production environment is to deploy it to Heroku. [Install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and create an account to begin. Then, follow the steps below to prepare and deploy your app.

1. Create a new app on Heroku using `heroku create`.

2. Create a `system.properties` file in the root directory of your app to force Java 17:

    ```properties
    java.runtime.version=17
    ```

3. Create a `Procfile` that specifies how to run your app:

    ```
    web: java -Xmx256m -jar build/libs/*.jar --server.port=$PORT
    ```

4. Commit your changes:

    ```shell
    git add .
    git commit -m "Add Heroku configuration"
    ```

5. Set the Gradle task to build your app:

    ```shell
    heroku config:set GRADLE_TASK="bootJar"
    ```

6. Deploy to production using Git:

    ```shell
    git push heroku main
    ```

For authentication to work with SAML, you'll need to update your Okta app to use your Heroku app's URL in place of `http://localhost:8080`, wherever applicable.

## Learn More

If you want to learn more about configuring SAML and what to consider when writing a SAML application, see the in-depth Okta [SAML guidance](https://www.okta.com/integrate/documentation/saml/) documentation, which is great place to learn more.
