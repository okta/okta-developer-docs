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
      activeAnchor: null,
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
  mounted() {
    this.setActiveAnchor();
    window.addEventListener("scroll", this.setActiveAnchor);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.setActiveAnchor);
  },
  methods: {
    setActiveAnchor: _.debounce(function() {
      const onThisPageActiveAnchor = this.getActiveAnchor();
      this.activeAnchor = onThisPageActiveAnchor
        ? onThisPageActiveAnchor.hash
        : "";
    }, 200),
  }
};
</script>
