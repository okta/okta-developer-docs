---
title: Add and Configure Packages
---
# Add and Configure Packages

Next you need to add Okta to your application.

<StackSelector snippet="addconfigpkg"/>

## Configure Dependencies

For Apache Maven:
```xml
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-boot-starter</artifactId>
    <version>{{ site.versions.spring_boot_starter }}</version>
</dependency>
```
For Gradle:
```groovy
compile 'com.okta.spring:okta-spring-boot-starter:{{ site.versions.spring_boot_starter }}'
```

## Configure the Middleware

You need the Client ID and Client Secret that you copied from the Okta application that you created earlier to instantiate the middleware. You also need to know your Okta org URL, which you can find on the dashboard of the Okta Developer console.

You can configure the properties of your application with environment variables, system properties, or configuration files. An example `application.properties` file looks like:

<StackSelector snippet="configmid"/>
