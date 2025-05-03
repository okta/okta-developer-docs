import { DateTime } from "luxon";
import { getCookie } from "./cookies";

function filterParams(params) {
    params = Object.assign(
        {
            utm_source: "",
            utm_medium: "",
            utm_page: location.host + location.pathname,
            utm_date: DateTime.utc()
                .setZone('America/Los_Angeles')
                .toFormat('MM/dd/yyyy')
        },
        params
    );

    return params;
}

/**
 * getAttribution function.
 *
 * @access public
 * @return void
 */

function getAttribution() {
    return {
        current: filterParams(getCookie("attribution", {})),
        original: filterParams(getCookie("original_attribution", {})),
        session: filterParams(getCookie("session_attribution", {}))
    };
}

/**
 * getAnalyticsValues function.
 *
 * @access public
 * @return void
 */

function getAnalyticsValues() {
    const attribution = getAttribution();

    return attribution;
}

export default getAnalyticsValues;
