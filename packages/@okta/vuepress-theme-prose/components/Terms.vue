<template>
  <div class="page-content">
    <section class="terms">
      <div class="terms--container">
        <div class="terms--leader">
          <h1 class="terms--title">
            {{ $page.frontmatter.heading }}
          </h1>
        </div>
      </div>
      <div class="terms--container">
        <div class="terms--text">
          <section
            v-for="(section, sectionIdx) in $page.frontmatter.terms"
            :key="sectionIdx"
          >
            <component
              :is="section.tag || 'h2'"
              v-if="section.heading"
              class="terms--section-title"
            >
              {{ section.heading }}
            </component>
            <template v-for="(paragraph, paragraphIdx) in section.paragraphs">
              <ul
                v-if="Array.isArray(paragraph)"
                :key="paragraphIdx"
              >
                <li
                  v-for="(bullet, bulletIdx) in paragraph"
                  :key="bulletIdx"
                  v-html="bullet"
                />
              </ul>
              <p
                v-else
                :key="paragraphIdx"
                class="terms--section-paragraph"
                v-html="paragraph"
              />
            </template>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
