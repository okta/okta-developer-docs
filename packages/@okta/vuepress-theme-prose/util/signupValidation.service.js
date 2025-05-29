import { Api } from "../util/api.service";

export class SignUpValidation {
  errorDictionary = {
    email: "Invalid email.",
    firstName: "Invalid first name.",
    lastName: "Invalid last name.",
    notWorkEmail: "Business email is required.",
    emptyField: "This field is required."
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

  checkFormCheckboxInput(key) {
    if (!this.form[key].hidden) {
      this.resetFormField(key);
      if (!this.form[key].value) {
        this._setInputError(key, this.errorDictionary.emptyField);
      }
    }
  }

  async checkEmailInput(key) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.resetFormField(key);

    // If empty field stop checking and display an applicable message
    if (this._isEmptyValue(this.form[key].value)) {
      this._setInputError(key, this.errorDictionary.emptyField);
      return;
    }

    // If email not valid, display error
    if (!re.test(this.form[key].value)) {
      this._setInputError(key);
      return;
    }

    // If not a work email, display errror
    if (!(await this._isWorkEmail(this.form[key].value))) {
      this._setInputError(key, this.errorDictionary.notWorkEmail);
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

  resetFormField(key, resetValue = { reset: false, value: "" }) {
    if (resetValue.reset) this.form[key].value = resetValue.value;

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

  async _isWorkEmail(email) {
    const oktaApi = new Api('https://www.okta.com');
    try {
      const { data: { isBusinessEmail } } = await oktaApi
        .get('/free-trial/api/email-validation', {
          params: { email },
        });

      return isBusinessEmail;
    } catch (err) {
      console.error(err);
      // If the API fails, log the error
      // and assume the email was a work email
      return true;
    };
  }
}
