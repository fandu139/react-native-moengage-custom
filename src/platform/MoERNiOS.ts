const MoEReactBridge = require("react-native").NativeModules.MoEReactBridge;

type PropPayload = {
  type: String,
}

export class MoERNiOS {
  static initialize() {
    MoEReactBridge.initialize();
  }

  static setAppStatus(payload: Object) {
    MoEReactBridge.setAppStatus(payload);
  }

  static trackEvent(payload: Object) {
    MoEReactBridge.trackEventWithProperties(payload);
  }

  static setUserAttribute(payload: Object) {
    MoEReactBridge.setUserAttribute(payload);
  }

  static setAlias(payload: Object) {
    MoEReactBridge.setAlias(payload);
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

  static selfHandledShown(payload: PropPayload) {
    payload["type"] = "impression";
    MoEReactBridge.updateSelfHandledInAppStatusWithPayload(payload);
  }

  static selfHandledPrimaryClicked(payload: PropPayload) {
    payload["type"] = "primary_clicked";
    MoEReactBridge.updateSelfHandledInAppStatusWithPayload(payload);
  }

  static selfHandledClicked(payload: PropPayload) {
    payload["type"] = "click";
    MoEReactBridge.updateSelfHandledInAppStatusWithPayload(payload);
  }

  static selfHandledDismissed(payload: PropPayload) {
    payload["type"] = "dismissed";
    MoEReactBridge.updateSelfHandledInAppStatusWithPayload(payload);
  }

  static setAppContext(payload: Object) {
    MoEReactBridge.setAppContext(payload);
  }

  static resetAppContext() {
    MoEReactBridge.resetAppContext();
  }

  static registerForPush() {
    MoEReactBridge.registerForPushNotification();
  }

  static disableInbox() {
    MoEReactBridge.disableInbox();
  }

  static enableSDKLogs() {
    MoEReactBridge.enableSDKLogs();
  }

  static validateSDKVersion() {
    MoEReactBridge.validateSDKVersion().catch((error: Error) => {
      console.error(error.message);
    });
  }

  static startGeofenceMonitoring() {
    MoEReactBridge.startGeofenceMonitoring();
  }

  static optOutDataTracking(shouldOptOutDataTracking: boolean){
    let payload = {
      type: "data",
      state: shouldOptOutDataTracking
    };
    MoERNiOS.optOutTracking(payload)
  }

  static optOutPushNotification(shouldOptOutPushNotification: boolean){
    let payload = {
      type: "push",
      state: shouldOptOutPushNotification
    };
    MoERNiOS.optOutTracking(payload)
  }

  static optOutInAppNotification(shouldOptOutInApp: boolean){
    let payload = {
      type: "inapp",
      state: shouldOptOutInApp
    };
    MoERNiOS.optOutTracking(payload)
  }

  private static optOutTracking(payload: object){
    MoEReactBridge.optOutTracking(payload);
  }

  static updateSdkState(state: boolean) {
    let payload = {
      isSdkEnabled: state
    };
    MoEReactBridge.updateSDKState(payload);
  }
}
