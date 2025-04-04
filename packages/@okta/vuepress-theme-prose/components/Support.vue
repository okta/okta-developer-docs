<template>
  <section class="support">
    <div class="homepage__support support__wrapper wrapper">
      <div class="support__box">
        <h2 class="support__title dont-break-out">
          Get the support you need, when you need it
        </h2>
        <p class="support__paragraph dont-break-out">
          Search or post a question in the Okta Developer Forum.
        </p>
        <a
          class="support__link dont-break-out"
          href="https://devforum.okta.com"
        >
          Go to Okta Developer Forum <span aria-hidden="true">→</span>
        </a>
      </div>
      <aside class="support__sidebar">
        <h3 class="support__sidebar-title">
          Additional support
        </h3>
        <ul class="support__list">
          <li class="support__list-item">
            <h3 class="support__paragraph support__paragraph_size_small dont-break-out">
              <span>Interested in Okta SDKs?</span>
            </h3>
            <a
              class="support__list-link dont-break-out"
              href="https://github.com/okta"
            >
              <span>Visit the Okta GitHub repos</span>
              <div class="support__list-icon" />
            </a>
          </li>
          <li class="support__list-item">
            <h3 class="support__paragraph support__paragraph_size_small dont-break-out">
              <span>Looking for Okta product documentation?</span>
            </h3>
            <a
              class="support__list-link dont-break-out"
              href="https://support.okta.com/help/s/?language=en_US"
            >
              <span>Try our Okta Help Center</span>
              <div class="support__list-icon" />
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Support"
  }
</script>
