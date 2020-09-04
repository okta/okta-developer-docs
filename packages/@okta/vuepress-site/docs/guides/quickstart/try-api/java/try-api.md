To get the Okta Java SDK, and to read its documentation, go to its [GitHub Repository](https://github.com/okta/okta-sdk-java).

To create a user by means of the Java SDK, you could use the following code:

```java
User user = UserBuilder.instance()
    .setEmail("joe.coder@example.com")
    .setFirstName("Joe")
    .setLastName("Code")
    .buildAndCreate(client);
```

