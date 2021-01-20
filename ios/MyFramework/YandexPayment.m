//
//  YandexPayment.m
//  MyFramework
//
//  Created by Антон Власов on 04/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

#import "MyFramework-Bridging-Header.h"

@interface RCT_EXTERN_MODULE(YandexPayment, RCTViewManager)

RCT_EXTERN_METHOD(attach: (NSDictionary *) map
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(close)

RCT_EXTERN_METHOD(show3ds: (NSString *) requestUrl
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
