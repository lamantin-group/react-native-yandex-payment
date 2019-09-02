package ru.whalemare.rn.library.result;

public interface ActivityResultListener {
    void onSuccess(Result result);
    void onFailed(Result result);
}
