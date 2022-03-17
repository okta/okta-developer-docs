import axios from "axios";
import jwt_decode from "jwt-decode";
import moment from "moment";

import storage from '../localStorage'

const TOKEN_ENDPOINT =
  "https://wt1ugse0be.execute-api.us-west-2.amazonaws.com/prod/token?site=developer";
const COVEO_PIPELINE = "oktaproduction9ounvcxa";
const COVEO_ENDPOINT = "https://platform.cloud.coveo.com/rest/search";

const _getToken = () => {
  let token = storage.getItem("coveo_token");
  if (!token) return;

  // Strip " if present (breaks coveo)
  token = token.replace('"', "");

  // Invalidate token if about to expire
  const decoded = jwt_decode(token);
  const now = moment();
  const expWithBuffer = moment.unix(decoded.exp).subtract(5, "minutes");
  if (now.isAfter(expWithBuffer)) {
    storage.removeItem("coveo_token");
    return;
  } else {
    return token;
  }
};

const _renewToken = () => {
  return axios.get(TOKEN_ENDPOINT).then(({ data: { token } }) => {
    storage.setItem("coveo_token", token);
    return token;
  });
};

const configureCoveoEndpoint = async () => {
  const token = _getToken() || (await _renewToken());

  Coveo.SearchEndpoint.configureCloudV2Endpoint(
    COVEO_PIPELINE,
    token,
    COVEO_ENDPOINT,
    { renewAccessToken: _renewToken }
  );
};

export default configureCoveoEndpoint;
