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
    fun attach(map: ReadableMap, callback: Callback) {
        val shop = Shop(
                map.getString(SHOP_ID)!!,
                map.getString(SHOP_TOKEN)!!,
                map.getString(SHOP_NAME)!!,
                map.getString(SHOP_DESCRIPTION)!!,
                map.getString(SHOP_RETURN_URL)!!
        )
        val payment = Payment(
                amount = map.getDouble(PAYMENT_AMOUNT),
                currency = map.getString(PAYMENT_CURRENCY)!!,
                types = map.getArray(PAYMENT_TYPES_ARRAY)!!.toSetPayment(),
                savePaymentMethod = map.getString(PAYMENT_SAVE_TYPE)!!.toSavePaymentMethod()
        )
        startTokenizer(shop, payment,
                { token: String, type: PaymentMethodType -> callback.invoke(token, type.name()) },
                { callback.invoke(null, null) }
        )
    }


    private fun startTokenizer(shop: Shop,
                               payment: Payment,
                               onSuccessPayment: (token: String, paymentMethodType: PaymentMethodType) -> Unit,
                               onError: (throwable: Throwable) -> Unit) {
        //TODO: add clientId (String) - идентификатор приложения для sdk авторизации ru.yoo.sdk.auth, см. Регистрация приложения для платежей из кошелька.
        val paymentParameters = PaymentParameters(
                Amount(BigDecimal(payment.amount), Currency.getInstance(payment.currency)),
                shop.name,
                shop.description,
                shop.token,
                shop.id,
                payment.savePaymentMethod,
                payment.types
        )

        val testParameters = TestParameters(true, false)

        val intent = Checkout.createTokenizeIntent(currentActivity!!,
                paymentParameters, testParameters
        )
        InlineActivityResult.startForResult(
                currentActivity as FragmentActivity,
                intent, object : ActivityResultListener {
            override fun onSuccess(result: Result) {
                val tokenizationResult: TokenizationResult = Checkout.createTokenizationResult(result.data!!)
                onSuccessPayment.invoke(tokenizationResult.paymentToken, tokenizationResult.paymentMethodType)
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
        private const val SHOP_RETURN_URL = "SHOP_RETURN_URL"

        private const val PAYMENT_AMOUNT = "PAYMENT_AMOUNT"
        private const val PAYMENT_CURRENCY = "PAYMENT_CURRENCY"
        private const val PAYMENT_TYPES_ARRAY = "PAYMENT_TYPES_ARRAY"
        private const val PAYMENT_SAVE_TYPE = "PAYMENT_SAVE_TYPE"
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