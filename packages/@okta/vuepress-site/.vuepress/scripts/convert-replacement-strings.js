// const thingsToReplace = { 
//   /* KEYS HERE GET WRAPPED IN '-=OKTA_REPLACE_WITH_XXX=-'
//    *
//    * Changes WILL require restarting `yarn dev` :(
//    */

// /* VALUES BELOW THIS LINE INTENDED FOR EASY EDITING */
//   WIDGET_VERSION: 3, // Leave as major version
//   TEST_JUNK: 'this is a test replacement', // Leave for testing
// /* VALUES ABOVE THIS LINE INTENDED FOR EASY EDITING */
// };

// // Magic to convert widget major version into specific latest version for that major version
// const findLatestWidgetVersion = require('./findLatestWidgetVersion');
// thingsToReplace.WIDGET_VERSION = findLatestWidgetVersion(thingsToReplace.WIDGET_VERSION || 'no widget major version given');

const convertReplacementStrings = (thingsToReplace) => Object.entries(thingsToReplace)
  .map( ([searchFor, replaceWith]) => { 
    return {
      search: `-=OKTA_REPLACE_WITH_${searchFor}=-`,
      replace: replaceWith,
      flags: 'g',
    };
  });

module.exports = convertReplacementStrings;
