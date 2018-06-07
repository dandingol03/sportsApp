//
//  FaceViewManager.m
//  sportsApp
//
//  Created by 李学庆 on 2018/6/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FaceViewManager.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTEventDispatcher.h>
#import "AppDelegate.h"
#import "DetectionViewController.h"


@implementation FaceViewManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(FaceViewManager)

#pragma mark - 导出函数供JS调用

RCT_EXPORT_METHOD(getFaceView:(NSString *)msg )
{
  NSLog(@"RN传入原生界面的数据为:%@",msg);
  //主要这里必须使用主线程发送,不然有可能失效
 [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(testNotificationEventReminderReceived:) name:@"testNotification" object:nil];
  dispatch_async(dispatch_get_main_queue(), ^{
    //[[NSNotificationCenter defaultCenter]postNotificationName:@"RNOpenVC" object:nil];
    
    AppDelegate *app= (AppDelegate *)[[UIApplication sharedApplication] delegate];
    //self.paramsString = msg;
    [app.nav pushViewController:[DetectionViewController new] animated:YES];
  });

}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventName"]; //这里返回的将是你要发送的消息名的数组。
}


- (void)testNotificationEventReminderReceived:(NSNotification *)notification
{
  NSLog(@"=====================接收到了完成播放的通知");
  
  NSLog(@"%@", notification);
  NSArray *eventName =  [notification object];;
  //NSLog(eventName);
  /// 将消息转发到JS中
  [self sendEventWithName:@"EventName"
                     body:eventName[0]];
}



@end
