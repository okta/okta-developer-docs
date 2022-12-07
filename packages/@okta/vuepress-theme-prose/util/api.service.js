// import axios from "axios";
export class Api {
  postHeaders = {
    "content-type": "application/json"
  };
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  httpRequest(method, url, options = { headers: {}, body: {}, params: {} }) {
    // return axios({
    //   method,
    //   baseURL: this.baseUrl,
    //   url,
    //   headers: {
    //     ...options.headers
    //   },
    //   data: options.body,
    //   params: options.params,
    // });

    const urlWithParams =  options.params ? `${url}?${(new URLSearchParams(options.params)).toString()}` : url;
    return window.fetch(`${this.baseUrl}${urlWithParams}`, {
      method: method,
      headers: {
        ...options.headers
      },
      body: options.body
    }).then(response => response.json());
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
