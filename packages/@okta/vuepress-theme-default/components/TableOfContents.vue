<template>
  <div class="TableOfContents" :style="'bottom: '+tocStyle.bottom+'; top: '+tocStyle.top+';'" :class="{'large-header': $frontmatter.title && $frontmatter.title.length > 50}">
    <div class="TableOfContents-item is-level1">
      {{$frontmatter.title}}
    </div>
    <div class="TableOfContentsLoader" v-if="loading"></div>
    <div v-if="!loading">
      <div class="TableOfContents-indicator" :style="'height: ' + indicatorStyle.height + '; transform: translate(' + indicatorStyle.transform + ');'"></div>
      <a
        :href="item.href"
        class="TableOfContents-item sidebar-link"
        :class="[{
          'is-active': activeItem==item
          },
          'is-level'+item.level]"
        v-for="item in items"
        :key="item.href"
        :style="'display: '+item.display+';'"
      >
        {{item.title}}
      </a>
      <div class="TableOfContents-footer"><a href="#">Top of Page</a></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  mounted() {
    window.addEventListener("load", this.buildHeaderData)
    window.addEventListener("load", this.onScroll)
    window.addEventListener('scroll', this.onScroll)

  },
  data () {
    return {
      loading: true,
      indicatorStyle: {
        height: '30px',
        transform: '0px, 0px'
      },
      tocStyle: {
        bottom: '0px',
        top: '100px;'
      },
      headerData: [],
      offset: 140,
      activeItem: null,
      activeToCItem: null
    }
  },
  computed: {
    isMobile() {
      return window.getComputedStyle(document.body,':before').content.includes("toc-mobile");
    }
  },
  watch: {
    items: function (val) {
      if (val.length > 0) {
        this.loading = false
      }
    }
  },
  methods: {
    buildHeaderData(event) {
      let pageRect = document.querySelectorAll('.PageContent')[0].getBoundingClientRect()
      this.items.forEach((item, index) => {

        let itemRect = item.node.getBoundingClientRect()
        let sectionHeight = 0

        if (index < this.items.length - 1) {
          let nextEle = this.items[index+1].node
          let nextRect = nextEle.getBoundingClientRect()
          sectionHeight = nextRect.top - itemRect.top
        } else {
          sectionHeight = pageRect.bottom - itemRect.top
        }

        this.headerData.push({
          'headerEle': item.node,
          'height': sectionHeight
        })
      })
    },

    onScroll(event) {
      for (let i = 0; i < this.headerData.length; i++) {
        let ele = this.headerData[i].headerEle
        let rect = ele.getBoundingClientRect()

        if (rect.top > this.offset + (window.innerHeight - this.offset) / 2) {
          this.setActiveItem(i - 1)
          break
        } else if (rect.bottom > this.offset) {
          this.setActiveItem(i)
          break
        }
      }

      let footerRect = document.querySelectorAll('.Footer')[0].getBoundingClientRect();

      if (footerRect.top < window.innerHeight) {
        this.tocStyle.bottom = window.innerHeight - footerRect.top + 'px'
        this.tocStyle.top = "auto"
      } else {
        this.tocStyle.bottom = 0
        this.tocStyle.top = "100px"
      }
    },

    setActiveItem(i) {
      if ( !this.isMobile) {
        this.activeToCItem = document.querySelectorAll('.TableOfContents-item')[i]
        this.activeItem = this.items[i]
        let currentLevel = parseInt(this.activeItem.level)

        for (let j = i; j > 0; j--) {
          let siblingLevel = parseInt(this.items[j].level)

          if (siblingLevel < currentLevel) {
            currentLevel = siblingLevel
          }

          if (siblingLevel == currentLevel) {
            this.items[j].display = 'block'
          } else {
            this.items[j].display = 'none'
          }
        }

        if (i < this.items.length - 1) {
          currentLevel = this.items[i + 1].level

          for (let j = (i + 1); j < this.items.length; j++) {
            let siblingLevel = parseInt(this.items[j].level)

            if (siblingLevel < currentLevel) {
              currentLevel = siblingLevel;
            }

            if (siblingLevel == currentLevel) {
              this.items[j].display = 'block'
            } else {
              this.items[j].display = 'none'
            }
          }
        }

        const getLevel = node => {
          const className = Array.from(node.classList).find(cl => cl.match(/is-level/));
          return className ? className.match(/^is-level(\d+)$/)[1] : null;
        }
        const siblings = Array.from(this.activeToCItem.parentNode.children);
        const activeLevel = getLevel(this.activeToCItem);

        let afterActive = false;
        const nextItem = siblings.find( node => {
          if(!afterActive) {
            afterActive = node === this.activeToCItem;
            return false;
          }
          const level = getLevel(node);
          return level ? level < activeLevel : false;
        });
      // console.log(siblings, activeLevel, afterActive, nextItem)

        // let nextItem = this.nextAll(this.activeItem.node)
        let toc = document.querySelectorAll('.TableOfContents')[0]
        let scrollTop = toc.scrollTop
        let firstRect = document.querySelectorAll('.TableOfContents-item')[0].getBoundingClientRect()
        let activeRect = this.activeToCItem.getBoundingClientRect()
        let tocRect = toc.getBoundingClientRect()

        let tocOffset = scrollTop + activeRect.top - tocRect.top - 60

        let nextEle
        let nextRect
        let scale
        let indicatorOffset = (activeRect.top - firstRect.top)

        if (nextItem && nextItem.length) {
          nextEle = nextItem
          nextRect = nextEle.getBoundingClientRect()
          scale = (nextRect.top - activeRect.top)
        } else {
          scale = (activeRect.bottom - activeRect.top)
        }

        this.indicatorStyle.height = scale+'px'
        this.indicatorStyle.transform = '0, ' + indicatorOffset + 'px'


      }
    },

    nextAll(el) {
      let siblings = [];
      let nextClasses = []

      for (let i = this.activeItem.level; i > 0; i--) {
        nextClasses.push('.is-level' + i)
      }

      while (el = el.nextSibling) {
        if(el.className.includes('is-level')) {
          siblings.push(el)
        }
      }
      return siblings
    }
  },
  beforeDestroy() {
    window.removeEventListener('load', this.buildHeaderData);
    window.removeEventListener('scroll', this.onScroll);
  }

}


</script>

<style scoped>
  .TableOfContentsLoader {
    display: block;
    width: 100px;
    height: 100px;
    display: block;
    background-image: url("/assets/img/loading.gif");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin-top: -30px;
  }
</style>
