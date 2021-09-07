## 7.2.0
Release Date: 17th March 2021
- Android Multi-Instance Phase 1 update.

## 7.1.0
Release Date: 17th March 2021
- Added support to pass Array(String/Number) as event attributes in addAttribute method of MoEProperties.

## 7.0.0
Release Date: 25th February 2021
- iOS 
    - Plugin now supports iOS 10.0 and above
    - Native Dependencies updated to support MoEngage-iOS-SDK `7.*` and above
    - Base plugin version dependency updated to `~> 2.0.2`.
- Android 
    - Native SDK updated to support `11.0.04` and above
    - Base Plugin updated to `2.0.00`
    - API to pass PushKit Token JS
- Added APIs to enable and disable MoEngage SDK.
- Added API to register a callback for push token generated event.

## 6.1.7
Release Date: 15th February 2021
- Android artifacts use manven central instead of Jcenter.
  - Android Native SDK version `10.6.01`
  - Android Plugin Base `1.2.01`

## 6.1.6
Release Date: 21st January 2021
- BugFix iOS: Token registered event skipped as its currently not supported in React Native.

## 6.1.5
Release Date: 18th January 2021
- iOS Base Plugin dependency updated to support version `1.2` and above.

## 6.1.4
Release Date: 7th December 2020
- Support for extending Native Android Callbacks if required.
- Native Android SDK version required is `10.5.00` or above.
- iOS Base Plugin Updated to version `1.1.1` to ensure SDK sets the UNUserNotification Center delegate only in cases where its `nil`.

## 6.1.3
Release Date: 25th November 2020
- Android Base plugin dependency type updated to ensure compatability across gradle versions.

## 6.1.2
Release Date: 23rd November 2020
- Android Base Plugin Updated to enable Custom Callbacks.

## 6.1.1
Release Date: 22nd October 2020
- Bugfix
  - Events not being marked as non-interactive on Android
  
## 6.1.0
Release Date: 23rd September, 2020
- Support for Push Templates added 

 ## 6.0.0
 Release Date: 7th August 2020
 -  Breaking change in Initialization of iOS platform, refer to the [developer docs](https://docs.moengage.com/docs/sdk-initialization-1#ios) to know more about the changes. 
  - Support for Self-Handled In-App
  - Support for In-App V3
  - Event listeners now return a model Object instead of JSON
  - `setUserBirthday()` only accepts ISO-8601 String 
  - Breaking changes in APIs
  - Android SDK updated to `10.2.02`
  - iOS SDK dependency changed to support versions greater than `6.0.0`.

|                            Then                           |                            Now                            |
|:---------------------------------------------------------:|:---------------------------------------------------------:|
|              ReactMoE.isExistingUser(boolean)             |            ReactMoE.setAppStatus(MoEAppStatus)            |
|          ReactMoE.trackEvent(string, JSONObject)          |         ReactMoE.trackEvent(string, MoEProperties         |
|          ReactMoE.setUserLocation(number, number)         |          ReactMoE.setUserLocation(MoEGeoLocation)         |
| ReactMoE.setUserAttributeLocation(string, number, number) | ReactMoE.setUserAttributeLocation(string, MoEGeoLocation) |
|                ReactMoE.setLogLevel(number)               |                  ReactMoE.enableSDKLogs()                 |

  - Android Specific Changes
    - APIs to pass push token and payload has changed

|                 Then                 |                   Now                   |
|:------------------------------------:|:---------------------------------------:|
|    ReactMoE.passPushToken(string)    |    ReactMoE.passFcmPushToken(string)    |
| ReactMoE.passPushPayload(JSONObject) | ReactMoE.passFcmPushPayload(JSONObject) |
 
 ## 5.0.0 
 Release Date: 18th Feb 2020
  - New Event Listeners added for both iOS and Android platforms i.e, `pushClicked`, `inAppCampaignShown` and `inAppCampaignShown`.
  - Earlier iOS Push and InApp Events deprecated to have it common for both Android and iOS (`notificationClicked`,`inAppShown` and `inAppClicked`)
  - APIs to pass push token and payload from React-Native Component/Javascript (Android Only API)
  - Fixing datatype conversion for user attributes long getting converted to double.

## 4.1.0
 Release Date: 23rd Dec 2019
 - Android SDK version updated to 9.8.01
 - integration_type and integration_version added for both Android and iOS



