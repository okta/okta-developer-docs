var EC = protractor.ExpectedConditions;
var util = module.exports = {};

process.on('unhandledRejection', (reason, promise) => {
  console.log('Error during Promise resolution: ', reason.message);
});

util.wait = function (elementFinder, timeoutMilliseconds) {
  if (process.env.DEBUG == "true") {
    util.logWaitInfo(elementFinder);
  }
  if (timeoutMilliseconds === undefined) {
    //use default timeout
    return browser.wait(EC.presenceOf(elementFinder)).catch(util.handleFailedWait);
  } else {
    return browser.wait(EC.presenceOf(elementFinder), timeoutMilliseconds).catch(util.handleFailedWait);
  }
};

util.isOnScreen = function (elementFinder) {
  return () => {
    const location = elementFinder.getLocation();
    const size = elementFinder.getSize();
    return Promise.all([location, size]).then((args) => {
      const pos = args[0];
      const dim = args[1];
      return dim.width + pos.x > 0 && dim.height + pos.y > 0;
    });
  };
};

util.handleFailedWait = function(error) {
  if (process.env.DEBUG == "true") {
    console.log(error.message);
  }
};

util.logWaitInfo = async function(elementFinder) {
  console.log("Waiting for element: " + elementFinder.locator());
  await browser.getCurrentUrl().then(url => {
    console.log("Looking on page: " + url);
  });
}

util.itNoHeadless = function(desc, fn) {
  if (process.env.CHROME_HEADLESS) {
    it.skip(desc, fn);
  } else {
    it(desc, fn);
  }
};

util.EC = EC;

util.itHelper = function(fn) {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  }
};

util.fixUrl = function(baseUrl) {
  var fixedUrl;
  if (process.env.SITE_TYPE == 'jekyll') {
    fixedUrl = baseUrl;
  } else {
    fixedUrl = baseUrl + '/';
  }
  return fixedUrl;
};

/**
 * checks to see if the given element (or any of its ancestors) is visible within the browser viewport
 */
util.isInViewport = async function (elem) {
  return await elem.getDriver().executeScript(
    "var element = arguments[0];"
    + "var found = false;"
    + "var rect = element.getBoundingClientRect();"
    + "var centerY = rect.top + rect.height / 2;"
    + "var centerX = rect.left + rect.width / 2;"
    + "var foundElement = document.elementFromPoint(centerX, centerY);"
    + "do {"
    + "  if (foundElement === element) {"
    + "    found = true;"
    + "    break;"
    + "  }"
    + "  try { "
    + "    foundElement = foundElement.parentElement;"
    + "  } catch (e) {"
    + "    console.log('Unable to locate element in viewport ', e.message);"
    + "    return false;"
    + "  } "
    + "} while (foundElement);"
    + "return found;"
    , elem).then(isInViewport => {
    return isInViewport;
  });
};
