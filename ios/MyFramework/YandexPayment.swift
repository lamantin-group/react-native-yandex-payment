//
//  YandexPayment.swift
//  MyFramework
//
//  Created by Антон Власов on 03/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

import Foundation

import YandexCheckoutPayments
import YandexCheckoutPaymentsApi


@objc(YandexPayment)
class YandexPayment: RCTViewManager, TokenizationModuleOutput {
    
    var callback: RCTResponseSenderBlock?
    var viewController: UIViewController?
    
    @objc
    func attach(_ map: NSDictionary,
                callbacker callback: @escaping RCTResponseSenderBlock) -> Void {
        self.callback = callback
        print("YandexPayment ios fetchPaymentToken map = ", map)
        
        if let clientApplicationKey = map["SHOP_TOKEN"] as? String {
            let shopName = map["SHOP_NAME"] as? String ?? "Ltd Sviasito"
            let shopDescription = map["SHOP_DESCRIPTION"] as? String ?? "Ltd Sviazisto"
            
            let amount = Amount(value: 1, currency: .rub)
            let moduleInputData = TokenizationModuleInputData(
                clientApplicationKey: clientApplicationKey,
                shopName: shopName,
                purchaseDescription: shopDescription,
                amount: amount,
                tokenizationSettings: TokenizationSettings(paymentMethodTypes: .bankCard)
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
        } else {
            print("YandexPayment: SHOP_TOKEN is not correct: map = ", map)
            callback([])
        }
    }
    
    func didSuccessfullyPassedCardSec(on module: TokenizationModuleInput) {
        print("didSuccessfullyPassedCardSec")
    }
    
    func tokenizationModule(_ module: TokenizationModuleInput,
                            didTokenize token: Tokens,
                            paymentMethodType: PaymentMethodType) {
        DispatchQueue.main.async {
            self.viewController!.dismiss(animated: true)
        }
        print("retrieved payment token is = ", token.paymentToken)
        if let callback = callback {
            callback([[
                "paymentToken": token.paymentToken,
                "paymentType": "BANK_CARD"
                ]])
        }
    }
    
    func didFinish(on module: TokenizationModuleInput) {
        DispatchQueue.main.async {
            self.viewController!.dismiss(animated: true)
        }
        print("didFinish")
    }
}
