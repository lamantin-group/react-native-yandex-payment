//
//  YandexPayment.swift
//  MyFramework
//
//  Created by Антон Власов on 03/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

import Foundation

import YooKassaPayments
import YooKassaPaymentsApi


@objc(YandexPayment)
class YandexPayment: RCTViewManager, TokenizationModuleOutput {
    
    var callback: RCTResponseSenderBlock?
    var viewController: UIViewController?
    
    func paymentTypeToString(paymentType: PaymentMethodType) -> String {
        switch paymentType {
            case .applePay:
                return "PAY"
            case .bankCard:
                return "BANK_CARD"
            case .yooMoney:
                return "YANDEX_MONEY"
            case .sberbank:
                return "SBERBANK"
            case .cash:
                return "CASH"
            case .qiwi:
                return "QIWI"
            case .alfabank:
                return "ALFABANK"
            case .webmoney:
                return "WEBMONEY"
        }
    }
    
    func arrayToSetPaymentTypes(nsArray: NSArray) -> Set<PaymentMethodType> {
        var set: Set<PaymentMethodType> = []

        let array: [String] = nsArray.compactMap({ ($0 as! String) })
        for type in array {
            if type == "YANDEX_MONEY" {
                set.insert(.yooMoney)
            } else if type == "GOOGLE_PAY" {
                set.insert(.applePay)
            } else if type == "BANK_CARD" {
                set.insert(.bankCard)
            } else if type == "SBERBANK" {
                set.insert(.sberbank)
            } else if type == "APPLY_PAY" {
                set.insert(.applePay)
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
    
    func stringToCurrency(string: String) -> Currency {
        return Currency(rawValue: string)!
    }
    
    @objc
    func attach(_ map: NSDictionary,
                callbacker callback: @escaping RCTResponseSenderBlock) -> Void {
        self.callback = callback
        let shop = Shop(
            id: map["SHOP_ID"] as! String,
            token: map["SHOP_TOKEN"] as! String,
            name: map["SHOP_NAME"] as! String,
            description: map["SHOP_DESCRIPTION"] as! String,
            applePayMerchantIdentifier: map["SHOP_APPLEPAY_MERCHANT_IDENTIFIER"] as! String,
            returnUrl: map["SHOP_RETURN_URL"] as! String

        )
        
        let payment = Payment(
            amount: map["PAYMENT_AMOUNT"] as! Double,
            currency: stringToCurrency(string: map["PAYMENT_CURRENCY"] as! String),
            types: arrayToSetPaymentTypes(nsArray: (map["PAYMENT_TYPES_ARRAY"] as! NSArray))
        )
        
        let moduleInputData = TokenizationModuleInputData(
            clientApplicationKey: shop.token,
            shopName: shop.name,
            purchaseDescription: shop.description,
            amount: Amount(value: Decimal(payment.amount), currency: payment.currency),
            tokenizationSettings: TokenizationSettings(paymentMethodTypes: PaymentMethodTypes(rawValue: payment.types)),
            applePayMerchantIdentifier: shop.applePayMerchantIdentifier,
            returnUrl: shop.returnUrl,
            savePaymentMethod: .on
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
    
    func didSuccessfullyPassedCardSec(on module: TokenizationModuleInput) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self else { return }
            let alertController = UIAlertController(title: "3D-Sec",
                                                    message: "Successfully passed 3d-sec",
                                                    preferredStyle: .alert)
            let action = UIAlertAction(title: "OK", style: .default)
            alertController.addAction(action)
            strongSelf.viewController?.dismiss(animated: true)
            strongSelf.viewController?.present(alertController, animated: true)
        }
    }
    
    func tokenizationModule(_ module: TokenizationModuleInput,
                            didTokenize token: Tokens,
                            paymentMethodType: PaymentMethodType) {
        DispatchQueue.main.async {
            self.viewController!.dismiss(animated: true)
        }
        if let callback = callback {
            callback([
                token.paymentToken,
                paymentTypeToString(paymentType: paymentMethodType)
                ])
        }
    }
    
    func didFinish(on module: TokenizationModuleInput) {
        DispatchQueue.main.async {
            self.viewController?.dismiss(animated: true)
        }
    }
    
    func didFinish(on module: TokenizationModuleInput, with error: YooKassaPaymentsError?) {
        DispatchQueue.main.async {
            self.viewController?.dismiss(animated: true)
        }
    }
}
