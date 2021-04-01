<template>
  <Content />
</template>

<script>
import AnchorHistory from "../mixins/AnchorHistory.vue";
export default {
  name: "ContentPage",
  mixins: [AnchorHistory],
  data() {
    return {
      anchors: [],
      headingAnchorsMap: {},
    };
  },
  mounted() {
    if (document.readyState === "complete") {
        this.onURLAnchorChange();
    } else {
      window.addEventListener("load", () => {
        this.onURLAnchorChange();
      });
      window.addEventListener("popstate", (e) => {
        this.scrollToAnchor(e.target.location.hash);
      });
    }
  },
  watch: {
    $page(to, from) {
      this.$nextTick(function() {
        if (from.title !== to.title) {
          this.onURLAnchorChange();
        }
      });
    }
  },
  methods: {
    onURLAnchorChange() {
      let anchor = window.location.href.split("#")[1];
      
      if (anchor) {
        this.scrollToAnchor(`#${anchor}`);
      } else {
        // navigating via back button to no-anchor URL
        window.scrollTo(0, 0);
      }
      this.captureAnchors();
    },
    captureAnchors() {
      this.anchors.forEach(
        link => link.removeEventListener("click", this.onAnchorClick),
        this
      );

      this.headingAnchorsMap = Array.from(
        document.querySelectorAll(".header-anchor.header-link")
      ).reduce(function(anchorsByHash, anchor) {
        anchorsByHash[anchor.hash] = anchor;
        return anchorsByHash;
      }, {});
      this.anchors = Array.from(
        document.querySelectorAll(
          'a[href^="#"]:not(.on-this-page-link):not(.tree-nav-link)'
        )
      );

      this.anchors.forEach(
        link => link.addEventListener("click", this.onAnchorClick),
        this
      );
    },
    onAnchorClick(event) {
      const element = event.target.hash
        ? event.target
        : event.target.closest("a");
      if (
        location.pathname.replace(/^\//, "") ==
          element.pathname.replace(/^\//, "") &&
        location.hostname == element.hostname
      ) {
        let scrollToAnchor = this.headingAnchorsMap[element.hash];
        if (scrollToAnchor) {
          event.preventDefault();
          this.historyPushAndScrollToAnchor(scrollToAnchor.hash);
          return false;
        }
      }
    },
  }
};
</script>
