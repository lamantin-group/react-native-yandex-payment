import Foundation
import YooKassaPayments
import YooKassaPaymentsApi

struct Payment {
    let amount: Double
    let currency: Currency
    let types: Set<PaymentMethodType>
    let savePaymentMethod: YooKassaPayments.SavePaymentMethod
}
