<template>
  <aside class="on-this-page-navigation">
    <div v-show="showOnthisPage">
      <div class="title">On This Page</div>
      <div>
        <ul class="links" v-if="items">
          <OnThisPageItem
            v-for="(link, index) in items"
            :link="link"
            :key="index"
            :activeAnchor="activeAnchor"
          />
        </ul>
        <ul class="links" v-else>
          <OnThisPageItem
            v-for="(link, index) in $page.fullHeaders[0].children"
            :link="link"
            :key="index"
            :activeAnchor="activeAnchor"
          />
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout.vue";
import AnchorHistory from "../mixins/AnchorHistory.vue";
import _ from "lodash";
export default {
  name: "OnThisPage",
  mixins: [AnchorHistory],
  inject: ["appContext"],
  components: {
    OnThisPageItem: () => import("../components/OnThisPageItem.vue")
  },
  props: ["items"],
  data() {
    return {
      activeAnchor: null,
      anchorOffsetPairs: [],
      onThisPageAnchorsOffsetPairs: [],
      paddedHeaderHeight: 0
    };
  },
  computed: {
    showOnthisPage: function() {
      return this.items ||
        (this.$page.fullHeaders[0].children &&
          this.$page.fullHeaders[0].children.length > 0)
        ? true
        : false;
    },
    onThisPageAnchors() {
       const onThisPageLinks = [].slice.call(
        document.querySelectorAll(".on-this-page-link")
      );
      const anchors = Array.from(
        document.querySelectorAll(".header-anchor.header-link")
      );
      return anchors.filter(anchor =>
        onThisPageLinks.some(sidebarLink => sidebarLink.hash === anchor.hash)
      );
    }
  },
  mounted() {
    this.paddedHeaderHeight =
      document.querySelector(".fixed-header").clientHeight +
      LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
    window.addEventListener("load", () => {
      this.$nextTick(() => {
        this.captureAnchors();
        this.handleScroll();
        this.setActiveHashh();
      });
    });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.setActiveHashh);
  },
  updated() {
    if (!this.appContext.isInMobileViewport) {
      this.captureAnchors();
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.setActiveHashh);
  },
  methods: {
    handleScroll: _.debounce(function(event) {
      let maxHeight =
        document.querySelector(".on-this-page").clientHeight - window.scrollY;
      if (maxHeight > window.innerHeight) {
        maxHeight =
          window.innerHeight -
          document.querySelector(".fixed-header").clientHeight -
          60;
      }
      document.querySelector(".on-this-page-navigation").style.height =
        maxHeight + "px";
    }, 200),

    captureAnchors: function() {
      const sidebarAnchorOffsets = this.onThisPageAnchors.map(
        anchor => anchor.parentElement.offsetTop
      );
      this.onThisPageAnchorsOffsetPairs = sidebarAnchorOffsets.map(
        (anchorOffset, index, anchorOffsets) => [
          anchorOffset,
          anchorOffsets[index + 1]
        ]
      );
    },

    setActiveHashh: _.debounce(
      function(event) {
        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        );
        const onThisPageMatchingPair = this.onThisPageAnchorsOffsetPairs.find(
          pair =>
            scrollTop >= pair[0] - this.paddedHeaderHeight &&
            (!pair[1] || scrollTop < pair[1] - this.paddedHeaderHeight),
          this
        );
         const matchingPair = this.onThisPageAnchorsOffsetPairs.find(
            pair =>
              scrollTop >= pair[0] - this.paddedHeaderHeight &&
              (!pair[1] || scrollTop < pair[1] - this.paddedHeaderHeight),
            this
          );
        const onThisPageActiveAnchor = matchingPair
          ? this.onThisPageAnchors[
              this.onThisPageAnchorsOffsetPairs.indexOf(onThisPageMatchingPair)
            ]
          : null;
        if (onThisPageActiveAnchor) {
          this.activeAnchor = onThisPageActiveAnchor.hash;
        } else {
          this.activeAnchor = "";
        }
      },
      200,
      { leading: true }
    )
  }
};
</script>
