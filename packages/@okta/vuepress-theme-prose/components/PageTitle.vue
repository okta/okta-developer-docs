<template>
  <div class="page-title" v-if="showPageTitle">
    <h1 class="page-title--title">
      <i class='icon-48' v-if="$page.frontmatter.icon" :class="$page.frontmatter.icon" ></i>
      {{$page.title}}
    </h1>
  </div>
</template>

<script>
  export default {
    name: 'PageTitle',
    computed: {
      showPageTitle() {
        if (this.$page.path.includes("/docs/guides")) {
          return true;
        }
        return this.$page.frontmatter.icon ? true : false;
      }
    }
  }
</script>
