//
//  YMPlayerManager.h
//  sportsApp
//
//  Created by 丁一明 on 2017/11/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <UIKit/UIKit.h>
//#import <PLPlayerKit/PLPlayerKit.h>
#import <React/RCTComponent.h>

@interface YMPlayerManager : RCTViewManager <PLPlayerDelegate>

@property (nonatomic, strong) PLPlayer  *player;
@end
