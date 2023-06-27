<template>
  <div id="feedback-tab">
    <a id="feedback-link"
       href="#"
       onclick="feedback.openSurvey();  return false"
       target="_blank"
       title="Submit feedback">
      <div id="feedback-container">
        <p id="feedback-text">Feedback</p>
      </div>
    </a>
  </div>
</template>

<script>
  feedback = (function(window) {

    function openSurvey() {
      window.open('https://surveys.okta.com/jfe/form/SV_e4L0iW8a3tz8Yol?source=' + encodeURIComponent(document.location.href), '_blank');
    }

    return {
      openSurvey: openSurvey
    };
  })(window);

</script>
