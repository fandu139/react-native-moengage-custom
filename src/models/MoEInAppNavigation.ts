import { isValidObject, isValidString } from "../utils/MoEHelper";

export default class MoEInAppNavigation {
  navigationType: String;
  url: String;
  keyValuePair: Map<String, Object>;

  constructor(navigation: Object) {
    if (isValidObject(navigation)) {
      if (isValidString(navigation["navigationType"])) {
        this.navigationType = navigation["navigationType"];
      }
      if (isValidString(navigation["value"])) {
        this.url = navigation["value"];
      }
      if (isValidObject(navigation["kvPair"])) {
        this.keyValuePair = navigation["kvPair"];
      }
    }
  }

  toJSON(): Object {
    return {
      navigationType: this.navigationType,
      value: this.url,
      kvPair: this.keyValuePair,
    };
  }
}
