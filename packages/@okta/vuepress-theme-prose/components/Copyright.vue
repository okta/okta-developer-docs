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
            v-for="(section, sectionIdx) in $page.frontmatter.sections"
            :key="sectionIdx"
            class="copyright--section-paragraph"
            v-html="section"
          />
        </div>
      </div>
    </section>
  </div>
</template>
