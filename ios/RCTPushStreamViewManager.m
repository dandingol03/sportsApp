//
//  RCTPushStreamViewManager.m
//  sportsApp
//
//  Created by 丁一明 on 2017/11/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTPushStreamViewManager.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTEventDispatcher.h>
//#import "MyView.h"

@implementation RCTPushStreamViewManager

RCT_EXPORT_MODULE()

#pragma mark - 导出函数供JS调用

RCT_EXPORT_METHOD(startPush:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  NSURL* pushURL = [NSURL URLWithString:@"rtmp://pili-publish.sportshot.cn/sportshot/EEvvee?e=1517362797&token=2M63A85U1GpU37_hxw6zmCYt7ia0YPIEpOjLeJt5:bd1DR5WDI7mcpmotloXP7_GyAXc="];
  [self.session startStreamingWithPushURL:pushURL feedback:^(PLStreamStartStateFeedback feedback) {
    if (feedback == PLStreamStartStateSuccess) {
      NSLog(@"Streaming started.");
    }
    else {
      NSLog(@"Oops.");
    }
  }];
}

/// 重写这个方法，返回将要提供给RN使用的视图
- (UIView *)view {
  UIView* view = [[UIView alloc] initWithFrame:(CGRectMake(0, 0, 300, 300))];
  PLVideoCaptureConfiguration *videoCaptureConfiguration = [PLVideoCaptureConfiguration defaultConfiguration];
  PLAudioCaptureConfiguration *audioCaptureConfiguration = [PLAudioCaptureConfiguration defaultConfiguration];
  PLVideoStreamingConfiguration *videoStreamingConfiguration = [PLVideoStreamingConfiguration defaultConfiguration];
  PLAudioStreamingConfiguration *audioStreamingConfiguration = [PLAudioStreamingConfiguration defaultConfiguration];
  self.session = [[PLMediaStreamingSession alloc] initWithVideoCaptureConfiguration:videoCaptureConfiguration audioCaptureConfiguration:audioCaptureConfiguration videoStreamingConfiguration:videoStreamingConfiguration audioStreamingConfiguration:audioStreamingConfiguration stream:nil];
  [view addSubview:self.session.previewView];
  
  return view;
}


///// 拿到当前View
//- (MyView *) getViewWithTag:(NSNumber *)tag {
//  NSLog(@"%@", [NSThread currentThread]);
//  
//  UIView *view = [self.bridge.uiManager viewForReactTag:tag];
//  return [view isKindOfClass:[MyView class]] ? (MyView *)view : nil;
//}
//
//- (dispatch_queue_t)methodQueue
//{
//  return dispatch_get_main_queue();
//}

@end
