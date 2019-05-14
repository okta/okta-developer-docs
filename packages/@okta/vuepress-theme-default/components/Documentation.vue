<template>
  <div class="page-content">
    <section class="Docs">
      <div class="Wrap">
        <div class="Docs-container">
          <div class="Docs-content">
            <h1 class="docs-title Hero-title">{{$page.frontmatter.title}}</h1>
            <div class="docs-languages">
              <h2>{{$page.frontmatter.languages[0].title}}</h2>
              <p>{{$page.frontmatter.languages[0].description}}</p>
              <div class="docs-page-tiles">
                <a
                  v-for="(lang, i) in $page.frontmatter.languages[0].links"
                  :key="i"
                  :href="lang.link"
                >
                  <i class="icon docsPage" :class="lang.icon"></i>
                  <br />
                  {{lang.name}}
                </a>
              </div>
            </div>
            <br/>
            <div class="Row">
              <GetStartedLinkGroup v-for="(section, i) in $page.frontmatter.sections" :key="i" :section=section></GetStartedLinkGroup>
            </div>
            <div class="docs-changelog">
              <a href="/docs/release-notes/">
                <i class="icon time-alt-16"></i>{{$page.frontmatter.changelog_title}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="docs-elsewhere">
      <div class="Wrap">
        <div class="Row">
          <div v-for="(band_link, i) in $page.frontmatter.band_links" :key="i" class="docs-elsewhere-block Column--6 Column--small-12">
            <img :src="band_link.icon">
            <h4>{{band_link.title}}</h4>
            <p>{{band_link.description}}</p>
            <a :href="band_link.link">{{band_link.link_text}}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    components: {
      GetStartedLinkGroup: () => import('./GetStartedLinkGroup.vue')
    }
  }
</script>
