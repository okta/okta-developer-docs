<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout";

export default {
  data() {
    return {
      paddedHeaderHeight: 0,
      anchorOffsetPairs: null
    };
  },
  mounted() {
    this.paddedHeaderHeight =
      document.querySelector(".fixed-header").clientHeight +
      LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
  },
  methods: {
    scrollToAnchor: function(anchorId) {
      const target = document.querySelector(anchorId);
      if (target) {
        const scrollToPosition = target.offsetTop - this.paddedHeaderHeight;
        window.scrollTo(0, scrollToPosition);
        // Chrome & Safari: when zoomed in/out, window.scrollTo does not always perform scroll strictly equal to passed parameter
        // https://bugs.chromium.org/p/chromium/issues/detail?id=890345
        if (window.scrollY < scrollToPosition) {
          const scrollAlignment = 2;
          window.scrollBy(0, scrollAlignment);
        }
      }
    },

    historyPushAndScrollToAnchor: function(anchor) {
      if (decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor)) {
        this.$vuepress.$set("disableScrollBehavior", true);
        this.$router.push(anchor, () => {
          this.$nextTick(() => {
            this.scrollToAnchor(anchor);
            this.$vuepress.$set("disableScrollBehavior", false);
          });
        });
      }
    },

    historyReplaceAnchor: function(anchor) {
      if (decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor)) {
        this.$vuepress.$set("disableScrollBehavior", true);
        this.$router.replace(anchor, () => {
          this.$nextTick(() => {
            this.$vuepress.$set("disableScrollBehavior", false);
          });
        });
      }
    },

    _getAnchorsOffsetPairs(anchors) {
      const anchorOffsets = anchors.map(
        anchor => anchor.parentElement.offsetTop
      );

      return anchorOffsets.map((anchorOffset, index, anchorOffsets) => ({
        start: anchorOffset,
        end: anchorOffsets[index + 1]
      }));
    },

    getActiveAnchor: function(anchors, updateOffsetPairs = false) {
      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      if (!this.anchorOffsetPairs || updateOffsetPairs) {
        this.anchorOffsetPairs = this._getAnchorsOffsetPairs(anchors);
      }

      const matchingPair = this.anchorOffsetPairs.find(
        pair =>
          scrollTop >= pair.start - this.paddedHeaderHeight &&
          (!pair.end || scrollTop < pair.end - this.paddedHeaderHeight),
        this
      );
      const activeAnchor = matchingPair
        ? anchors[this.anchorOffsetPairs.indexOf(matchingPair)]
        : null;

      return activeAnchor;
    }
  }
};
</script>
