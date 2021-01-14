```java
// check if we landed success on login
if (idxResponse.isLoginSuccessful()){
    log.info("Login Successful!");
    TokenResponse tokenResponse=idxResponse.getSuccessWithInteractionCode().exchangeCode(client);
    log.info("Exchanged interaction code for token: \naccessToken: {}, \nidToken: {}, \ntokenType: {}, \nscope: {}, \nexpiresIn:{}",
    tokenResponse.getAccessToken(),
    tokenResponse.getIdToken(),
    tokenResponse.getTokenType(),
    tokenResponse.getScope(),
    tokenResponse.getExpiresIn());
}
```
