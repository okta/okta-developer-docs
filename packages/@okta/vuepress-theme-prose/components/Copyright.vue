<template>
  <div class="page-content">
    <section class="copyright">
      <div class="copyright--container">
        <div class="copyright--leader">
          <h1 class="copyright--title">
            {{ $page.frontmatter.title }}
          </h1>
        </div>
      </div>
      <div class="copyright--container">
        <div class="copyright--text">
          <p
            v-for="(section, sectionIdx) in processedSections"
            :key="sectionIdx"
            class="copyright--section-paragraph"
            v-html="section"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear();
    },
    processedSections () {
      return this.$page.frontmatter.sections.map(section => 
        section.replace(/\{\{\s*year\s*\}\}/g, this.year)
      );
    }
  }
}
</script>
