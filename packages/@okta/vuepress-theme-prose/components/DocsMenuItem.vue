<template>
  <li :class="{
      // 'open': link.subLinks && sublinksExpanded,
      'expandable': link.subLinks,
    }"
  >
    <router-link
          v-if="link.path"
          :to="link.path"
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
          <a
            :href="href"
            @click="navigate"
            :class="route.path === $route.path ? 'router-link-active link' : 'link'"
            :aria-current="route.path === $route.path && 'page'"
            >
            <slot>
              <span class="text-holder">
                {{ link.title }}
              </span>
            </slot>
          </a>
    </router-link>

    <span v-if="!link.path && link.subLinks" class="link" @click="toggleSubMenu">{{link.title}}</span>

    <ul v-if="link.subLinks" class="sections"> 
      <DocsMenuItem
        v-for="(sublink, index) in link.subLinks"
        :key="index"
        :link="sublink"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "DocsMenuItem",
  props: ["link"],
  methods: {
    toggleSubMenu: function() {
      this.$el.classList.toggle('parent-active');
// TODO: call selected submenu with this element and his children
console.log(this, 'this');
    },
  },
};
</script>