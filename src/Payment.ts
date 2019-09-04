// todo: change GOOGLE_PAY to PAY that indicates APPLE_PAY and GOOGLE_PAY
type PaymentType = "YANDEX_MONEY" | "GOOGLE_PAY" | "BANK_CARD" | "SBERBANK" | "PAY"
type Currency = "RUB" | "USD" | "EUR"

export interface Payment {

  /**
   * Amount of the payment (price)
   */
  amount: number

  currency: Currency
  
  types: PaymentType[]
}