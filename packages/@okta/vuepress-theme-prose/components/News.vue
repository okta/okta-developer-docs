<template>
  <section class="news">
    <div class="news__main-wrapper wrapper">
      <h2 class="news__title dont-break-out">
        What’s new in Okta Developer
      </h2>
      <article class="news__article news__article_size_large">
        <div class="news__article-image-wrapper">
          <img
            src="/img/build@1x.png"
            width="296"
            height="360"
            srcset="/img/build@2x.png 2x, /img/build@3x.png 3x"
            alt=""
            aria-hidden="true"
          >
        </div>
        <div class="news__wrapper">
          <p class="news__text dont-break-out dont-break-out">
            Blog
          </p>
          <h3 class="news__article-title dont-break-out">
            {{ blogPostTitles[0] || 'How Authentication and Authorization Work for SPAs' }}
          </h3>
          <a
            class="news__article-link dont-break-out"
            :href="blogPostLinks[0] || 'https://developer.okta.com/blog/2023/04/04/spa-auth-tokens'"
          >
            Read the blog post
          </a>
        </div>
      </article>
      <article class="news__article">
        <p class="news__text dont-break-out">
          {{ blogPostTitles[1] ? 'Blog' : 'Video' }}
        </p>
        <h3 class="news__article-title dont-break-out">
          {{ blogPostTitles[1] || 'Podcast: Phishing-Resistant Authenticators with Megha Rastogi' }}
        </h3>
        <a
          class="news__article-link dont-break-out"
          :href="blogPostLinks[1] || 'https://www.youtube.com/watch?v=PiY5HDp0ABI'"
        >
          {{ blogPostLinks[1] ? 'Read the blog post' : 'Watch the video' }}
        </a>
      </article>
      <article class="news__article">
        <p class="news__text dont-break-out">
          Blog
        </p>
        <h3 class="news__article-title dont-break-out">
          {{ blogPostTitles[2] || 'Step-up Authentication in Modern Applications' }}
        </h3>
        <a
          class="news__article-link dont-break-out"
          :href="blogPostLinks[2] || 'https://developer.okta.com/blog/2023/03/08/step-up-auth'"
        >
          Read the blog post
        </a>
      </article>
      <article class="news__article">
        <p class="news__text dont-break-out">
          Blog
        </p>
        <h3 class="news__article-title dont-break-out">
          {{ blogPostTitles[3] || 'A Secure and Themed Sign-in Page' }}
        </h3>
        <a
          class="news__article-link dont-break-out"
          :href="blogPostLinks[3] || 'https://developer.okta.com/blog/2023/01/12/signin-custom-domain'"
        >
          Read the blog post
        </a>
      </article>
      <article class="news__article">
        <p class="news__text dont-break-out">
          Blog
        </p>
        <h3 class="news__article-title dont-break-out">
          {{ blogPostTitles[4] || 'Streamline Your Okta Configuration in Angular Apps' }}
        </h3>
        <a
          class="news__article-link dont-break-out"
          :href="blogPostLinks[4] || 'https://developer.okta.com/blog/2023/03/07/angular-forroot'"
        >
          Read the blog post
        </a>
      </article>
    </div>
  </section>
</template>

<script>
const axios = require('axios');

export default {
  name: 'News',
  data() {
    return {
      blogPostTitles: [],
      blogPostLinks: []
    }
  },
  mounted() {
    this.getBlogPosts();
  },
  methods: {
    xmlToJs(xmlString) {
      let xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
      let result = {};

      function parseNode(node, obj) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.nodeValue.trim() !== '') {
            obj['#text'] = node.nodeValue.trim();
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          let nodeName = node.nodeName;
          let item = {};
          if (node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
              parseNode(node.childNodes[i], item);
            }
          }
          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(item);
          } else {
            obj[nodeName] = item;
          }
        }
      }

      parseNode(xmlDoc.documentElement, result);

      return result;
    },
    async getBlogPosts() {
      try {
        const result = await axios.get('https://developer.okta.com/feed.xml');
        
        if (result && result.data) {
          const jsObject = this.xmlToJs(result.data);
          if (jsObject?.rss?.channel?.item?.length >= 5) {
            for (let i = 0; i < 5; i++) {
              this.blogPostTitles.push(jsObject?.rss?.channel?.item[i]?.title['#text']);
              this.blogPostLinks.push(jsObject?.rss?.channel?.item[i]?.link['#text']);
            }
          } else {
            this.blogPostTitles = [];
            this.blogPostLinks = [];
          }
        }
      } catch {
        this.blogPostTitles = [];
        this.blogPostLinks = [];
      }
    }
  }
}
</script>