<template>
  <div class="page-content">
    <section class="terms">
      <div class="terms--container">
        <div class="terms--leader">
          <h1 class="terms--title">
            {{$page.frontmatter.heading}}
          </h1>
        </div>
      </div>
      <div class="terms--container">
        <div class="terms--text">
          <section v-for="(section, sectionIdx) in $page.frontmatter.terms" v-bind:key="sectionIdx">
            <component
              :is="section.tag || 'h2'"
              class="terms--section-title" v-if="section.heading">
              {{section.heading}}
            </component>
            <template v-for="(paragraph, paragraphIdx) in section.paragraphs">
              <ul v-if="Array.isArray(paragraph)">
                <li v-for="(bullet, bulletIdx) in paragraph"
                    v-bind:key="bulletIdx"
                    v-html="bullet">
                </li>
              </ul>
              <p class="terms--section-paragraph"
                v-bind:key="paragraphIdx"
                v-html="paragraph"
                v-else>
              </p>
            </template>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
