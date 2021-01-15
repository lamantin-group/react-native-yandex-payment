//
//  Payment.swift
//  MyFramework
//
//  Created by Антон Власов on 04/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

import Foundation
import YooKassaPayments
import YooKassaPaymentsApi

struct Payment {
    let amount: Double
    let currency: Currency
    let types: Set<PaymentMethodType>
}