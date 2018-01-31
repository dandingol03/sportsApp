//
//  YMPlayerManager.m
//  sportsApp
//
//  Created by 丁一明 on 2017/11/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YMPlayerManager.h"

@implementation YMPlayerManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  UIView* playView = [[UIView alloc] initWithFrame:CGRectMake(0,0,300,300)];
  playView.backgroundColor = [UIColor blueColor];
  PLPlayerOption *option = [PLPlayerOption defaultOption];
  [option setOptionValue:@15 forKey:PLPlayerOptionKeyTimeoutIntervalForMediaPackets];
  NSURL *url = [NSURL URLWithString:@"rtmp://pili-live-rtmp.sportshot.cn/sportshot/002"];
  self.player = [PLPlayer playerWithURL:url option:option];
  self.player.delegate = self;
  [playView addSubview:self.player.playerView];
  [self.player play];
  return playView;
}



@end
