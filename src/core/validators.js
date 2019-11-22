import libphonenumber from 'google-libphonenumber';
import {USERNAME_MAX_LENGTH} from "./globals";

export default {
  isEmail: (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  },
  isUsername: (value) => {
    const re = /^[a-zA-Z_][0-9a-zA-Z_.-]+$/;
    return value.length <= USERNAME_MAX_LENGTH && re.test(String(value).toLowerCase());
  },
  isPhoneNumber: (value) => {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    try {
      const number = phoneUtil.parseAndKeepRawInput(value);
      return phoneUtil.isValidNumber(number);
    } catch (e) {
      return false;
    }
  }
}
