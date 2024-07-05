<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout";

export default {
  inject: ['appContext'],
  methods: {
    setAnchors: function () {
      const headerAnchors = Array.from(
        document.querySelectorAll(".header-anchor")
      );
      const onThisPageLinks = Array.from(
        document.querySelectorAll(".on-this-page-link")
      );

      this.appContext.anchors = headerAnchors.filter((anchor) =>
        onThisPageLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash)
      );
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
      const scrollPosition =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) + LAYOUT_CONSTANTS.ANCHOR_TOP_MARGIN + 1;

      const anchors = this.appContext.anchors;

      let start = 0;
      let end = anchors?.length - 1;

      while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let midOffsetTop = anchors[mid].offsetTop;
        let midOffsetTopNext = anchors[mid + 1]?.offsetTop || 99999;

        if (
          scrollPosition >= midOffsetTop &&
          scrollPosition <= midOffsetTopNext
        ) {
          return anchors[mid];
        }

        if (scrollPosition < midOffsetTop) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }

      return null;
    },
  },
};
</script>
