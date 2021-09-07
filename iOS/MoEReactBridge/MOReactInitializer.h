//
//  MOReactInitializer.h
//  ReactNativeMoEngage
//
//  Created by Chengappa C D on 14/02/20.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <MoEngage/MoEngage.h>
NS_ASSUME_NONNULL_BEGIN

@interface MOReactInitializer : NSObject

+(instancetype)sharedInstance;

/// Initialization Methods to setup SDK with configuration parameters from Info.plist file
/// @param launchOptions Launch Options dictionary
/// @warning Make sure to call only one of the initialization methods available (either with plist OR with MOSDKConfig instance)
/// @version 6.0.0 and above
- (void)intializeSDKWithLaunchOptions:(NSDictionary*)launchOptions;

/// Initialization Methods to setup SDK with configuration parameters from Info.plist file
/// @param isSdkEnabled Bool indicating if SDK is Enabled/Disabled, refer (link)[https://docs.moengage.com/docs/gdpr-compliance-1#enabledisable-sdk] for more info
/// @param launchOptions Launch Options dictionary
/// @warning Make sure to call only one of the initialization methods available (either with plist OR with MOSDKConfig instance)
/// @version 7.0.0 and above
- (void)intializeSDKWithState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions;

/// Initialization Methods to setup SDK with MOSDKConfig instance instead of from Info.plist file
/// @param sdkConfig MOSDKConfig instance for SDK configuration
/// @param launchOptions Launch Options dictionary
/// @warning Make sure to call only one of the initialization methods available (either with plist OR with MOSDKConfig instance)
/// @version 7.0.0 and above
- (void)intializeSDKWithConfig:(MOSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions;

/// Initialization Methods to setup SDK with MOSDKConfig instance instead of from Info.plist file
/// @param sdkConfig MOSDKConfig instance for SDK configuration
/// @param isSdkEnabled Bool indicating if SDK is Enabled/Disabled, refer (link)[https://docs.moengage.com/docs/gdpr-compliance-1#enabledisable-sdk] for more info
/// @param launchOptions Launch Options dictionary
/// @warning Make sure to call only one of the initialization methods available (either with plist OR with MOSDKConfig instance)
/// @version 7.0.0 and above
- (void)intializeSDKWithConfig:(MOSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions;
@end

NS_ASSUME_NONNULL_END
