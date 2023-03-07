### 1: The user navigates to the sign-in page

Begin the authentication process by calling the Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

Use the `AuthenticationResponse.getIdps()` function to return a list of social Identity Provider (IdP) options configured in your org's routing rule.

```java
List<Idp> idps = authenticationResponse.getIdps();
```

You need to build a generic sign-in form with the social sign-in options available from the list of IdPs returned. In this use case, Facebook is the only configured IdP returned in the list.

```html
<div th:case="'FACEBOOK'">
    <a th:href="@{${idp.href}}" class="btn btn-lg btn-social btn-facebook" id="btn-facebook">
        <i class="fa fa-facebook fa-fw"></i> Sign in with Facebook
    </a>
</div>
```

The previous code snippet is rendered as a **Sign in with Facebook** button, as shown in the following wireframe.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and also buttons for signing in with facebook or google](/img/wireframes/sign-in-form-username-password-facebook-google.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36701&t=wzNwSZkdctajVush-1 sign-in-form-username-password-facebook-google
 -->

</div>

### 2: The user signs in with Facebook

When the user selects the **Login with Facebook** option, they are directed to the Facebook sign-in page.

After the user signs in to Facebook successfully, Facebook routes the user to the location specified in **Valid OAuth Redirect URIs** from the Facebook developer site.

> **Note:** The **Valid OAuth Redirect URIs** for your Okta org is in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`. See [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/java/main/#_1-create-a-facebook-app-in-facebook) for details on configuring the **Valid OAuth Redirect URIs** value.

### 3: Handle the callback from Okta

Okta returns the Interaction code in the callback to the **Sign-in redirect URI** location specified in the [Create a new application](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) section. You need to handle the callback by exchanging the Interaction code for the required tokens (access, refresh, ID).

```java
AuthenticationResponse authenticationResponse =
    authenticationWrapper.fetchTokenWithInteractionCode(issuer, proceedContext, interactionCode);
```

With the obtained access token, the user is successfully signed in, and can be sent to the default signed-in home page.

> **Note:** You can obtain basic user information after the user is authenticated by making a request to the Okta OpenID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/java/main/#get-the-user-profile-information) for details.
