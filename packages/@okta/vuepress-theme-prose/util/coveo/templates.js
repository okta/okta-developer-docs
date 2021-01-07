import config from "./config.js";

const registerTemplates = () => {
  Coveo.TemplateHelpers.registerTemplateHelper("sourceTag", function(source) {
    let markup = "";
    const commonSource = this.result.raw.commonoktasource[0];
    const customCaption = config.facetValueCaptions[commonSource];

    // Assign the custom caption if there is one.
    // If not, the caption is uses the default value.
    if (typeof customCaption === "string") {
      markup = `<span class="highlight">${customCaption}</span>`;
    }

    return markup;
  });

  Coveo.TemplateHelpers.registerTemplateHelper("recommendedTag", function() {
    let markup = "";
    const rankingModifier = this.result.rankingModifier;

    if (rankingModifier === "FeaturedResult") {
      markup = `<span class="highlight is-recommended">Recommended</span>`;
    }
    return markup;
  });

  // Add custom date formatter to avoid Coveo framework regex error when using
  // "predefinedFormat" options to format the date.
  Coveo.TemplateHelpers.registerTemplateHelper("dateFormatter", function(date) {
    // If we cannot build up a return value, return an empty string to print
    // nothing to the screen.
    let lastUpdated = "";
    const standardDate = Coveo.DateUtils.convertToStandardDate(date);

    // If there is a valid date to work with, build up the
    if (Coveo.DateUtils.isValid(standardDate)) {
      const month = Coveo.DateUtils.monthToString(standardDate.getMonth());
      const day = standardDate.getDate();
      const year = standardDate.getFullYear();
      lastUpdated = `Last Updated on ${month} ${day}, ${year}`;
    }

    return lastUpdated;
  });
};

export default registerTemplates;
