<template>
  <div class="page-content">
    <section class="terms">
      <div class="terms--container">
        <div class="terms--leader">
          <h1 class="terms--title">Terms</h1>
        </div>
      </div>
      <div class="terms--container">
        <div class="terms--text">
          <section v-for="(section, sectionIdx) in $page.frontmatter.terms" v-bind:key="sectionIdx">
            <h2 class="terms--section-title" v-if="section.heading">
              {{section.heading}}
            </h2>
            <p class="terms--section-paragraph"
              v-for="(paragraph, paragraphIdx) in section.paragraphs"
              v-bind:key="paragraphIdx"
              v-html="paragraph">
            </p>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
