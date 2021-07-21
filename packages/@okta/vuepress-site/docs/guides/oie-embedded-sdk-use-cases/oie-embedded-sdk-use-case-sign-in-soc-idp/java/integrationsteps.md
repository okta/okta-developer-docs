## Integration steps

### Step 1: Sign in with Facebook

Use [`IDXAuthenticationWrapper`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java) to start the sign-in process with Okta when the user goes to the sign-in page.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

Use the [`AuthenticationResponse.getIdps()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java#L91) function to return a list of social Identity Provider (IdP) options configured in your org's routing rule.

```java
List<Idp> idps = authenticationResponse.getIdps();
```

You need to build a generic sign-in view page with the social sign-in options available from the list of IdPs returned. However, in this use case, Facebook is the only configured IdP in the list.

```html
<div th:case="'FACEBOOK'">
    <a th:href="@{${idp.href}}" class="btn btn-lg btn-social btn-facebook" id="btn-facebook">
        <i class="fa fa-facebook fa-fw"></i> Login with Facebook
    </a>
</div>
```

The previous code snippet is rendered as the **Login with Facebook** button, as shown in the following image:

<div class="common-image-format">

![Displays the Login with Facebook button in a sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link-java.png)

</div>

### Step 2: User signs in with Facebook

When the user selects the **Login with Facebook** option, they are directed to the Facebook sign-in page.

After the user signs in to Facebook successfully, Facebook routes the user to the location specified in **Valid OAuth Redirect URIs** from the Facebook developer site.

> **Note:** The **Valid OAuth Redirect URIs** for your Okta org is in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`. See [Step 1: Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/java/main/#step-1-create-a-facebook-app-in-facebook) for details on configuring the **Valid OAuth Redirect URIs** value.

### Step 3: Handle the callback from Okta

Okta returns the Interaction code in the callback to the **Sign-in redirect URI** location specified in the [Create new application](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application) section. You need to handle the callback by exchanging the Interaction code for a token.

```java
AuthenticationResponse authenticationResponse =
    authenticationWrapper.fetchTokenWithInteractionCode(issuer, proceedContext, interactionCode);
```

With the obtained access token, you can retrieve basic user information by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/java/main/#getuserprofileinfo) for details.

The user is now successfully signed in and can be sent to the default sign-in page.
