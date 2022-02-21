Add the required dependency, depending on whether you are using Maven or Gradle (your version numbers will vary, depending on the exact version you are using):

**Maven:**

```xml
<dependency>
  <groupId>com.okta.spring</groupId>
  <artifactId>okta-spring-boot-starter</artifactId>
  <version>2.1.4</version>
</dependency>
```

**Gradle:**

```groovy
implementation group: 'com.okta.spring', name: 'okta-spring-boot-starter', version: '2.1.4'
```

> **Note**: Apps created with the [Spring Initializr](https://start.spring.io/#!type=maven-project&language=java&packaging=jar&jvmVersion=11&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=web,okta) already include the correct dependency.