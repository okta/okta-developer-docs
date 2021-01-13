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
import {
  tileData,
  assuranceData,
  partnerData,
} from '../const/home.const';

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
      tileData,
      assuranceData,
      partnerData,
    }
  },
  mounted: async function() {
    await (function(apiKey){
          (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
          v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
              o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
              y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
              z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
              pendo.initialize({
                  visitor: {},
                  account: {}
              });
          }
          )('f8bd2822-002a-478f-66a9-0178efd7ee1f');
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
