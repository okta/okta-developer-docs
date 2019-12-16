<template>
  <aside class="on-this-page-navigation">
    <div class="title">On This Page</div>
    <div>
      <ul class="links">
        <OnThisPageItem v-for="(link, index) in $page.fullHeaders[0].children" :link="link" :key="index" :activeAnchor=activeAnchor />
      </ul>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'OnThisPage',
    components: {
      OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
    },
    data() {
      return {
        activeAnchor: null
      }
    },
    mounted() {
      this.handleScroll();
      this.setActiveHash();
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
        console.log('here');
        const sidebarLinks = [].slice.call(document.querySelectorAll('.on-this-page-link'));
        const anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
          .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash));

        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        )
        for (let i = 0; i < anchors.length; i++) {
          const anchor = anchors[i]
          const nextAnchor = anchors[i + 1]

          const isActive = i === 0 && scrollTop === 0
            || (scrollTop >= anchor.parentElement.offsetTop - document.querySelector('.fixed-header').clientHeight - 60
              && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - document.querySelector('.fixed-header').clientHeight - 60))
          
          
          
          if (isActive && decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor.hash)) {
            this.activeAnchor = anchor.hash;
            
            return
          }
        }
      }
    }
  }
</script>