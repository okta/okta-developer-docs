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
              class="terms--section-title"
              :is="section.tag || 'h2'"
              v-if="section.heading"
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
                >
                </li>
              </ul>
              <p 
                class="terms--section-paragraph"
                v-else
                :key="paragraphIdx"
                v-html="paragraph"
              >
              </p>
            </template>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
