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
          '#/okta-sign-in-page/nodejs/express' : '/docs/guides/sign-into-web-app/nodeexpress/before-you-begin/',
          '#/okta-sign-in-page/nodejs/generic' : '/docs/guides/sign-into-web-app/nodeexpress/before-you-begin/',
          '#/okta-sign-in-page/java/spring' : '/docs/guides/sign-into-web-app/springboot/before-you-begin/',
          '#/okta-sign-in-page/java/generic' : '/docs/guides/sign-into-web-app/springboot/before-you-begin/',
          '#/okta-sign-in-page/php/generic' : '/docs/guides/sign-into-web-app/php/before-you-begin/',
          '#/okta-sign-in-page/dotnet/aspnetcore' : '/docs/guides/sign-into-web-app/aspnetcore/before-you-begin/',
          '#/okta-sign-in-page/dotnet/aspnet4' : '/docs/guides/sign-into-web-app/aspnet/before-you-begin/',
          '#/widget/nodejs/express' : '/docs/guides/protect-your-api/nodeexpress/before-you-begin/',
          '#/widget/nodejs/generic' : '/docs/guides/protect-your-api/nodeexpress/before-you-begin/',
          '#/widget/java/spring' : '/docs/guides/protect-your-api/springboot/before-you-begin/',
          '#/widget/java/generic' : '/docs/guides/protect-your-api/springboot/before-you-begin/',
          '#/widget/php/generic' : '/docs/guides/protect-your-api/php/before-you-begin/',
          '#/widget/dotnet/aspnetcore' : '/docs/guides/protect-your-api/aspnet/before-you-begin/',
          '#/widget/dotnet/aspnet4' : '/docs/guides/protect-your-api/aspnetcore/before-you-begin/',
          '#/angular/nodejs/express' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/angular/nodejs/generic' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/angular/java/spring' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/angular/java/generic' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/angular/php/generic' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/angular/dotnet/aspnetcore' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/angular/dotnet/aspnet4' : '/docs/guides/sign-into-spa/angular/before-you-begin/',
          '#/react/nodejs/express' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/react/nodejs/generic' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/react/java/spring' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/react/java/generic' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/react/php/generic' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/react/dotnet/aspnetcore' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/react/dotnet/aspnet4' : '/docs/guides/sign-into-spa/react/before-you-begin/',
          '#/vue/nodejs/express' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/vue/nodejs/generic' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/vue/java/spring' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/vue/java/generic' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/vue/php/generic' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/vue/dotnet/aspnetcore' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/vue/dotnet/aspnet4' : '/docs/guides/sign-into-spa/vue/before-you-begin/',
          '#/android/nodejs/express' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/android/nodejs/generic' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/android/java/spring' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/android/java/generic' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/android/php/generic' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/android/dotnet/aspnetcore' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/android/dotnet/aspnet4' : '/docs/guides/sign-into-mobile-app/android/before-you-begin/',
          '#/ios/nodejs/express' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/ios/nodejs/generic' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/ios/java/spring' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/ios/java/generic' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/ios/php/generic' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/ios/dotnet/aspnetcore' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/ios/dotnet/aspnet4' : '/docs/guides/sign-into-mobile-app/ios/before-you-begin/',
          '#/react-native/nodejs/express' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
          '#/react-native/nodejs/generic' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
          '#/react-native/java/spring' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
          '#/react-native/java/generic' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
          '#/react-native/php/generic' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
          '#/react-native/dotnet/aspnetcore' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
          '#/react-native/dotnet/aspnet4' : '/docs/guides/sign-into-mobile-app/react-native/before-you-begin/',
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
