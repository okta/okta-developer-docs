---
exampleDescription: Java Implicit Example
---

## Okta Java Quickstart

Now that your clients can get tokens, let's validate those tokens on your server.

### Include the dependency

For Apache Maven:
```xml
<dependency>
    <groupId>com.okta.jwt</groupId>
    <artifactId>okta-jwt-verifier</artifactId>
    <version>{{ site.versions.jwt_validator_java }}</version>
</dependency>
```

For Gradle:
```groovy
compile 'com.okta.jwt:okta-jwt-verifier:{{ site.versions.jwt_validator_java }}'
```

### Use the API

We can create a simple Servlet example by creating a `Filter`:
{% include domain-admin-warning.html %}

```java
@WebFilter(urlPatterns = {"/api/*"})
public static class OktaAccessTokenFilter implements Filter {

    private JwtVerifier jwtVerifier;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

        try {
            this.jwtVerifier = new JwtHelper()
                    .setIssuerUrl("https://{yourOktaDomain}/oauth2/default"))
                    .setAudience("api://default")
                    .build();

        } catch (IOException e) {
            throw new ServletException("Failed to create JWT Verifier", e);
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                                                 throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String authHeader = httpRequest.getHeader("Authorization");

        if (authHeader != null
                && !authHeader.isEmpty()
                && authHeader.startsWith("Bearer ")) {

            // Strip the auth type
            String jwtString = authHeader.replaceFirst("^Bearer ", "");

            try {
                jwtVerifier.decodeAccessToken(jwtString);
                chain.doFilter(request, response);
                return;

            } catch (JoseException e) {
                httpRequest.getServletContext().log("Failed to decode Access Token", e);
            }
        }

        httpResponse.setHeader("WWW-Authenticate", "Bearer realm=\"Okta-Servlet-Example\"");
        httpResponse.sendError(401, "Unauthorized");
    }
}
```

Next up is to create a `Servlet` for the '/api/messages' endpoint we defined in the above client:
```java
@WebServlet(urlPatterns={"/api/messages"})
public class ExampleServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
                                                     throws ServletException, IOException {
        // handle request
    }
}
```

For more examples and other project information check out [okta/okta-jwt-verifier-java](https://github.com/okta/okta-jwt-verifier-java) on Github.
