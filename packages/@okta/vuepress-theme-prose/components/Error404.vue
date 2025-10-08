<template>
  <div class="page-content">
    <section class="errors">
      <div class="error404--container">
        <div class="errors--leader">
          <img
            width="120"
            height="120" 
            src="/img/icons/404.png"
            alt="error 404 icon"
          >
          <h1 class="errors--title">
            Oops! Page not found!
          </h1>
        </div>
      </div>
      <div class="error404--container">
        <div class="errors--text">
          <div class="errors--section-paragraph">
            The page you requested is unavailable. It may have been moved, removed, or is no longer valid. A few possible causes could be:
          </div>

          <div class="errors--section-paragraph possible-causes">
            <ul>
              <li>
                <span class="errors--section-paragraph-heading">Truncated URL:</span> Some email clients may break links across lines. Copy and paste the full URL into your browser.
              </li>
              <li><span class="errors--section-paragraph-heading">Case sensitivity:</span> URLs are case sensitive. For example, <code>File.html</code> and <code>file.html</code> are treated as different files.</li>
            </ul>
          </div>

          <div class="errors--section-paragraph">
            Archived content on unsupported technologies is available in the
            <RouterLink
              :to="'/archive/'"
            >
              <span>archive</span>
            </RouterLink>.
          </div>
          <div class="errors--section-paragraph">
            For further assistance, please <a href="mailto:info@okta.com">contact us</a>.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
