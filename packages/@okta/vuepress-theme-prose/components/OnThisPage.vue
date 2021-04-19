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
      anchors: [],
      activeAnchor: null,
      paddedHeaderHeight: 0
    };
  },
  computed: {
    showOnthisPage: function() {
      return (
        this.items ||
        (this.$page.fullHeaders[0].children &&
          this.$page.fullHeaders[0].children.length > 0)
      );
    }
  },
  mounted() {
    this.paddedHeaderHeight =
      document.querySelector(".fixed-header").clientHeight +
      LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
    window.addEventListener("load", () => {
      this.$nextTick(() => {
        this.anchors = this.getOnThisPageAnchors();
        this.setActiveAnchor();
        this.setAlwaysOnViewPosition();
      });
    });
    window.addEventListener("scroll", this.setAlwaysOnViewPosition);
    window.addEventListener("scroll", this.setActiveAnchor);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setAlwaysOnViewPosition);
    window.removeEventListener("scroll", this.setActiveAnchor);
  },
  watch: {
    $page(to, from) {
      if (from.title !== to.title) {
        this.$nextTick(function() {
          this.anchors = this.getOnThisPageAnchors();
        });
      }
    }
  },
  methods: {
    setAlwaysOnViewPosition: _.debounce(function() {
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

    setActiveAnchor: _.debounce(function() {
      const onThisPageActiveAnchor = this.getActiveAnchor();
      this.activeAnchor = onThisPageActiveAnchor
        ? onThisPageActiveAnchor.hash
        : "";
    }, 200),

    getOnThisPageAnchors() {
      const onThisPageLinks = [].slice.call(
        document.querySelectorAll(".on-this-page-link")
      );
      const anchors = Array.from(document.querySelectorAll(".header-anchor"));
      return anchors.filter(anchor =>
        onThisPageLinks.some(sidebarLink => sidebarLink.hash === anchor.hash)
      );
    }
  }
};
</script>
