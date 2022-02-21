You can allow anonymous access for specific URLs using Spring Security's `permitAll()` in your configuration:

```java
http
  // ...
  .authorizeHttpRequests(authorize -> authorize           
    .mvcMatchers("/", "/about").permitAll()
```