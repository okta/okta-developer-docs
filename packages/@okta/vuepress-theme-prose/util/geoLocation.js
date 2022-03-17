import storage from './localStorage'

const STORAGE_KEY = "oktaLocation";
// Add/Remove country codes from this array to have them blocked/unblocked
const BLOCKED_REGION_LIST = ['RU', 'BY'];
// 

class GeoLocation {
  constructor() {
    this.hasRetried = false;

    // Add the country code to local storage.
    this.getLocale();
  }

  setCountryCode = (countryCode = false) => {
    if (countryCode) {
      const date = new Date();
      const oneWeekInMilliseconds = (1000 * 60 * 60 * 24 * 7);
      const data = {
        countryCode: countryCode,
        expiration: date.getTime() + oneWeekInMilliseconds,
      };
      storage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  onSuccess = (response = {}) => {
    const date = new Date();
    const storageItem = JSON.parse(storage.getItem(STORAGE_KEY));
    const expiration = storageItem?.expiration ?? 0;
    const countryCode = response?.country?.iso_code ?? false;
    const storageIsExpired = date.getTime() > expiration;

    // Update storage item if it is expired.
    if (storageIsExpired) {
      this.setCountryCode(countryCode);
    }

    // Bail if storage item is set and not expired.
    if (storageItem !== null && storageIsExpired === false) {
      return;
    }

    // Set location storage item.
    this.setCountryCode(countryCode);
  }

  getLocale = () => {
    if (typeof geoip2 !== "undefined") {
      geoip2.country(this.onSuccess, this.onError);
    }
  }

  onError = () => {
    // Try again if there is an error.
    if (hasRetried === false) {
      hasRetried = true;
      this.getLocale();
    }
  }
}

const isRegionLocked = () => {
  const storageItem = JSON.parse(storage.getItem(STORAGE_KEY));
  const countryCode = storageItem?.countryCode;

  if (!countryCode) {
    return false
  }

  return BLOCKED_REGION_LIST.includes(countryCode);
}

const geoLocation = new GeoLocation();

export {
  geoLocation,
  isRegionLocked
}
