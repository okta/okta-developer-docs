<template>
<div>
  <HeaderRedesign/>
  <div class="redesign-homepage container-fluid">
    <div class="row">
      <div class="col-xl-2 col-lg-2 d-none d-lg-block redesign-homepage--col-no-padding">
        <RedesignedSideBar />
      </div>
      <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12">
        <div class="row justify-content-center">
          <div class="col-11 redesign-homepage--elevated">
            <div class="row">
              <div class="col-12">
                <h1 class="redesign-homepage--main-heading redesign-homepage--color-main">
                  Okta Developer Portal
                </h1>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h2 class="redesign-homepage--sub-heading redesign-homepage--color-main">
                  Let's get started
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="redesign-homepage--sub-heading-disclaimer redesign-homepage--color-sub">
                  Authenticate up to 1,000 users per month for free forever
                </p>
              </div>
            </div>
            <div class="row redesign-homepage--selector-block-margin ">
              <div class="col-xl-3 col-lg-6 col-md-6" v-for="tile in tileData" :key="tile.name">
                <SelectorTile :tileData="tile" :key="tile.name" />
              </div>
            </div>
            <div class="row justify-content-around align-items-center flex-lg-row-reverse flex-md-row-reverse redesign-homepage--assurance-block-margin">
               <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12" v-for="assurance in assuranceData" :key="assurance.title">
                 <AssuranceItem :key="assurance.title" :item="assurance" />
               </div>
            </div>
            <div class="row justify-content-around redesign-homepage--customize-your-app-margin ">
              <div class="col-12">
                <h2 class="redesign-homepage--sub-heading redesign-homepage--color-main redesign-homepage--centered-md">
                  Customize for your app, try it here
                </h2>
              </div>
              <div v-if="!pseudoAuthorizedCodeBlock" class="col-xl-7 col-md-12 col-sm-12">
                <div class="redesign-homepage--code-example">
                  <div class="redesign-homepage--code-example--header">Javascript</div>
                    <div class="redesign-homepage--code-example--cm-wrapper">
                      <FrontPageCodeMirror/>
                    </div>
                  </div>
                </div>
                <div v-if="!pseudoAuthorized" class="col-xl-5 col-md-10 col-sm-12">
                  <div class="redesign-homepage--live-widget">
                    <FrontPageWidget @authLeia="togglePseudoAuth"/>
                  </div>
                </div>
                <div v-if="pseudoAuthorized" class="col-sm-12 col-xs-12 col-lg-10">
                   <div class="redesign-homepage--welcome-leia">
                      <div class="redesign-homepage--welcome-leia--close" @click="togglePseudoAuth">
                        <span>X</span> close
                      </div>
                      <div class="redesign-homepage--welcome-leia--header">
                        Welcome, Leia
                      </div>
                      <div class="redesign-homepage--welcome-leia--info">
                        Okta makes authentication straightforward. Connect your apps, choose an identity provider (or use ours), add users, configure rules, customize your login page, and then gain insights from our built in reports.
                      </div>
                      <div class="redesign-homepage--welcome-leia--actions">
                        <a href="https://developer.okta.com/signup" class="redesign-homepage--welcome-leia--actions--cta act-btn">
                          sign up for okta
                        </a>
                        <a href="https://developer.okta.com/code/javascript/okta_sign-in_widget" class="redesign-homepage--welcome-leia--actions--docs act-btn">
                          vue widget docs
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-center">
                  <div class="col-lg-10 col-md-10 col-sm-12">
                    <div class="row justify-content-around align-items-center redesign-homepage--partners-block-margin">
                      <div v-for="partner in partnerData" :key="partner.alt" class="col-lg-auto col-md-4 col-sm-12 col-xs-12">
                        <div class="redesign-homepage--partner-wrapper">
                          <img :src="partner.src" />
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="redesign-homepage--backgrounds">
              <div class="redesign-homepage--backgrounds--bottom-layer" />
              <div class="redesign-homepage--backgrounds--top-layer" />
              <div class="redesign-homepage--backgrounds--circle" />
            </div>
          </div>
       </div>
     </div>
   </div>
   <FooterRedesign/>
</div>
</template>

<script>
const TABLET_BREAKPOINT = 768;

export default {
  name: 'RedesignedHomePage',
  components: {
    HeaderRedesign: () => import('../components/Header.redesign.vue'),
        FooterRedesign: () => import('../components/Footer.redesign.vue'),
    RedesignedSideBar: () => import('../components/RedesignedSidebar'),
    SelectorTile: () => import('../components/SelectorTile'),
    AssuranceItem: () => import('../components/AssuranceItem'),
    FrontPageWidget: () => import('../components/FrontPageWidget'),
    FrontPageCodeMirror: ()=> import('../components/FrontPageCodeMirror')
  },
  data() {
    return {
      pseudoAuthorized: false,
      pseudoAuthorizedCodeBlock: false,
      isTreeNavMobileOpen: false,
      tileData: [
        {
          name: "Web App",
          categoryLink: "/docs/guides/sign-into-web-app/aspnet/before-you-begin/",
          items: [
            {
              name: 'Go',
              link: '/code/go/',
              image: '/img/homepage/stackselectors/go.png'
            },
             {
              name: 'Java',
              link: '/code/java/',
              image: '/img/homepage/stackselectors/java.png'
            },
             {
              name: '.net',
              link: '/code/dotnet/aspnetcore/',
              image: '/img/homepage/stackselectors/dotnet.png'
            },
             {
              name: 'Node.js',
              link: '/code/nodejs/',
              image: '/img/homepage/stackselectors/nodejs.png'
            },
             {
              name: 'PHP',
              link: '/code/php/',
              image: '/img/homepage/stackselectors/nodejs.png'
            }
          ]
        },
        {
          name: "Single-page App",
          categoryLink: "/docs/guides/sign-into-spa/angular/before-you-begin/",
          items: [
            {
              name: 'React',
              link: '/code/react/',
              image: '/img/homepage/stackselectors/react.png'
            },
             {
              name: 'Angular',
              link: '/code/angular/',
              image: '/img/homepage/stackselectors/angular.png'
            },
             {
              name: 'Vue.js',
              link: '/code/vue/',
              image: '/img/homepage/stackselectors/vue.png'
            },
          ]
        },
          {
          name: "Native app",
          categoryLink: "/docs/guides/sign-into-mobile-app/android/before-you-begin/",
          items: [
            {
              name: 'native React',
              link: '/code/react-native/',
              image: '/img/homepage/stackselectors/react.png'
            },
             {
              name: 'android',
              link: '/code/android/',
              image: '/img/homepage/stackselectors/android.png'
            },
             {
              name: 'IOS',
              link: '/code/ios/',
              image: '/img/homepage/stackselectors/ios.png'
            },
          ]
        },
        {
          name: "API services",
          categoryLink: "/docs/guides/protect-your-api/aspnet/before-you-begin/",
          items: [
            {
              name: 'Go',
              link: '/code/go/',
              image: '/img/homepage/stackselectors/go.png'
            },
             {
              name: 'Java',
              link: '/code/java/',
              image: '/img/homepage/stackselectors/java.png'
            },
             {
              name: '.net',
              link: '/code/dotnet/aspnetcore/',
              image: '/img/homepage/stackselectors/dotnet.png'
            },
             {
              name: 'Node.js',
              link: '/code/nodejs/',
              image: '/img/homepage/stackselectors/nodejs.png'
            },
             {
              name: 'PHP',
              link: '/code/php/',
              image: '/img/homepage/stackselectors/nodejs.png'
            }
          ]
        },
      ],
      assuranceData: [
        {
          description: "with HIPAA, FedRamp, SOC and more, we have you covered",
          title: "Compliant out of the Box",
          img: "/img/homepage/compliance-out-of-box.png"
        },
          {
          description: "so your apps are working even when you’re not",
          title: "99.99% Uptime",
          img: "/img/homepage/uptime.png"
        },
          {
          description: "SAML, OpenID Connect, and OAuth 2.0 connect you to everything",
          title: "Open Standards",
          img: "/img/homepage/standards.png"
        }
      ],
      partnerData: [
        {
          alt: 'major league baseball',
          src: '/img/homepage/partners/baseball.png'
        },
         {
          alt: 'splunk',
          src: '/img/homepage/partners/splunk.png'
        },
          {
          alt: 'adobe',
          src: '/img/homepage/partners/adobe.png'
        },
          {
          alt: 'jet-blue',
          src: '/img/homepage/partners/jet-blue.png'
        },
          {
          alt: 'experian',
          src: '/img/homepage/partners/experian.png'
        },
      ],
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.isInMobileViewport = window.innerWidth <= TABLET_BREAKPOINT;
    },
    togglePseudoAuth(e) {
      if (this.isInMobileViewport) {
        this.pseudoAuthorized = !this.pseudoAuthorized;
      } else {
        this.pseudoAuthorized = !this.pseudoAuthorized;
        this.pseudoAuthorizedCodeBlock = !this.pseudoAuthorizedCodeBlock;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>
