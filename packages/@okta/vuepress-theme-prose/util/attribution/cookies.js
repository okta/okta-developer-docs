import Cookies from "cookies.js";

const COOKIE_PREFIX = "_okta_";
const HOST = "okta.com";
const HOST_LENGTH = 8;

function getDomain(host) {
  return (host.indexOf(HOST) === host.length - HOST_LENGTH) && host;
}

function getPrefixedKey(key) {
  return `${COOKIE_PREFIX}${key}`;
}

export function deleteCookie(key) {
  const { hostname } = location;
  const domain = getDomain(hostname);

  return Cookies.remove(getPrefixedKey(key), { domain: domain || hostname });
}

export function getCookie(key, defaultValue = false) {
  const cookies = JSON.parse(Cookies.get(getPrefixedKey(key)) || "false");
  return cookies || defaultValue;
}

export function isSetCookie(key) {
  return Cookies.get(getPrefixedKey(key)) !== undefined;
}

export function setCookie(key, value, props = {}) {
  const { hostname } = location;
  const domain = getDomain(hostname);
  Cookies.set(getPrefixedKey(key), JSON.stringify(value), {
    domain: domain || hostname,
    ...props
  });
}
