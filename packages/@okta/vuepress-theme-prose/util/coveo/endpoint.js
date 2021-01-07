import axios from "axios";

const TOKEN_ENDPOINT =
  "https://wt1ugse0be.execute-api.us-west-2.amazonaws.com/prod/token?site=developer";
const COVEO_PIPELINE = "oktaproduction9ounvcxa";
const COVEO_ENDPOINT = "https://platform.cloud.coveo.com/rest/search";

const _getToken = async () => {
  const {
    data: { token }
  } = await axios.get(TOKEN_ENDPOINT);

  localStorage.setItem("coveo_token", token);
  return token;
};

const configureCoveoEndpoint = async () => {
  const token = localStorage.getItem("coveo_token") || (await _getToken());

  Coveo.SearchEndpoint.configureCloudV2Endpoint(
    COVEO_PIPELINE,
    token,
    COVEO_ENDPOINT,
    { renewAccessToken: _getToken }
  );
};

export default configureCoveoEndpoint;
