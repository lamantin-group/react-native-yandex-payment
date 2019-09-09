package group.lamantin.yandex.payment.result;

public interface ActivityResultListener {
    void onSuccess(Result result);
    void onFailed(Result result);
}
