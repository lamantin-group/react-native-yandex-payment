package group.lamantin.yandex.payment.result;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.lang.ref.Reference;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;

public class InlineActivityResult {

    private static final String TAG = "ACTIVITY_RESULT_FRAGMENT_YOO_KASSA";

    private final Reference<Activity> activityReference;

    //region callbacks
    private final List<ActivityResultListener> responseListeners = new ArrayList<>();

    //the listener we will give to the fragment
    private final TransparentActivity.ActivityResultListener listener = new TransparentActivity.ActivityResultListener() {
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            onReceivedActivityResult(requestCode, resultCode, data);
        }
    };
    //endregion

    public static InlineActivityResult startForResult(final Activity activity, @Nullable final Intent intent, @Nullable final ActivityResultListener listener) {
        return new InlineActivityResult(activity).startForResult(intent, listener);
    }

    public InlineActivityResult(@Nullable final Activity activity) {
        if (activity != null) {
            this.activityReference = new WeakReference<>(activity);
        } else {
            this.activityReference = new WeakReference<>(null);
        }
    }

    private void onReceivedActivityResult(int requestCode, int resultCode, @Nullable final Intent data) {
        final Result result = new Result(this, requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            for (ActivityResultListener listener : responseListeners) {
                listener.onSuccess(result);
            }
        } else {
            for (ActivityResultListener listener : responseListeners) {
                listener.onFailed(result);
            }
        }
    }

    public InlineActivityResult startForResult(@Nullable final Intent intent, @Nullable final ActivityResultListener listener) {
        if (intent != null && listener != null) {
            this.responseListeners.add(listener);
            this.start(intent);
        }
        return this;
    }

    private void start(@NonNull final Intent intent) {
        final Activity activity = activityReference.get();
        if (activity == null || activity.isFinishing()) {
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.startActivity(TransparentActivity.intentForResult(activity, intent, listener));
            }
        });
    }
}
