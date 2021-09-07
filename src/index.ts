import { Platform, NativeEventEmitter } from "react-native";
import MoEInAppSelfHandledCampaign from "./models/MoEInAppSelfHandledCampaign";
import MoEProperties from "./models/MoEProperties";
import MoEGeoLocation from "./models/MoEGeoLocation";
import * as MoEHelper from "./utils/MoEHelper";

import { MoEAppStatus } from "./models/MoEAppStatus";
import { MoERNAndroid } from "./platform/MoERNAndroid";
import { MoERNiOS } from "./platform/MoERNiOS";

import MoEInAppCampaign from "./models/MoEInAppCampaign";
import MoEInAppCustomAction from "./models/MoEInAppCustomAction";
import MoEInAppNavigation from "./models/MoEInAppNavigation";
import { executeHandler } from "./utils/MoEEventHandlerHelper";

const MoEReactBridge = require("react-native").NativeModules.MoEReactBridge;
const PLATFORM_ANDROID = "android";
const PLATFORM_IOS = "ios";
const GENERAL = "general";

const MOE_PUSH_CLICKED = "MoEPushClicked";
const MOE_PUSH_REGISTERED = "MoEPushTokenGenerated";
const MOE_INAPP_SHOWN = "MoEInAppCampaignShown";
const MOE_INAPP_CLICKED = "MoEInAppCampaignClicked";
const MOE_INAPP_DISMISSED = "MoEInAppCampaignDismissed";
const MOE_INAPP_CUSTOM_ACTION = "MoEInAppCampaignCustomAction";
const MOE_INAPP_SELF_HANDLE = "MoEInAppCampaignSelfHandled";

const eventBroadcastNames = [
  MOE_PUSH_CLICKED,
  MOE_PUSH_REGISTERED,
  MOE_INAPP_SHOWN,
  MOE_INAPP_CLICKED,
  MOE_INAPP_DISMISSED,
  MOE_INAPP_CUSTOM_ACTION,
  MOE_INAPP_SELF_HANDLE,
];

// JS Event Names
const PUSH_CLICKED = "pushClicked";
const PUSH_REGISTERED = "pushTokenGenerated"
const INAPP_SHOWN = "inAppCampaignShown";
const INAPP_CLICKED = "inAppCampaignClicked";
const INAPP_DISMISSED = "inAppCampaignDismissed";
const INAPP_CUTOM_ACTION = "inAppCampaignCustomAction";
const INAPP_SELF_HANDLE = "inAppCampaignSelfHandled";

const _eventNames = [
  PUSH_CLICKED,
  PUSH_REGISTERED,
  INAPP_SHOWN,
  INAPP_CLICKED,
  INAPP_DISMISSED,
  INAPP_CUTOM_ACTION,
  INAPP_SELF_HANDLE,
];

var _eventTypeHandler = new Map();
{/* Ignore TS Ignore
// @ts-ignore */}
var MoeEventEmitter;

if (MoEReactBridge) {
  MoeEventEmitter = new NativeEventEmitter(MoEReactBridge);
  for (var i = 0; i < eventBroadcastNames.length; i++) {
    handleEventBroadcast(_eventNames[i], eventBroadcastNames[i]);
  }
}

function handleEventBroadcast(type: String, broadcast: String) {
  {/* Ignore TS Ignore
  // @ts-ignore */}
  MoeEventEmitter.addListener(broadcast, (notification: { payload: any }) => {
    executeHandler(_eventTypeHandler.get(type), notification, type);
  });
}

function commonValidationCheck() {
  if (Platform.OS == PLATFORM_ANDROID) {
    MoERNAndroid.validateSDKVersion()
  } else if (Platform.OS == PLATFORM_IOS) {
    MoERNiOS.validateSDKVersion();
  }
}

function showError(message: String) {
  console.error(message);
}

var ReactMoE = {
  setEventListener: function (type: any, handler: any) {
    if (!MoEReactBridge) return;
    _eventTypeHandler.set(type, handler);
  },

  removeEventListener: function (type: any) {
    if (!MoEReactBridge) return;
    _eventTypeHandler.delete(type);
  },

  initialize: function () {
    commonValidationCheck();
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.initialize();
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.initialize();
    }
  },

  /**
   * Tells the SDK whether this is a migration or a fresh installation.
   * <b>Not calling this method will STOP execution of INSTALL CAMPAIGNS</b>.
   * This is solely required for migration to MoEngage Platform
   *
   * @param isExisting true if it is an existing user else set false
   */
  setAppStatus: function (status: MoEAppStatus) {
    commonValidationCheck();
    console.log("Will track whether it is a fresh install or update.");
    let payload = {
      appStatus: MoEHelper.appStatusToString(status),
    };
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setAppStatus(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setAppStatus(payload);
    }
  },

  /**
   * Tracks the specified event
   * @param eventName The action associated with the Event
   * @param {MoEProperties}properties : properties of the event
   */
  trackEvent: function (eventName: String, properties: MoEProperties) {
    commonValidationCheck();
    console.log("trackEvent with properties", properties);
    if (!(properties instanceof MoEProperties)) {
      showError("trackEvent: properties must of MoEProperties type");
      return;
    }
    //...(spread operator)it will append all the contents of the object/array into the target element
    let payload = {
      ...properties.toJSON(),
      eventName,
    };
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.trackEvent(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.trackEvent(payload);
    }
  },

  /**
   * Sets the unique id of the user. Should be set on user login.
   * @param uniqueId unique id to be set
   */
  setUserUniqueID: function (uniqueId: string) {
    commonValidationCheck();
    console.log("Will set unique ID: " + uniqueId);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_UNIQUE_ID",
      uniqueId,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Update user's unique id which was previously set by setUserUniqueID()
   * @param alias updated unique id.
   */
  setAlias: function (alias: string) {
    commonValidationCheck();
    console.log("Will set alias: " + alias);
    let payload = {
      alias: alias,
    };
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setAlias(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setAlias(payload);
    }
  },

  /**
   * Sets the user-name of the user.
   * @param userName user-name to be set
   */
  setUserName: function (userName: string) {
    commonValidationCheck();
    console.log("Will set username: " + userName);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_NAME",
      userName,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the first name of the user.
   * @param firstName first name to be set
   */
  setUserFirstName: function (firstName: string) {
    commonValidationCheck();
    console.log("Will set first name: " + firstName);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_FIRST_NAME",
      firstName,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the last name of the user.
   * @param lastName last name to be set
   */
  setUserLastName: function (lastName: string) {
    commonValidationCheck();
    console.log("Will set last name: " + lastName);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_LAST_NAME",
      lastName,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the email-id of the user.
   * @param emailId email-id to be set
   */
  setUserEmailID: function (emailId: string) {
    commonValidationCheck();
    console.log("Will set email-id " + emailId);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_EMAIL",
      emailId,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the mobile number of the user.
   * @param mobileNumber mobile number to be set
   */
  setUserContactNumber: function (mobileNumber: string) {
    commonValidationCheck();
    console.log("Will set Mobile Number: " + mobileNumber);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_MOBILE",
      mobileNumber,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the birthday of the user.
   * @param birthday birthday to be set in ISO format [yyyy-MM-dd'T'HH:mm:ss'Z'].
   */
  setUserBirthday: function (birthday: string) {
    commonValidationCheck();
    console.log("Will set birthday: " + birthday);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_BDAY",
      birthday,
      "timestamp"
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the gender of the user.
   * @param gender gender to be set
   */
  setUserGender: function (gender: Object) {
    commonValidationCheck();
    console.log("Will set gender: " + gender);
    const payload = MoEHelper.createUserAttributeParam(
      "USER_ATTRIBUTE_USER_GENDER",
      gender,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the location of the user.
   * @param location coordinates of the user, which should be of type MoEUserLocation
   */
  setUserLocation: function (location: MoEGeoLocation) {
    commonValidationCheck();
    if (!(location instanceof MoEGeoLocation)) {
      showError("setUserLocation: location must of type MoEGeoLocation");
      return;
    }
    const payload = MoEHelper.createUserLocationAttributeParam(
      "USER_ATTRIBUTE_USER_LOCATION",
      location.latitude,
      location.longitude
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the user attribute name.
   * @param userAttributeName attribute name
   * @param userAttributeValue attribute value
   */
  setUserAttribute: function (userAttributeName: String, userAttributeValue: Object) {
    commonValidationCheck();
    console.log(
      "Will track user attribute [attributeName]: " +
        userAttributeName +
        " attributeValue: " +
        userAttributeValue
    );
    const payload = MoEHelper.createUserAttributeParam(
      userAttributeName,
      userAttributeValue,
      GENERAL
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Call this method to set date attribute of user.
   * @param {String}date : The value/attribute, in ISO format [yyyy-MM-dd'T'HH:mm:ss'Z'].
   * @param {String}key : The key, which is the kind of attribute
   */
  setUserAttributeISODateString: function (
    attributeName: String,
    date: String
  ) {
    commonValidationCheck();
    const payload = MoEHelper.createUserAttributeParam(
      attributeName,
      date,
      "timestamp"
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Sets the user attribute name.
   * @param userAttributeName attribute name
   * @param userAttributeValue attribute value
   */
  setUserAttributeLocation: function (
    userAttributeName: string,
    location: MoEGeoLocation
  ) {
    commonValidationCheck();
    if (!(location instanceof MoEGeoLocation)) {
      showError(
        "setUserAttributeWithLocation: location must of type MoEGeoLocation"
      );
      return;
    }
    const payload = MoEHelper.createUserLocationAttributeParam(
      userAttributeName,
      location.latitude,
      location.longitude
    );
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setUserAttribute(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setUserAttribute(payload);
    }
  },

  /**
   * Notifys the SDK that the user has logged out of the app.
   */
  logout: function () {
    commonValidationCheck();
    console.log("Will logout user");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.logout();
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.logout();
    }
  },

  /**
   * Call this method wherever InApp message has to be shown, if available
   */
  showInApp: function () {
    commonValidationCheck();
    console.log("Will try to show in-app.");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.showInApp();
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.showInApp();
    }
  },

  /**
   * Call this method to get the campaign info for self handled inApps
   */
  getSelfHandledInApp: function () {
    commonValidationCheck();
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.getSelfHandledInApp();
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.getSelfHandledInApp();
    }
  },

  /**
   * Call this method when you show the self handled in-app so we can update impressions.
   * @param {MoEInAppCampaign}campInfo : campaign information object
   */
  selfHandledShown: function (inAppCampaign: MoEInAppCampaign) {
    commonValidationCheck();
    if (!(inAppCampaign instanceof MoEInAppCampaign)) {
      showError(
        "selfHandledShown: inAppCampaign must of MoEInAppCampaign type"
      );
      return;
    }
    let campaignJson = inAppCampaign.toJSON();
    if (Platform.OS == PLATFORM_ANDROID) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNAndroid.selfHandledShown(campaignJson);
    } else if (Platform.OS == PLATFORM_IOS) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNiOS.selfHandledShown(campaignJson);
    }
  },

  /**
   * Call this method to track when self handled in app primary widget is clicked.
   * @param {MoEInAppCampaign}campInfo : campaign information object
   */
  selfHandledPrimaryClicked: function (inAppCampaign: MoEInAppCampaign) {
    commonValidationCheck();
    if (!(inAppCampaign instanceof MoEInAppCampaign)) {
      showError(
        "selfHandledClicked: inAppCampaign must of MoEInAppCampaign type"
      );
      return;
    }
    let campaignJson = inAppCampaign.toJSON();
    if (Platform.OS == PLATFORM_ANDROID) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNAndroid.selfHandledPrimaryClicked(campaignJson);
    } else if (Platform.OS == PLATFORM_IOS) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNiOS.selfHandledPrimaryClicked(campaignJson);
    }
  },

  /**
   * Call this method to track when self handled in app widget(other than Primary Widget) is clicked.
   * @param {MoEInAppCampaign}campInfo : campaign information object
   */
  selfHandledClicked: function (inAppCampaign: MoEInAppCampaign) {
    commonValidationCheck();
    if (!(inAppCampaign instanceof MoEInAppCampaign)) {
      showError(
        "selfHandledClicked: inAppCampaign must of MoEInAppCampaign type"
      );
      return;
    }
    let campaignJson = inAppCampaign.toJSON();
    if (Platform.OS == PLATFORM_ANDROID) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNAndroid.selfHandledClicked(campaignJson);
    } else if (Platform.OS == PLATFORM_IOS) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNiOS.selfHandledClicked(campaignJson);
    }
  },

  /**
   * Call this method to track dismiss actions on the inApp.
   * @param {MoEInAppCampaign}campInfo : campaign information object
   */
  selfHandledDismissed: function (inAppCampaign: MoEInAppCampaign) {
    commonValidationCheck();
    if (!(inAppCampaign instanceof MoEInAppCampaign)) {
      showError(
        "selfHandledDismissed: inAppCampaign must of MoEInAppCampaign type"
      );
      return;
    }
    let campaignJson = inAppCampaign.toJSON();
    if (Platform.OS == PLATFORM_ANDROID) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNAndroid.selfHandledDismissed(campaignJson);
    } else if (Platform.OS == PLATFORM_IOS) {
      {/* Ignore TS Ignore
      // @ts-ignore */}
      MoERNiOS.selfHandledDismissed(campaignJson);
    }
  },

  /**
   * Call this method to the current context for inApp module.
   * @param {Array{String}}contexts : Name of all the contexts
   */
  setCurrentContext: function (contexts: Array<String>) {
    commonValidationCheck();
    if (!MoEHelper.validateArrayOfString(contexts)) {
      showError(
        "setCurrentContext: contexts must be a non empty array of strings"
      );
      return;
    }
    let payload = {
      contexts: contexts,
    };
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.setAppContext(payload);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.setAppContext(payload);
    }
  },

  /**
   * Call this method to the reset current context for inApp module.
   */
  resetCurrentContext: function () {
    commonValidationCheck();
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.resetAppContext();
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.resetAppContext();
    }
  },

  /**
   * Pass the FCM push token to the MoEngage SDK.
   * Note: This API is only for Android platform and is a no-operation method for other plaforms.
   *
   * @param {String} pushToken
   */
  passFcmPushToken: function (pushToken: string) {
    commonValidationCheck();
    console.log("Will process push token");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.passFcmPushToken(pushToken);
    } else {
      console.log("This api is not supported on iOS platform.");
    }
  },
  /**
   * Pass push payload to the MoEngage SDK.
   * Note: This API is only for Android platform and is a no-operation method for other plaforms.
   *
   * @param {JSONObject} pushPayload
   */
  passFcmPushPayload: function (pushPayload: object) {
    commonValidationCheck();
    console.log("Will process push payload.");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.passFcmPushPayload(pushPayload);
    } else {
      console.log("This api is not supported on iOS platform.");
    }
  },

  enableSDKLogs: function () {
    commonValidationCheck();
    console.log("Enabling SDK logs");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.enableSDKLogs();
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.enableSDKLogs();
    }
  },

  /**
   * Call this method to register for push notification in iOS
   */
  registerForPush: function () {
    commonValidationCheck();
    console.log("Will registerForPush");
    if (Platform.OS == PLATFORM_ANDROID) {
      console.log("This api is not supported on android platform.");
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.registerForPush();
    }
  },

  /**
   * Call this method to disable Inbox/ Notification Center feature.
   */
  disableInbox: function () {
    commonValidationCheck();
    console.log("Will disableInbox");
    if (Platform.OS == PLATFORM_ANDROID) {
      console.log("This api is not supported on android platform.");
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.disableInbox();
    }
  },

  /**
   * Call this method to start Geofence tracking, this method also asks for location permission if not already done
   */
  startGeofenceMonitoring() {
    if (Platform.OS == PLATFORM_ANDROID) {
      //Android code
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.startGeofenceMonitoring();
    }
  },

  optOutDataTracking: function (shouldOptOutDataTracking: boolean) {
    console.log("Will opt out data tracking");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.optOutDataTracking(shouldOptOutDataTracking);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.optOutDataTracking(shouldOptOutDataTracking);
    }
  },

  optOutPushNotification: function (shouldOptOutPushNotification: boolean) {
    console.log("Will opt out push notifications");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.optOutPushNotification(shouldOptOutPushNotification);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.optOutPushNotification(shouldOptOutPushNotification);
    }
  },

  optOutInAppNotification: function (shouldOptOutInApp: boolean) {
    console.log("Will opt out in-app notifications");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.optOutInAppNotification(shouldOptOutInApp);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.optOutInAppNotification(shouldOptOutInApp);
    }
  },

   /**
    * Pass the HMS PushKit push token to the MoEngage SDK.
    * Note: This API is only for Android platform and is a no-operation method for other plaforms.
    *
    * @param {String} pushToken
    */
   passPushKitPushToken: function (pushToken: string) {
    commonValidationCheck();
    console.log("Will process push-kit push token");
    if (Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.passPushKitPushToken(pushToken);
    } else {
      console.log("This api is not supported on iOS platform.");
    }
  },

  enableSdk: function() {
    console.log("Will enable SDK");
    if(Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.updateSdkState(true);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.updateSdkState(true);
    }
  },

  disableSdk: function() {
    console.log("Will disable SDK");
    if(Platform.OS == PLATFORM_ANDROID) {
      MoERNAndroid.updateSdkState(false);
    } else if (Platform.OS == PLATFORM_IOS) {
      MoERNiOS.updateSdkState(false);
    }
  }
};

export {
  MoEInAppCampaign,
  MoEInAppCustomAction,
  MoEInAppNavigation,
  MoEInAppSelfHandledCampaign,
  MoEGeoLocation,
  MoEProperties,
  MoEAppStatus,
};
export default ReactMoE;
