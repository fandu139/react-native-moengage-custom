import MoEInAppCustomAction from "./MoEInAppCustomAction";
import MoEInAppSelfHandledCampaign from "./MoEInAppSelfHandledCampaign";
import MoEInAppNavigation from "./MoEInAppNavigation";
import { isValidObject } from "../utils/MoEHelper";

type PropPayload = {
  campaignId: String,
  campaignName: String,
  customAction: MoEInAppCustomAction,
  selfHandled: MoEInAppSelfHandledCampaign,
  navigation: MoEInAppNavigation,
  platform: String,
}

export default class MoEInAppCampaign {
  campaignId!: String;
  campaignName!: String;
  customAction!: MoEInAppCustomAction;
  selfHandled!: MoEInAppSelfHandledCampaign;
  navigation!: MoEInAppNavigation;
  platform!: String;

  constructor(campaign: PropPayload) {
    if (isValidObject(campaign)) {
      this.campaignId = campaign["campaignId"];
      this.campaignName = campaign["campaignName"];
      this.platform = campaign["platform"];
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      this.customAction = new MoEInAppCustomAction(campaign["customAction"]);
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      this.selfHandled = new MoEInAppSelfHandledCampaign(campaign["selfHandled"]);
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      this.navigation = new MoEInAppNavigation(campaign["navigation"]);
    }
  }

  toJSON(): Object {
    var json = {
      campaignId: this.campaignId,
      campaignName: this.campaignName,
    };
    if (isValidObject(this.customAction)) {
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      json["customAction"] = this.customAction.toJSON();
    }
    if (isValidObject(this.selfHandled)) {
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      json["selfHandled"] = this.selfHandled.toJSON();
    }
    if (isValidObject(this.navigation)) {
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      json["navigation"] = this.navigation.toJSON();
    }
    return json;
  }
}
