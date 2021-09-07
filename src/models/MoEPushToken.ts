import { isValidObject, isValidString } from "../utils/MoEHelper";
import { MoEPushService } from "./MoEPushService";

export default class MoEPushToken {
  platform: String;
  pushService: MoEPushService;
  token: String;

  constructor(tokenPayload: Object) {
    if (isValidObject(tokenPayload)) {
      if (isValidString(tokenPayload["platform"])) {
        this.platform = tokenPayload["platform"];
      }
      if (isValidString(tokenPayload["token"])) {
          this.token = tokenPayload["token"];
       }
      if (isValidString(tokenPayload["pushService"])) {
        this.pushService = tokenPayload["pushService"] as MoEPushService;
      }
    }
  }
}
  