<template>
  <div class="header-nav">
    <HeaderNavItem
        v-for="link in appContext.treeNavDocs"
        :key="link.title"
        :link="link"
      />
  </div>
</template>

<script>

export default {
  name: "HeaderNav",
  inject: ["appContext"],
  components: {
    HeaderNavItem: () => import("../components/HeaderNavItem.vue")
  },
  data() {
    return {
      usingFile: false,
    };
  },
}
</script>
