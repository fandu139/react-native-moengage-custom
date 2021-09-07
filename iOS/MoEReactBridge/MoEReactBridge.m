//
//  MoEngageManager.m
//  MoEngage
//
//  Created by Chengappa C D on 11/11/16.
//  Copyright © 2016 MoEngage. All rights reserved.
//

#import "MoEReactBridge.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTBundleURLProvider.h>
#import <MoEPluginBase/MoEPluginBase.h>
#import <MoEngage/MoEngage.h>
#import "MOReactInitializer.h"
#import "MoEReactConstants.h"

@interface MoEReactBridge()

@end

@implementation MoEReactBridge

#pragma mark- Observers
// Will be called when this module's first listener is added.
-(void)startObserving {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(emitEventInternal:)
                                                 name:kEventEmitted
                                               object:nil];
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self name:kEventEmitted object:nil];
}

-(void)emitEventInternal:(NSNotification *)notification
{
    NSDictionary* userInfo = notification.userInfo;
    if (userInfo) {
        NSString* name = userInfo[kEventName];
        NSDictionary* payload = userInfo[kPayloadDict];
        if (name != nil && payload != nil) {
            [self sendEventWithName:name body:payload];
        }
    }
}


#pragma mark- Event Emitters
- (NSArray<NSString *> *)supportedEvents
{
    return @[kEventNamePushClicked,kEventNamePushTokenGenerated,kEventNameInAppCampaignShown,kEventNameInAppCampaignClicked, kEventNameInAppCampaignDismissed, kEventNameInAppSelfHandledCampaign, kEventNameInAppCampaignCustomAction];
}

RCT_EXPORT_MODULE();

#pragma mark- Initialization Method

RCT_EXPORT_METHOD(initialize)
{
    [[MoEPluginBridge sharedInstance] pluginInitialized];
}

#pragma mark- Set AppStatus

RCT_EXPORT_METHOD(setAppStatus:(NSDictionary *)dictStatus)
{
    [[MoEPluginBridge sharedInstance] setAppStatus:dictStatus];
}

#pragma mark - trackEvent

RCT_EXPORT_METHOD(trackEventWithProperties:(NSDictionary *)attributes)
{
    [[MoEPluginBridge sharedInstance] trackEventWithPayload:attributes];
}

#pragma mark- User Attribute Methods
#pragma mark setUserAttribute
RCT_EXPORT_METHOD(setUserAttribute:(NSDictionary *)userAttributeDict)
{
    [[MoEPluginBridge sharedInstance] setUserAttributeWithPayload:userAttributeDict];
}

RCT_EXPORT_METHOD(setAlias:(NSDictionary *)aliasDictionary)
{
    [[MoEPluginBridge sharedInstance] setAlias:aliasDictionary];
}

#pragma mark- Push Notifications

RCT_EXPORT_METHOD(registerForPushNotification)
{
    [[MoEPluginBridge sharedInstance] registerForPush];
}

#pragma mark Disable Inbox

RCT_EXPORT_METHOD(disableInbox)
{
    [MOMessaging sharedInstance].disableInbox = YES;
}

#pragma mark- inApp Methods
#pragma mark Show InApp

RCT_EXPORT_METHOD(showInApp)
{
    [[MoEPluginBridge sharedInstance] showInApp];
}

#pragma mark Self handled In App

RCT_EXPORT_METHOD(getSelfHandledInApp)
{
    [[MoEPluginBridge sharedInstance] getSelfHandledInApp];
}

RCT_EXPORT_METHOD(updateSelfHandledInAppStatusWithPayload:(NSDictionary *)campInfo) {
    [[MoEPluginBridge sharedInstance] updateSelfHandledInAppStatusWithPayload:campInfo];
}

#pragma mark InApp Contexts

RCT_EXPORT_METHOD(setAppContext:(nonnull NSDictionary *)dictContext)
{
    [[MoEPluginBridge sharedInstance] setInAppContexts:dictContext];
}

RCT_EXPORT_METHOD(resetAppContext)
{
    [[MoEPluginBridge sharedInstance] invalidateInAppContexts];
}


#pragma mark- Enable SDK Logs

RCT_EXPORT_METHOD(enableSDKLogs)
{
    [[MoEPluginBridge sharedInstance] enableLogs];
}

#pragma mark- Reset User

RCT_EXPORT_METHOD(logout)
{
    [[MoEPluginBridge sharedInstance] resetUser];
}

#pragma mark- Validate App version

RCT_EXPORT_METHOD(validateSDKVersion:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    if ([[MoEPluginBridge  sharedInstance] isValidNativeDependencyIntegrated]) {
        resolve([NSNumber numberWithBool:YES]);
    } else {
        reject(NULL, @"MoEngage: Unsupported SDK version", NULL);
    }
}

#pragma mark- GeoFence Monitoring
RCT_EXPORT_METHOD(startGeofenceMonitoring) {
    // Init Geofence if included
    [[MoEPluginBridge sharedInstance] startGeofenceMonitoring];
}

#pragma mark- Opt out Tracking
RCT_EXPORT_METHOD(optOutTracking:(nonnull NSDictionary *)dictTracking) {
    [[MoEPluginBridge sharedInstance] optOutTracking:dictTracking];
}

#pragma mark- Update SDK State
RCT_EXPORT_METHOD(updateSDKState:(nonnull NSDictionary *)stateDict) {
    [[MoEPluginBridge sharedInstance] updateSDKState:stateDict];
}

@end
