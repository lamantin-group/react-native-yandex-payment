//
//  YandexPayment.m
//  MyFramework
//
//  Created by Антон Власов on 02/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(YandexCheckout, RCTViewManager)

RCT_EXTERN_METHOD(attach:
                  (RCTPromiseResolveBlock) resolve
                  rejecter:(RCTPromiseRejectBlock) reject
                  )

RCT_EXTERN_METHOD(fetchPaymentToken:
                  (NSDictionary *) map
                  callbacker:(RCTResponseSenderBlock) callback
                  )

RCT_EXTERN_METHOD(detach)
@end
