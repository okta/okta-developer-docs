<template>
  <p>This quickstart has moved to our <a :href="this.redirectUrl">new Guides</a>.</p>
</template>
<script>
  export default {

    data() {
      return {
        currentHash: null,
        activeClient: null,
        activeServer: null,
        activeFramework: null,
        redirectUrl: null,
        mappings: {
          '#/okta-sign-in-page/nodejs/express' : '/docs/guides/sign-into-web-app-redirect/node-express/main/',
          '#/okta-sign-in-page/nodejs/generic' : '/docs/guides/sign-into-web-app-redirect/node-express/main/',
          '#/okta-sign-in-page/java/spring' : '/docs/guides/sign-into-web-app-redirect/spring-boot/main/',
          '#/okta-sign-in-page/java/generic' : '/docs/guides/sign-into-web-app-redirect/spring-boot/main/',
          '#/okta-sign-in-page/php/generic' : '/docs/guides/sign-into-web-app-redirect/php/main/',
          '#/okta-sign-in-page/dotnet/aspnetcore' : '/docs/guides/sign-into-web-app-redirect/asp-net-core-3/main/',
          '#/okta-sign-in-page/dotnet/aspnet4' : '/docs/guides/sign-into-web-app-redirect/asp-net/main/',
          '#/widget/nodejs/express' : '/docs/guides/protect-your-api/nodeexpress/main/',
          '#/widget/nodejs/generic' : '/docs/guides/protect-your-api/nodeexpress/main/',
          '#/widget/java/spring' : '/docs/guides/protect-your-api/springboot/main/',
          '#/widget/java/generic' : '/docs/guides/protect-your-api/springboot/main/',
          '#/widget/php/generic' : '/docs/guides/protect-your-api/php/main/',
          '#/widget/dotnet/aspnetcore' : '/docs/guides/protect-your-api/aspnet/main/',
          '#/widget/dotnet/aspnet4' : '/docs/guides/protect-your-api/aspnetcore/main/',
          '#/angular/nodejs/express' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/angular/nodejs/generic' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/angular/java/spring' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/angular/java/generic' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/angular/php/generic' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/angular/dotnet/aspnetcore' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/angular/dotnet/aspnet4' : '/docs/guides/sign-into-spa-redirect/angular/main/',
          '#/react/nodejs/express' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/react/nodejs/generic' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/react/java/spring' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/react/java/generic' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/react/php/generic' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/react/dotnet/aspnetcore' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/react/dotnet/aspnet4' : '/docs/guides/sign-into-spa-redirect/react/main/',
          '#/vue/nodejs/express' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/vue/nodejs/generic' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/vue/java/spring' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/vue/java/generic' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/vue/php/generic' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/vue/dotnet/aspnetcore' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/vue/dotnet/aspnet4' : '/docs/guides/sign-into-spa-redirect/vue/main/',
          '#/android/nodejs/express' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/android/nodejs/generic' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/android/java/spring' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/android/java/generic' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/android/php/generic' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/android/dotnet/aspnetcore' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/android/dotnet/aspnet4' : '/docs/guides/sign-into-mobile-app/android/main/',
          '#/ios/nodejs/express' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/ios/nodejs/generic' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/ios/java/spring' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/ios/java/generic' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/ios/php/generic' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/ios/dotnet/aspnetcore' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/ios/dotnet/aspnet4' : '/docs/guides/sign-into-mobile-app/ios/main/',
          '#/react-native/nodejs/express' : '/docs/guides/sign-into-mobile-app/react-native/main/',
          '#/react-native/nodejs/generic' : '/docs/guides/sign-into-mobile-app/react-native/main/',
          '#/react-native/java/spring' : '/docs/guides/sign-into-mobile-app/react-native/main/',
          '#/react-native/java/generic' : '/docs/guides/sign-into-mobile-app/react-native/main/',
          '#/react-native/php/generic' : '/docs/guides/sign-into-mobile-app/react-native/main/',
          '#/react-native/dotnet/aspnetcore' : '/docs/guides/sign-into-mobile-app/react-native/main/',
          '#/react-native/dotnet/aspnet4' : '/docs/guides/sign-into-mobile-app/react-native/main/',
        }
      }
    },

    beforeMount: function () {
      if(!window.location.hash) {
        window.location.replace("/docs/guides/")
        return
      }

      this.redirectUrl = this.mappings[window.location.hash] || '/docs/guides'

      window.location.replace(this.redirectUrl)
      return
    }
  }

</script>
