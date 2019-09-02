package ru.whalemare.rn.library

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import ru.whalemare.rn.library.result.ActivityResultListener
import ru.whalemare.rn.library.result.InlineActivityResult
import ru.whalemare.rn.library.result.Result
import ru.yandex.money.android.sdk.*
import java.math.BigDecimal
import java.util.*


class YandexPayment(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

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
    startTokenizer(shop,
      { token: String, type: PaymentMethodType -> callback.invoke(token, type) },
      { callback.invoke(null, null)}
    )
  }

  private fun startTokenizer(shop: Shop,
                             onSuccess: (token: String, paymentMethodType: PaymentMethodType) -> Unit,
                             onError: (throwable: Throwable) -> Unit) {
    val paymentMethodTypes = setOf(PaymentMethodType.BANK_CARD)

    val paymentParameters = PaymentParameters(
      Amount(BigDecimal("1"), Currency.getInstance("RUB")),
      shop.name,
      shop.description,
      shop.token,
      shop.id,
      paymentMethodTypes
    )

    val testParameters = TestParameters(true, false)

    val intent = Checkout.createTokenizeIntent(currentActivity!!,
      paymentParameters, testParameters
    )
    currentActivity!!.startActivityForResult(intent, 33)
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
  }

}