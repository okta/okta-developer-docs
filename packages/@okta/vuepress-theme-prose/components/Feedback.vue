<template>
  <div id="feedback-tab">
    <a id="feedback-link" href="#" title="Submit feedback"
      @click="openSurvey()">
      <div id="feedback-container">
        <p id="feedback-text">Feedback</p>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Feedback',
    methods: {
      openSurvey() {
        window.open('https://surveys.okta.com/jfe/form/SV_e4L0iW8a3tz8Yol?source=' + encodeURIComponent(document.location.href), '_blank');
      }
    }
  }
</script>
