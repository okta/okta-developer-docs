<template>
  <Content />
</template>

<script>
import _ from "lodash";
import AnchorHistory from "../mixins/AnchorHistory.vue";
export default {
  name: "ContentPage",
  mixins: [AnchorHistory],
  data() {
    return {
      anchors: [],
      headingAnchorsMap: {}
    };
  },
  mounted() {
    this.anchors = this.getAnchors(``);
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        this.onPageChange();
      }
    };
    window.addEventListener("popstate", e => {
      e.target.location.hash && this.scrollToAnchor(e.target.location.hash);
    });
    window.addEventListener("scroll", this.setHeadingAnchorToURL);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setHeadingAnchorToURL);
    window.removeEventListener("scroll", this.scrollToAnchor);
  },
  watch: {
    $page(to, from) {
      if (from.title !== to.title) {
        this.$nextTick(function() {
          this.anchors = this.getAnchors();
          this.onPageChange();
        });
      }
    }
  },
  methods: {
    onPageChange() {
      const anchor = window.location.href.split("#")[1];

      if (anchor) {
        this.scrollToAnchor(`#${anchor}`);
      } else {
        // navigating via back button to no-anchor URL
        window.scrollTo(0, 0);
      }
      this.onClickCaptureAnchors();
    },
    onClickCaptureAnchors() {
      const noneHeadingAnchors = Array.from(
        document.querySelectorAll(
          'a[href^="#"]:not(.on-this-page-link):not(.tree-nav-link)'
        )
      );
      noneHeadingAnchors.forEach(
        link => link.removeEventListener("click", this.onAnchorClick),
        this
      );

      this.headingAnchorsMap = this.anchors.reduce((anchorsByHash, anchor) => {
        anchorsByHash[anchor.hash] = anchor;
        return anchorsByHash;
      }, {});

      noneHeadingAnchors.forEach(
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
    setHeadingAnchorToURL: _.debounce(function() {
      const activeAnchor = this.getActiveAnchor();
      activeAnchor
        ? this.historyReplaceAnchor(activeAnchor.hash)
        : this.historyReplaceAnchor("");
    }, 200),
    getAnchors() {
      return Array.from(document.querySelectorAll(".header-anchor"));
    }
  }
};
</script>
