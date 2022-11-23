<template>
  <div class="page-content">
    <section class="copyright">
      <div class="copyright--container">
        <div class="copyright--leader">
          <h1 class="copyright--title">
            {{$page.frontmatter.title}}
          </h1>
        </div>
      </div>
      <div class="copyright--container">
        <div class="copyright--text">
          <p class="copyright--section-paragraph"
            v-for="(section, sectionIdx) in $page.frontmatter.sections"
            v-bind:key="sectionIdx"
            v-html="section">
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
