package group.lamantin.yandex.payment

/**
 * @since 2019
 * @author Anton Vlasov - whalemare
 */
data class Shop(
  val id: String,
  val token: String,
  val name: String,
  val description: String,
  val returnUrl: String? = null
)