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
