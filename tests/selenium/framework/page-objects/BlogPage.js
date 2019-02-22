'use strict';

const BasePage = require('./BasePage');

const footerSelector = '.Footer';
const blogPostSelector = '.BlogPost.is-excerpt';
const paginationSelector = '.Blog-pagination';
const nextLinkText = 'Next »';
const previousLinkText = '« Prev';

class BlogPage extends BasePage {
  constructor(url) {
    super(url, BlogPage.getPageLoadElement());
    browser.waitForAngularEnabled(false);
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, BlogPage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(footerSelector));
  }

  getFooterElement() {
    return element(by.css(footerSelector));
  }

  getBlogPostCount() {
    return this.getBlogPosts().count();
  }

  getBlogPosts() {
    return element.all(by.css(blogPostSelector));
  }

  getPagination() {
    return element(by.css(paginationSelector));
  }

  isPaginationVisible() {
    this.waitForPresence(this.getPagination());
    return this.getPagination().isPresent();
  }

  getNextLink() {
    return element(by.linkText(nextLinkText));
  }

  getPreviousLink() {
    return element(by.linkText(previousLinkText));
  }

  clickNext() {
    this.waitForPresence(this.getNextLink());
    return this.smartClick(this.getNextLink());
  }

  clickPrevious() {
    this.waitForPresence(this.getPreviousLink());
    return this.smartClick(this.getPreviousLink());
  }

  clickItem(item) {
    const itemLink = element(by.linkText(item.toString()));
    this.waitForPresence(itemLink);
    return this.smartClick(itemLink);
  }

  async clickReadMoreOnPost(post) {
    const blogPost = this.getBlogPosts().get(post);
    const readMoreLink = await blogPost.element(by.linkText('Read more'));
    this.waitForPresence(readMoreLink);
    return readMoreLink.click();
  }

  getBlogLinkHref(post) {
    const blogPost = this.getBlogPosts().get(post);
    const title = blogPost.element(by.css('h1 a'));
    return title.getAttribute('href');
  }
}

module.exports = BlogPage;
