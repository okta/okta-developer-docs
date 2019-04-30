Open the `Startup.cs` file and update the `ConfigureServices` method to include the `PostLogoutRedirectUri` in the Okta configuration:

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        //...
        services.AddOktaMvc(new OktaMvcOptions()
        {
            //...
            PostLogoutRedirectUri = "http://localhost:3000/Account/PostSignOut",
        }
    }
}