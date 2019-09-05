package group.lamantin.yandex.payment

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import group.lamantin.yandex.payment.result.ActivityResultListener
import group.lamantin.yandex.payment.result.InlineActivityResult
import group.lamantin.yandex.payment.result.Result
import ru.yandex.money.android.sdk.*
import java.math.BigDecimal
import java.util.*

class YandexPayment(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = this.javaClass.simpleName

  override fun getConstants(): Map<String, Any> {
    val constants = HashMap<String, Any>()
    constants["SHOP_ID"] = SHOP_ID
    constants["SHOP_TOKEN"] = SHOP_TOKEN
    constants["SHOP_NAME"] = SHOP_NAME
    constants["SHOP_DESCRIPTION"] = SHOP_DESCRIPTION
    return constants
  }

  @ReactMethod
  fun attach(map: ReadableMap, callback: Callback) {
    val shop = Shop(
      map.getString(SHOP_ID)!!,
      map.getString(SHOP_TOKEN)!!,
      map.getString(SHOP_NAME)!!,
      map.getString(SHOP_DESCRIPTION)!!
    )
    val payment = Payment(
      amount = map.getDouble(PAYMENT_AMOUNT),
      currency = map.getString(PAYMENT_CURRENCY)!!,
      types = map.getArray(PAYMENT_TYPES_ARRAY)!!.toSetPayment()
    )
    startTokenizer(shop, payment,
      { token: String, type: PaymentMethodType -> callback.invoke(token, type) },
      { callback.invoke(null, null)}
    )
  }

  private fun startTokenizer(shop: Shop,
                             payment: Payment,
                             onSuccess: (token: String, paymentMethodType: PaymentMethodType) -> Unit,
                             onError: (throwable: Throwable) -> Unit) {
    val paymentParameters = PaymentParameters(
      Amount(BigDecimal(payment.amount), Currency.getInstance(payment.currency)),
      shop.name,
      shop.description,
      shop.token,
      shop.id,
      payment.types
    )

    val testParameters = TestParameters(true, false)

    val intent = Checkout.createTokenizeIntent(currentActivity!!,
      paymentParameters, testParameters
    )
    InlineActivityResult.startForResult(
      currentActivity as FragmentActivity,
      intent, object: ActivityResultListener {
        override fun onSuccess(result: Result) {
          val (paymentToken, paymentMethodType) = Checkout.createTokenizationResult(result.data!!)
          onSuccess.invoke(paymentToken, paymentMethodType)
        }

        override fun onFailed(result: Result?) {
          onError.invoke(RuntimeException("Token canceled"))
        }
      })
  }


  companion object {
    private const val SHOP_ID = "SHOP_ID"
    private const val SHOP_TOKEN = "SHOP_TOKEN"
    private const val SHOP_NAME = "SHOP_NAME"
    private const val SHOP_DESCRIPTION = "SHOP_DESCRIPTION"

    private const val PAYMENT_AMOUNT = "PAYMENT_AMOUNT"
    private const val PAYMENT_CURRENCY = "PAYMENT_CURRENCY"
    private const val PAYMENT_TYPES_ARRAY = "PAYMENT_TYPES_ARRAY"
  }

  fun ReadableArray.toSetPayment(): Set<PaymentMethodType> {
    val set = mutableSetOf<PaymentMethodType>()
    (0 until this.size()).forEach { index ->
      when (this.getString(index)) {
        PaymentMethodType.BANK_CARD.name -> set.add(PaymentMethodType.BANK_CARD)
        PaymentMethodType.YANDEX_MONEY.name -> set.add(PaymentMethodType.YANDEX_MONEY)
        PaymentMethodType.SBERBANK.name -> set.add(PaymentMethodType.SBERBANK)
        PaymentMethodType.GOOGLE_PAY.name, "PAY" -> set.add(PaymentMethodType.GOOGLE_PAY)
      }
    }
    if (set.isEmpty()) {
      set.addAll(PaymentMethodType.values())
    }
    return set
  }

}