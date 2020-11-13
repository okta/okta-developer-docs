<template>
  <Content />
</template>

<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout";
export default {
  name: "ContentPage",
  data() {
    return {
      anchors: [],
      headingAnchorsMap: {},
      paddedHeaderHeight: 0
    };
  },
  mounted() {
    this.paddedHeaderHeight =
      document.querySelector(".fixed-header").clientHeight +
      LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
    if (document.readyState === "complete") {
        this.scrollToActiveAnchor();
        this.captureAnchors();
    } else {
      window.addEventListener("load", () => {
        this.scrollToActiveAnchor();
        this.captureAnchors();
      });
    }
  },
  watch: {
    $page(to, from) {
      this.$nextTick(function() {
        if (from.title !== to.title) {
           this.scrollToActiveAnchor();
          this.captureAnchors();
        }
      });
    }
  },
  methods: {
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
          if(decodeURIComponent(this.$route.hash) !== decodeURIComponent(element.hash)) {
            this.$router.push(element.hash, () => {
              this.$nextTick(() => {
                this.scrollToActiveAnchor();
              })
            })
          }
          return false;
        }
      }
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
    scrollToActiveAnchor() {
      let anchor = window.location.href.split("#")[1];
      if (anchor) {
        let target = document.getElementById(anchor);
        if (target) {
          const scrollToPosition = target.offsetTop - this.paddedHeaderHeight;
          window.scrollTo(0, scrollToPosition);
          // Chrome & Safari: when zoomed in/out, window.scrollTo does not always perform scroll strictly equal to passed parameter
          // https://bugs.chromium.org/p/chromium/issues/detail?id=890345
          if(window.scrollY < scrollToPosition) {
            const scrollAlignment = 2;
            window.scrollBy(0, scrollAlignment);
          }
        }
      } else {
        // navigating via back button to no-anchor URL
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>
