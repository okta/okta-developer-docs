Open the `Startup.cs` file and update the `Configuration` method to include the `PostLogoutRedirectUri` in the Okta configuration:

```csharp
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        //...
        app.UseOktaMvc(new OktaMvcOptions()
        {
            //...
            PostLogoutRedirectUri = "http://localhost:3000/Account/PostSignOut",
        });
    }
}