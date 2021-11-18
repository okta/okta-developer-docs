This Razor component is an example of how you can [get the access token](https://codyanhorn.tech/blog/blazor/2020/09/05/Blazor-Get-Access-Token-for-User.html)


```csharp
@page "/token"
@using System.Threading.Tasks;
@using Microsoft.AspNetCore.Authorization;
@using Microsoft.AspNetCore.Components;
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

<div>
    @AccessToken 
</div>

@code
{
        [Inject]
        IAccessTokenProvider TokenProvider { get; set; }

        public string AccessToken { get; set; }

        protected override async Task OnInitializedAsync()
        {
            var accessTokenResult = await TokenProvider.RequestAccessToken();
            AccessToken = string.Empty;

            if (accessTokenResult.TryGetToken(out var token))
            {
                AccessToken = token.Value;
            }
        }
}
```
