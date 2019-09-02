import { Payment } from './Payment';

export interface TestParam {
  /**
   * Shows mSDK logs in the logcat (all mSDK logs start with tag "Yandex.Checkout.SDK").
   */
  showLogs?: boolean

  /**
   * Enables google pay test environment - all transactions made with
   * Google Pay will use [WalletConstants.ENVIRONMENT_TEST]. More at:
   * https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist#about-the-test-environment.
   */
  googlePlayTestEnvironment?: boolean

  /**
   * Configuration for mock parameters. If this parameter is present, mSDK will
   * work in offline test mode. Token created with this configuration can't be used for payments.
   */
  mockConfiguration?: MockConfiguration
}

export interface MockConfiguration {
  /**
   * complete payment with error
   */
  completeWithError?: Boolean

  /**
   * get preauthorized user
   */
  paymentAuthPassed?: Boolean

  /**
   * number of linked cards for authorized user
   */
  linkedCardsCount?: number,

  /**
   * refactor: type of payment is unused here, remove it
   */
  serviceFee?: Payment
}