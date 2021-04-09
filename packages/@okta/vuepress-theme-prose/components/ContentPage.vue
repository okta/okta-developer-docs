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
      activeAnchor: null,
      headingAnchorsMap: {}
    };
  },
  mounted() {
    this.anchors = this.getAnchors();

    if (document.readyState === "complete") {
      this.onURLAnchorChange();
    } else {
      window.addEventListener("load", () => {
        this.onURLAnchorChange();
      });
      window.addEventListener("popstate", e => {
        e.target.location.hash && this.scrollToAnchor(e.target.location.hash);
      });
    }

    window.addEventListener("scroll", this.onScrollHandleActiveHashListner);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScrollHandleActiveHashListner);
  },
  watch: {
    $page(to, from) {
      if (from.title !== to.title) {
        this.$nextTick(function() {
          this.anchors = this.getAnchors();
          this.getActiveAnchor(this.anchors, true);
          this.onURLAnchorChange();
        });
      }
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
    },
    onScrollHandleActiveHashListner: _.debounce(function() {
      const activeAnchor = this.getActiveAnchor(this.anchors);

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
