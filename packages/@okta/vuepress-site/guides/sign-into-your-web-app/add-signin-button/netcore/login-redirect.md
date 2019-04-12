Open your `_Layout.cshtml` file and update the `body` with the following code:

```
<div class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
        <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
        <li><a asp-area="" asp-controller="Home" asp-action="About">About</a></li>
        <li><a asp-area="" asp-controller="Home" asp-action="Contact">Contact</a></li>
    </ul>
    @if (User.Identity.IsAuthenticated)
    {
        <ul class="nav navbar-nav navbar-right">
            <li><p class="navbar-text">Hello, @User.Identity.Name</p></li>
            <li><a asp-controller="Home" asp-action="Profile">Profile</a></li>
            <li><a onclick="document.getElementById('logout_form').submit();" style="cursor: pointer;">Log out</a></li>
        </ul>
        <form asp-controller="Account" asp-action="Logout" method="post" id="logout_form"></form>
    }
    else
    {
        <ul class="nav navbar-nav navbar-right">
            <li><a asp-controller="Account" asp-action="Login">Log in</a></li>
        </ul>
    }
</div>
```

In the next step, we show you how to create an `AccountController` to handle login and logout.

