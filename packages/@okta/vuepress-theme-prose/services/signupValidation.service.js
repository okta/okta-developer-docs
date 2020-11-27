export class SignUpValidation {
  errorDictionary = {
    email: "Invalid email.",
    firstName: "invalid first name.",
    lastName: "invalid last name.",
    emptyField: "Whoops, looks like some information is missing."
  }

  constructor(form) {
    this.form = form;
  }

  checkFormInput(key, value) {
    this.resetInput(key);

    if (this.isEmptyValue(value)) {
      this.setInputError(key, this.errorDictionary.emptyField);
      return;
    }

    if (this.isUrlValue(value)) {
      this.setInputError(key);
    }
  }

  checkEmailInput(key, value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.resetInput(key);

    // If empty field stop checking and display an applicable message
    if (this.isEmptyValue(value)) {
      this.setInputError(key, this.errorDictionary.emptyField);
      return;
    }

    // If email not valid or email includes banned email profider, display errror
    if (!re.test(value) || this.__isBannedEmailProvider(value)) {
      this.setInputError(key);
    }
  }

  setInputError(key, msg) {
    this.form[key].errorList.push(msg || this.errorDictionary[key]);
    this.form[key].isValid = false;
  }

  resetInput(key) {
    this.form[key].isValid = true;
    this.form[key].errorList = [];
  }

  isEmptyValue(value) {
    return !value.trim()
  }

  isUrlValue(value) {
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return re.test(value);
  }

  __isBannedEmailProvider(email) {
    const bannedEmailProviders = [
      "first-mail.info",
      "simpleemail.com",
      "click-email.com",
      "alltempmail.com",
      "crowd-mail.com",
      "nextemail.in",
      "emailapps.in",
      "tempmailapp.com",
      "mail-group.net",
      "maxmail.in",
      "maillist.in",
      "mail-point.net",
      "mail-space.net",
      "tempcloud.in",
      "quick-mail.cc",
      "4qmail.com",
      "ualmail.com",
      "mailmyrss.com",
      "mailboxt.com",
      "itiomail.com",
      "wwrmails.com",
      "fft-mail.com",
      "ismailgul.net",
      "svpmail.com",
      "gotkmail.com",
      "smlmail.com",
      "x3mailer.com",
      "temp-mail.org",
      "medicinemanshop.co",
      "medicinemanshop.com",
      "medicinemanshop.ca",
      "medicinemanshop.net",
      "medicinemanshop.org"
    ];
    const emailProvider = email.substring(email.indexOf("@") + 1);

    return bannedEmailProviders.some(
      bannedProvider => emailProvider === bannedProvider
    );
  }
}
