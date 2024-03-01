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
    getBlogPosts() {
      const blogsObj = this.$page.newsFeedDataJson;
      const length = blogsObj?.rss?.channel[0]?.item?.length;
      if (!length || length < 5) {
        return;
      }

      this.blogPosts = [];

      for (let i = 0; i < 5; i++) {
        this.blogPosts[i] = {
          type: BLOG_TYPES.BLOG,
          link: blogsObj.rss.channel[0].item[i].link[0],
          title: blogsObj.rss.channel[0].item[i].title[0]
        };
      }
    }
  }
}
</script>
