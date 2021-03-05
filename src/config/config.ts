require("dotenv").config();
export const config = {
  port: process.env.PORT,
  userEmail: process.env.USER_EMAIL,
  passwordEmail: process.env.PASSWORD_EMAIL,
  pathSaveTemplate: process.env.PATH_SAVE_TEMPLATE,
  templateMeeting: process.env.TEMPLATE_MEETING,
  formatTemplate: process.env.FORMAT_TEMPLATE,
};
