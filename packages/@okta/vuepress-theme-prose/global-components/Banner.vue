<template>     
  <div
    v-if="showBanner"
    :id="id"
    :class="['banner', `type-${type}`]"
    :style="{ top: bannerTop }"
  >
    <div class="banner-description">
      <slot name="description" />
    </div>
    
    <div
      v-show="isDismissable"     
      class="banner-close-button"
      @click="closeBanner()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :fill="fillColor"
        viewBox="0 0 50 50"
        width="20"
        height="20"
      >

        <path
          d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
        />
      </svg>
    </div>
  </div>
</template>
  
  
<script>
  /**
   * Props:
   * - `id` : Unique id to identify the banner
   * - `type` : `type` can be `info`, `warning` or `danger`. You need not pass any type if you want the default banner
   * - `isDismissable` : When `isDismissable` is true then we'll show the X(dismiss) option in the banner
   * - `isGlobal` : If you want your banner to be visible throughout the application, you need to pass this flag as true and importantly, 
   * put the banner in `Layout.vue` after <HeaderNav />. No need to pass this prop if banner is only visible on a particular page.
   * 
   * Example usage
   *  <Banner id="home-banner" :isDismissable=false type="warning" :is-global=true>
        <template v-slot:description>
          Put your banner description here!
        </template>
      </Banner>
  */

  import _ from 'lodash';

  export default {
    name: 'Banner',
    props: {
      id: {
        required: true,
        type: String,
      },
      type: {
        type: String,
        default: 'info'
      },
      isDismissable: {
        type: Boolean,
        default: true
      },
      isGlobal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showBanner: true,
        bannerTop: 0,
        bannerIndex: -1,
        bannerHeight: 0,
        fillColor: '#007acc'
      }
    },
    mounted() {
      this.fillColor = this.type === 'warning' ? '#cc5500' : this.type === 'danger' ? '#e34843' : '#007acc';
      if (this.isGlobal) {
        setTimeout(() => {
          this.adjustHeaderWithBanner();
        }, 100);
      }
      this.adjustHeaderWithBanner();
      // Don't remove this event listener in `beforeDestroy` as this will be used when window is resized in other pages
      // when the banner is local to a page or dismissed
      window.addEventListener("resize", this.adjustHeaderWithBanner);
    },
    beforeDestroy() {
      this.resetLayoutStyles();
    },
    methods: {
      getHtmlElements() {
        const root = document.getElementsByClassName('layout')[0],
          headerNav = document.getElementsByClassName('header-nav')[0],
          currEle = document.getElementById(this.id),
          fixedHeader = document.getElementsByClassName('fixed-header')[0],
          allBanners = document.getElementsByClassName('banner'),
          sideNavigation = document.getElementsByClassName('on-this-page-navigation');

          return {
            root,
            headerNav,
            currEle,
            fixedHeader,
            allBanners,
            sideNavigation
          };
      },
      resetLayoutStyles() {
        if (this.showBanner) {
          const  { root, headerNav, allBanners, sideNavigation } = this.getHtmlElements(),
            otherBannersWithGreaterIndex = _.filter(allBanners, (banner) => banner.index > this.bannerIndex);
          root.style.position = 'relative';
          root.style.top = `${root.offsetTop - this.bannerHeight}px`;
          headerNav.style.top = `${headerNav.offsetTop - this.bannerHeight}px`;

          if (sideNavigation && sideNavigation[0]) {
            sideNavigation[0].style.top = `${sideNavigation[0].computedStyleMap().get('top').value - this.bannerHeight}px`;
          }

          _.forEach(otherBannersWithGreaterIndex, (banner) => {
            banner.style.top = `${banner.offsetTop - this.bannerHeight}px`;
          });
        }
      },
      adjustHeaderWithBanner() {
        const maxWidthMedia = window.matchMedia("(max-width: 1439px)"),
          tabletMedia = window.matchMedia("(>=tablet)"),
          { root, headerNav, fixedHeader, allBanners, sideNavigation } = this.getHtmlElements();

          let top = 0;
          let totalBannerHeight = 0;
          let index = 0;

          _.forEach(allBanners, (banner) => {
            if (banner.id !== this.id) {
              top += banner.clientHeight;
            } else {
              this.bannerTop = `${top}px`;

              return;
            }
          });

          _.forEach(allBanners, (banner) => {
            totalBannerHeight += banner.clientHeight;
            banner.index = index++;

            if (banner.id === this.id) {
              this.bannerIndex = banner.index;
              this.bannerHeight = banner.clientHeight;
            }
          });

          root.style.position = 'relative';
          root.style.top = `${totalBannerHeight}px`;

          if (maxWidthMedia.matches) {
            headerNav.style.top = `${totalBannerHeight + fixedHeader.clientHeight}px`;
          } else {
            // 87 is the fixed header height in dev docs
            headerNav.style.top = `${87 + totalBannerHeight}px`;
          }

          if (tabletMedia && sideNavigation && sideNavigation[0]) {
            sideNavigation[0].style.top = `${170 + totalBannerHeight}px`;
          } else {
            sideNavigation[0].style.top = `${175 + totalBannerHeight}px`;
          }
      },
      closeBanner() {
        this.resetLayoutStyles();
        this.showBanner = false;
      }
    }
  }
</script>

<style scoped lang="scss">
.banner {
  position: fixed;

  top: 0;
  left: 0;

  z-index: 101;

  display: flex;
  flex-direction: row;

  padding: 10px;

  width: 100%;
}

.banner-description {
  flex: 9;
}

.banner-close-button {
  display: flex;
  flex: 1;
  justify-content: end;
  align-items: center;
  cursor: pointer;
}

.type-info {
  border-left: 10px solid #007acc;
  background-color: #e6f7ff;

  color: #007acc;
}

.type-warning {
  border-left: 10px solid #cc5500;
  background-color: #fff0e5;

  color: #cc5500;
}

.type-danger {
  border-left: 10px solid #e34843;
  background-color: #ffd9d6;

  color: #e34843;
}

</style>