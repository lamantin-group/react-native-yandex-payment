package group.lamantin.yandex.payment

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import group.lamantin.yandex.payment.result.ActivityResultListener
import group.lamantin.yandex.payment.result.InlineActivityResult
import group.lamantin.yandex.payment.result.Result
import ru.yoo.sdk.kassa.payments.*
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
        constants["SHOP_RETURN_URL"] = SHOP_RETURN_URL
        return constants
    }

    @ReactMethod
    fun attach(map: ReadableMap, promise: Promise) {
        try {
            val shop = mapShop(map)
            val payment = mapPayment(map)

            val paymentParameters = PaymentParameters(
                    Amount(BigDecimal(payment.amount), Currency.getInstance(payment.currency)),
                    shop.name,
                    shop.description,
                    shop.token,
                    shop.id,
                    payment.savePaymentMethod,
                    payment.types,
                    null,
                    null,
                    null,
                    GooglePayParameters(),
                    payment.yooKassaClientId
            )

            // expose to JS
            val testParameters = TestParameters(true, false)
            val intent = Checkout.createTokenizeIntent(currentActivity!!,
                    paymentParameters, testParameters
            )
            InlineActivityResult.startForResult(
                    currentActivity!!,
                    intent,
                    object : ActivityResultListener {
                        override fun onSuccess(result: Result) {
                            val tokenizationResult: TokenizationResult = Checkout.createTokenizationResult(result.data!!)
                            val result = WritableNativeArray()
                            result.pushString(tokenizationResult.paymentToken)
                            result.pushString(tokenizationResult.paymentMethodType.toString())
                            promise.resolve(result)
                        }

                        override fun onFailed(result: Result) {
                            promise.reject(RESULT_CANCELED, RuntimeException("Token canceled"))
                        }
                    })

        } catch (error: Exception) {
            promise.reject(error)
        }
    }

    @ReactMethod
    fun close() {
        // dummy method, just for compatibility with ios
    }

    @ReactMethod
    fun show3ds(requestUrl: String, promise: Promise) {
        try {
            val intent = Checkout.create3dsIntent(currentActivity!!, requestUrl)

            InlineActivityResult.startForResult(
                    currentActivity as FragmentActivity,
                    intent,
                    object : ActivityResultListener {
                        override fun onSuccess(result: Result) {
                            promise.resolve(RESULT_OK)
                        }

                        override fun onFailed(result: Result) {
                            val map = WritableNativeMap()
                            if (result.data != null) {
                                // WebViewClient.ERROR_* или Checkout.ERROR_NOT_HTTPS_URL
                                result.data?.getIntExtra(Checkout.EXTRA_ERROR_CODE, 0)?.let { map.putInt(EXTRA_ERROR_CODE, it) }
                                map.putString(EXTRA_ERROR_DESCRIPTION, result.data?.getStringExtra(Checkout.EXTRA_ERROR_DESCRIPTION))
                                map.putString(EXTRA_ERROR_FAILING_URL, result.data?.getStringExtra(Checkout.EXTRA_ERROR_FAILING_URL))
                            }

                            if (result.resultCode == Checkout.RESULT_ERROR) {
                                promise.reject(RESULT_ERROR, map)
                            } else {
                                promise.reject(RESULT_3DS_CLOSED, map)
                            }
                        }
                    })
        } catch (err: Exception) {
            promise.reject(err)
        }
    }

    companion object {
        private const val SHOP_ID = "SHOP_ID"
        private const val SHOP_TOKEN = "SHOP_TOKEN"
        private const val SHOP_NAME = "SHOP_NAME"
        private const val SHOP_DESCRIPTION = "SHOP_DESCRIPTION"
        private const val SHOP_RETURN_URL = "SHOP_RETURN_URL"

        private const val PAYMENT_AMOUNT = "PAYMENT_AMOUNT"
        private const val PAYMENT_CURRENCY = "PAYMENT_CURRENCY"
        private const val PAYMENT_TYPES_ARRAY = "PAYMENT_TYPES_ARRAY"
        private const val PAYMENT_SAVE_TYPE = "PAYMENT_SAVE_TYPE"
        private const val PAYMENT_YOO_MONEY_CLIENT_ID = "PAYMENT_YOO_MONEY_CLIENT_ID"

        private const val EXTRA_ERROR_CODE = "EXTRA_ERROR_CODE"
        private const val EXTRA_ERROR_DESCRIPTION = "EXTRA_ERROR_DESCRIPTION"
        private const val EXTRA_ERROR_FAILING_URL = "EXTRA_ERROR_FAILING_URL"

        private const val RESULT_3DS_CLOSED = "RESULT_3DS_CLOSED"
        private const val RESULT_ERROR = "RESULT_ERROR"
        private const val RESULT_CANCELED = "RESULT_CANCELED"
        private const val RESULT_OK = "RESULT_OK"
    }

    fun mapShop(map: ReadableMap): Shop {
        return Shop(
                map.getString(SHOP_ID)!!,
                map.getString(SHOP_TOKEN)!!,
                map.getString(SHOP_NAME)!!,
                map.getString(SHOP_DESCRIPTION)!!,
                map.getString(SHOP_RETURN_URL)!!
        )
    }

    fun mapPayment(map: ReadableMap): Payment {
        return Payment(
                amount = map.getDouble(PAYMENT_AMOUNT),
                currency = map.getString(PAYMENT_CURRENCY)!!,
                types = map.getArray(PAYMENT_TYPES_ARRAY)!!.toSetPayment(),
                savePaymentMethod = map.getString(PAYMENT_SAVE_TYPE)!!.toSavePaymentMethod(),
                yooKassaClientId = map.getString(PAYMENT_YOO_MONEY_CLIENT_ID)!!
        )
    }

    fun ReadableArray.toSetPayment(): Set<PaymentMethodType> {
        val set = mutableSetOf<PaymentMethodType>()
        (0 until this.size()).forEach { index ->
            when (this.getString(index)) {
                PaymentMethodType.BANK_CARD.name() -> set.add(PaymentMethodType.BANK_CARD)
                PaymentMethodType.YOO_MONEY.name() -> set.add(PaymentMethodType.YOO_MONEY)
                PaymentMethodType.SBERBANK.name() -> set.add(PaymentMethodType.SBERBANK)
                PaymentMethodType.GOOGLE_PAY.name(), "PAY" -> set.add(PaymentMethodType.GOOGLE_PAY)
            }
        }
        if (set.isEmpty()) {
            set.addAll(PaymentMethodType.values())
        }
        return set
    }

    fun String.toSavePaymentMethod(): SavePaymentMethod {
        when (this) {
            SavePaymentMethod.ON.name() -> return SavePaymentMethod.ON
            SavePaymentMethod.OFF.name() -> return SavePaymentMethod.OFF
            SavePaymentMethod.USER_SELECTS.name() -> return SavePaymentMethod.USER_SELECTS
            else -> return SavePaymentMethod.OFF
        }
    }
}