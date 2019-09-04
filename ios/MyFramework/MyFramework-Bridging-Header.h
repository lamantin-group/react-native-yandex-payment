//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//

//#import <Foundation/Foundation.h>

//#include <UIKit/UIKit.h>
// required for all types of bridge
//#import "React/RCTBridgeModule.h"

// required only for UI Views
//#import "React/RCTViewManager.h"

// required only for Event Emitters
// #import "React/RCTEventEmitter.h"

// required for calling methods on ViewManagers
// #import "React/RCTUIManager.h"

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(YandexPayment, RCTViewManager)

RCT_EXTERN_METHOD(attach:
                  (NSDictionary *) map
                  callbacker:(RCTResponseSenderBlock) callback
                  )
@end
