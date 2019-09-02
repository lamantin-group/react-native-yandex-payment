package ru.whalemare.rn.library

import ru.yandex.money.android.sdk.PaymentMethodType

/**
 * @since 2019
 * @author Anton Vlasov - whalemare
 */
data class Payment(
  val amount: Double,
  val currency: String,
  val types: Set<PaymentMethodType>
)