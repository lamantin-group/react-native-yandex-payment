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
                  callbacker: (RCTResponseSenderBlock) callback)

@end
