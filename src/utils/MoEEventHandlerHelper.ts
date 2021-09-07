import MoEInAppCampaign from "../models/MoEInAppCampaign";
import MoEPushCampaign from "../models/MoEPushCampaign";
import MoEPushToken from "../models/MoEPushToken";
import { isValidObject, isValidString } from "../utils/MoEHelper";

const inAppEventNames: Array<String> = [
  "inAppCampaignShown",
  "inAppCampaignClicked",
  "inAppCampaignDismissed",
  "inAppCampaignCustomAction",
  "inAppCampaignSelfHandled",
];

export function executeHandler(
  handler: Function,
  notification: {
    payload: any,
  },
  type: String
) {
  if (handler && isValidObject(notification) && type) {
    const payload = notification["payload"];
    if (isValidString(payload)) {
      const json = JSON.parse(payload);
      if (isValidObject(json)) {
        if (inAppEventNames.includes(type)) {
          handler(new MoEInAppCampaign(json));
        } else if (type == "pushClicked") {
          handler(new MoEPushCampaign(json));
        } else if (type == "pushTokenGenerated") {
          handler(new MoEPushToken(json));
        }
      }
    }
  }
}
