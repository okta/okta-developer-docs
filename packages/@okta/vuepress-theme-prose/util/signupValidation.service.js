import { bannedEmailProviders } from "../models/signup.model";
export class SignUpValidation {
  errorDictionary = {
    email: "Invalid email.",
    firstName: "invalid first name.",
    lastName: "invalid last name.",
    emptyField: "Whoops, looks like some information is missing."
  };

  constructor(form) {
    this.form = form;
  }

  checkFormInput(key) {
    if (!this.form[key].hidden) {
      this.resetFormField(key);

      if (this._isEmptyValue(this.form[key].value)) {
        this._setInputError(key, this.errorDictionary.emptyField);
        return;
      }

      if (this._isUrlValue(this.form[key].value)) {
        this._setInputError(key);
      }
    }
  }

  checkEmailInput(key) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.resetFormField(key);

    // If empty field stop checking and display an applicable message
    if (this._isEmptyValue(this.form[key].value)) {
      this._setInputError(key, this.errorDictionary.emptyField);
      return;
    }

    // If email not valid or email includes banned email provider, display errror
    if (
      !re.test(this.form[key].value) ||
      this._isBannedEmailProvider(this.form[key].value)
    ) {
      this._setInputError(key);
    }
  }

  isValidForm() {
    let validForm = true;
    for (const key of Object.keys(this.form)) {
      if (!this.form[key].isValid) {
        validForm = false;
        return;
      }
    }
    return validForm;
  }

  resetFormField(key, resetValue) {
    if (resetValue) this.form[key].value = "";

    this.form[key].isValid = true;
    this.form[key].errorList = [];
  }

  _setInputError(key, msg) {
    this.form[key].errorList.push(msg || this.errorDictionary[key]);
    this.form[key].isValid = false;
  }

  _isEmptyValue(value = "") {
    return !value.trim();
  }

  _isUrlValue(value) {
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return re.test(value);
  }

  _isBannedEmailProvider(email) {
    const emailProvider = email.substring(email.indexOf("@") + 1);

    return bannedEmailProviders.some(
      bannedProvider => emailProvider === bannedProvider
    );
  }
}
/*
State:
Country: Ukraine
province:
email: v.makarchuk.v@gmail.com
first_name: vova
last_name: maka
number_of_apps: 1
utm_campaign__c:
utm_content__c:
utm_date__c:
utm_medium__c:
utm_page__c: /developer/signup/
utm_source__c:
utm_term__c:
original_utm_campaign__c:
original_utm_content__c:
original_utm_date__c: 09/28/2020
original_utm_medium__c:
original_utm_page__c: /services/training/
original_utm_source__c:
original_utm_term__c:
session_utm_campaign__c:
session_utm_content__c:
session_utm_date__c:
session_utm_medium__c:
session_utm_page__c: /services/training/
session_utm_source__c:
session_utm_term__c:
first_name_alternate:
type: okta_dev_developer
campaign_id: 701F0000000mDmx
redirect_url: https://developer.okta.com/profile
selectedApps: developer
form_nid: 7311
form_build_id: form-qNmhAQOnDmLP2Nb-XHJO8FAS3l9A3L-9sCo8RINhGYo
form_id: okta_occ_form
select_country: Ukraine
select_state:
select_province:
hidden_captcha_msg:
g-recaptcha-response: 03AGdBq2687QbFxBE-FrAJ63AbNZ9LC1rkXBL_NN2CBk10jrSDF0bVpAL2lMWrj22aDmSLQhQEfWhQN9S6FVRIPkSARXQIZaMaOR77vcccEwmlMQJRGl6BABoyl6oNC4VEQfY4xZI2vSJEhbxL-bT13q0EGkjDFsnnjbxikxji8XA-YqgZpWkYnLNJMbjqux-SIWELsyDNelNhu03--weEQEvtM6FST2QhD5hvX0PgQ3-_czgp8LC77P-EDZB7Mm58ceVvMJJs880SIa5U-TLcpWGbVHjIWCM9jZcIKiiJAFmxHeSpjxNod9wEfufnvYQVjtNLg8Qu-_AR9aDaWVdWe2kfEjXEdMlslWHjXFlmF3ob-MhyH2L9ULUtw18-2y9EMZ5H_r0fhlRr-WavpliI35ySkBBXZJD8OYsEpnffC3SN-JzkqFwJHSxiM5BMnpnL98r8pyApHN9r7uAXqeRk7NKydJMahR-BZg
Email_Opt_In__c:
Advertising_Opt_In__c:
Advertising_Opt_In_Date__c:
Advertising_Opt_In_Source__c:
GCLID__c:
GACLIENTID__c: 903577411.1601301975
GATRACKID__c: UA-15777010-7
GAUSERID__c:
*/
