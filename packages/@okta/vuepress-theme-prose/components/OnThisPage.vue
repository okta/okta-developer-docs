<template>
  <aside class="on-this-page-navigation">
    <div v-show="showNavigation">
      <StackSelector v-if="$page.hasStackContent" />
      <div v-show="showOnthisPage">
        <div class="title">
          On this page
        </div>
        <ul
          v-if="items"
          class="links"
        >
          <OnThisPageItem
            v-for="(link, index) in items"
            :key="index"
            :link="link"
            :active-anchor="activeAnchor"
          />
        </ul>
        <ul
          v-else-if="$page.fullHeaders"
          class="links"
        >
          <OnThisPageItem
            v-for="(link, index) in $page.fullHeaders[0].children"
            :key="index"
            :link="link"
            :active-anchor="activeAnchor"
          />
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { LAYOUT_CONSTANTS } from "../layouts/Layout.vue";
import AnchorHistory from "../mixins/AnchorHistory.vue";
import _ from "lodash";
export default {
  name: "OnThisPage",
  components: {
    OnThisPageItem: () => import("../components/OnThisPageItem.vue"),
    StackSelector: () => import("../global-components/StackSelector.vue")
  },
  mixins: [AnchorHistory],
  inject: ["appContext"],
  props: ["items"],
  data() {
    return {
      anchors: [],
      activeAnchor: null,
      isCalledOnceFromUpdated: false,
    };
  },
  computed: {
    showOnthisPage: function() {
      return (
        this.items ||
        (this.$page.fullHeaders &&
          this.$page.fullHeaders[0].children &&
          this.$page.fullHeaders[0].children.length > 0)
      );
    },
    showNavigation: function() {
      return this.showOnthisPage || this.$page.hasStackContent;
    }
  },
  watch: {
    $page(to, from) {
      if (from.title !== to.title) {
        this.$nextTick(function() {
          this.setAnchors(this.getOnThisPageAnchors());

        });
      }
    }
  },
  mounted() {
    this.setAnchors(this.getOnThisPageAnchors());
    this.setActiveAnchor();
    window.addEventListener("scroll", this.setActiveAnchor);
    window.addEventListener("resize", this.updateAnchors);
  },
  updated() {
    if (!this.isCalledOnceFromUpdated) {
      // Sometimes anchors are not set during the mounting phase. Hence, we need to set the anchors again 
      // in the updated hook and we only need to do it once, hence, the isCalledOnceFromUpdated condition.
      // Adding a setTimeout as due to some reason this was not working in the preview build but was working
      // locally. Adding a setTimeout fixes the issue in the preview build.
      setTimeout(() => {
        this.isCalledOnceFromUpdated = true;
        this.setAnchors(this.getOnThisPageAnchors());
        this.setActiveAnchor();
      }, 500);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setActiveAnchor);
    window.removeEventListener("resize", this.updateAnchors);
  },
  methods: {
    setAlwaysOnViewPosition: _.debounce(function() {
      let maxHeight =
        document.querySelector(".on-this-page").clientHeight - window.scrollY;
      if (maxHeight > window.innerHeight) {
        maxHeight =
          window.innerHeight -
          document.querySelector(".fixed-header").clientHeight -
          60;
      }
      document.querySelector(".on-this-page-navigation").style.height =
        maxHeight + "px";
    }, 200),

    setActiveAnchor: _.debounce(function() {
      const onThisPageActiveAnchor = this.getActiveAnchor();
      this.activeAnchor = onThisPageActiveAnchor
        ? onThisPageActiveAnchor.hash
        : "";
    }, 200),

    updateAnchors: _.debounce(function () {
      this.getAnchorsOffset();
      this.setActiveAnchor();
    }, 200),

    getOnThisPageAnchors() {
      const onThisPageLinks = [].slice.call(
        document.querySelectorAll(".on-this-page-link")
      );
      const anchors = Array.from(document.querySelectorAll(".header-anchor"));
      return anchors.filter(anchor =>
        onThisPageLinks.some(sidebarLink => sidebarLink.hash === anchor.hash)
      );
    }
  }
};
</script>
