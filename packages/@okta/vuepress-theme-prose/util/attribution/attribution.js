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

function setFieldAttribution($form, key, value = {}) {
  let $fields, fieldExistsInForm;

  if ("page" in value) {
    $fields = [].concat(
      [].slice.call(document.querySelectorAll(`[name=${key}]`)),
      [].slice.call(document.querySelectorAll(`[name=${key}__c]`))
    );

    fieldExistsInForm =
      $form &&
      (!!$form.querySelectorAll(`[name=${key}]`).length ||
        !!$form.querySelectorAll(`[name=${key}__c]`).length);

    $fields.forEach(($el) => {
      $el.value = value.page;
    })

    if (!fieldExistsInForm) {
      let $el = document.createElement("input");
      $el.type = "hidden";
      $el.name = `${key}__c`;
      $el.value = value.page;
      $form.appendChild($el);
    }
  }

  if ("original" in value) {
    $fields = [].concat(
      [].slice.call(document.querySelectorAll(`[name=original_${key}]`)),
      [].slice.call(document.querySelectorAll(`[name=original_${key}__c]`))
    );

    fieldExistsInForm =
      $form &&
      (!!$form.querySelectorAll(`[name=original_${key}]`).length ||
        !!$form.querySelectorAll(`[name=original_${key}__c]`).length);

    $fields.forEach(($el) => {
      $el.value = value.original;
    })

    if (!fieldExistsInForm) {
      let $el = document.createElement("input");
      $el.type = "hidden";
      $el.name = `original_${key}__c`;
      $el.value = value.original;
      $form.appendChild($el);
    }
  }

  if ("session" in value) {
    $fields = [].concat(
      [].slice.call(document.querySelectorAll(`[name=session_${key}]`)),
      [].slice.call(document.querySelectorAll(`[name=session_${key}__c]`))
    );

    fieldExistsInForm =
      $form &&
      (!!$form.querySelectorAll(`[name=session_${key}]`).length ||
        !!$form.querySelectorAll(`[name=session_${key}__c]`).length);

    $fields.forEach(($el) => {
      $el.value = value.session;
    })

    if (!fieldExistsInForm) {
      let $el = document.createElement("input");
      $el.type = "hidden";
      $el.name = `session_${key}__c`;
      $el.value = value.session;
      $form.appendChild($el);
    }
  }
}

/**
 * setHiddenUtmValues function.
 *
 * @access public
 * @return void
 */

function setHiddenUtmValues(form) {
  onAttach();

  const attribution = getAttribution();

  if (attribution) {
    let paramValues;

    acceptedParams.forEach((param) => {
      paramValues = {
        page: "",
        original: "",
        session: ""
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

      setFieldAttribution(form, param, paramValues);
    })

    paramValues = {
      original: ""
    };

    if ("utm_date" in attribution.original) {
      paramValues.original = attribution.original["utm_date"];
    }

    setFieldAttribution(form, "utm_date", paramValues);

    paramValues = {
      page: "",
      original: "",
      session: ""
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

    setFieldAttribution(form, "utm_page", paramValues);
  }
}

export default setHiddenUtmValues;
