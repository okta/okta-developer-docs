If you don't already have a `Startup.cs` file (OWIN Startup class), create one by right-clicking your project and choosing **Add > OWIN Startup Class**.

Paste the following code into the `Configuration` method:

```csharp
public void Configuration(IAppBuilder app)
{
    app.UseOktaWebApi(new OktaWebApiOptions()
    {
        OktaDomain = "https://${yourOktaDomain}",
    });
}
```

Update your `using` statements to import `Okta.AspNet` and other required namespaces:

```csharp
using Microsoft.Owin;
using Owin;
using Okta.AspNet;
```

The `OktaWebApiOptions` class configures the Okta middleware. You can see all of the available options in the **Configuration Reference** section in the [Okta ASP.NET GitHub](https://github.com/okta/okta-aspnet/blob/master/docs/aspnet4x-webapi.md#configuration-reference) repo.
