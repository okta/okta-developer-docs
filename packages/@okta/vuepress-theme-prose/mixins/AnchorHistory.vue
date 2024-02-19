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
        /* 
          In case of a few pages like error codes (/docs/reference/error-codes/), we are using our custom template
          for showing header-anchor (ErrorCodes.vue) where the generated HTML has different template than the default
          vuepress template for showing anchor tags.
          The anchor tag is not a direct child of h2/h3/h4 in this case but instead, is the grandchild of these header elements.
          Hence, we need to add a separate check for these routes.
          Refer - https://oktainc.atlassian.net/browse/OKTA-483028
        */
        anchor => anchor?.classList.contains('container-level-2') ? anchor.parentElement.parentElement.offsetTop :
          anchor.parentElement.offsetTop
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
      const scrollToPosition = target.offsetTop - target.offsetHeight;

      window.scrollTo({top: scrollToPosition, behavior: 'smooth'});

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
