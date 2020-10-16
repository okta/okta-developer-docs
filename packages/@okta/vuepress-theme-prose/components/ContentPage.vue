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
      paddedHeaderHeight: 0,
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      window.setTimeout(() => {
        this.paddedHeaderHeight =
          document.querySelector(".fixed-header").clientHeight +
          LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
        this.scrollToActiveAnchor();
        this.captureAnchors();
      }, 500);
    });
  },
  watch: {
    $page(to, from) {
      if(from.title !== to.title) {
        this.$nextTick(function () {
          this.scrollToActiveAnchor();
          this.captureAnchors();
        });
      }
    },
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
          window.scrollTo(
            0,
            scrollToAnchor.offsetTop - this.paddedHeaderHeight
          );
          location.hash = element.hash;
          return false;
        }
      }
    },
    captureAnchors() {
      this.anchors.forEach(link =>
        link.removeEventListener("click", this.onAnchorClick), this);

      this.headingAnchorsMap = Array.from(
        document.querySelectorAll(".header-anchor.header-link")
      ).reduce(function (anchorsByHash, anchor) {
        anchorsByHash[anchor.hash] = anchor;
        return anchorsByHash;
      }, {});
      this.anchors = Array.from(
        document.querySelectorAll(
          'a[href^="#"]:not(.on-this-page-link):not(.tree-nav-link)'
        )
      );

      this.anchors.forEach((link) => {
        link.addEventListener("click", this.onAnchorClick);
      }, this);
    },
    scrollToActiveAnchor() {
      let anchor = window.location.href.split("#")[1];
      if (anchor) {
        let target = document.getElementById(anchor);
        if (target) {
          window.scrollTo(0, target.offsetTop - this.paddedHeaderHeight);
        }
      } else {
        window.scrollBy(0, -this.paddedHeaderHeight);
      }
    },
  },
};
</script>
