//
//  RCTPushStreamViewManager.h
//  sportsApp
//
//  Created by 丁一明 on 2017/11/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import "PLMediaStreamingKit.h"
#import <React/RCTBridgeModule.h>

@interface RCTPushStreamViewManager : RCTViewManager <RCTBridgeModule>
@property (nonatomic, strong) PLMediaStreamingSession *session;
@end
