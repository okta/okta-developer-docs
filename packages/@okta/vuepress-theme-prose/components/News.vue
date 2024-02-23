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
            {{ blogPosts[0].title }}
          </h3>
          <a
            class="news__article-link dont-break-out"
            :href="blogPosts[0].link"
          >
            Read the blog post
          </a>
        </div>
      </article>
      <article
        v-for="(blog, index) in blogPosts.slice(1)"
        :key="index"
        class="news__article"
      >
        <p class="news__text dont-break-out">
          {{ blog.type }}
        </p>
        <h3 class="news__article-title dont-break-out">
          {{ blog.title }}
        </h3>
        <a
          class="news__article-link dont-break-out"
          :href="blog.link"
        >
          {{ blog.type === BLOG_TYPES.BLOG ? 'Read the blog post' : 'Watch the video' }}
        </a>
      </article>
    </div>
  </section>
</template>

<script>
const axios = require('axios');
const BLOG_TYPES = {
  BLOG: 'Blog',
  VIDEO: 'Video'
};

const initialBlogPosts = [
  {
    type: BLOG_TYPES.BLOG,
    link: 'https://developer.okta.com/blog/2023/04/04/spa-auth-tokens',
    title: 'How Authentication and Authorization Work for SPAs'
  },
  {
    type: BLOG_TYPES.VIDEO,
    link: 'https://www.youtube.com/watch?v=PiY5HDp0ABI',
    title: 'Podcast: Phishing-Resistant Authenticators with Megha Rastogi'
  },
  {
    type: BLOG_TYPES.BLOG,
    link: 'https://developer.okta.com/blog/2023/03/08/step-up-auth',
    title: 'Step-up Authentication in Modern Applications'
  },
  {
    type: BLOG_TYPES.BLOG,
    link: 'https://developer.okta.com/blog/2023/01/12/signin-custom-domain',
    title: 'A Secure and Themed Sign-in Page'
  },
  {
    type: BLOG_TYPES.BLOG,
    link: 'https://developer.okta.com/blog/2023/03/07/angular-forroot',
    title: 'Streamline Your Okta Configuration in Angular Apps'
  }
]

export default {
  name: 'News',
  data() {
    return {
      blogPosts: initialBlogPosts
    }
  },
  created() {
    this.BLOG_TYPES = BLOG_TYPES;
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
          obj['#text'] = node.nodeValue.trim();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          let nodeName = node.nodeName;
          let item = {};
          for (let i = 0; i < node.childNodes.length; i++) {
            parseNode(node.childNodes[i], item);
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
      this.blogPosts = initialBlogPosts;

      let result;
      try {
        result = await axios.get('https://developer.okta.com/feed.xml');     
      } catch {
        return;
      }
      if (!result || !result.data) {
        return;
      }

      const jsObject = this.xmlToJs(result.data);
      const length = jsObject?.rss?.channel?.item?.length;
      if (!length || length < 5) {
        return;
      }

      this.blogPosts = [];
      
      for (let i = 0; i < 5; i++) {
        this.blogPosts.push({
          type: BLOG_TYPES.BLOG,
          link: jsObject.rss.channel.item[i].link['#text'],
          title: jsObject.rss.channel.item[i].title['#text']
        });
      }
    }
  }
}
</script>
