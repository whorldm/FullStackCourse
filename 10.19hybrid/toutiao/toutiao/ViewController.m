//
//  ViewController.m
//  toutiao
//
//  Created by edz on 2019/10/19.
//  Copyright © 2019 edz. All rights reserved.
//

#import "ViewController.h"
#import "WebKit/WebKit.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initWKWebview];
//    [self initUIWebview];
    // Do any additional setup after loading the view.
}

-(void) initWKWebview {
    // 初始化一个配置
    WKWebViewConfiguration* config = [[WKWebViewConfiguration alloc] init];
    WKUserContentController* wKUserContentController = [[WKUserContentController alloc] init];
    [wKUserContentController addScriptMessageHandler:self name:@"callNative"];
    config.userContentController = wKUserContentController;
    // 初始化一个webview
    WKWebView* webView = [[WKWebView alloc] initWithFrame:[[UIScreen mainScreen] bounds] configuration:config];
    // 初始化一个url
    NSURL* url = [NSURL URLWithString:@"https://m.toutiao.com"];
    NSURLRequest* request = [NSURLRequest requestWithURL:url];
    // 调用webview的方法，去加载一个h5页面
    [webView loadRequest:request];
    
//    NSMutableString* html = [NSMutableString string];
//    [html appendString:@"<html>"];
//    [html appendString:@"<head>"];
//    [html appendString:@"</head>"];
//    [html appendString:@"<body>"];
//    [html appendString:@"<div>这是页面内容</div><script>window.name='yuanxin';</script>"];
//    [html appendString:@"</body>"];
//    [html appendString:@"</html>"];
//
//    NSURL* baseurl = [NSURL URLWithString:@"file://toutiao"];
//    [webView loadHTMLString:html baseURL:baseurl];

    self.webView = webView;
    webView.UIDelegate = self;
    // 把webview页面，塞到App的主界面中
    [self.view addSubview:webView];
}

-(void)userContentController:(WKUserContentController*) userContentController didReceiveScriptMessage:(nonnull WKScriptMessage *)message {
    NSDictionary* messageObj = (NSDictionary*) message.body;
    NSString* cbName = [messageObj objectForKey:@"cb"];
    if ([message.name isEqualToString:@"callNative"]) {
        NSLog(@"我收到了!!!window.%@({name: 'yuanxin'});", cbName);
        [self.webView evaluateJavaScript: @"window.cb1({name: 'yuanxin'});" completionHandler:nil];
    }
}

-(void)initUIWebview {
    UIWebView* webView = [[UIWebView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    NSURL* url = [NSURL URLWithString:@"https://m.toutiao.com"];
    NSURLRequest* request = [NSURLRequest requestWithURL:url];
    self.webView = webView;
    [webView loadRequest:request];
    // 把webview页面，塞到App的主界面中
    webView.delegate = self;
    [self.view addSubview:webView];
}

- (void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * _Nullable))completionHandler {
    completionHandler(@"{name: 'yuanxin'}");
}
//
//- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//{
//    NSString *urlStr = request.URL.absoluteString;
//    if ([urlStr rangeOfString:@"toutiao://invoking"].length > 0)
//    {
//        NSLog(@"拦截成功");
//        [self.webView stringByEvaluatingJavaScriptFromString:@"window.cb1({name: 'yuanxin'})"];
//        return NO;
//    }
//    return YES;
//}
//
//
@end
