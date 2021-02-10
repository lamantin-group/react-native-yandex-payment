import { PaymentToken } from './PaymentToken'
import { Payment } from './Payment'
import { Shop } from './Shop'
import { NativeModules } from 'react-native'

const YandexPaymentNative = NativeModules.YandexPayment

export class YandexPayment {
  /**
   * Show YandexCheckout screen and retrieve payment token
   * @param shop props of your shop
   */
  static show(shop: Shop, payment: Payment): Promise<PaymentToken> {
    return  YandexPaymentNative.attach({
      SHOP_ID: shop.id,
      SHOP_TOKEN: shop.token,
      SHOP_NAME: shop.name,
      SHOP_RETURN_URL: shop.returnUrl ? shop.returnUrl : 'https://custom.redirect.url/',
      SHOP_DESCRIPTION: shop.description,
      PAYMENT_AMOUNT: payment.amount,
      PAYMENT_CURRENCY: payment.currency,
      PAYMENT_TYPES_ARRAY: payment.types || [],
      PAYMENT_SAVE_TYPE: payment.savePaymentMethod || "OFF",
      PAYMENT_YOO_MONEY_CLIENT_ID: payment.yooKassaClientId
    }).then((arr: string[]) => ({
      token: arr[0],
      type: arr[1]
    })) 
  }

  static show3ds(requestUrl: string): Promise<string>{
    return YandexPaymentNative.show3ds(requestUrl)
  }

  static close() {
    return YandexPaymentNative.close()
  }
}
