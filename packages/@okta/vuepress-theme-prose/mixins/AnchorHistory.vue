<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout";
import _ from "lodash";
export default {
  data() {
    return {
      paddedHeaderHeight: 0,
      anchorOffsetPairs: [],
      onThisPageAnchorsOffsetPairs: [],
    };
  },
  mounted() {
    this.paddedHeaderHeight =
      document.querySelector(".fixed-header").clientHeight +
      LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
  },
  methods: {
    scrollToAnchor: function(anchorId) {
      let target = document.querySelector(anchorId);
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

    onScrollCaptureAnchors: function(anchors) {
      const anchorOffsets = anchors.map(
        anchor => anchor.parentElement.offsetTop
      );

      this.anchorOffsetPairs = anchorOffsets.map(
        (anchorOffset, index, anchorOffsets) => [
          anchorOffset,
          anchorOffsets[index + 1]
        ]
      );
    },

    setActiveHash:
      _.debounce(
        function(anchors) {
          const scrollTop = Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          );
          const matchingPair = this.anchorOffsetPairs.find(
            pair =>
              scrollTop >= pair[0] - this.paddedHeaderHeight &&
              (!pair[1] || scrollTop < pair[1] - this.paddedHeaderHeight),
            this
          );
          const activeAnchor = matchingPair
            ? anchors[0][this.anchorOffsetPairs.indexOf(matchingPair)]
            : null;

          if (activeAnchor) {
            this.historyReplaceAnchor(activeAnchor.hash);
          } else {
            this.historyReplaceAnchor("");
          }
        },
        200,
        { leading: true }
      )

  }
};
</script>
