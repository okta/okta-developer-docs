<template>
  <aside class="on-this-page-navigation">
    <div v-show="showOnthisPage">
      <div class="title">On This Page</div>
      <div>
        <ul class="links" v-if="items">
          <OnThisPageItem v-for="(link, index) in items" :link="link" :key="index" :activeAnchor=activeAnchor />
          </ul>
        <ul class="links" v-else>
          <OnThisPageItem v-for="(link, index) in $page.fullHeaders[0].children" :link="link" :key="index" :activeAnchor=activeAnchor />
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  import { LAYOUT_CONSTANTS } from '../layouts/Layout.vue';
  import AnchorHistory from '../mixins/AnchorHistory.vue';
  import _ from 'lodash';
  export default {
    name: 'OnThisPage',
    mixins: [AnchorHistory],
    inject: ['appContext'],
    components: {
      OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
    },
    props: ['items'],
    data() {
      return {
        activeAnchor: null,
        anchors: [],
        anchorOffsetPairs: [],
        paddedHeaderHeight: 0,
      }
    },
    computed: {
      showOnthisPage: function(){
         return this.items ||
                (this.$page.fullHeaders[0].children && this.$page.fullHeaders[0].children.length > 0)
                ? true : false;
      }
    },
    mounted() {
      this.paddedHeaderHeight = document.querySelector('.fixed-header').clientHeight + LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
      this.$nextTick(() => {
        this.captureAnchors();
        this.handleScroll();
        this.setActiveHash();
      });
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('scroll', this.setActiveHash);
    },
    updated() {
      if(!this.appContext.isInMobileViewport) {
        this.captureAnchors();
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('scroll', this.setActiveHash);
    },
    methods: {
      handleScroll: _.debounce(function (event) {
        let maxHeight = document.querySelector('.on-this-page').clientHeight - window.scrollY
        if(maxHeight > window.innerHeight) {
          maxHeight = window.innerHeight - document.querySelector('.fixed-header').clientHeight - 60;
        }
        document.querySelector('.on-this-page-navigation').style.height = maxHeight + 'px';
      }, 200),

      captureAnchors: function () {
        const sidebarLinks = [].slice.call(document.querySelectorAll('.on-this-page-link'));
        this.anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
          .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash));
        const anchorOffsets = this.anchors.map(anchor => anchor.parentElement.offsetTop);
        this.anchorOffsetPairs = anchorOffsets.map((anchorOffset, index, anchorOffsets) => [anchorOffset, anchorOffsets[index + 1]]);
      },

      setActiveHash: _.debounce(function (event) {
        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        )

        const matchingPair = this.anchorOffsetPairs.find(pair =>
          (scrollTop >= pair[0] - this.paddedHeaderHeight) && (!pair[1] || scrollTop < pair[1] - this.paddedHeaderHeight), this);

        const activeAnchor = matchingPair ? this.anchors[this.anchorOffsetPairs.indexOf(matchingPair)] : this.anchors[0];
        if (activeAnchor) {
          this.activeAnchor = activeAnchor.hash;
          this.historyReplaceAnchor(activeAnchor.hash)

        }
      }, 200, {leading: true})
    }
  }
</script>
