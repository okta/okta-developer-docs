<template>
  <div class="page-content">
    <section class="errors">
      <div class="errors--container">
        <div class="errors--leader">
          <h1 class="errors--title">
            {{$page.frontmatter.title}}
          </h1>
        </div>
      </div>
      <div class="errors--container">
        <div class="errors--text">
          <p class="errors--section-paragraph"
            v-for="(section, sectionIdx) in $page.frontmatter.sections"
            v-bind:key="sectionIdx"
            v-html="section">
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
