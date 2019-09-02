import { PaymentToken } from './PaymentToken';
import { Shop } from './Shop';
import { NativeModules } from 'react-native'

const YandexPaymentNative = NativeModules.YandexPayment

export class YandexPayment {

  /**
   * Show YandexCheckout screen and retrieve payment token
   * @param shop props of your shop
   */
  static async show(shop: Shop): Promise<PaymentToken> {
    return new Promise(async (resolve, reject) => {
      YandexPaymentNative.attach({
        SHOP_ID: shop.id,
        SHOP_TOKEN: shop.token,
        SHOP_NAME: shop.name,
        SHOP_DESCRIPTION: shop.description,
      }, (token: string, type: string, error: any) => {
        if (token && type) {
          resolve({
            token: token,
            type: type
          })
        } else if (error) {
          reject(error)
        }
      })
    })
  }
}
