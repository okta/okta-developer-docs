const guidesInfo = require('./scripts/build-guides-info');
const findLatestWidgetVersion = require('./scripts/findLatestWidgetVersion');
const convertReplacementStrings = require('./scripts/convert-replacement-strings');
const signInWidgetMajorVersion = 5;

module.exports = {
  dest: 'dist',
  theme: "@okta/vuepress-theme-prose",
  /**
   * Custom head elements here
   */
  head: [
    ['link', { rel: 'stylesheet', href: 'https://static.cloud.coveo.com/searchui/v2.8959/14/css/CoveoFullSearch.min.css', integrity: 'sha512-DzuDVtX/Dud12HycdAsm2k9D1UQ8DU7WOj7cBRnSsOKQbKfkI94g0VM9hplM0BkQ0VXdDiQYU9GvUzMmw2Khaw==', crossorigin: 'anonymous' }],
    ['script', { class: 'coveo-script', src: 'https://static.cloud.coveo.com/searchui/v2.8959/14/js/CoveoJsSearch.Lazy.min.js', integrity: 'sha512-RV1EooPduQhwl0jz+hmjBw/nAtfeXNm6Dm/hlCe5OR1jAlG4RErUeYfX1jaaM88H8DiyCJDzEWZkOR0Q13DtrA==', crossorigin: 'anonymous', defer: true}],
    ['link', { rel: 'apple-touch-icon', sizes:'180x180', href: '/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type:"image/png", sizes:"32x32",  href: '/favicon/favicon-32x32.png' }],
    ['link', { rel: 'icon', type:"image/png", sizes:"16x16",  href: '/favicon/favicon-16x16.png' }],
    ['link', { rel: 'manifest',  href: '/favicon/manifest.json' }],
    ['link', { rel: 'mask-icon',  href: '/favicon/safari-pinned-tab.svg' }],
    ['link', { rel: 'preload', href: 'https://use.typekit.net/osg6paw.css', as: 'style', crossorigin: true}],
    ['link', { rel: 'stylesheet', href: 'https://use.typekit.net/osg6paw.css', crossorigin: true}],
    ['meta', { name: 'msapplication-config',  content: '/favicon/browserconfig.xml' }],
    ['meta', { 'http-equiv': 'XA-UA-Compatible', content: 'IE=edge'}],

    /**
     * Header scripts for typekit, GA, GTM (WIP)
     */
    ['script', {}, `

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
    `],
    ['script', {}, `
      var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,api:2020.09, text: { 'msg': 'Your web browser ({brow_name}) is not supported. For the best site experience, we recommend updating your browser. <br> <a{up_but}>Update browser</a> <a{ignore_but}>Ignore</a>' } };
      function $buo_f(){
      var e = document.createElement("script");
      e.src = "//browser-update.org/update.min.js";
      document.body.appendChild(e);
      };
      try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
      catch(e){window.attachEvent("onload", $buo_f)}
    `]
  ],
  title: "Okta Developer",
  description: "Secure, scalable, and highly available authentication and user management for any app.",

  /**
   * Global theme config
   */
  themeConfig: {

    /**
     * URI config
     */
    uris: {
      baseUri: 'https://okta-devok12.okta.com',
      registrationPolicyId: 'reg405abrRAkn0TRf5d6',
      idps: {
        github: '0oayfl0lW6xetjKjD5d5',
        google: '0oay75bnynuF2YStd5d5',
      },
    },

    /**
     * Primary Nav: Array of MenuItem components to iterate over within TopNavigation component
     */
    primary_nav: [
      { text: 'Docs', link: '/docs/', active: true,
        children: [
          { text: 'Get Started', link: '/docs/' },
          { text: 'Concepts', link: '/docs/concepts/' },
          { text: 'Guides', link: '/docs/guides/' },
          { text: 'Reference', link: '/docs/reference/' }
        ]
      },
      { text: 'Use Cases', link: '/product/',
        children: [
          { text: 'Embed auth into your app' },
          { text: 'Overview', link: '/product/' },
          { text: 'Authentication', link: '/product/authentication/' },
          { text: 'Authorization', link: '/product/authorization/' },
          { text: 'User Management', link: '/product/user-management/' },
          { type: 'divider' },
          { text: 'Publish an integration' },
          { text: 'Overview', link: '/okta-integration-network/' },
        ]
      },
      { text: 'Pricing', link: '/pricing/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Support', link: 'https://www.okta.com/contact/',
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
          { text: 'GitHub', link: 'http://github.com/oktadeveloper', target: '_blank', icon: '<svg viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>' },
          { text: 'Twitter', link: 'http://twitter.com/OktaDev', target: '_blank', icon: '<svg viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>' },
          { text: 'Forum', link: 'https://devforum.okta.com/', target: '_blank', icon: '<svg viewBox="0 0 576 512"><path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"/></svg>' },
          { text: 'RSS Blog', link: 'http://feeds.feedburner.com/OktaBlog', target: '_blank', icon: '<svg viewBox="0 0 448 512"><path d="M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041 64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627 161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z"/></svg>' },
          { text: 'YouTube', link: 'https://www.youtube.com/channel/UC5AMiWqFVFxF1q9Ya1FuZ_Q/featured', target: '_blank', icon: '<svg viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>' },
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
    logo_svg: '<svg viewBox="0 0 431.9 151.4"><path d="M102.2 41.4c-21 0-38.1 17.1-38.1 38.1s17.1 38.1 38.1 38.1 38.1-17.1 38.1-38.1-17.1-38.1-38.1-38.1zm0 57.1c-10.5 0-19-8.5-19-19s8.5-19 19-19 19 8.5 19 19c.1 10.5-8.4 19-18.9 19.1 0 0-.1 0-.1-.1zM169.1 92.3c0-1.9 1.5-3.4 3.4-3.4.9 0 1.8.4 2.4 1 9.5 9.7 25.3 26.3 25.4 26.4.4.5.8.8 1.4.9l1.6.2h17.2c1.8 0 3.3-1.4 3.4-3.2 0-.8-.3-1.5-.8-2.2l-28.6-29.2-1.5-1.5c-3.2-3.9-2.9-5.4.8-9.3l22.6-25.1c1.1-1.4.8-3.5-.6-4.6-.6-.4-1.3-.7-2-.7h-17c-.6.2-1.1.5-1.5.9L175 64.4c-1.3 1.4-3.4 1.5-4.8.2-.7-.6-1.1-1.5-1.1-2.5V18.9c0-1.7-1.3-3-3-3h-13c-2.2 0-3.3 1.5-3.3 2.8v95.8c0 2.2 1.8 2.8 3.3 2.8h12.7c1.7.1 3.2-1.2 3.3-2.9V92.3zM273 114l-1.4-12.8c-.2-1.7-1.7-2.9-3.4-2.7h-.1l-2.9.2c-10.1 0-18.5-7.9-19-18V64.2c-.1-2 1.5-3.6 3.5-3.7h17c1.7-.1 3.1-1.5 3-3.2V45.2c0-2.3-1.5-3.6-2.8-3.6h-17.1c-1.9.1-3.5-1.5-3.6-3.4V18.9c-.1-1.7-1.5-3.1-3.2-3H230.2c-1.6-.1-3 1.1-3.1 2.7v62.2c.5 21 17.9 37.6 38.9 37 1.4 0 2.9-.2 4.3-.3 1.7-.3 2.9-1.8 2.7-3.5zM364.7 98c-10.8 0-12.4-3.8-12.4-18.3V44.8c0-1.8-1.4-3.2-3.2-3.2h-12.9c-1.8 0-3.2 1.4-3.3 3.2v1.6C314.6 36 291.3 42.5 281 60.8c-10.4 18.3-3.9 41.6 14.4 51.9 14 7.9 31.4 6.2 43.5-4.2 3.6 5.5 9.3 9.1 18.3 9.1 1.5 0 9.7.3 9.7-3.5v-13.6c.1-1.3-.9-2.4-2.2-2.5zm-50.5.6c-10.5 0-19-8.5-19-19s8.5-19 19-19 19 8.5 19 19-8.5 19-19 19zM19.4 74c2.2-1.9 4.1-4.1 5.7-6.6 3.5-5.3 5.4-11.5 5.2-17.9V27c0-4.9.9-8.4 2.7-10.5 1.8-2.1 4.8-3 9.2-3h12.6c1.2 0 2.1-.9 2.2-2.1V2.2C57 1 56 0 54.8 0H41.5c-7.8 0-12.9 2.1-18 7.6s-7.1 12.3-7.1 21.7v14.2c0 2.2-.1 4-.2 5.7v2.2c-.5 3.2-1.8 6.2-3.6 8.9C9.4 64.7 5.1 70.9.9 74l-.3.3-.2.3H.2v.3c-.1.3-.1.7 0 1v.3h.1l.2.3.3.3c4.2 3.1 8.5 9.3 11.3 13.7 1.8 2.7 3.1 5.7 3.6 8.9v2.2c.1 1.6.2 3.5.2 5.7v14.3c0 9.4 2.4 16.7 7.1 21.7s10.2 7.6 18 7.6h13.8c1.2 0 2.2-1 2.2-2.2V140c0-1.2-1-2.2-2.2-2.2H42.2c-4.4 0-7.5-1-9.2-3s-2.7-5.6-2.7-10.5v-22.4c.2-6.4-1.7-12.6-5.2-17.9-1.6-2.5-3.5-4.7-5.7-6.6-.9-.7-1.1-2-.4-2.9.2-.2.3-.3.4-.5zM412.5 74c-2.2-1.9-4.1-4.1-5.7-6.6-3.5-5.3-5.4-11.5-5.2-17.9V27c0-4.9-.9-8.4-2.7-10.5s-4.8-3-9.2-3h-12.6c-1.2 0-2.2-1-2.2-2.2V2.2c0-1.2 1-2.2 2.2-2.2h13.4c7.8 0 12.9 2.1 18 7.6s7.1 12.3 7.1 21.7v14.2c0 2.2.1 4 .2 5.7v2.2c.5 3.2 1.8 6.2 3.6 8.9 2.8 4.5 7.1 10.7 11.3 13.7l.3.3.2.3h.1v.3c.1.3.1.7 0 1v.3h-.1l-.2.3-.3.3c-4.2 3.1-8.5 9.3-11.3 13.7-1.8 2.7-3.1 5.7-3.6 8.9v2.2c-.1 1.6-.2 3.5-.2 5.7v14.3c0 9.4-2.4 16.7-7.1 21.7s-10.2 7.6-18 7.6h-13.4c-1.2 0-2.2-1-2.2-2.2V140c0-1.2 1-2.2 2.2-2.2h12.7c4.4 0 7.5-1 9.2-3s2.7-5.6 2.7-10.5v-22.4c-.2-6.3 1.6-12.6 5.1-17.9 1.6-2.5 3.5-4.7 5.7-6.6.9-.7 1.1-2 .4-2.9-.2-.2-.3-.3-.4-.5z"/></svg>',

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
      repoLabel: 'Edit',
      editLinks: true,
      editLinkText: "Edit This Page On GitHub",
      docsDir: "packages/@okta/vuepress-site"
    },

    redesign: {
      primary_left_nav: [
        { text: 'Community',
          children: [
            { text: 'Forum', link: 'https://devforum.okta.com' },
            { text: 'Blog', link: 'https://developer.okta.com/blog/' },
            { text: 'Toolkit', link: 'https://toolkit.okta.com/' },
            { type: 'divider' },
            { type: 'icons',
              icons: [
                { text: 'GitHub', link: 'https://github.com/oktadeveloper', icon: '<svg width="19" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.214 4.595a9.185 9.185 0 00-3.358-3.358C12.443.412 10.9 0 9.226 0 7.552 0 6.008.412 4.595 1.237a9.184 9.184 0 00-3.358 3.358C.412 6.008 0 7.552 0 9.225c0 2.01.587 3.818 1.76 5.424 1.173 1.606 2.689 2.717 4.546 3.333.217.04.377.012.48-.084a.47.47 0 00.157-.36l-.006-.649c-.004-.408-.006-.764-.006-1.069l-.276.048a3.52 3.52 0 01-.667.042 5.092 5.092 0 01-.835-.084 1.866 1.866 0 01-.805-.36 1.524 1.524 0 01-.528-.739l-.12-.276a3.003 3.003 0 00-.379-.613c-.172-.224-.346-.376-.522-.456l-.084-.06a.882.882 0 01-.156-.144.66.66 0 01-.108-.169c-.025-.056-.005-.102.06-.138.064-.036.18-.054.348-.054l.24.036c.16.032.358.128.595.289.236.16.43.368.582.624.185.328.407.579.667.75.26.173.522.26.787.26.264 0 .492-.021.684-.06.192-.04.373-.101.541-.181.072-.537.268-.95.588-1.238a8.224 8.224 0 01-1.23-.216 4.896 4.896 0 01-1.13-.468 3.233 3.233 0 01-.967-.805c-.256-.32-.466-.741-.63-1.261-.165-.521-.247-1.122-.247-1.802 0-.97.317-1.794.95-2.475-.297-.729-.269-1.545.083-2.45.233-.073.577-.018 1.033.162.457.18.791.334 1.004.462.212.128.382.237.51.325a8.53 8.53 0 012.307-.313 8.53 8.53 0 012.306.313l.457-.289c.312-.192.68-.368 1.104-.528.425-.16.75-.204.974-.132.36.905.392 1.721.096 2.45.632.68.949 1.506.949 2.475 0 .68-.082 1.283-.246 1.808-.164.524-.377.944-.637 1.26a3.36 3.36 0 01-.973.8 4.916 4.916 0 01-1.13.468 8.208 8.208 0 01-1.23.217c.416.36.624.929.624 1.705v2.535c0 .144.05.264.15.36.1.096.258.124.475.084 1.858-.617 3.373-1.728 4.547-3.333 1.173-1.606 1.76-3.414 1.76-5.424-.001-1.673-.414-3.217-1.238-4.63z"/></svg>' },
                { text: 'Twitter', link: 'https://twitter.com/OktaDev', icon: '<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm4.11 7.017c.003.089.005.178.005.267 0 2.73-2.078 5.878-5.877 5.878a5.847 5.847 0 01-3.167-.928 4.144 4.144 0 003.058-.856A2.068 2.068 0 015.2 9.943a2.056 2.056 0 00.934-.035 2.066 2.066 0 01-1.657-2.051c.278.154.597.247.935.258a2.064 2.064 0 01-.64-2.758A5.865 5.865 0 009.03 7.515a2.066 2.066 0 013.52-1.884c.47-.092.913-.264 1.312-.5a2.074 2.074 0 01-.909 1.142 4.12 4.12 0 001.187-.326 4.2 4.2 0 01-1.03 1.07z"/></svg>' },
                { text: 'YouTube', link: 'https://www.youtube.com/channel/UC5AMiWqFVFxF1q9Ya1FuZ_Q/featured', icon: '<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.879 10.372l2.928-1.686L7.878 7v3.372z"/><path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm5.624 9.009s0 1.825-.232 2.705a1.41 1.41 0 01-.991.992c-.88.231-4.401.231-4.401.231s-3.511 0-4.4-.24a1.41 1.41 0 01-.992-.992C3.376 10.835 3.376 9 3.376 9s0-1.825.232-2.705c.13-.482.519-.871.991-1.001C5.48 5.062 9 5.062 9 5.062s3.52 0 4.4.241c.482.13.862.51.992.992.241.88.232 2.714.232 2.714z"/></svg>' },
              ]
            }
          ]
        },
        { text: 'Pricing', link: '/pricing/' },
      ],
      primary_right_nav: [
        { text: 'Okta.com', target: '_blank', link: 'https://www.okta.com/' },
        { text: 'Admin Console', target: '_blank', link: 'https://login.okta.com/' },
      ],
      primary_doc_nav: [
        { text: 'Guides', link: '/docs/guides/' },
        { text: 'Concepts', link: '/docs/concepts/' },
        { text: 'Reference', link: '/docs/reference/' },
        { text: 'Languages & SDKs', link: '/code/' }
      ],

      footer_nav: {
        social: {
          heading: 'Social',
          items: [
            { text: 'GitHub', link: 'https://github.com/oktadeveloper', icon: '<svg width="19" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.214 4.595a9.185 9.185 0 00-3.358-3.358C12.443.412 10.9 0 9.226 0 7.552 0 6.008.412 4.595 1.237a9.184 9.184 0 00-3.358 3.358C.412 6.008 0 7.552 0 9.225c0 2.01.587 3.818 1.76 5.424 1.173 1.606 2.689 2.717 4.546 3.333.217.04.377.012.48-.084a.47.47 0 00.157-.36l-.006-.649c-.004-.408-.006-.764-.006-1.069l-.276.048a3.52 3.52 0 01-.667.042 5.092 5.092 0 01-.835-.084 1.866 1.866 0 01-.805-.36 1.524 1.524 0 01-.528-.739l-.12-.276a3.003 3.003 0 00-.379-.613c-.172-.224-.346-.376-.522-.456l-.084-.06a.882.882 0 01-.156-.144.66.66 0 01-.108-.169c-.025-.056-.005-.102.06-.138.064-.036.18-.054.348-.054l.24.036c.16.032.358.128.595.289.236.16.43.368.582.624.185.328.407.579.667.75.26.173.522.26.787.26.264 0 .492-.021.684-.06.192-.04.373-.101.541-.181.072-.537.268-.95.588-1.238a8.224 8.224 0 01-1.23-.216 4.896 4.896 0 01-1.13-.468 3.233 3.233 0 01-.967-.805c-.256-.32-.466-.741-.63-1.261-.165-.521-.247-1.122-.247-1.802 0-.97.317-1.794.95-2.475-.297-.729-.269-1.545.083-2.45.233-.073.577-.018 1.033.162.457.18.791.334 1.004.462.212.128.382.237.51.325a8.53 8.53 0 012.307-.313 8.53 8.53 0 012.306.313l.457-.289c.312-.192.68-.368 1.104-.528.425-.16.75-.204.974-.132.36.905.392 1.721.096 2.45.632.68.949 1.506.949 2.475 0 .68-.082 1.283-.246 1.808-.164.524-.377.944-.637 1.26a3.36 3.36 0 01-.973.8 4.916 4.916 0 01-1.13.468 8.208 8.208 0 01-1.23.217c.416.36.624.929.624 1.705v2.535c0 .144.05.264.15.36.1.096.258.124.475.084 1.858-.617 3.373-1.728 4.547-3.333 1.173-1.606 1.76-3.414 1.76-5.424-.001-1.673-.414-3.217-1.238-4.63z"/></svg>' },
            { text: 'Twitter', link: 'https://twitter.com/OktaDev', icon: '<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm4.11 7.017c.003.089.005.178.005.267 0 2.73-2.078 5.878-5.877 5.878a5.847 5.847 0 01-3.167-.928 4.144 4.144 0 003.058-.856A2.068 2.068 0 015.2 9.943a2.056 2.056 0 00.934-.035 2.066 2.066 0 01-1.657-2.051c.278.154.597.247.935.258a2.064 2.064 0 01-.64-2.758A5.865 5.865 0 009.03 7.515a2.066 2.066 0 013.52-1.884c.47-.092.913-.264 1.312-.5a2.074 2.074 0 01-.909 1.142 4.12 4.12 0 001.187-.326 4.2 4.2 0 01-1.03 1.07z"/></svg>' },
            { text: 'YouTube', link: 'https://www.youtube.com/c/oktadev', icon: '<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.879 10.372l2.928-1.686L7.878 7v3.372z"/><path d="M9 0a9.001 9.001 0 000 18A9.001 9.001 0 009 0zm5.624 9.009s0 1.825-.232 2.705a1.41 1.41 0 01-.991.992c-.88.231-4.401.231-4.401.231s-3.511 0-4.4-.24a1.41 1.41 0 01-.992-.992C3.376 10.835 3.376 9 3.376 9s0-1.825.232-2.705c.13-.482.519-.871.991-1.001C5.48 5.062 9 5.062 9 5.062s3.52 0 4.4.241c.482.13.862.51.992.992.241.88.232 2.714.232 2.714z"/></svg>' },
            { text: 'Forum', link: 'https://devforum.okta.com/', icon: '<svg width="19" height="19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.434.158a8.927 8.927 0 00-6.51 3.102C.098 6.513.012 11.48 2.725 14.81a9.033 9.033 0 009.974 2.81c1.454-.51 3.01-.174 4.061.878l.297.297.296-.296a2.854 2.854 0 00.002-4.032l-.232-.232c2.437-3.538 2.016-8.4-1.04-11.457A9.014 9.014 0 009.434.158zm3.189 6.08a4.107 4.107 0 01-.008 5.801 4.106 4.106 0 01-5.801.008 4.106 4.106 0 01.007-5.802 4.107 4.107 0 015.802-.007z"/></svg>' },
            { text: 'Blog RSS', link: 'https://developer.okta.com/feed.xml', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zM34.7 73.5c-3.9 0-7-3.2-7-7 0-3.9 3.2-7.1 7-7.1 3.9 0 7.1 3.2 7.1 7.1 0 3.8-3.2 7-7.1 7zm22.4-.4c-2.2 0-4.2-1.6-4.5-3.8-.8-5.2-3.3-9.9-7.1-13.7-3.8-3.8-8.5-6.2-13.6-7.1-2.2-.4-3.8-2.3-3.8-4.5 0-2.8 2.6-5 5.4-4.5 14.4 2.4 25.8 13.8 28.3 28.3.4 2.7-1.8 5.3-4.7 5.3zM70.8 69c-2.2-20.3-18.2-36.5-38.4-38.6-2.3-.2-4.1-2.2-4.1-4.6 0-2.7 2.3-4.9 5-4.6C57.8 23.7 77.5 43.3 80 68c.3 2.7-1.9 5-4.6 5-2.4.1-4.4-1.7-4.6-4z" fill="#dd2864"/></svg>' },
          ]
        },
        contact: {
          heading: 'Contact & Legal',
          items: [
            { text: 'Contact our team', link: 'https://www.okta.com/contact/' },
            { text: 'Contact sales', link: 'https://www.okta.com/contact-sales/' },
            { text: 'Terms & conditions', link: '/terms/' },
            { text: 'Privacy policy', link: 'https://www.okta.com/privacy-policy/' },
          ]
        },
        more: {
          heading: 'More Info',
          items: [
            { text: 'Pricing', link: '/pricing/' },
            { text: 'Integrate with Okta', link: 'https://developer.okta.com/okta-integration-network/' },
            { text: 'Change log', link: '/docs/release-notes/' },
            { text: '3rd-party notes', link: '/3rd_party_notices/' },
          ]
        },
        websites: {
          items: [
            { text: 'OKTA.COM', link: 'https://www.okta.com/', description: 'Products, case studies, resources' },
            { text: 'HELP CENTER', link: 'https://support.okta.com/help/s/', description: 'Knowledgebase, roadmaps, and more' },
            { text: 'TRUST', link: 'https://trust.okta.com/', description: 'System status, security, compliance' },
          ]
        }
      },

      company_logos: [
        { name: 'Major League Baseball', icon: '/img/logos/baseball.png' },
        { name: 'Splunk', icon: '/img/logos/splunk.png' },
        { name: 'Adobe', icon: '/img/logos/adobe.png' },
        { name: 'JetBlue', icon: '/img/logos/jetblue.png' },
        { name: 'Experian', icon: '/img/logos/experian.png' },
      ],

      forum_url: 'https://devforum.okta.com/',
      copyright_text: 'Copyright © 2021 Okta.'
    },
  },

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
          WIDGET_VERSION: findLatestWidgetVersion(signInWidgetMajorVersion), // use major version
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
      permalinkSymbol: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 01-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0120.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0020.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 00-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/></svg>',
      permalinkClass: 'header-anchor header-link',
      level: 2
    }
  },

  plugins: {
    'sitemap': {
      hostname: 'https://developer.okta.com',
      outFile: 'docs-sitemap.xml',
      exclude: [
        '/test_page/'
      ]
    },
    'robots': {
      host: 'https://developer.okta.com',
      sitemap: '/docs-sitemap.xml',
      policies: [
        {
          userAgent: '*',
          crawlDelay: 10,
          disallow: [
              '/docs/reference/api/oie-policy-types/',
              '/docs/guides/sign-into-web-app-remediation/',
              '/docs/guides/sign-into-web-app-remediation/before-you-begin/',
              '/docs/guides/sign-into-web-app-remediation/configure-packages/',
              '/docs/guides/sign-into-web-app-remediation/create-okta-application/',
              '/docs/guides/sign-into-web-app-remediation/handle-remediation/',
              '/docs/guides/sign-into-web-app-remediation/get-tokens/',
              '/docs/guides/sign-into-web-app-remediation/next-steps/',
              '/docs/reference/api/authenticators-admin/',
              '/docs/guides/third-party-risk-integration/overview/', //Beta release of Risk APIs and Guide
              '/docs/guides/third-party-risk-integration/create-service-app/',
              '/docs/guides/third-party-risk-integration/update-default-provider/',
              '/docs/guides/third-party-risk-integration/test-integration/',
              '/docs/reference/api/risk-providers/',
              '/docs/reference/api/risk-events/'
          ]
        }
      ]
    },
    '@okta/vuepress-plugin-qualtrics-feedback': {}
  },

  extraWatchFiles: [
    '.vuepress/nav/*',
  ],

  additionalPages: [
    ...guidesInfo.additionalPagesForGuides(),
  ],

  extendPageData ($page) {
    const {
      _filePath,           // file's absolute path
      _computed,           // access the client global computed mixins at build time, e.g _computed.$localePath.
      _content,            // file's raw content string
      _strippedContent,    // file's content string without frontmatter
      key,                 // page's unique hash key
      frontmatter,         // page's frontmatter object
      regularPath,         // current page's default link (follow the file hierarchy)
      path,                // current page's real link (use regularPath when permalink does not exist)
    } = $page

    // add redir url for main guide pages
    let found = guidesInfo.guideInfo[path];
    if(found && found.guide && found.sections) {
      if(found.mainFramework) {
        $page.redir = `/docs/guides/${found.guide}/${found.mainFramework}/${found.sections[0]}/`
      } else {
        $page.redir = `/docs/guides/${found.guide}/${found.sections[0]}/`
      }
    }
  },
}
