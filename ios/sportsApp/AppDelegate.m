/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "RCTBaiduMapViewManager.h"
#import "../Libraries/LinkingIOS/RCTLinkingManager.h"
#import <PLMediaStreamingKit/PLMediaStreamingKit.h>
#import "DetectionViewController.h"
#import <IDLFaceSDK/IDLFaceSDK.h>
#import "FaceParameterConfig.h"



@implementation AppDelegate




- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"sportsApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  //self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //关键代码
  _nav=[[UINavigationController alloc]initWithRootViewController:rootViewController];
  _nav.navigationBarHidden = YES;
  
  self.window.rootViewController = _nav;
  
  
//  
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(testNotificationEventReminderReceived:) name:@"testNotification" object:nil];
  
  
  [RCTBaiduMapViewManager initSDK:@"Y28i2b25u7IXcswLeWzap7vhSGqvYBi1"];
  
  [PLStreamingEnv initEnv];
  
  [PLStreamingEnv setLogLevel:PLStreamLogLevelDebug];
  [PLStreamingEnv enableFileLogging];
  
  
  NSString* licensePath = [[NSBundle mainBundle] pathForResource:FACE_LICENSE_NAME ofType:FACE_LICENSE_SUFFIX];
  NSAssert([[NSFileManager defaultManager] fileExistsAtPath:licensePath], @"license文件路径不对，请仔细查看文档");
  [[FaceSDKManager sharedInstance] setLicenseID:FACE_LICENSE_ID andLocalLicenceFile:licensePath];
  NSLog(@"canWork = %d",[[FaceSDKManager sharedInstance] canWork]);
  
  return YES;
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

-(void)doNotification:(NSNotification *)notification
{
  NSLog(@"成功收到===>通知");
  //将通知里面的userInfo取出来，使用
 // [self.nav pushViewController:[DetectionViewController new] animated:YES];
  
  //  //第三步移除通知
  //  [[NSNotificationCenter defaultCenter] removeObserver:self name:@"RNOpenVC" object:nil];
  
}


@end
