### 1: Navigate to the sign-in page

The first step is to call the `StartWidgetSigninAsync` method when the page that contains the embedded Widget is loaded. The `IdxClient` contains the configuration information (either from the `okta.yaml` file, env variables, or passed in from the constructor) to establish a connection to the Okta org and application.

The following sample code shows the instantiation of the `IdxClient` and the `StartWidgetSignInAsync` call.

```csharp
public async Task<ActionResult> Index()
{
     var idxClient = new IdxClient(new IdxConfiguration()
     {
           Issuer = "https://dev-12345678.okta.com/oauth2/default",
           ClientId = "${clientId}",
           ClientSecret = "${clientSecret}",
           RedirectUri = "https://localhost:44314/interactioncode/callback/",
           Scopes = new List<string>{"openid","profile", "offline_access"}
     });

     var widgetSignInResponse = await idxClient.StartWidgetSignInAsync(default);
     var idxContext = widgetSignInResponse.IdxContext;
     var signInWidgetConfiguration = widgetSignInResponse.SignInWidgetConfiguration;

     return View(signInWidgetConfiguration);
}
```

> **Note:** In the preceding MVC setup, the response's `SignInWidgetConfiguration` property is passed to the view as a model.

The `StartWidgetSigninAsync` call returns a `WidgetSigninResponse` response object. The `SignInWidgetConfiguration` property of this response object contains information that needs to be passed to the Sign-In Widget to initialize the page. The following example shows the object structure in JSON format. Replace `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget (-=OKTA_REPLACE_WITH_WIDGET_VERSION=-).

```json
{
   "interactionHandle":"epXgGYZHsYErPLfw8aLpCvWZOgVtYx25_OYCmQc0z2s",
   "version":"${widgetVersion}",
   "baseUrl":"https://dev-12345678.okta.com",
   "clientId":"${clientId}",
   "redirectUri":"https://localhost:44314/interactioncode/callback/",
   "authParams":{
      "issuer":"https://dev-122345678.okta.com/oauth2/default",
      "scopes":[
         "openid",
         "profile",
         "offline_access"
      ]
   },
   "state":"${state}",
   "otp":"${otp}",
   "codeChallenge":"${codechallenge}",
   "codeChallengeMethod":"S256"
}
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `"useInteractionCodeFlow": true` in the configuration settings shown above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `"useClassicEngine" = true` in the configuration settings.

### 2: Load the widget

#### 2a: Add namespaces and model

If using an MVC setup (as in the sample), the namespaces and model need to be defined in the page.

```csharp
@using Newtonsoft.Json
@using Okta.Idx.Sdk

@model SignInWidgetConfiguration
```

#### 2b: Add the Okta CDN link

Add the Sign-In Widget source to your page by referencing the Okta CDN, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```razor
@section head
{
   <script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
   <link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet" />
}
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

#### 2c: Add JavaScript to initialize and load the widget

The next step includes the following activities:

1. Create a JavaScript object from the model.
1. Initialize the JavaScript model object and the widget object that passes in the `div id` (for example, `okta-signin-widget-container`) on the page.
1. Call the `showSignInAndRedirect` method on the widget object to display the sign-in page.

The `div id` that you passed into the widget needs to match a `div` on the page that you are going to create in the next step. See the following sample code.

```csharp
<script type="text/javascript">
   const widgetConfig = @Html.Raw(JsonConvert.SerializeObject(Model));

   console.log(widgetConfig.interactionHandle);

   const signIn = new OktaSignIn({
       el: '#okta-signin-widget-container',
       ...widgetConfig
   });

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   signIn.otp = searchParams.get('otp');
   signIn.state = searchParams.get('state');

   signIn.showSignInAndRedirect()
       .catch(err => {
           console.log('Error happen in showSignInAndRedirect: ', err);
       });
</script>
```

#### 2d: Add div tag

The final step is to add a `div` element with the `id` (for example, `okta-signin-widget-container`). The `id` needs to match the `id` that you passed into the widget object in the previous step.

```html
<div id="okta-signin-widget-container"></div>
```

### 3: Display the widget

The final step is to run your app. If the widget and Okta org are properly configured, the Sign-In Widget loads and appears, similar to the following image.

<div class="half">

![Screenshot of basic Okta Sign-In Widget](/img/siw/okta-sign-in-javascript.png)

</div>

> **Note:** The **Forgot password?** and **Sign Up** links are configurable elements in your Okta org and may not appear on the page.
