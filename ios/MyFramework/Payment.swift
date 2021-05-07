import Foundation
import YooKassaPayments
import YooKassaPaymentsApi

struct Payment {
    let amount: Double
    let currency: Currency
    let types: Set<YooKassaPayments.PaymentMethodType>
    let savePaymentMethod: YooKassaPayments.SavePaymentMethod
    let moneyAuthClientId: String
}
