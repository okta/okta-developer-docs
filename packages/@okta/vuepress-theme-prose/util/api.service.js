import axios from "axios";
export class Api {
  baseheaders = {};
  postHeaders = {
    "content-type": "application/x-www-form-urlencoded"
  };
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  httpRequest(method, url, options = { headers: {}, body: {} }) {
    return axios({
      method,
      baseURL: this.baseUrl,
      url,
      headers: {
        ...this.baseheaders,
        ...options.headers
      },
      data: options.body
    });
  }

  get(url, options = {}) {
    return this.httpRequest("GET", url, options);
  }

  post(url, options = {}) {
    options.headers = options.headers
      ? { ...options.headers, ...this.postHeaders }
      : { ...this.postHeaders };
    return this.httpRequest("POST", url, options);
  }
}
