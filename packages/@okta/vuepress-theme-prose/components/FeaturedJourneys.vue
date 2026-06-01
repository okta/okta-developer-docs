<template>
  <section class="featured-journeys">
    <div class="wrapper">
      <h2 class="featured-journeys__title dont-break-out">
        Featured journeys
      </h2>
      <hr class="featured-journeys__divider">
      <div class="featured-journeys__cards">
        <div
          v-for="(journey, index) in journeys"
          :key="index"
          class="featured-journeys__card"
        >
          <img
            class="featured-journeys__card-icon featured-journeys__card-icon--light"
            :src="journey.icon"
          >
          <img
            class="featured-journeys__card-icon featured-journeys__card-icon--dark"
            :src="journey.iconDark"
          >
          <h3 class="featured-journeys__card-title dont-break-out">
            {{ journey.title }}
          </h3>
          <p class="featured-journeys__card-description dont-break-out">
            {{ journey.description }}
          </p>
          <a
            class="featured-journeys__card-link dont-break-out"
            :href="journey.link"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturedJourneys",
  data() {
    return {
      journeys: [
        {
          title: "Sign users in through your web app",
          description: "Add sign-in and sign-out using the Okta SDK. Keep authentication native to your experience rather than redirecting users to an external page.",
          link: "/docs/journeys/OCI-web-sign-in/main/",
          icon: "/img/web-app-icon.svg",
          iconDark: "/img/dark-web-app-icon.svg",
        },
        {
          title: "Apply your brand to the Okta user experience",
          description: "Customize colors, fonts, and CSS across Okta sign-in flows to match your brand. Deliver a consistent experience without building auth UI from scratch.",
          link: "/docs/journeys/OCI-branding/main/",
          icon: "/img/your-brand-icon.svg",
          iconDark: "/img/dark-your-brand-icon.svg",
        },
        {
          title: "Add a sign-up form to your web app",
          description: "Add a registration form to your web app and automatically add new users to your Okta directory when they register.",
          link: "/docs/journeys/OCI-web-sign-up/main/",
          icon: "/img/web-app-sign-up-icon.svg",
          iconDark: "/img/dark-web-app-sign-up-icon.svg",
        },
      ],
    };
  },
};
</script>
