Although you don't have to install any additional SDK in order to add support for authentication to your App, you need to perform the configuration steps described in this page [Secure an ASP.NET Core Blazor WebAssembly standalone app with the Authentication library](https://docs.microsoft.com/en-us/aspnet/core/blazor/security/webassembly/standalone-with-authentication-library)

1. Add `Microsoft.AspNetCore.Components.WebAssembly.Authentication` NuGet package to the project. 


2. Add the following line to `_Imports.razor` file:

`
@using Microsoft.AspNetCore.Components.Authorization
`


3. Add a reference to `AuthenticationService` script to `wwwroot/index.html`:

```html
    <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/
    AuthenticationService.js"></script>
``` 


4. Replace the content of your `App.razor` file with the following:

```html
<CascadingAuthenticationState>
    <Router AppAssembly="@typeof(Program).Assembly">
        <Found Context="routeData">
            <AuthorizeRouteView RouteData="@routeData" 
                DefaultLayout="@typeof(MainLayout)">
                <NotAuthorized>
                    @if (!context.User.Identity.IsAuthenticated)
                    {
                        <RedirectToLogin />
                    }
                    else
                    {
                        <p>
                            You are not authorized to access 
                            this resource.
                        </p>
                    }
                </NotAuthorized>
            </AuthorizeRouteView>
        </Found>
        <NotFound>
            <LayoutView Layout="@typeof(MainLayout)">
                <p>Sorry, there's nothing at this address.</p>App 
            </LayoutView>
        </NotFound>
    </Router>
</CascadingAuthenticationState>
```


5. Add the `RedirectToLogin` component in `Shared/RedirectToLogin.razor` file

```html
@inject NavigationManager Navigation
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@code {
    protected override void OnInitialized()
    {
        Navigation.NavigateTo(
            $"authentication/login?returnUrl={Uri.EscapeDataString(Navigation.Uri)}");
    }
}
```

6. Add the `Authentication` component in `Pages/Authentication.razor` file:

```html
@page "/authentication/{action}"
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication

<RemoteAuthenticatorView Action="@Action" />

@code {
    [Parameter]
    public string Action { get; set; }
}
```
