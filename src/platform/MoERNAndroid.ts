const MoEReactBridge = require("react-native").NativeModules.MoEReactBridge;

export class MoERNAndroid {
  static initialize() {
    MoEReactBridge.initialize();
  }

  static trackEvent(payload: Object){
    MoEReactBridge.trackEvent(JSON.stringify(payload))
  }

  static setAppStatus(payload: object) {
    MoEReactBridge.setAppStatus(JSON.stringify(payload));
  }

  static setUserAttribute(payload: object) {
    MoEReactBridge.setUserAttribute(JSON.stringify(payload));
  }

  static setAlias(payload: object){
    MoEReactBridge.setAlias(JSON.stringify(payload));
  }

  static logout() {
    MoEReactBridge.logout();
  }

  static showInApp() {
    MoEReactBridge.showInApp();
  }

  static getSelfHandledInApp() {
    MoEReactBridge.getSelfHandledInApp();
  }

  static selfHandledShown(payload: object) {
    payload["type"] = "impression";
    MoERNAndroid.selfHandledCallback(payload);
  }

  static selfHandledClicked(payload: object) {
    payload["type"] = "click";
    MoERNAndroid.selfHandledCallback(payload);
  }

  static selfHandledDismissed(payload: object) {
    payload["type"] = "dismissed";
    MoERNAndroid.selfHandledCallback(payload);
  }

  static selfHandledPrimaryClicked(payload: object){
    payload["type"] = "primary_clicked";
    MoERNAndroid.selfHandledCallback(payload);
  }

  private static selfHandledCallback(payload: object){
    MoEReactBridge.selfHandledCallback(JSON.stringify(payload));
  }

  static setAppContext(payload: object) {
    MoEReactBridge.setAppContext(JSON.stringify(payload));
  }

  static resetAppContext() {
    MoEReactBridge.resetAppContext();
  }

  static passFcmPushToken(pushToken: string) {
    let payload = {
      token: pushToken,
      service: PUSH_SERVICE_FCM
    };
    MoERNAndroid.passPushToken(payload)
  }

  static passFcmPushPayload(pushPayload: object) {
    let payload = {
      payload: pushPayload,
      service: PUSH_SERVICE_FCM
    };
    MoERNAndroid.passPushPayload(payload)
  }

  private static passPushToken(payload: object){
    MoEReactBridge.passPushToken(JSON.stringify(payload));
  }

  private static passPushPayload(payload: object){
    MoEReactBridge.passPushPayload(JSON.stringify(payload));
  }

  static enableSDKLogs() {
    MoEReactBridge.enableSDKLogs();
  }

  static optOutDataTracking(shouldOptOutDataTracking: boolean){
    let payload = {
      type: "data",
      state: shouldOptOutDataTracking
    };
    MoERNAndroid.optOutTracking(payload)
  }

  static optOutPushNotification(shouldOptOutPushNotification: boolean){
    let payload = {
      type: "push",
      state: shouldOptOutPushNotification
    };
    MoERNAndroid.optOutTracking(payload)
  }

  static optOutInAppNotification(shouldOptOutInApp: boolean){
    let payload = {
      type: "inapp",
      state: shouldOptOutInApp
    };
    MoERNAndroid.optOutTracking(payload)
  }

  private static optOutTracking(payload: object){
    MoEReactBridge.optOutTracking(JSON.stringify(payload));
  }

  static validateSDKVersion(){
    MoEReactBridge.validateSdkVersion().catch((error: Error) => {
      console.error(error.message);
    });
  }

  static passPushKitPushToken(pushToken: string) {
    let payload = {
      token: pushToken,
      service: PUSH_SERVICE_PUSH_KIT
    };
    MoERNAndroid.passPushToken(payload)
  }

  static updateSdkState(state: boolean) {
    let payload = {
      isSdkEnabled: state
    };
    MoEReactBridge.updateSdkState(JSON.stringify(payload));
  }
}

const PUSH_SERVICE_FCM = "FCM"
const PUSH_SERVICE_PUSH_KIT = "PUSH_KIT"
