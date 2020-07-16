After performing [local signout](/docs/guides/sign-users-out/sign-out-of-your-app/springboot/localsignout.md), navigate the user's browser to the [OIDC logout page](https://developer.okta.com/docs/reference/api/oidc/#logout).

This page clears the user's Okta session, and then redirects back to the `post_logout_redirect_uri` that is provided. This URI must be one of those listed in the `Logout redirect URI` section of your application's settings.

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then select your application.

2. Select **General** and click **Edit**.

3. In the **Logout redirect URI section**, add the **Base URI** of your application. You can optionally follow that URI with a path, for example, `http://localhost:8080/logged_out`. Also, add any URIs where your application runs in production, such as `https://app.example.com/logged_out`.

4. Click **Save**.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

import java.net.URI;

@SpringBootApplication
public class LogoutExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(LogoutExampleApplication.class, args);
    }

    @Configuration
    static class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    ClientRegistrationRepository clientRegistrationRepository;

    OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedLogoutSuccessHandler successHandler = new OidcClientInitiatedLogoutSuccessHandler(clientRegistrationRepository);
        successHandler.setPostLogoutRedirectUri(URI.create("http://localhost:8080/"));
        return successHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                // allow anonymous access to the root page
                .antMatchers("/").permitAll()
                // all other requests
                .anyRequest().authenticated()
                // RP-initiated (SSO) logout
                .and().logout().logoutSuccessHandler(oidcLogoutSuccessHandler())
                // enable OAuth2/OIDC
                .and().oauth2Login();
    }
}
```

If you are using the [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot), you can configure an RP-Initiated (SSO) Logout by setting the `okta.oauth2.postLogoutRedirectUri` property with an absolute URI such as:

```properties
okta.oauth2.postLogoutRedirectUri=http://localhost:8080/
```
