import Foundation

import YooKassaPayments
import YooKassaPaymentsApi


@objc(YandexPayment)
class YandexPayment: RCTViewManager, TokenizationModuleOutput {
    
    var storedResolver: RCTPromiseResolveBlock?
    var storedRejecter: RCTPromiseRejectBlock?
    var viewController: (UIViewController & TokenizationModuleInput)?
    
    @objc
    func show3ds(_ requestUrl: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock) -> Void {
        // decline previous callback
        if  self.storedRejecter != nil {
            self.storedRejecter?("decline","You are trying to show functionality without clossing previous",nil)
        }
        self.storedResolver = resolver
        self.storedRejecter = rejecter
        if let viewController = viewController {
            viewController.start3dsProcess(requestUrl: requestUrl)
        }
    }
    
    @objc
    func close() -> Void {
        if let viewController = viewController  {
            DispatchQueue.main.async {
                viewController.dismiss(animated: true)
            }
        }
    }
    
    @objc
    func attach(_ map: NSDictionary,
                resolver: @escaping RCTPromiseResolveBlock,
                rejecter: @escaping RCTPromiseRejectBlock) -> Void {
        // decline previous callback
        if  self.storedRejecter != nil {
            self.storedRejecter?("decline","You are trying to show functionality without clossing previous",nil)
        }
        self.storedResolver = resolver
        self.storedRejecter = rejecter
        let shop = Shop(
            id: map["SHOP_ID"] as! String,
            token: map["SHOP_TOKEN"] as! String,
            name: map["SHOP_NAME"] as! String,
            description: map["SHOP_DESCRIPTION"] as! String,
            returnUrl: map["SHOP_RETURN_URL"] as! String
        )
        
        let payment = Payment(
            amount: map["PAYMENT_AMOUNT"] as! Double,
            currency: stringToCurrency(string: map["PAYMENT_CURRENCY"] as! String),
            types: arrayToSetPaymentTypes(nsArray: (map["PAYMENT_TYPES_ARRAY"] as! NSArray)),
            savePaymentMethod: stringToSavePaymentType(string: map["PAYMENT_SAVE_TYPE"] as! String),
            moneyAuthClientId: map["PAYMENT_YOO_MONEY_CLIENT_ID"] as! String
        )
        
        let moduleInputData = TokenizationModuleInputData(
            clientApplicationKey: shop.token,
            shopName: shop.name,
            purchaseDescription: shop.description,
            amount: Amount(value: Decimal(payment.amount), currency: payment.currency),
            tokenizationSettings: TokenizationSettings(paymentMethodTypes: PaymentMethodTypes(rawValue: payment.types)),
            savePaymentMethod: payment.savePaymentMethod,
            moneyAuthClientId: payment.moneyAuthClientId
        )
        let inputData: TokenizationFlow = .tokenization(moduleInputData)
        viewController = TokenizationAssembly.makeModule(
            inputData: inputData,
            moduleOutput: self
        )
        
        DispatchQueue.main.async {
            let rootViewController = UIApplication.shared.keyWindow!.rootViewController!
            rootViewController.present(self.viewController!, animated: true, completion: nil)
        }
    }
    
    // TokenizationModuleOutput interface callbacks
    func didSuccessfullyPassedCardSec(on module: TokenizationModuleInput) {
        DispatchQueue.main.async {
            if let resolver = self.storedResolver {
                resolver("RESULT_OK")
            }
            self.storedResolver = nil
            self.storedRejecter = nil
            self.viewController?.dismiss(animated: true)
        }
    }
    
    func tokenizationModule(_ module: TokenizationModuleInput,
                            didTokenize token: Tokens,
                            paymentMethodType: PaymentMethodType) {
        if let resolver = self.storedResolver {
            resolver([
                token.paymentToken,
                paymentTypeToString(paymentType: paymentMethodType)
                ])
        }
        self.storedResolver = nil
        self.storedRejecter = nil
    }
        
    func didFinish(on module: TokenizationModuleInput, with error: YooKassaPaymentsError?) {
        DispatchQueue.main.async {
            if let rejecter = self.storedRejecter {
                NSLog("123")
                rejecter("problems", "", error)
            }
            self.storedResolver = nil
            self.storedRejecter = nil
            self.viewController?.dismiss(animated: true)
        }
    }
    
//  #pragma mark - Helpers
    func paymentTypeToString(paymentType: PaymentMethodType) -> String {
        switch paymentType {
            case .bankCard:
                return "BANK_CARD"
            case .yooMoney:
                return "YOO_MONEY"
            case .sberbank:
                return "SBERBANK"
            case .applePay:
                return "PAY"
            default:
              return "BANK_CARD"
        }
    }
    
    func arrayToSetPaymentTypes(nsArray: NSArray) -> Set<PaymentMethodType> {
        var set: Set<PaymentMethodType> = []

        let array: [String] = nsArray.compactMap({ ($0 as! String) })
        for type in array {
            if type == "YOO_MONEY" {
                set.insert(.yooMoney)
            } else if type == "BANK_CARD" {
                set.insert(.bankCard)
            } else if type == "SBERBANK" {
                set.insert(.sberbank)
            } else if type == "PAY" {
                set.insert(.applePay)
            }
        }
        
        if set.isEmpty {
            return [.bankCard, .yooMoney, .applePay, .sberbank]
        } else {
            return set
        }
    }
    
    func stringToSavePaymentType(string: String) -> YooKassaPayments.SavePaymentMethod {
        switch string {
            case "ON":
              return .on
            case "OFF":
              return .off
            case "USER_SELECTS":
              return .userSelects
            default:
              return .off
        }
    }
  
    func stringToCurrency(string: String) -> Currency {
        return Currency(rawValue: string)!
    }
}
