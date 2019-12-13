export default {
  NAME: "English",
  CODE: "en",
  DIRECTION: "ltr",
  SITE_NAME: 'Admin for Knowledge gate',
  COMMON: {
    BUTTON: {
      HOME: "Home",
      YES: "Yes",
      NO: "No",
      OK: "OK",
      SEND: "Send",
      BACK: "Back",
      SAVE: "Save",
      DELETE: "Delete",
      CLEAR: "Clear",
      SEARCH: "Search",
      SUBSCRIBE: "Subscribe",
      JOIN: "Join",
      JOIN_US: "Join Us",
      DETAILS: "Details",
      CHANGE: "Change",
      ADD: "Add",
      CANCEL: "Cancel",
      FIRST: "First",
      LAST: "Last",
      READ_MORE: "Read more",
      MODIFY: "Modify",
      ALLOW: "Allow",
      DENY: "Deny",
      PUBLISH: "Publish",
      UNPUBLISH: "Retract Publish",
      NOT_FINISHED: "Not Finished",
    },
    VALIDATION: {
      REQUIRED: "{{field}} is required",
      INVALID: "{{field}} is invalid",
      MIN_LENGTH: "{{field}} minimum length is {{length}}",
      MAX_LENGTH: "{{field}} maximum length is {{length}}",
      NOT_SAME: "Make sure same to {{field}}",
    },
    QUESTION: {
      DELETE: "Do you want to delete '{{item}}'?",
      ALLOW: "Do you want to allow '{{item}}'?",
      DENY: "Do you want to deny '{{item}}'?",
    },
    ERROR: {
      SORRY: "Sorry",
      UNKNOWN_SERVER_ERROR: "Unknown server error",
      NO_DATA: "There is no data",
      ERROR_404: "Ops, Page not found",
    },
    GENDER: {
      MALE: 'Male',
      FEMALE: 'Female',
    },
    LANGUAGE: {
      LANGUAGE: 'Language',
      ENGLISH: 'English',
      ARABIC: 'عربى',
    },
    FILE_UPLOAD: {
      DEFAULT: "Drag and drop a file here or click",
      REPLACE: "Drag and drop or click to replace",
      REMOVE: "Remove",
      ERROR: "Oops, something wrong happened",
      ERROR_FILESIZE: "The file size is too big ({{max}} max)",
      ERROR_FILEEXTENSION: "The file is not allowed ({{extensions}} only)",
      ERROR_IMAGEFORMAT: "The image format is not allowed ({{format}} only)",
      ERROR_MAXHEIGHT: "The image height is too big ({{max}}px max)",
      ERROR_MINHEIGHT: "The image height is too small ({{min}}px min)",
      ERROR_MAXWIDTH: "The image width is too big ({{max}}px max)",
      ERROR_MINWIDTH: "The image width is too small ({{min}}px min)",
    },
  },
  NAVBAR: {
    HOME: "Home",
    POSTS: {
      POSTS: "Articles",
      ALL: "All Articles",
      ALLOWED: "Allowed Articles",
      DENIED: "Denied Articles",
      TOPICS: "Topics",
    },
    NEWS: {
      NEWS: "News",
      ALL: "All News",
      ADD: "Add News",
    },
    VIDEO: {
      VIDEO: "Video",
      ALL: "All Video",
      ADD: "Add Video",
    },
    QUESTIONNAIRE: {
      QUESTIONNAIRE: "Questionnaire",
      PACKAGES: "Questionnaire Packages",
      ADD_PACKAGE: "Add Questionnaire Package",
      QUESTIONS: "Questionnaire Questions",
      ADD_QUESTION: "Add Questionnaire Question",
      RESULT: "Questionnaire Result",
    },
    VOTE: {
      VOTE: "Vote",
      PACKAGES: "Vote Packages",
      ADD_PACKAGE: "Add Vote Package",
      QUESTIONS: "Vote Questions",
      ADD_QUESTION: "Add Vote Question",
      RESULT: "Vote Result",
    },
    USERS: {
      USERS: "Users",
      LIST: "All Users",
      NEW_LIST: "Users Awaiting Activation",
    },
  },
  AUTH: {
    EMAIL: "Email",
    USERNAME: "Username",
    FIRST_NAME: "First Name",
    LAST_NAME: "Last Name",
    GENDER: "Gender",
    BIRTHDAY: "Birthday",
    JOB_TITLE: "Job Title",
    SECTOR: "Sector",
    COMPANY: "Company",
    COUNTRY: "Country",
    CITY: "City",
    PHONE: "Phone Number",
    PASSWORD: "Password",
    PASSWORD2: "Confirm Password",
    SIGN_IN: "Sign in",
    SIGN_UP: "Sign up",
    SIGN_OUT: "Sign out",
    MY_ACCOUNT: "My account",
    FORGOT_PASSWORD: "Forgot password?",
    ALREADY_REGISTERED: "Already registered?",
    NOT_REGISTERED: "Not registered?",
  },
  PROFILE: {
    PROFILE: "Profile",
    MY_POSTS: {
      MY_POSTS: "My Articles",
      DETAIL: "Detail",
    },
    MAIN: {
      PERSONAL_INFO: "Personal Info",
      SOCIAL_MEDIA: "Social Media",
      PASSWORD: "Password",
    },
    PASSWORD: {
      CURRENT_PASSWORD: "Current Password",
      NEW_PASSWORD: "New Password",
    },
  },
  POSTS: {
    TITLE: "Title",
    TEXT: "Text",
    DESCRIPTION: "Description",
    MEDIA: "Image",
    POSTS: "Articles",
    POSTS_AWAITING_ACTIVATION: "Articles Awaiting Activation",
    ADD: {

    },
    DETAIL: {
      POST_DETAIL: "Article Detail",
      WRITE_COMMENT: "Write a <span className=\"primary-color\">{{comment}}</span>",
      WRITE: "Write a",
      COMMENT: "Comment",
      REQUIRE_SIGN_IN: "To add your comment, you must register or",
      ALREADY_WROTE_COMMENT: "You have already written a comment on this post",
      COMMENTS: "Comments",
      NO_COMMENT: "There is no comment yet",
    },
    TOPICS: {
      TOPICS: "Topics",
      RELATED_TOPICS: "Related Topics",
      TOPIC: "Topic",
      ADD_TOPIC: "Add Topic",
      EDIT_TOPIC: "Edit Topic",
    },
  },
  NEWS: {
    NEWS: "News",
    TITLE: "Title",
    TEXT: "Text",
    DESCRIPTION: "Description",
    URL: "URL",
    ADD: {
      ADD_NEWS: "Add News",
      MODIFY_NEWS: "Modify News",
    },
  },
  VIDEO: {
    VIDEOS: "Videos",
    TITLE: "Title",
    URL: "URL",
    IS_FILE: "Video File?",
    ADD: {
      ADD_VIDEO: "Add Video",
      MODIFY_VIDEO: "Modify Video",
    },
  },
  QUESTIONNAIRE: {
    QUESTIONNAIRES: "Questionnaires",
    QUESTIONNAIRES_AWAITING_RELEASE: "Questionnaires Awaiting Publish",
    PACKAGE: "Package",
    QUESTION: "Question",
    START_DATE: "Start Date",
    END_DATE: "End Date",
    RELEASED_DATE: "Published Date",
    ADD_PACKAGE: {
      ADD_PACKAGE: "Add Questionnaire Package",
      MODIFY_PACKAGE: "Modify Questionnaire Package",
    },
    QUESTIONS: {
      QUESTIONS: "Questionnaire Questions",
    },
    ADD_QUESTION: {
      ADD_QUESTION: "Add Questionnaire Question",
      MODIFY_QUESTION: "Modify Questionnaire Question",
    },
    ANSWERS: {
      ANSWERS: "Questionnaire Answers",
      ANSWER: "Questionnaire Answer",
    },
    ADD_ANSWER: {
      ADD_ANSWER: "Add Questionnaire Answer",
      MODIFY_ANSWER: "Modify Questionnaire Answer",
    },
    RESULT: {
      RESULT: "Questionnaire Result",
    },
  },
  VOTE: {
    VOTES: "Votes",
    VOTES_AWAITING_RELEASE: "Votes Awaiting Publish",
    PACKAGE: "Package",
    QUESTION: "Question",
    START_DATE: "Start Date",
    END_DATE: "End Date",
    RELEASED_DATE: "Published Date",
    ADD_PACKAGE: {
      ADD_PACKAGE: "Add Vote Package",
      MODIFY_PACKAGE: "Modify Vote Package",
    },
    QUESTIONS: {
      QUESTIONS: "Vote Questions",
    },
    ADD_QUESTION: {
      ADD_QUESTION: "Add Vote Question",
      MODIFY_QUESTION: "Modify Vote Question",
    },
    ANSWERS: {
      ANSWERS: "Vote Answers",
      ANSWER: "Vote Answer",
    },
    ADD_ANSWER: {
      ADD_ANSWER: "Add Vote Answer",
      MODIFY_ANSWER: "Modify Vote Answer",
    },
    RESULT: {
      RESULT: "Vote Result",
    },
  },
  USERS: {
    USERS: "Users",
    USERS_AWAITING_ACTIVATION: "Users Awaiting Activation",
    STATISTICS_OF_USERS: "Statistics of Users",
    STATISTICS_OF_SIGN_IN: "Statistics of Sign in",
    EMAIL: "Email",
    USERNAME: "Username",
    FIRST_NAME: "First Name",
    LAST_NAME: "Last Name",
    GENDER: "Gender",
    PHONE: "Phone",
    EDIT: {
      EDIT: "Edit User",
    },
  },
};
