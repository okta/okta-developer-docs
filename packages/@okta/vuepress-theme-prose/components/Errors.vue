<template>
  <div class="page-content">
    <section class="errors">
      <div class="errors--container">
        <div class="errors--leader">
          <h1 class="errors--title">
            {{ $page.frontmatter.title }}
          </h1>
        </div>
      </div>
      <div class="errors--container">
        <div class="errors--text">
          <p
            v-for="(section, sectionIdx) in $page.frontmatter.sections"
            :key="sectionIdx"
            class="errors--section-paragraph"
            v-html="section"
          />
        </div>
      </div>
    </section>
  </div>
</template>
