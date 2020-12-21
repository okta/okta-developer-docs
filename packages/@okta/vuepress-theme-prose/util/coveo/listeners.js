// Prevent query suggestions from being displayed until text is entered and
// there are suggestions available.
const _registerOmniboxListener = () => {
  const omniBox = document.querySelector(".CoveoOmnibox");

  if (omniBox) {
    Coveo.$$(omniBox).on("populateOmniboxSuggestions", function(event, args) {
      const input = args.omnibox.magicBox.displayedResult.input;
      const magicBoxElement = args.omnibox.magicBox.element;
      const hasSuggestions =
        args.omnibox.magicBox.suggestionsManager.hasSuggestions;

      if (input.length === 0) {
        magicBoxElement.classList.add("has-suggestions-hidden");
      } else if (input.length > 0 && hasSuggestions) {
        setTimeout(
          () => magicBoxElement.classList.remove("has-suggestions-hidden"),
          500
        );
      }
    });
  }
};

// Enhance display of new results
const _registerNewResultDisplayed = rootElement => {
  Coveo.$$(rootElement).on("newResultDisplayed", function(event, args) {
    const maxLength = 80;
    const result = args.result;
    const resultElement = args.item;
    const primaryResultLink = resultElement.querySelector(
      ".is-primary .CoveoResultLink"
    );
    const secondaryResultLink = resultElement.querySelector(
      ".is-secondary .CoveoResultLink"
    );
    const source = resultElement.CoveoResult.raw.source;
    let clickUri = resultElement.CoveoResult.clickUri;
    let title = result.title;

    if (!title || !primaryResultLink || !secondaryResultLink) {
      return;
    }

    // Add external link icon to links that are not www.okta.com.
    if (source !== "okta-developer") {
      primaryResultLink.classList.add("is-external-link");
    }

    // Trim title if over max character limit set above.
    if (title.length > maxLength) {
      title = `${title.substring(0, maxLength)} ...`;
    }

    // Use the processed title for the anchor text.
    primaryResultLink.innerHTML = title;

    // Use the result clickUri for the anchor text.
    secondaryResultLink.innerHTML = clickUri;

    // Populate the href attribute.
    primaryResultLink.href = clickUri;
    secondaryResultLink.href = clickUri;
  });
};

export default function(rootElement) {
  _registerOmniboxListener(rootElement);
  _registerNewResultDisplayed(rootElement);
}
