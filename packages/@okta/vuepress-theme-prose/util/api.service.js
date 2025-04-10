import axios from "axios";
export class Api {
  baseheaders = {};
  postHeaders = {
    "content-type": "application/json"
  };
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  httpRequest(method, url, options = { headers: {}, body: {}, params: {} }) {
    options.method = method;
    return fetch(url, options)
        .then((response) => response.json());
  }

  get(url, options = {}) {
    return this.httpRequest("GET", url, options);
  }

  post(url, options = {}) {
    options.headers = {
      ...this.postHeaders,
      ...options.headers
    };
    return this.httpRequest("POST", url, options);
  }
}
