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
  watch: {
    $page(to, from) {
      if (from.title !== to.title) {
        this.$nextTick(function() {
          this.setAnchors(this.getAnchors());
          this.onPageChange();
        });
      }
    }
  },
  mounted() {
    // When ContentPage gets initialized first time after navigating from homepage, the document's readyState is
    // already `complete`. Hence, it does not go in the `onreadystatechange` event handler because the state never
    // changes and does not initialize the listeners and anchors. However, when we refresh the page, the initial
    // readyState is `interactive`. So, when the state changes to `complete` we call the onreadystatechange handler
    // and it initializes the listeners. Hence, we need to check the readyState condition here for the above usecase.
    if (document.readyState === 'complete') {
      this.initializeAnchorsAndListeners();
    }
    document.onreadystatechange = () => {
      if (document.readyState !== "complete") {
        return;
      }
      this.initializeAnchorsAndListeners();
    };
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.scrollToAnchor);
  },
  methods: {
    onPageChange() {
      const anchor = window.location.hash;

      if (anchor) {
        this.scrollToAnchor(`${anchor}`);
      } else {
        // navigating via back button to no-anchor URL
        window.scrollTo({top: 0, behavior: 'instant'});
      }
      this.onClickCaptureAnchors();
    },
    initializeAnchorsAndListeners() {
      this.$nextTick(function() {
        this.setAnchors(this.getAnchors());
        this.onPageChange();

        window.addEventListener("popstate", e => {
          e.target.location.hash && this.scrollToAnchor(e.target.location.hash);
        });
      });
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
        location.pathname.replace(/^\//, "") ===
          element.pathname.replace(/^\//, "") &&
        location.hostname === element.hostname
      ) {
        const scrollToAnchor = this.headingAnchorsMap[element.hash];
        if (scrollToAnchor) {
          event.preventDefault();
          this.historyPushAndScrollToAnchor(scrollToAnchor.hash);
          return false;
        }
      }
    },
    getAnchors() {
      return Array.from(document.querySelectorAll(".header-anchor"));
    }
  }
};
</script>
