// 初始化webview
private void initWebView() {
    WebSettings webSettings = webView.getSettings();
    webSettings.setJavaScriptEnabled(true);
    // 可以通过window.jsBridge.invoke进行调用
    webView.addJavascriptInterface(new JsInterface(), "jsBridge");

    webView.setWebChromeClient(new WebChromeClient() {
        public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
            Uri uri = Uri.parse(message);
            // 传入"toutiao://invokeing?action=location&cb=cb2"
            if (uri.getScheme().equals("toutiao")) {
                System.out.println("prompt方法被调用了");
                // 调用prompt后的返回值
                result.confirm("{name: 'yuanxin'}");
                return true;
            }
            return super.onJsPrompt(view, url, message, defaultValue, result);
        }
    });

    webView.setWebViewClient(new WebViewClient() {

        @Override
        public boolean shouldOverrideUrlLoading(WebView webView, String url) {
            if (url.contains("toutiao://")){
                // 拦截iframe的发送
                toast("拦截到了" + url);
            }
            else {
                webView.loadUrl(url);
            }
            return true;
       }
    });
    webView.loadUrl("https://m.toutiao.com");
}

// 在webview中执行js
private void callJs() {
    String control = "javascript:alert(1)";
    // String control = "javascript:window.cbName(args)";
    webView.loadUrl(control);
}

// 注入js的对象借口
public class JsInterface {

    @JavascriptInterface
    public String invoke(String message) {
        // message就是调用方法时传入的字符串
        // 可以之后异步调用js
        callJs();
        // 调用 window.jsBridge.invoke 后的返回值
        // 在js中：var res = window.jsBridge.invoke('message');
        return "{name: 'yuanxin'}";
    }
}
