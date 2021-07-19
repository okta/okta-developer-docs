## Integration steps

### Step 1: Start the sign-in process

Use [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java) to start the sign-in process with Okta when the user goes to the sign-in page.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

### Step 2: Get the available IdPs from your org

Use the [AuthenticationResponse.getIdps()](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java#L91) function to return a list of social Identity Provider (IdP) options configured in your org's routing rule. See [Set up your Okta org (for social Identity Providers)](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-social-identity-providers) for IdP configuration in your org.

```java
ModelAndView modelAndView = new ModelAndView("login");
if (!CollectionUtils.isEmpty(authenticationResponse.getIdps())) {
    modelAndView.addObject("idps", authenticationResponse.getIdps());
}
return modelAndView;
```

### Step 3: Display the social sign-in options in your sign-in HTML page

You need to build the sign-in HTML view page with the social sign-in options available from the list of IdPs.

```javascript
<!-- display the social login button(s), if the org is setup to support it -->
<div th:if="${not #lists.isEmpty(idps)}" class="container" th:align="center">
    <th:block th:each="idp: ${idps}">
        <div th:switch="${idp.type}">
            <div th:case="'GOOGLE'">
                <a th:href="@{${idp.href}}" class="btn btn-lg btn-social btn-google">
                    <i class="fa fa-google fa-fw"></i> Login with Google
                </a>
            </div>
            <div th:case="'FACEBOOK'">
                <a th:href="@{${idp.href}}" class="btn btn-lg btn-social btn-facebook" id="btn-facebook">
                    <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                </a>
            </div>
            <div th:case="'LINKEDIN'">
                <a th:href="@{${idp.href}}" class="btn btn-lg btn-social btn-linkedin">
                    <i class="fa fa-linkedin fa-fw"></i> Login with LinkedIn
                </a>
            </div>
            <div th:case="'*'">
                <br><a th:href="@{${idp.href}}" class="btn btn-primary">Login with [[${idp.type}]]</a><br>
            </div>
        </div>
        <p/>
    </th:block>
</div>
```

If the user selects the **Login with Facebook** option, they are directed to the Facebook sign-in page.

### Step 4: Facebook redirects to your Okta org

After the user signs in to Facebook successfully, Facebook routes the user to the location that you've specified in **Valid OAuth Redirect URIs** from the Facebook developer site. See [Step 1: Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/java/main/#step-1-create-a-facebook-app-in-facebook).

The **Valid OAuth Redirect URIs** for your Okta org is in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`.

### Step 5: Handle the callback from Okta

Okta returns the Interaction code in the callback to the **Sign-in redirect URI** location specified in [Create new application](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application). You need to handle the callback by exchanging the Interaction code for token.

```java
AuthenticationResponse authenticationResponse =
        authenticationWrapper.fetchTokenWithInteractionCode(issuer, proceedContext, interactionCode);

```

With the access token, you can obtain basic user information after the user is authenticated by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/java/main/#getuserprofileinfo).

### Step 6: Send the user to the default home page
The user is now successfully signed in and can be sent to the default sign-in page.
