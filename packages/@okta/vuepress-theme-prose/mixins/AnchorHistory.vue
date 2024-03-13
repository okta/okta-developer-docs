<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout";

export default {
  inject: ['appContext'],
  data() {
    return {
      anchorOffset: []
    };
  },
  mounted() {},
  methods: {
    setAnchors: function (anchors) {
        this.anchors = anchors;
        this.getAnchorsOffset();
    },
    getAnchorsOffset: function () {
      if (!this.anchors) {
        return;
      }

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
      const scrollToPosition = target.offsetTop - LAYOUT_CONSTANTS.ANCHOR_TOP_MARGIN;

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
      const anchors = Array.from(document.querySelectorAll(".header-anchor"));

      // error-codes section
      const anchorOffsets = anchors.map(anchor => {
        if(anchor.classList.contains('container-level-2')) {
          const parentHTag = anchor.parentElement.parentElement;
          return {
            element: anchor,
            offsetTop: parentHTag.offsetTop,
            offsetHeight: parentHTag.offsetHeight
          }
        }

        const parentHTag = anchor.parentElement;
        return {
          element: anchor,
          offsetTop: parentHTag.offsetTop,
          offsetHeight: parentHTag.offsetHeight
        }
      });

      const scrollPosition = window.scrollY;
      let start = 0;
      let end = anchorOffsets.length - 1;

      while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let midOffsetTop = anchorOffsets[mid].offsetTop;
        let midOffsetTopNext = anchorOffsets[mid + 1]?.offsetTop || 99999;

        if(scrollPosition >= midOffsetTop - LAYOUT_CONSTANTS.ANCHOR_TOP_MARGIN && 
        scrollPosition <= midOffsetTopNext - LAYOUT_CONSTANTS.ANCHOR_TOP_MARGIN) {
          return anchorOffsets[mid].element
        }
        
        if (scrollPosition < midOffsetTop) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }

      return null
    }
  }
};
</script>
