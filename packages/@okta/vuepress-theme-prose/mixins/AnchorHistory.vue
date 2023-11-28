<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout";

export default {
  inject: ['appContext'],
  data() {
    return {
      paddedHeaderHeight: 0,
      anchorOffset: []
    };
  },
  mounted() {},
  methods: {
    getPaddedHeaderHeight: function () {
      return  document.querySelector(".fixed-header").clientHeight +
              LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
    },

    setAnchors: function (anchors) {
        this.anchors = anchors;
        this.getAnchorsOffset();
    },
    getAnchorsOffset: function () {
      if (!this.anchors) {
        return;
      }

      this.paddedHeaderHeight = this.getPaddedHeaderHeight()

      const anchorOffsets = this.anchors.map(
        anchor => anchor.parentElement.offsetTop
      );

      this.anchorsOffset = anchorOffsets.map((anchorOffset, index, anchorOffsets) => ({
        start: anchorOffset,
        end: anchorOffsets[index + 1]
      }));
    },

    scrollToAnchor: function(anchorId) {
      const target = document.querySelector(anchorId);
      if (!target) {
        return;
      }
      const scrollToPosition = target.offsetTop - this.getPaddedHeaderHeight();
      window.scrollTo(0, scrollToPosition);
      // Chrome & Safari: when zoomed in/out, window.scrollTo does not always perform scroll strictly equal to passed parameter
      // https://bugs.chromium.org/p/chromium/issues/detail?id=890345
      if (window.scrollY < scrollToPosition) {
        const scrollAlignment = 2;
        window.scrollBy(0, scrollAlignment);
      }
    },

    historyPushAndScrollToAnchor: function(anchor) {
      const node = document.querySelector(anchor);
      if (
        node &&
        decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor)
      ) {
        {
          this.$vuepress.$set("disableScrollBehavior", true);
          this.$router.push(anchor, () => {
            this.$nextTick(() => {
              this.scrollToAnchor(anchor);
              this.$vuepress.$set("disableScrollBehavior", false);
            });
          });
        }
      }
    },

    historyReplaceAnchor: function(anchor) {
      // If mobile tree nav opened don't make router changes while scroll.
      // It will cause of mobile menu closing.
      if (this.appContext.isTreeNavMobileOpen) return;

      if (decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor)) {
        this.$vuepress.$set("disableScrollBehavior", true);
        this.$router.replace(anchor, () => {
          this.$nextTick(() => {
            this.$vuepress.$set("disableScrollBehavior", false);
          });
        });
      }
    },

    getActiveAnchor: function() {
      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      const matchingPair = this.anchorsOffset.find(
        pair =>
          scrollTop >= pair.start - this.paddedHeaderHeight &&
          (!pair.end || scrollTop < pair.end - this.paddedHeaderHeight),
        this
      );
      const activeAnchor = matchingPair
        ? this.anchors[this.anchorsOffset.indexOf(matchingPair)]
        : null;

      return activeAnchor;
    }
  }
};
</script>
