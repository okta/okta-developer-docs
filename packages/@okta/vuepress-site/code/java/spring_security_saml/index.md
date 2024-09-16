---
title: Spring Security SAML
language: Java
icon: code-spring
excerpt: SAML-enable your application using the open source Spring Security library.
---

This guide describes how to use Spring Security SAML to add support for Okta to Java applications that use Spring Boot.

<ApiLifecycle access="deprecated" />

> **Note:** We strongly recommend that you use OpenID Connect rather than SAML. See [What's the difference between OAuth, OpenID Connect, and SAML](https://www.okta.com/identity-101/whats-the-difference-between-oauth-openid-connect-and-saml/).

---

**Learning outcomes**

* Install and configure an Okta SAML application

**What you need**

* [SDKMAN](https://sdkman.io/) installed (for Java 17)

---

## Create an Okta app integration for your SAML app

An application integration represents your app in your Okta org. To create an app integration for a SAML app:

1. Open the **Admin Console** for your org.
1. Choose **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **SAML 2.0** as the Sign-in method, and then click **Next**.
1. Give your application name, for example "Spring Boot SAML", and then click **Next**.
1. On the Configure SAML page
   * Set **Single sign-on URL** to a URL that is appropriate for your app. For example `http://localhost:8080/login/saml2/sso/okta`
   * Verify that **Use this for Recipient URLs and Destination URLs** is checked.
   * Set **Audience URI** to a URL that is appropriate for your app. For example `http://localhost:8080/saml2/service-provider-metadata/okta`
1. Click **Next**.
1. Set **Are you a customer or a partner?** to **I'm an Okta customer adding an internal app**.
1. Set **App type** to **This is an internal app that we have created**.
1. Click **Finish**.

Okta will create your app and redirect you to its **Sign On** tab. Continue the required setup:

1. Locate the **SAML Signing Certificates** section.
1. Locate the entry for **SHA-2**, and then select **Actions** > **View IdP metadata**.
1. Copy the URL for the resulting link to your clipboard. It will look like `https://${yourOktaDomain}/app/<random-characters>/sso/saml/metadata`.
1. Choose the **Assignments** tab, and then select **Assign** > **Assign to Groups**.
1. Locate the entry for **Everyone** and click **Assign**.
1. Click **Done**.

## Create a Spring Boot app with SAML support

1. Spring Boot 3 requires Java 17. Install it with SDKMAN:

   ```shell
   sdk install java 17-open
   ```

1. Create a brand-new Spring Boot app using [start.spring.io](https://start.spring.io). Select the following options:

   * Project: **Gradle**
   * Spring Boot: **3.0.0 (SNAPSHOT)**
   * Dependencies: **Spring Web**, **Spring Security**, **Thymeleaf**

   You can also use [this URL](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.0.0-SNAPSHOT&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=web,security,thymeleaf)

   Or use [HTTPie](https://httpie.io/):

   ```shell
   https start.spring.io/starter.zip bootVersion==3.0.0-SNAPSHOT \
     dependencies==web,security,thymeleaf type==gradle-project \
     baseDir==spring-boot-saml | tar -xzvf -
   ```

Open the project in your favorite IDE and complete the following steps.

1. Add `src/main/java/com/example/demo/HomeController.java` to populate the authenticated user's information.

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

1. Create a `src/main/resources/templates/home.html` file to render the user's information.

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
           <p>You are successfully signed in as <span sec:authentication="name"></span></p>
           <p>Your email address is <span th:text="${emailAddress}"></span>.</p>
           <p>Your authorities are <span sec:authentication="authorities"></span>.</p>
           <h2>All Your Attributes</h2>
           <dl th:each="userAttribute : ${userAttributes}">
               <dt th:text="${userAttribute.key}"></dt>
               <dd th:text="${userAttribute.value}"></dd>
           </dl>

           <form th:action="@{/logout}" method="post">
               <button id="signout" type="submit">Sign out</button>
           </form>
       </body>
   </html>
   ```

1. Create a `src/main/resources/application.yml` file to contain the metadata URI you copied to your clipboard earlier.

   ```yaml
   spring:
     security:
       saml2:
         relyingparty:
           registration:
             okta:
               assertingparty:
                 metadata-uri: <your-metadata-uri>
   ```

### Run the app and authenticate

1. Run your Spring Boot app. You can do this from your IDE, or as follows using the command line:

   ```shell
   ./gradlew bootRun
   ```

1. Open `http://localhost:8080` in your favorite browser and sign in with a user account set up in your org. You should see a successful result in your browser.

   <div class="three-quarter border">

   ![Login success](/img/saml/spring-security-saml-login.png)

   </div>

If you try to sign out, it won't work. You'll fix that in the next section.

### Add a sign-out feature

Spring Security's SAML support has a [sign-out feature](https://docs.spring.io/spring-security/reference/servlet/saml2/logout.html) that requires a private key and certificate. To use it, you'll need to:

1. Create a private key and certificate to sign the outgoing sign-out request using OpenSSL.

   ```shell
   openssl req -newkey rsa:2048 -nodes -keyout local.key -x509 -days 365 -out local.crt
   ```

1. Copy the generated `local.crt` and `local.key` files to your app's `src/main/resources` directory.

1. Update the `signing` and `singlelogout` fields in `application.yml` to refer to the new certificate files:

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

1. Add this certificate to your app integration.

   1. Open the **Admin Console** for your org.
   1. Choose **Applications** > **Applications**.
   1. Click on the name of your SAML app integration.
   1. Choose the **General** tab, locate the **SAML Settings** section, and click **Edit**.
   1. Click **Next**.
   1. In the **SAML Settings** section:
      * Click **Show Advanced Settings**.
      * Select **Allow application to initiate Single Logout** for **Enable Single Logout**.
      * Set **Single Logout URL** to to a URL that is appropriate for your app. For example `http://localhost:8080/logout/saml2/slo`
      * Set **SP Issuer** to a URL that is appropriate for your app. For example `http://localhost:8080/saml2/service-provider-metadata/okta`
      * Click the **Browse** button for **Signature Certificate**, locate the `local.crt` file you created in step 1, and click **Upload Certificate**.
      * Click **Next**.
   1. Click **Finish**.

1. Restart your Spring Boot app, and the button should work.

   <div class="three-quarter border">

   ![Sign out success](/img/saml/spring-security-saml-logout-success.png)

   </div>

### Customize authorities with Spring Security SAML

When you sign in, the resulting page shows that you have a `ROLE_USER` authority. However, when you assigned users to the app, you gave access to `Everyone`. You can configure your SAML app on Okta to send a user's groups as an attribute, and add other attributes like name and email.

1. Edit your Okta app's SAML settings and fill in the **Group Attribute Statements** section.

   * Name: `groups`
   * Name format: `Unspecified`
   * Filter: `Matches regex` and use `.*` for the value

   Just above, you can add other attribute statements. For instance:

   |     Name     |     Name format     |     Value        |
   | ------------ | ------------------- | ---------------- |
   | `email`      | `Unspecified`       | `user.email`     |
   | `firstName`  | `Unspecified`       | `user.firstName` |
   | `lastName`   | `Unspecified`       | `user.lastName`  |

1. Save these changes.

1. If you cloned the repo earlier, restart your app and sign in to see your user's groups as authorities.

1. If you created a Spring Boot app from scratch, create a `SecurityConfiguration` class that overrides the default configuration and uses a converter to translate the values in the `groups` attribute into Spring Security authorities.


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
                  .mvcMatchers("/favicon.ico").permitAll()
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

1. Modify your `build.gradle` file to force the latest version of Open SAML that works with Spring Security 6.

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

1. Restart your app and sign in. You should see your user's groups listed as authorities.

   <div class="three-quarter border">

   ![Groups as authorities](/img/saml/spring-security-saml-groups-as-authorities.png)

   </div>

## Deploy with Heroku

After you have Okta working with the generated Spring Security SAML application, the next step is to take the example code and move it to your production environment. The specifics of how this works are different depending on how your application is set up.

One quick way to see this app working in a production environment is to deploy it to Heroku. [Install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and create an account to begin. Then, follow the steps below to prepare and deploy your app.

1. Create a new app on Heroku using `heroku create`.

1. Create a `system.properties` file in the root directory of your app to force Java 17:

   ```properties
   java.runtime.version=17
   ```

1. Create a `Procfile` that specifies how to run your app:

   ```
   web: java -Xmx256m -jar build/libs/*.jar --server.port=$PORT
   ```

1. Commit your changes:

   ```shell
   git add .
   git commit -m "Add Heroku configuration"
   ```

1. Set the Gradle task to build your app:

   ```shell
   heroku config:set GRADLE_TASK="bootJar"
   ```

1. Deploy to production using Git:

   ```shell
   git push heroku main
   ```

For authentication to work with SAML, you'll need to update your Okta app to use your Heroku app's URL in place of `http://localhost:8080`, wherever applicable.

## Learn More

At this point, you should be familiar with setting up SAML-enabled applications to work with an Okta organization, how to configure Spring Security SAML to work with Okta, and how to deploy the sample app you built on Heroku.

If you want to learn more about configuring SAML and what to consider when writing a SAML application, see the in-depth Okta [SAML guidance](https://www.okta.com/integrate/documentation/saml/) documentation, which is great place to learn more.
