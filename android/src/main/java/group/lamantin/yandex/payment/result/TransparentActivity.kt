package group.lamantin.yandex.payment.result

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

/**
 * @since 2019
 * @author Anton Vlasov - whalemare
 */
class TransparentActivity: AppCompatActivity() {

  interface ActivityResultListener {
    fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    startActivityForResult(getIntentForStart(), REQUEST_CODE)
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (requestCode == REQUEST_CODE) {
      RESULT_OK
      listener!!.onActivityResult(requestCode, resultCode, data)
      this.finish()
    }
  }

  override fun onBackPressed() {
    super.onBackPressed()
  }

  companion object {
    private var listener: ActivityResultListener? = null
    private val REQUEST_CODE = 123

    @JvmStatic
    fun intentForResult(context: Context, intent: Intent, listener: ActivityResultListener): Intent {
      TransparentActivity.listener = listener
      val selfIntent = Intent(context, TransparentActivity::class.java)
      val bundle = Bundle()
      bundle.putParcelable("TransparentActivity_INTENT", intent)
      selfIntent.putExtra("ARGS", bundle)
      return selfIntent
    }

    fun TransparentActivity.getIntentForStart(): Intent {
      return intent.getBundleExtra("ARGS")!!.getParcelable("TransparentActivity_INTENT")!!
    }
  }

}