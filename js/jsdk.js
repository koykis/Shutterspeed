window.fbAsyncInit = function() {

  FB._https = true;

  FB.init({
    appId      : '497542136989202', // App ID
    channelURL : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    oauth      : true, // enable OAuth 2.0
    xfbml      : true  // parse XFBML
  });
    
  FB.Canvas.setAutoGrow();
    
};
