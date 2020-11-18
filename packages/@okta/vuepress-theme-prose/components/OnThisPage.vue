<template>
  <aside class="on-this-page-navigation">
    <div v-show="showOnthisPage">
      <div class="title">On This Page</div>
      <div>
        <ul class="links">
          <OnThisPageItem v-on:emit-hash="onLinkClicked" v-for="(link, index) in links" :link="link" :key="index"/>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  import { LAYOUT_CONSTANTS } from '../layouts/Layout.vue';
  export default {
    name: 'OnThisPage',
    inject: ['appContext'],
    components: {
      OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
    },
    props: ['items'],
    data() {
      return {
        links: [],
        activeAnchor: null,
        linksHashMap: {},
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
      },
    },
    mounted() {
      // //set correct links structure from props and map them with active tab
      this.links = this.mutateAndFlatItems(this.items)
                  .map(
                    (link)=> ({...link, imActive: this.checkIsLinkActive(link)})
                  )
      //create hash map for links array for easy index access when hash is emmitted from onThisPageItem
      this.linksHashMap = this.createHashMapForLinkArray()
      //set active anchor (e.g. page was opened with ../#some-anchor-hash)
      this.activeAnchor = this.getInitialAnchor()
      this.paddedHeaderHeight = document.querySelector('.fixed-header').clientHeight + LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
      this.$nextTick(() => {
        this.captureAnchors();
        this.handleScroll();
        this.setActiveHash();
      });

      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('scroll', this.setActiveHash);
    },
    watch: {
        activeAnchor(){
          this.$router.push(this.activeAnchor)
          this.links = this.updateLinksActiveState(this.links)
        }
    },
    updated() {
      if(!this.appContext.isInMobileViewport) {
        this.captureAnchors();
        this.handleScroll();
        this.setActiveHash();
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('scroll', this.setActiveHash);
    },
    methods: {
      calculateLinkHash: function(link){
          if (link.path) {
              const linkPathDeconstructed = link.path.split('/');
              return linkPathDeconstructed[linkPathDeconstructed.length-1];
          } else {
            return `#${link.slug}`
          }
        },
        mutateAndFlatItems: function(items){
          //transform items from layout, add imActive, iHaveChildrenActive
          //make array flat for easy element access  
          let itemsTransformed = [...items].map((item, index)=>(
            {
             title: item.title,
             path: item.path, 
             imActive: false, 
             iHaveChildrenActive: false
             }))
          items.forEach((item, index) => {
              if(item.children.length>0){
              const childrenToInclude = [...item.children.map((child) => ({...child, parentIndex: index, isHidden: true}))];
              itemsTransformed.splice(index+1, 0, childrenToInclude);
              }
            })
         return itemsTransformed.flat().map((link)=>(
                {...link, hash: this.calculateLinkHash(link) }))
        },
        createHashMapForLinkArray: function(){
          let hashMap = {}
          this.links.forEach((link, index)=> hashMap[link.hash] = index)
          return hashMap
        },
        checkIsLinkActive: function(link){
           return this.activeAnchor === link.hash
        },
        updateLinksActiveState: function(links){
          return links.map(link=>({...link, imActive: this.checkIsLinkActive(link)}))
        },
        getInitialAnchor: function(){
          if(this.$router.hash){
            return $this.$router.hash
          } else return this.links[0].hash
        },
      onLinkClicked: function(eventHash){
        this.activeAnchor = eventHash
      },
      handleScroll: function (event) {
        let maxHeight = document.querySelector('.on-this-page').clientHeight - window.scrollY
        if(maxHeight > window.innerHeight) {
          maxHeight = window.innerHeight - document.querySelector('.fixed-header').clientHeight - 60;
        }
        document.querySelector('.on-this-page-navigation').style.height = maxHeight + 'px';
      },

      captureAnchors: function () {
        const sidebarLinks = [].slice.call(document.querySelectorAll('.on-this-page-link'));
        this.anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
          .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash));
        const anchorOffsets = this.anchors.map(anchor => anchor.parentElement.offsetTop);
        this.anchorOffsetPairs = anchorOffsets.map((anchorOffset, index, anchorOffsets) => [anchorOffset, anchorOffsets[index + 1]]);
      },

      setActiveHash: function (event) {
        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        )

        const matchingPair = this.anchorOffsetPairs.find(pair =>
          (scrollTop >= pair[0] - this.paddedHeaderHeight) && (!pair[1] || scrollTop < pair[1] - this.paddedHeaderHeight), this);

        const activeAnchor = matchingPair ? this.anchors[this.anchorOffsetPairs.indexOf(matchingPair)] : this.anchors[0];
        if (activeAnchor && decodeURIComponent(this.$route.hash) !== decodeURIComponent(activeAnchor.hash)) {
          this.activeAnchor = activeAnchor.hash;
        }
      }
    }
  }
</script>