import { isValidObject } from "../utils/MoEHelper";

type PropPayload = {
  kvPair: Map<String, Object>,
}

export default class MoEInAppCustomAction {
  keyValuePair!: Map<String, Object>;

  constructor(customAction: PropPayload) {
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
