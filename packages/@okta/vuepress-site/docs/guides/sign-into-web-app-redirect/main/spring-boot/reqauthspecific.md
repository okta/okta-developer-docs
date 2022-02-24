You can configure that as follows in your Spring app:

```java
http
  .authorizeRequests(request ->
    request.antMatchers("/checkout/**").authenticated())
```

Or, you might want to only allow a specific group to access a section of your site. You need to configure a `groups` claim in your authorization server for this to work.

```java
http
  // ...
  .authorizeHttpRequests(authorize -> authorize
    .mvcMatchers("/admin/**").hasAuthority("Admin Group")
```
