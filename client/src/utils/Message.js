import { message } from "antd";

export default class Messages {
  static success = (text) => {
    message.success(text, 3);
  };

  static error = (text) => {
    message.error(text, 3);
  };

  static warning = (text) => {
    message.warning(text, 3);
  };
}
