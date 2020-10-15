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
  export default {
    name: 'OnThisPage',
    components: {
      OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
    },
    props: ['items'],
    data() {
      return {
        activeAnchor: null
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
      this.$nextTick(() => {
        this.handleScroll();
        this.setActiveHash();
      })
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('scroll', this.setActiveHash);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('scroll', this.setActiveHash);
    },
    methods: {
      handleScroll: function (event) {
        let maxHeight = document.querySelector('.on-this-page').clientHeight - window.scrollY
        if(maxHeight > window.innerHeight) {
          maxHeight = window.innerHeight - document.querySelector('.fixed-header').clientHeight - 60;
        }
        document.querySelector('.on-this-page-navigation').style.height = maxHeight + 'px';


      },

      setActiveHash: function (event) {
        const sidebarLinks = [].slice.call(document.querySelectorAll('.on-this-page-link'));
        const anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
          .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash));

        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        )

        const paddedHeaderHeight = document.querySelector('.fixed-header').clientHeight + LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
        const anchorOffsets = anchors.map(anchor => anchor.parentElement.offsetTop);
        const anchorOffsetPairs = anchorOffsets.map((anchorOffset, index, anchorOffsets) => [anchorOffset, anchorOffsets[index + 1]]);

        const matchingPair = anchorOffsetPairs.find(pair =>
          (scrollTop >= pair[0] - paddedHeaderHeight) && (!pair[1] || scrollTop < pair[1] - paddedHeaderHeight));

        const activeAnchor = matchingPair ? anchors[anchorOffsetPairs.indexOf(matchingPair)] : anchors[0];
        if (activeAnchor && decodeURIComponent(this.$route.hash) !== decodeURIComponent(activeAnchor.hash)) {
          this.activeAnchor = activeAnchor.hash;
        }
      }
    }
  }
</script>