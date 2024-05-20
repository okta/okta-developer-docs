import axios from "axios";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

import storage from '../localStorage'

const TOKEN_ENDPOINT =
  "https://wt1ugse0be.execute-api.us-west-2.amazonaws.com/prod/token?site=developer";
const COVEO_PIPELINE = "oktaproduction9ounvcxa";
const COVEO_ENDPOINT = "https://platform.cloud.coveo.com/rest/search";
const COVEO_KEY = "coveo_token";

const _getToken = () => {
  let token = storage.getItem(COVEO_KEY);
  if (!token) return;

  // Strip " if present (breaks coveo)
  token = token.replace('"', "");

  try {
  // Invalidate token if about to expire
    const decoded = jwt_decode(token);
    const now = DateTime.now();
    const expWithBuffer = DateTime.fromSeconds(decoded.exp).minus({ minutes: 5 });
    if (now > expWithBuffer) {
      storage.removeItem(COVEO_KEY);
      return;
    } else {
      return token;
    }
  } catch (error) {
    console.error("Error decoding or verifying JWT token:", error);
    // Handle error appropriately, such as clearing invalid token from storage
    storage.removeItem(COVEO_KEY);
    return;
  }
};

const _renewToken = () => {
  return axios.get(TOKEN_ENDPOINT).then(({ data: { token } }) => {
    storage.setItem(COVEO_KEY, token);
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
