import {
  isValidObject,
  isValidString,
  isValidNumber,
  isValidBoolean,
} from "../utils/MoEHelper";

type PropPayload = {
  payload: String,
  dismissInterval: Number,
  isCancellable: Boolean,
}

export default class MoEInAppSelfHandledCampaign {
  campaignContent!: String;
  dismissInterval!: Number;
  cancellable!: Boolean;

  constructor(campaign: PropPayload) {
    if (isValidObject(campaign)) {
      if (isValidString(campaign["payload"])) {
        this.campaignContent = campaign["payload"];
      }
      if (isValidNumber(campaign["dismissInterval"])) {
        this.dismissInterval = campaign["dismissInterval"];
      }
      if (isValidBoolean(campaign["isCancellable"])) {
        this.cancellable = campaign["isCancellable"];
      }
    }
  }

  toJSON() {
    return {
      payload: this.campaignContent,
      dismissInterval: this.dismissInterval,
      isCancellable: this.cancellable,
    };
  }
}
