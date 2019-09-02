type PaymentType = "YANDEX_MONEY" | "GOOGLE_PAY" | "BANK_CARD" | "SBERBANK"

export interface Payment {

  /**
   * Amount of the payment (price)
   */
  amount: number

  /**
   * List of available currencies: https://www.ibm.com/support/knowledgecenter/en/SSZLC2_7.0.0/com.ibm.commerce.payments.developer.doc/refs/rpylerl2mst97.htm
   */
  currency: string
  
  types: PaymentType[]
}