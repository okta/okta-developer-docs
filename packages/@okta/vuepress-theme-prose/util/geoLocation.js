import storage from './localStorage'

// Add/Remove country codes from this array to have them blocked/unblocked
const BLOCKED_REGION_LIST = ['RU', 'BY'];
const STORAGE_KEY = 'oktaLocation';
const ONE_WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;

class GeoLocation {
  constructor(onCompletion) {
    this.hasRetried = false;
    this.onCompletion = typeof onCompletion === 'function' ? onCompletion : () => {};

    if (!storage.getItem(STORAGE_KEY) || this.isExpired() === true) {
      this.fetchCountryCode();
    }
  }

  fetchCountryCode = () => {
    if (typeof geoip2 !== 'undefined') {
      geoip2.country(this.onSuccess, this.onError);
    } else {
      this.onCompletion();
    }
  }

  isExpired = () => {
    const now = new Date();
    const storageItem = JSON.parse(storage.getItem(STORAGE_KEY));
    const expiration = storageItem?.expiration ?? 0;
    return now.getTime() > expiration;
  }

  onSuccess = (response = {}) => {
    const storageItem = JSON.parse(storage.getItem(STORAGE_KEY));
    const countryCode = response?.country?.iso_code ?? false;
    const storageIsExpired = this.isExpired();

    if (storageIsExpired) {
      this.storeCountryCode(countryCode);
      this.onCompletion();
      return;
    }

    if (storageItem !== null) {
      this.onCompletion();
      return;
    }

    this.storeCountryCode(countryCode);
    this.onCompletion();
  }

  onError = () => {
    // Retry once if there is an error.
    if (this.hasRetried === false) {
      this.hasRetried = true;
      this.fetchCountryCode();
    } else {
      this.onCompletion();
    }
  }

  storeCountryCode = (countryCode = false) => {
    if (countryCode) {
      const now = new Date();
      const data = {
        countryCode: countryCode,
        expiration: now.getTime() + ONE_WEEK_IN_MILLISECONDS,
      };
      storage.setItem(STORAGE_KEY, JSON.stringify(data));
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

export {
  GeoLocation,
  isRegionLocked
}
