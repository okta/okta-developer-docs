<template>
  <li :class="{ subnav: link.subLinks, hidden: hidden }">
    <div class="link-wrap">

      <div v-if="entityType === types.link">
        <router-link
          :to="link.path"
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
          <a
            :href="href"
            @click="navigate"
            :class="route.path === $route.path ? 'router-link-active' : ''"
            :aria-current="route.path === $route.path && 'page'"
            ><slot>{{ link.title }}</slot></a
          >
        </router-link>
      </div>

      <div v-if="entityType === types.blankDivider">
        <div class="blank-divider">
          {{link.title}}
        </div>
      </div>

      <div v-if="entityType === types.parent">
        <div
          :class="{
            'is-link': true,
            'item-collapsable': true,
            'children-active': link.iHaveChildrenActive
          }"
          @click="toggleExpanded"
        >
          <svg viewBox="0 0 320 512" v-if="link.subLinks && !sublinksExpanded">
            <path
              d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
            />
          </svg>

          <svg viewBox="0 0 320 512" v-if="link.subLinks && sublinksExpanded">
            <path
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
            />
          </svg>
          {{ link.title }}
        </div>
      </div>
    </div>

    <ul v-if="entityType === types.parent" class="sections" v-show="sublinksExpanded">
      <SidebarItem
        v-for="sublink in link.subLinks"
        :key="sublink.title"
        :link="sublink"
      />
    </ul>
  </li>

</template>

<script>
export default {
  name: "SidebarItem",
  props: ["link"],
  inject: ["appContext", "stackSelectorData"],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  data() {
    return {
      sublinksExpanded: false,
      hidden: !!this.link.hidden,
      types: {
        link: 'link',
        blankDivider: 'blankDivider',
        parent: 'parent'
      }
    };
  },

  computed:{
    entityType: function(){
      if(this.link.hasOwnProperty('path') && this.link.path !== null ){
        return this.types.link
      }
      if(!this.link.hasOwnProperty('path') && this.link.hasOwnProperty('subLinks')){
        return this.types.parent
      }
      if(this.link.hasOwnProperty('path') && this.link.path === null){
        return this.types.blankDivider
      }
    },
  },
  mounted() {
    this.setData();
  },
  watch: {
    link() {
      this.setData();
    },

    // Will triggers when StackSelector component will change it value.
    "stackSelectorData.to"() {
      // After StackSelector value has changed, rout link will be modified.
      // This condition will be true only for sidebaritem that contains last pre-modified rout link.
      if (this.stackSelectorData.from === this.link.path) {
        // A path link for that items will be changed on modified one.
        // This logic needed to keep current sidebaritems active.
        this.link.path = this.stackSelectorData.to;
      }
    },

    sublinksExpanded(isActivated, _) {
      if (isActivated) {
        // element.scrollIntoViewIfNeeded is not supported by Firefox
        if (this.$el.scrollIntoViewIfNeeded) {
          this.$el.scrollIntoViewIfNeeded();
        } else {
          this.$el.scrollIntoView({ block: "nearest" });
        }
      }
    },
    "appContext.isTreeNavMobileOpen"(isOpen, _) {
      if (isOpen && this.link.iHaveChildrenActive && this.link.path) {
        this.$el.scrollIntoView({ block: "center" });
      }
    }
  },

  methods: {
    toggleExpanded() {
      this.sublinksExpanded = !this.sublinksExpanded;
      this.link.iHaveChildrenActive = !this.link.iHaveChildrenActive;
    },
    setData: function() {
      this.sublinksExpanded = Boolean(this.link.iHaveChildrenActive);
    }

  }
};
</script>
