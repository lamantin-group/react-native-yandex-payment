//
//  YandexPayment.m
//  MyFramework
//
//  Created by Антон Власов on 03/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(YandexPayment, RCTViewManager)

RCT_EXTERN_METHOD(attach:
                  (NSDictionary *) map
                  callbacker:(RCTResponseSenderBlock) callback
                  )
@end
