import { isValidObject } from "../utils/MoEHelper";

export default class MoEInAppCustomAction {
  keyValuePair: Map<String, Object>;

  constructor(customAction: Object) {
    if (isValidObject(customAction)) {
      if (isValidObject(customAction["kvPair"])) {
        this.keyValuePair = customAction["kvPair"];
      }
    }
  }

  toJSON(): Object {
    return {
      kvPair: this.keyValuePair,
    };
  }
}
