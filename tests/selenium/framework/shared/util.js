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

// borrowed from: https://stackoverflow.com/questions/45243992/verification-of-element-in-viewport-in-selenium
util.isInViewport = async function (elem) {
  return await elem.getDriver().executeScript(
    "var elem = arguments[0],                 " +
    "  box = elem.getBoundingClientRect(),    " +
    "  cx = box.left + box.width / 2,         " +
    "  cy = box.top + box.height / 2,         " +
    "  e = document.elementFromPoint(cx, cy); " +
    "for (; e; e = e.parentElement) {         " +
    "  if (e === elem)                        " +
    "    return true;                         " +
    "}                                        " +
    "return false;                            "
    , elem).then(isInViewport => {
    return isInViewport;
  });
};
