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
      activeAnchor: null,
      headingAnchorsMap: {}
    };
  },
  computed: {
    anchors() {
      return Array.from(
        document.querySelectorAll(".header-anchor.header-link")
      );
    }
  },
  mounted() {
    if (document.readyState === "complete") {
      this.onURLAnchorChange();
      this.onScrollCaptureAnchors(this.anchors);
    } else {
      window.addEventListener("load", () => {
        this.onURLAnchorChange();
        this.onScrollCaptureAnchors(this.anchors);
      });
      window.addEventListener("popstate", e => {
        this.scrollToAnchor(e.target.location.hash);
      });
    }
    window.addEventListener("scroll", this.setActiveHash.bind(this,[this.anchors]));
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setActiveHash);
  },
  watch: {
    $page(to, from) {
      this.$nextTick(function() {
        if (from.title !== to.title) {
          this.onScrollCaptureAnchors(this.anchors);
          this.onURLAnchorChange();
        }
      });
    }
  },
  methods: {
    onURLAnchorChange() {
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
      this.anchors.forEach(
        link => link.removeEventListener("click", this.onAnchorClick),
        this
      );

      this.headingAnchorsMap = this.anchors.reduce((anchorsByHash, anchor) => {
        anchorsByHash[anchor.hash] = anchor;
        return anchorsByHash;
      }, {});

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
    }
  }
};
</script>
