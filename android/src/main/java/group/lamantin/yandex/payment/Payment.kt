package group.lamantin.yandex.payment

import ru.yoo.sdk.kassa.payments.PaymentMethodType
import ru.yoo.sdk.kassa.payments.SavePaymentMethod

/**
 * @since 2019
 * @author Anton Vlasov - whalemare
 */
data class Payment(
  val amount: Double,
  val currency: String,
  val types: Set<PaymentMethodType>,
  val savePaymentMethod: SavePaymentMethod,
  val yooKassaClientId: String
)