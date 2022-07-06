You can configure that as follows in your Spring app:

```java
http
  .authorizeRequests(request ->
    request.antMatchers("/checkout/**").authenticated())
```

Or, you might want to only allow a specific group to access a section of your site:

```java
http
  // ...
  .authorizeHttpRequests(authorize -> authorize
    .mvcMatchers("/admin/**").hasAuthority("Admin Group")
```

You need to [configure a `groups` claim in your authorization server](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server) for this to work.