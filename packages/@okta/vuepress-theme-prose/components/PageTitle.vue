<template>
  <div 
    class="page-title" 
    v-if="showPageTitle"
  >
    <h1 class="page-title--title">
      <i 
        :class="$page.frontmatter.icon" 
        class="icon-48" 
        v-if="$page.frontmatter.icon"
      >
      </i>
      {{ $page.title }}
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
        if (this.$page.frontmatter.generated) {
          return true;
        }
        return this.$page.frontmatter.icon ? true : false;
      }
    }
  }
</script>
