const convertReplacementStrings = (thingsToReplace) => Object.entries(thingsToReplace)
  .map( ([searchFor, replaceWith]) => { 
    return {
      search: `-=OKTA_REPLACE_WITH_${searchFor}=-`,
      replace: replaceWith,
      flags: 'g',
    };
  });

module.exports = convertReplacementStrings;
