// todo: change GOOGLE_PAY to PAY that indicates APPLE_PAY and GOOGLE_PAY
type PaymentType = 'GOOGLE_PAY' | 'BANK_CARD' | 'SBERBANK' | 'YOO_MONEY'
type SavePaymentMethodType = 'ON' | 'OFF' | 'USER_SELECTS'
type Currency = 'RUB' | 'USD' | 'EUR'

export interface Payment {
  /**
   * Amount of the payment (price)
   */
  amount: number

  currency: Currency

  types: PaymentType[]

  savePaymentMethod: SavePaymentMethodType
}
