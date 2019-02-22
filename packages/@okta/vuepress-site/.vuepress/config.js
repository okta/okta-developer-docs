module.exports = {
  dest: 'dist',
  theme: "@okta/vuepress-theme-default",
  /**
   * Custom head elements here
   */
  head: [
    ['link', { rel: 'icon', href: '/assets/favicon/logo.png' }],
    ['link', { rel: 'stylesheet', href: 'https://developer.okta.com/sites/all/themes/developer/css/master.css' }],

    /**
     * Header scripts for typekit, GA, GTM, and Heap Analytics (WIP)
     */
    ['script', {}, `
      // TypeKit
        (function(d) {
          var config = {
            kitId: 'jff5neq',
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/bwf-loadingb/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);

      var isProduction = window.location.hostname === 'developer.okta.com';
      if (isProduction) {

        // Google analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-15777010-3', 'auto');
        ga('send', 'pageview');

        // START Google Tag Manager
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TJ45R6');
        // END Google Tag Manager

        // Start Heap Analytics
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
        heap.load("3356162945");
        // End Heap Analytics
      }
    `]
  ],
  title: "Okta Developer",
  description: "Secure, scalable, and highly available authentication and user management for any app.",

  /**
   * Global theme config
   */
  themeConfig: {

    headerAnchorSelector: ".test",
    /**
     * Primary Nav: Array of MenuItem components to iterate over within TopNavigation component
     */
    primary_nav: [
      { text: 'Product', link: 'https://developer.okta.com/product/',
        children: [
          { text: 'Overview', link: 'https://developer.okta.com/product/' },
          { text: 'Authentication', link: 'https://developer.okta.com/product/authentication/' },
          { text: 'Authorization', link: 'https://developer.okta.com/product/authorization/' },
          { text: 'User Management', link: 'https://developer.okta.com/product/user-management/' },
        ]
      },
      { text: 'Pricing', link: 'https://developer.okta.com/pricing/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Docs', link: '/documentation/',
        children: [
          { text: 'Get Started', link: '/documentation/' },
          { text: 'API Reference', link: '/reference/' },
        ]
      },
      { text: 'Support', link: '',
        children: [
          { text: 'Get Started', link: 'https://developer.okta.com/documentation/' },
          { text: 'API Reference', link: 'https://developer.okta.com/reference/' },
        ]
      }
    ],

    /**
     * Footer Nav: Array of FooterColumn components to iterate over within Footer component
     * Each column contains a menu array of MenuItem components to iterate over within FooterColumn component
     */
    footer_nav: [
      {
        heading: 'Social',
        menu: [
          { text: 'GitHub', link: 'http://github.com/oktadeveloper', target: '_blank', css: 'Footer-links--github' },
          { text: 'Twitter', link: 'http://twitter.com/OktaDev', target: '_blank', css: 'Footer-links--twitter' },
          { text: 'Forum', link: 'https://devforum.okta.com/', target: '_blank', css: 'Footer-links--forum' },
          { text: 'RSS Blog', link: 'http://feeds.feedburner.com/OktaBlog', target: '_blank', css: 'Footer-links--rss' },
          { text: 'YouTube', link: 'https://www.youtube.com/channel/UC5AMiWqFVFxF1q9Ya1FuZ_Q/featured', target: '_blank', css: 'Footer-links--youtube' },
        ]
      },
      {
        heading: 'More Info',
        menu: [
          { text: 'Integrate With Okta', link: 'https://developer.okta.com/integrate-with-okta/' },
          { text: 'Blog', link: 'https://developer.okta.com/blog/' },
          { text: 'Changelog', link: 'https://developer.okta.com/docs/change-log/' },
          { text: '3rd Party Notices', link: 'https://developer.okta.com/3rd_party_notices/' },
        ]
      },
      {
        heading: 'Contact & Legal',
        menu: [
          { text: 'Contact Our Team', link: 'https://developer.okta.com/contact/' },
          { text: 'Contact Sales', link: 'https://developer.okta.com/contact-sales-enterprise/' },
          { text: 'Contact Support', link: 'mailto:developers@okta.com' },
          { text: 'Terms &amp; Conditions', link: 'https://developer.okta.com/terms/' },
          { text: 'Privacy Policy', link: 'https://developer.okta.com/privacy/' },
        ]
      }
    ],

    sidebars: {
      main: "Edit the main sidebar from the 'documentation/index.md' file",
      codePages: [
        {
          title: "Mobile",
          links: [
            { title: 'Android', link: '/code/android/', activeCheck: '/code/android/'},
            { title: 'iOS', link: '/code/ios/', activeCheck: '/code/ios/'},
            { title: 'React Native', link: '/code/react-native/', activeCheck: '/code/react-native/'}
          ]
        },
        {
          title: "Front-end",
          links: [
            { title: 'Angular', link: '/code/angular/', activeCheck: '/code/angular/'},
            { title: 'Javascript', link: '/code/javascript/', activeCheck: '/code/javascript/'},
            { title: 'React', link: '/code/react/', activeCheck: '/code/react/'},
            { title: 'Vue', link: '/code/vue/', activeCheck: '/code/vue/'}
          ]
        },
        {
          title: "Back-end",
          links: [
            { title: '.Net', link: '/code/dotnet/aspnetcore/', activeCheck: '/code/dotnet/'},
            { title: 'Go', link: '/code/go/', activeCheck: '/code/go/'},
            { title: 'Java', link: '/code/java/', activeCheck: '/code/java/'},
            { title: 'Node.js', link: '/code/nodejs/', activeCheck: '/code/nodejs/'},
            { title: 'PHP', link: '/code/php/', activeCheck: '/code/php/'},
            { title: 'REST', link: '/code/rest/', activeCheck: '/code/rest/'},
          ]
        }
      ]
    },

    /**
     * Config used for primary header (TopNavigation)
     */
    home_url: 'https://developer.okta.com',
    search_url: 'https://developer.okta.com/search/',
    logo_svg: '<svg version="1.1" id="OktaLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 431.9 151.4" style="enable-background:new 0 0 431.9 151.4;" xml:space="preserve"><g><g><g><path d="M102.2,41.4c-21,0-38.1,17.1-38.1,38.1s17.1,38.1,38.1,38.1s38.1-17.1,38.1-38.1l0,0C140.3,58.5,123.2,41.4,102.2,41.4z M102.2,98.5c-10.5,0-19-8.5-19-19s8.5-19,19-19s19,8.5,19,19c0.1,10.5-8.4,19-18.9,19.1C102.3,98.6,102.2,98.6,102.2,98.5L102.2,98.5z"/><path d="M169.1,92.3c0-1.9,1.5-3.4,3.4-3.4c0.9,0,1.8,0.4,2.4,1c9.5,9.7,25.3,26.3,25.4,26.4c0.4,0.5,0.8,0.8,1.4,0.9l1.6,0.2h17.2c1.8,0,3.3-1.4,3.4-3.2c0-0.8-0.3-1.5-0.8-2.2l-28.6-29.2l-1.5-1.5c-3.2-3.9-2.9-5.4,0.8-9.3l22.6-25.1c1.1-1.4,0.8-3.5-0.6-4.6c-0.6-0.4-1.3-0.7-2-0.7h-17c-0.6,0.2-1.1,0.5-1.5,0.9L175,64.4c-1.3,1.4-3.4,1.5-4.8,0.2c-0.7-0.6-1.1-1.5-1.1-2.5V18.9c0-1.7-1.3-3-3-3c-0.1,0-0.2,0-0.3,0h-12.7c-2.2,0-3.3,1.5-3.3,2.8v95.8c0,2.2,1.8,2.8,3.3,2.8h12.7c1.7,0.1,3.2-1.2,3.3-2.9c0,0,0,0,0,0V92.3z"/><path d="M273,114l-1.4-12.8c-0.2-1.7-1.7-2.9-3.4-2.7c0,0,0,0-0.1,0l-2.9,0.2c-10.1,0-18.5-7.9-19-18c0-0.3,0-0.7,0-1V64.2c-0.1-2,1.5-3.6,3.5-3.7c0,0,0,0,0,0h17c1.7-0.1,3.1-1.5,3-3.2c0,0,0-0.1,0-0.1v-12c0-2.3-1.5-3.6-2.8-3.6h-17.1c-1.9,0.1-3.5-1.5-3.6-3.4c0,0,0,0,0,0V18.9c-0.1-1.7-1.5-3.1-3.2-3c0,0-0.1,0-0.1,0h-12.7c-1.6-0.1-3,1.1-3.1,2.7c0,0.1,0,0.1,0,0.2c0,0,0,61.7,0,62c0.5,21,17.9,37.6,38.9,37c1.4,0,2.9-0.2,4.3-0.3C272,117.2,273.2,115.7,273,114z"/></g><path d="M364.7,98c-10.8,0-12.4-3.8-12.4-18.3l0,0V44.8c0-1.8-1.4-3.2-3.2-3.2c0,0-0.1,0-0.1,0h-12.8c-1.8,0-3.2,1.4-3.3,3.2v1.6C314.6,36,291.3,42.5,281,60.8c-10.4,18.3-3.9,41.6,14.4,51.9c14,7.9,31.4,6.2,43.5-4.2c3.6,5.5,9.3,9.1,18.3,9.1c1.5,0,9.7,0.3,9.7-3.5v-13.6C367,99.2,366,98.1,364.7,98z M314.2,98.6c-10.5,0-19-8.5-19-19s8.5-19,19-19s19,8.5,19,19l0,0C333.2,90.1,324.7,98.6,314.2,98.6z"/></g><path d="M19.4,74c2.2-1.9,4.1-4.1,5.7-6.6c3.5-5.3,5.4-11.5,5.2-17.9V27c0-4.9,0.9-8.4,2.7-10.5c1.8-2.1,4.8-3,9.2-3h12.6c1.2,0,2.1-0.9,2.2-2.1l0,0V2.2C57,1,56,0,54.8,0c0,0,0,0,0,0H41.5c-7.8,0-12.9,2.1-18,7.6s-7.1,12.3-7.1,21.7v14.2c0,2.2-0.1,4-0.2,5.7v2.2c-0.5,3.2-1.8,6.2-3.6,8.9C9.4,64.7,5.1,70.9,0.9,74l0,0l-0.3,0.3l0,0l-0.2,0.3H0.2v0.3l0,0c-0.1,0.3-0.1,0.7,0,1l0,0v0.3h0.1l0.2,0.3l0,0l0.3,0.3l0,0c4.2,3.1,8.5,9.3,11.3,13.7c1.8,2.7,3.1,5.7,3.6,8.9v2.2c0.1,1.6,0.2,3.5,0.2,5.7v14.3c0,9.4,2.4,16.7,7.1,21.7s10.2,7.6,18,7.6h13.8c1.2,0,2.2-1,2.2-2.2V140l0,0c0-1.2-1-2.2-2.2-2.2H42.2c-4.4,0-7.5-1-9.2-3s-2.7-5.6-2.7-10.5v-22.4c0.2-6.4-1.7-12.6-5.2-17.9c-1.6-2.5-3.5-4.7-5.7-6.6l0,0c-0.9-0.7-1.1-2-0.4-2.9C19.2,74.3,19.3,74.2,19.4,74L19.4,74z"/><path d="M412.5,74c-2.2-1.9-4.1-4.1-5.7-6.6c-3.5-5.3-5.4-11.5-5.2-17.9V27c0-4.9-0.9-8.4-2.7-10.5s-4.8-3-9.2-3h-12.6c-1.2,0-2.2-1-2.2-2.2c0,0,0,0,0,0l0,0V2.2c0-1.2,1-2.2,2.2-2.2c0,0,0,0,0,0h13.4c7.8,0,12.9,2.1,18,7.6s7.1,12.3,7.1,21.7v14.2c0,2.2,0.1,4,0.2,5.7v2.2c0.5,3.2,1.8,6.2,3.6,8.9c2.8,4.5,7.1,10.7,11.3,13.7l0,0l0.3,0.3l0,0l0.2,0.3h0.1v0.3l0,0c0.1,0.3,0.1,0.7,0,1l0,0v0.3h-0.1l-0.2,0.3l0,0l-0.3,0.3l0,0c-4.2,3.1-8.5,9.3-11.3,13.7c-1.8,2.7-3.1,5.7-3.6,8.9v2.2c-0.1,1.6-0.2,3.5-0.2,5.7v14.3c0,9.4-2.4,16.7-7.1,21.7s-10.2,7.6-18,7.6h-13.4c-1.2,0-2.2-1-2.2-2.2c0,0,0,0,0,0V140l0,0c0-1.2,1-2.2,2.2-2.2l0,0h12.7c4.4,0,7.5-1,9.2-3s2.7-5.6,2.7-10.5v-22.4c-0.2-6.3,1.6-12.6,5.1-17.9c1.6-2.5,3.5-4.7,5.7-6.6l0,0c0.9-0.7,1.1-2,0.4-2.9C412.7,74.3,412.6,74.2,412.5,74L412.5,74z"/></g></svg>',

    /**
     * Promo banner config
     */
    promo_banner: {
      show: false,
      promo_url: 'https://developer.okta.com/quickstart/',
      promo_text: 'Learn how to build your app on Okta, fast.',
      cta_text: 'QUICK STARTS'
    }
  }
}
