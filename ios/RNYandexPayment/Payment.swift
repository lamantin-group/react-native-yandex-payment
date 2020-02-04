//
//  Payment.swift
//  RNYandexPayment
//
//  Created by Антон Власов on 04/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

import Foundation
import YandexCheckoutPayments
import YandexCheckoutPaymentsApi

struct Payment {
    let amount: Double
    let currency: Currency
    let types: Set<PaymentMethodType>
}
