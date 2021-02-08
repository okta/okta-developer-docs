import queryString from "query-string";
import moment from "moment-timezone";
import { deleteCookie, getCookie, setCookie } from "./cookies";

const acceptedParams = [
  "utm_campaign",
  "utm_content",
  "utm_medium",
  "utm_source",
  "utm_term"
];

const allParams = [
  "utm_campaign",
  "utm_content",
  "utm_date",
  "utm_medium",
  "utm_page",
  "utm_source",
  "utm_term"
];

const gaTrackingFieldsMap = {
  trackingId: "GATRACKID",
  clientId: "GACLIENTID",
  userId: "GAUSERID",
};

let isAttached = false;

function filterParams(params) {
  if (typeof params === "string") {
    params = queryString.parse(params);

    params = Object.keys(params)
      .filter(key => acceptedParams.indexOf(key) !== -1)
      .reduce((object, key) => {
        object[key] = params[key];
        return object;
      }, {});
  }

  params = Object.keys(params)
    .filter(key => allParams.indexOf(key) !== -1)
    .reduce((object, key) => {
      object[key] = params[key];
      return object;
    }, {});

  params = Object.assign(
    {
      utm_page: location.pathname,
      utm_date: moment(moment.utc())
        .tz("America/Los_Angeles")
        .format("MM/DD/YYYY")
    },
    params
  );

  return params;
}

/**
 * onAttach function.
 *
 * @access public
 * @return void
 */
function onAttach() {
  if (isAttached === false) {
    isAttached = true;
    setAttribution();
  }
}

/**
 * setAttribution function.
 *
 * @access public
 * @return void
 */
function setAttribution() {
  const params = filterParams(location.search);

  if (Object.keys(params).length) {
    deleteCookie("attribution");
    setCookie("attribution", params);

    if (!getCookie("session_attribution")) {
      setCookie("session_attribution", params);
    }

    if (!getCookie("original_attribution")) {
      setCookie("original_attribution", params, { expires: 365 });
    }
  } else {
    deleteCookie("attribution");
    setCookie("attribution", {});

    if (!getCookie("session_attribution")) {
      setCookie("session_attribution", {});
    }

    if (!getCookie("original_attribution")) {
      setCookie("original_attribution", {}, { expires: 365 });
    }
  }
}

/**
 * getAttribution function.
 *
 * @access public
 * @return void
 */

function getAttribution() {
  return {
    page: filterParams(getCookie("attribution", {})),
    original: filterParams(getCookie("original_attribution", {})),
    session: filterParams(getCookie("session_attribution", {}))
  };
}

function setFieldAttribution(analytics, key, value = {}) {
  if ("page" in value) {
    analytics[`${key}__c`] = value.page;
  }

  if ("original" in value) {
    analytics[`original_${key}__c`] = value.original;
  }

  if ("session" in value) {
    analytics[`session_${key}__c`] = value.session;
  }
}

/**
 * getAnalyticsValues function.
 *
 * @access public
 * @return void
 */

function getAnalyticsValues() {
  onAttach();

  const attribution = getAttribution();
  let paramValues = {};
  let analytics = {};

  if (attribution) {
    acceptedParams.forEach((param) => {
      paramValues = {
        page: "",
        original: "",
        session: "",
      };

      if (param in attribution.page) {
        paramValues.page = attribution.page[param];
      }

      if (param in attribution.original) {
        paramValues.original = attribution.original[param];
      }

      if (param in attribution.session) {
        paramValues.session = attribution.session[param];
      }

      setFieldAttribution(analytics, param, paramValues);
    })

    paramValues = {
      original: "",
    };

    if ("utm_date" in attribution.original) {
      paramValues.original = attribution.original["utm_date"];
    }

    setFieldAttribution(analytics, "utm_date", paramValues);

    paramValues = {
      page: "",
      original: "",
      session: "",
    };

    if ("utm_page" in attribution.page) {
      paramValues.page = attribution.page["utm_page"];
    }

    if ("utm_page" in attribution.original) {
      paramValues.original = attribution.original["utm_page"];
    }

    if ("utm_page" in attribution.session) {
      paramValues.session = attribution.session["utm_page"];
    }

    setFieldAttribution(analytics, "utm_page", paramValues);
  }

  // Add google analytics tracking data if GA is loaded
  if (window.ga && typeof window.ga.getAll === "function") {
    const tracker = window.ga.getAll()[0];

    if (tracker && typeof tracker.get === "function") {
      Object.entries(gaTrackingFieldsMap).forEach(([key, field]) => {
        const values = {
          page: tracker.get(key) || "",
        };

        setFieldAttribution(analytics, field, values);
      });
    }
  }

  return analytics;
}

export default getAnalyticsValues;
