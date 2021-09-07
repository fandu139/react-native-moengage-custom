import MoEInAppCustomAction from "./MoEInAppCustomAction";
import MoEInAppSelfHandledCampaign from "./MoEInAppSelfHandledCampaign";
import MoEInAppNavigation from "./MoEInAppNavigation";
import { isValidObject } from "../utils/MoEHelper";

export default class MoEInAppCampaign {
  campaignId: String;
  campaignName: String;
  customAction: MoEInAppCustomAction;
  selfHandled: MoEInAppSelfHandledCampaign;
  navigation: MoEInAppNavigation;
  platform: String;

  constructor(campaign: Object) {
    if (isValidObject(campaign)) {
      this.campaignId = campaign["campaignId"];
      this.campaignName = campaign["campaignName"];
      this.platform = campaign["platform"];
      this.customAction = new MoEInAppCustomAction(campaign["customAction"]);
      this.selfHandled = new MoEInAppSelfHandledCampaign(
        campaign["selfHandled"]
      );
      this.navigation = new MoEInAppNavigation(campaign["navigation"]);
    }
  }

  toJSON(): Object {
    var json = {
      campaignId: this.campaignId,
      campaignName: this.campaignName,
    };
    if (isValidObject(this.customAction)) {
      json["customAction"] = this.customAction.toJSON();
    }
    if (isValidObject(this.selfHandled)) {
      json["selfHandled"] = this.selfHandled.toJSON();
    }
    if (isValidObject(this.navigation)) {
      json["navigation"] = this.navigation.toJSON();
    }
    return json;
  }
}
