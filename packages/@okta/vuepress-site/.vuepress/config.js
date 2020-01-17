const guidesInfo = require('./scripts/build-guides-info');
const findLatestWidgetVersion = require('./scripts/findLatestWidgetVersion');
const convertReplacementStrings = require('./scripts/convert-replacement-strings');

module.exports = {
  dest: 'dist',
  theme: "@okta/vuepress-theme-default",
  /**
   * Custom head elements here
   */
  head: [
    ['script', { src: "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" }],
    ['link', { rel: 'apple-touch-icon', sizes:'180x180', href: '/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type:"image/png", sizes:"32x32",  href: '/favicon/favicon-32x32.png' }],
    ['link', { rel: 'icon', type:"image/png", sizes:"16x16",  href: '/favicon/favicon-16x16.png' }],
    ['link', { rel: 'manifest',  href: '/favicon/manifest.json' }],
    ['link', { rel: 'mask-icon',  href: '/favicon/safari-pinned-tab.svg' }],
    ['meta', { name: 'msapplication-config',  content: '/favicon/browserconfig.xml' }],
    ['link', { rel: 'stylesheet', href: 'https://developer.okta.com/sites/all/themes/developer/css/master.css' }],
    ['meta', { 'http-equiv': 'XA-UA-Compatible', content: 'IE=edge'}],

    /**
     * Header scripts for typekit, GA, GTM (WIP)
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

        // START Google Tag Manager
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KXMLV58');
        // END Google Tag Manager

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
      { text: 'Product', link: '/product/',
        children: [
          { text: 'Overview', link: '/product/' },
          { text: 'Authentication', link: '/product/authentication/' },
          { text: 'Authorization', link: '/product/authorization/' },
          { text: 'User Management', link: '/product/user-management/' },
        ]
      },
      { text: 'Pricing', link: '/pricing/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Docs', link: '/docs/', active: true,
        children: [
          { text: 'Get Started', link: '/docs/' },
          { text: 'Concepts', link: '/docs/concepts/' },
          { text: 'Guides', link: '/docs/guides/' },
          { text: 'Reference', link: '/docs/reference/' }
        ]
      },
      { text: 'Support', link: '',
        children: [
          { text: 'Okta Developer Forums', link: 'https://devforum.okta.com/' },
          { text: 'developers@okta.com', link: 'mailto:developers@okta.com' },
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
          { text: 'Release Notes', link: 'https://developer.okta.com/docs/release-notes/' },
          { text: '3rd Party Notices', link: 'https://developer.okta.com/3rd_party_notices/' },
          { text: 'Community Toolkit', link: 'https://toolkit.okta.com/' },
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
      main: require('./nav/main'),
      codePages: require('./nav/codePages'),
      reference: require('./nav/reference'),
      concepts: require('./nav/concepts')
    },

    quickstarts: {
      clients: [
        { name: 'okta-sign-in-page', label: 'Okta Sign-In Page', serverExampleType: 'auth-code', default: true },
        { name: 'widget', label: 'Okta Sign-In Widget', serverExampleType: 'implicit', codeIconName: 'javascript' },
        { name: 'angular', label: 'Angular', serverExampleType: 'implicit' },
        { name: 'react', label: 'React', serverExampleType: 'implicit' },
        { name: 'vue', label: 'Vue', serverExampleType: 'implicit' },
        { name: 'android', label: 'Android', serverExampleType: 'implicit' },
        { name: 'ios', label: 'iOS', serverExampleType: 'implicit' },
        { name: 'react-native', label: 'React Native', serverExampleType: 'implicit', codeIconName: 'react' },
      ],
      servers: [
        { name: 'nodejs', label: 'Node JS', default: true, frameworks: [
            { name: 'express', label: 'Express.js', default: true },
            { name: 'generic', label: 'Generic Node' }
          ]
        },
        { name: 'java', label: 'Java', frameworks: [
            { name: 'spring', label: 'Spring', default: true },
            { name: 'generic', label: 'Generic Java' }
          ]
        },
        { name: 'php', label: 'PHP', frameworks: [
            { name: 'generic', label: 'Generic PHP', default: true }
          ]
        },
        { name: 'dotnet', label: '.NET', frameworks: [
            { name: 'aspnetcore', label: 'ASP.NET Core', default: true },
            { name: 'aspnet4', label: 'ASP.NET 4.x' }
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
    },

    editLink: {
      repo: 'okta/okta-developer-docs',
      repoLabel: 'Edit Page',
      editLinks: true,
      editLinkText: "Edit Page",
      docsDir: "packages/@okta/vuepress-site"
    }

  },

  plugins: [
    '@okta/vuepress-plugin-active-header-links',
    [
      'vuepress-plugin-sitemap', {
        hostname: 'https://developer.okta.com',
        outFile: 'docs-sitemap.xml'
      }
    ],
  ],

  chainWebpack(config) { 
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('string-replace-loaded')
      .loader('string-replace-loader')
      .options({ 
        multiple: convertReplacementStrings({ 
          /* KEYS HERE GET WRAPPED IN '-=OKTA_REPLACE_WITH_XXX=-'
           *
           * Changes WILL require restarting `yarn dev` :(
           */
          WIDGET_VERSION: findLatestWidgetVersion(3), // use major version
          TEST_JUNK: 'this is a test replacement', // Leave for testing
        })
      })
  },

  evergreen: false,

  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-attrs'))
    },
    anchor: {
      permalinkBefore: false,
      permalinkSymbol: '<i class="fa fa-link"></i>',
      permalinkClass: 'header-anchor header-link',
      level: 2
    }
  },

  shouldPrefetch: () => false,

  extraWatchFiles: [
    '.vuepress/nav/*',
  ],
  additionalPages: [
    ...guidesInfo.additionalPagesForGuides(),
  ],
  extendPageData(page) {
    if(page.path.startsWith(`/docs/guides/`)) {
      page.frontmatter.layout = 'Guides';
      const info = guidesInfo.guideInfo[page.path];
      if(info) {
        page.breadcrumb = info.breadcrumb;
      }
    }
  },
}
