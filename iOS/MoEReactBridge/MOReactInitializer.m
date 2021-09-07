//
//  MOReactInitializer.m
//  ReactNativeMoEngage
//
//  Created by Chengappa C D on 14/02/20.
//

#import "MOReactInitializer.h"
#import "MOReactPluginInfo.h"
#import <MoEngage/MoEngage.h>
#import <MoEPluginBase/MoEPluginBase.h>
#import "MoEReactConstants.h"

@interface MOReactInitializer() <MoEPluginBridgeDelegate>

@end

@implementation MOReactInitializer

#pragma mark- Initialization

+(instancetype)sharedInstance{
    static dispatch_once_t onceToken;
    static MOReactInitializer *instance;
    dispatch_once(&onceToken, ^{
        instance = [[MOReactInitializer alloc] init];
    });
    return instance;
}

// Client Exposed Method
- (void)intializeSDKWithLaunchOptions:(NSDictionary*)launchOptions{
    [self intializeSDKWithState:true andLaunchOptions:launchOptions];
}

- (void)intializeSDKWithState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions{
    MOSDKConfig *sdkConfig = [self fetchSDKConfig];
    [self intializeSDKWithConfig:sdkConfig withSDKState:isSdkEnabled andLaunchOptions:launchOptions];
}

- (void)intializeSDKWithConfig:(MOSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions{
    [self intializeSDKWithConfig:sdkConfig withSDKState:true andLaunchOptions:launchOptions];
}

- (void)intializeSDKWithConfig:(MOSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions{
    [[MoEPluginBridge sharedInstance] trackPluginVersion:MO_REACT_PLUGIN_VERSION forIntegrationType:ReactNative];
    [MoEPluginBridge sharedInstance].bridgeDelegate = self;
  
    if (sdkConfig.moeAppID == nil || sdkConfig == nil) {
        return;
    }
    
    sdkConfig.pluginIntegrationType = REACT_NATIVE;
    sdkConfig.pluginIntegrationVersion = MO_REACT_PLUGIN_VERSION;
    
    [[MoEPluginInitializer sharedInstance] intializeSDKWithConfig:sdkConfig withSDKState:isSdkEnabled andLaunchOptions:launchOptions];
}

-(MOSDKConfig*)fetchSDKConfig {
    NSDictionary *infoDict = [[NSBundle mainBundle] infoDictionary];
    MOSDKConfig *sdkConfig = [[MoEngage sharedInstance] getDefaultSDKConfiguration];
   
    if ( [infoDict objectForKey: kMoEngage] != nil && [infoDict objectForKey: kMoEngage] != [NSNull null]) {
        NSDictionary* moeDict = [infoDict objectForKey: kMoEngage];
        if ([moeDict objectForKey: kAppId] != nil && [moeDict objectForKey:kAppId] != [NSNull null]) {
           
            NSString *appId = [moeDict objectForKey: kAppId];
           
            if (appId.length > 0) {
                if (sdkConfig == nil) {
                    sdkConfig = [[MOSDKConfig alloc] initWithAppID:appId];
                }
                else{
                    sdkConfig.moeAppID = appId;
                }
            }
            else{
                NSLog(@"%@", kInvalidAppIdAlert);
                return nil;
            }
        }
    
        if ([moeDict objectForKey: kDataCenter] != nil && [moeDict objectForKey:kDataCenter] != [NSNull null]) {
            sdkConfig.moeDataCenter = [self getDataCenterFromString: [moeDict objectForKey: kDataCenter]];
        }
        
        if ([moeDict objectForKey:kAppGroupId] != nil && [moeDict objectForKey:kAppGroupId] != [NSNull null]) {
             sdkConfig.appGroupID = [moeDict objectForKey:kAppGroupId];
        }
        
        if ([moeDict objectForKey:kDisablePeriodicFlush] != nil && [moeDict objectForKey:kDisablePeriodicFlush] != [NSNull null]) {
            sdkConfig.analyticsDisablePeriodicFlush = [moeDict getBooleanForKey:kDisablePeriodicFlush];
        }
        
        if ([moeDict objectForKey:kPeriodicFlushDuration] != nil && [moeDict objectForKey:kPeriodicFlushDuration] != [NSNull null]) {
             sdkConfig.analyticsPeriodicFlushDuration = [moeDict getIntegerForKey:kPeriodicFlushDuration];
        }
        
        if ([moeDict objectForKey:kEncryptNetworkRequests] != nil && [moeDict objectForKey:kEncryptNetworkRequests] != [NSNull null]) {
             sdkConfig.encryptNetworkRequests = [moeDict getBooleanForKey:kEncryptNetworkRequests];
        }
        
        if ([moeDict objectForKey:kOptOutDataTracking] != nil && [moeDict objectForKey:kOptOutDataTracking] != [NSNull null]) {
             sdkConfig.optOutDataTracking = [moeDict getBooleanForKey:kOptOutDataTracking];
        }
        
        if ([moeDict objectForKey:kOptOutPushNotifications] != nil && [moeDict objectForKey:kOptOutPushNotifications] != [NSNull null]) {
             sdkConfig.optOutPushNotification = [moeDict getBooleanForKey:kOptOutPushNotifications];
        }
        
        if ([moeDict objectForKey:kOptOutInApp] != nil && [moeDict objectForKey:kOptOutInApp] != [NSNull null]) {
             sdkConfig.optOutInAppCampaign = [moeDict getBooleanForKey:kOptOutInApp];
        }
        
        if ([moeDict objectForKey:kOptOutIDFATracking] != nil && [moeDict objectForKey:kOptOutIDFATracking] != [NSNull null]) {
             sdkConfig.optOutIDFATracking = [moeDict getBooleanForKey:kOptOutIDFATracking];
        }
        
        if ([moeDict objectForKey:kOptOutIDFVTracking] != nil && [moeDict objectForKey:kOptOutIDFVTracking] != [NSNull null]) {
             sdkConfig.optOutIDFVTracking = [moeDict getBooleanForKey:kOptOutIDFVTracking];
        }
    }
    
    return  sdkConfig;
}

- (MODataCenter)getDataCenterFromString:(NSString*)stringVal {
    MODataCenter dataCenter = DATA_CENTER_01;
    
    if ([stringVal  isEqual:kDataCenter1])
    {
        dataCenter = DATA_CENTER_01;
    }
    else if ([stringVal  isEqual:kDataCenter2])
    {
        dataCenter = DATA_CENTER_02;
    }
    else if ([stringVal  isEqual:kDataCenter3])
    {
        dataCenter = DATA_CENTER_03;
    }
    else
    {
        NSLog(@"%@", kInvalidDataCenterAlert);
    }
    
    return dataCenter;
}

- (void)sendMessageWithName:(NSString *)name andPayload:(NSDictionary *)payloadDict {
    NSMutableDictionary* updatedDict = [NSMutableDictionary dictionary];
    
    if (payloadDict) {
        NSDictionary *payload = payloadDict[kPayload];
        
        NSError *err;
        NSData * jsonData = [NSJSONSerialization  dataWithJSONObject:payload options:0 error:&err];
        if (jsonData) {
            NSString *strPayload = [[NSString alloc] initWithData:jsonData  encoding:NSUTF8StringEncoding];
            updatedDict[kPayload] = strPayload;
        } else {
            NSLog(@"Error converting to dictionary to string %@", err.localizedDescription);
        }
    }
    
    NSDictionary* userInfo = @{kEventName:name,kPayloadDict:updatedDict};
    [[NSNotificationCenter defaultCenter] postNotificationName:kEventEmitted
                                                        object:self
                                                      userInfo:userInfo];

}

@end
