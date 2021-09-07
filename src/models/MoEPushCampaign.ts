import { isValidObject, isValidString } from "../utils/MoEHelper";

type PropPayload = {
  platform: String,
  token: string,
  payload: Map<String, Object>,
  isDefaultAction: Boolean,
  clickedAction: Map<String, Object>,
}

export default class MoEPushCampaign {
  platform!: String;
  payload!: Map<String, Object>;
  isDefaultAction!: Boolean
  clickAction!: Map<String, Object>

  constructor(pushPayload: PropPayload) {
    if (isValidObject(pushPayload)) {
      if (isValidString(pushPayload["platform"])) {
        this.platform = pushPayload["platform"];
      }
      if (isValidObject(pushPayload["payload"])) {
        this.payload = pushPayload["payload"];
      }
      if("isDefaultAction" in pushPayload){
        this.isDefaultAction = pushPayload["isDefaultAction"]
      }else{
        this.isDefaultAction = false
      }
      if("clickedAction" in pushPayload){
        this.clickAction = pushPayload["clickedAction"]
      }
    }
  }
}
