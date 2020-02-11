export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

// export const ROUTE_BASE = process.env.PUBLIC_URL;
export const ROUTE_BASE = "";
// export const ROUTE_BASE = isDev ? "" : process.env.PUBLIC_URL;
export const PROJECT_SCOPE = "knowledge";
export const PERSIST_KEY = "knowledge:admin";

export const SUCCESS = "success";
export const ERROR = "danger";

export const CURRENT_USER = "currentUser";
export const TOKEN = "token";

export const GENDER_MALE = "M";
export const GENDER_FEMALE = "F";

export const DATE_FORMAT_ISO = "YYYY-M-D";
export const DATE_FORMAT_ISO2 = "YYYY-MM-DD";

export const UNKNOWN_SERVER_ERROR = "unknownServerError";

export const PHONE_PREFIX_BAHRAIN = "+973";
export const PHONE_PREFIX_KUWAIT = "+965";
export const PHONE_PREFIX_OMAN = "+968";
export const PHONE_PREFIX_QATAR = "+974";
export const PHONE_PREFIX_SAUDI_ARABIA = "+966";
export const PHONE_PREFIX_UAE = "+971";

export const USERNAME_MAX_LENGTH = 20;
export const PASSWORD_MIN_LENGTH = 6;

export const PAGINATION_WIDTH = 10;
export const PAGINATION_WIDTH_MOBILE = 6;

export const TABLE_TEXT_MAX_LENGTH = 200;
export const DESCRIPTION_LENGTH_BREAKPOINT = 400;
export const DESCRIPTION_LENGTH_BREAKPOINT2 = 800;

export const TEXTAREA_ROWS0 = 3;
export const TEXTAREA_ROWS1 = 10;
export const TEXTAREA_ROWS2 = 18;
export const TEXTAREA_MAXLENGTH = 4096;

export const ERROR_REQUIRED = "ERROR_REQUIRED";
export const ERROR_INVALID = "ERROR_INVALID";
export const ERROR_MIN_LENGTH = "ERROR_MIN_LENGTH";
export const ERROR_MAX_LENGTH = "ERROR_MAX_LENGTH";

export const ALERT_SUCCESS = "success";
export const ALERT_DANGER = "danger";
export const ALERT_LIFETIME = 5000;

export const TRANSITION_TIME = 500;
export const IDLE_TIME_LIMIT = 1000 * 60 * 5;
export const IDLE_TIME_LIMIT2 = 1000 * 60 * 30;

export const FILEUPLOAD_MAXSIZE1 = "5M";
export const FILEUPLOAD_MAXSIZE2 = "10M";
export const FILEUPLOAD_MAXSIZE3 = "50M";

export const PREFIX_CHECKBOX = "C";
export const PREFIX_INPUT = "I";
export const PREFIX_RADIO = "R";

export const DEFAULT_EMAIL = "honey96dev@gmail.com";
export const DEFAULT_USERNAME = "honey96dev";
export const DEFAULT_FIRST_NAME = "Zhenlong";
export const DEFAULT_LAST_NAME = "Jin";
// export const DEFAULT_GENDER = "M";
// export const DEFAULT_BIRTHDAY = "1994-1-22";
export const DEFAULT_JOB_TITLE = "IT";
export const DEFAULT_SECTOR = "Web";
export const DEFAULT_COMPANY = "Wangzi";
export const DEFAULT_CITY = "Hunchun";
export const DEFAULT_PHONE = "571623415";
export const DEFAULT_PASSWORD = "123456";
// export const DEFAULT_PASSWORD = "";