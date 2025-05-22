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
 * getAnalyticsValues function.
 *
 * @access public
 * @return void
 */

function getAnalyticsValues() {
    return {
        current: filterParams(getCookie("attribution", {})),
        original: filterParams(getCookie("original_attribution", {})),
        session: filterParams(getCookie("session_attribution", {}))
    };
}

export default getAnalyticsValues;
