//////////////////////////////////////////
// Mobile OS detection function
// Baseuri "vpnbank.sdb.com.cn/"
//////////////////////////////////////////

getMobileOperatingSystem = function()
{
    try
    {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i))
        {
            return 'iOS';

        } else if(userAgent.match(/Android/i))
        {
            return 'Android';
        }
    } catch(e){}

    return 'Unknown';
}

///////////////////////////////////////////////////////////////////////////////
// DefaultExternalWebHostImpl - bridge to the client component that hosts
// browser control
// Default implementation uses window.external object
///////////////////////////////////////////////////////////////////////////////

DefaultExternalWebHostImpl = function()
{
};

DefaultExternalWebHostImpl.prototype.isAvailable = function() {
    return (typeof(window.external) === 'object' && window.external);
}

DefaultExternalWebHostImpl.prototype.hasProp = function(prop) {
    return this.isAvailable() && (prop in window.external);
}

DefaultExternalWebHostImpl.prototype.hasWebLogonClearSession = function (){
    return this.hasProp('WebLogonClearSession');
}

DefaultExternalWebHostImpl.prototype.webLogonClearSession = function() {
    window.external.WebLogonClearSession();
}

DefaultExternalWebHostImpl.prototype.hasWebLogonResetSession = function (){
    return this.hasProp('WebLogonResetSession');
}

DefaultExternalWebHostImpl.prototype.webLogonResetSession = function() {
    window.external.WebLogonResetSession();
}

DefaultExternalWebHostImpl.prototype.hasWebLogonSoftTokenSupport = function() {
    return this.hasProp('WebLogonSoftTokenSupport');
}

DefaultExternalWebHostImpl.prototype.setWebLogonSoftTokenState = function (val){
    window.external.WebLogonSoftTokenState = val;
}

DefaultExternalWebHostImpl.prototype.setWebLogonSoftTokenPIN = function (val){
    window.external.WebLogonSoftTokenPIN = val;
}

DefaultExternalWebHostImpl.prototype.getWebLogonSoftTokenPasscode = function (){
    return window.external.WebLogonSoftTokenPasscode;
}

DefaultExternalWebHostImpl.prototype.getWebLogonSoftTokenError = function (){
    return window.external.WebLogonSoftTokenError;
}

DefaultExternalWebHostImpl.prototype.canRequestWeblogonSoftTokenPIN = function (){
    return this.hasProp('CanRequestWeblogonSoftTokenPIN') &&
                window.external.CanRequestWeblogonSoftTokenPIN;
}

DefaultExternalWebHostImpl.prototype.setWebLogonSoftTokenPrompt = function(val){
    if (this.hasProp('WebLogonSoftTokenPrompt')) {
        window.external.WebLogonSoftTokenPrompt = val;
    }
}

DefaultExternalWebHostImpl.prototype.hasWeblogonSoftTokenChallengeResponse = function (){
    return this.hasProp('WeblogonSoftTokenChallengeResponse');
}

DefaultExternalWebHostImpl.prototype.getWeblogonSoftTokenChallengeResponse = function (){
    return window.external.WeblogonSoftTokenChallengeResponse;
}

DefaultExternalWebHostImpl.prototype.hasWebLogonNotifyUser = function () {
    return this.hasProp('WebLogonNotifyUser');
}

DefaultExternalWebHostImpl.prototype.WebLogonNotifyUser = function (){
    window.external.WebLogonNotifyUser();
}

DefaultExternalWebHostImpl.prototype.hasWebLogonUserName = function (){
    return this.hasProp('WebLogonUserName');
}

DefaultExternalWebHostImpl.prototype.getWebLogonUserName = function (){
    return window.external.WebLogonUserName;
}

DefaultExternalWebHostImpl.prototype.setWebLogonUserName = function (val){
    window.external.WebLogonUserName = val;
}

DefaultExternalWebHostImpl.prototype.hasWebLogonPassword = function (){
    return this.hasProp('WebLogonPassword');
}

DefaultExternalWebHostImpl.prototype.getWebLogonPassword = function (){
    return window.external.WebLogonPassword;
}

DefaultExternalWebHostImpl.prototype.setWebLogonPassword = function (val){
    window.external.WebLogonPassword = val;
}

DefaultExternalWebHostImpl.prototype.isWebLogonSavePasswordAvailable = function (){
    return this.hasProp('WebLogonSavePasswordAvailable') &&
        window.external.WebLogonSavePasswordAvailable;
}

DefaultExternalWebHostImpl.prototype.hasWebLogonSavePasswordChecked = function (){
    return this.hasProp('WebLogonSavePasswordChecked');
}

DefaultExternalWebHostImpl.prototype.getWebLogonSavePasswordChecked = function (){
    return window.external.WebLogonSavePasswordChecked;
}

DefaultExternalWebHostImpl.prototype.setWebLogonSavePasswordChecked = function (val){
    window.external.WebLogonSavePasswordChecked = val;
}

DefaultExternalWebHostImpl.prototype.hasWebLogonAutoLogon = function (){
    return this.hasProp('WebLogonAutoLogon');
}

DefaultExternalWebHostImpl.prototype.getWebLogonAutoLogon = function (){
    return window.external.WebLogonAutoLogon;
}

DefaultExternalWebHostImpl.prototype.setWebLogonAutoLogon = function (val){
    window.external.WebLogonAutoLogon = val;
}

DefaultExternalWebHostImpl.prototype.setWeblogonCallbacks = function (weblogonAutosubmitCall, challengeAutosubmitCall) {
    if (this.hasProp('WebLogonAutosubmitCall')) {
        window.external.WebLogonAutosubmitCall = weblogonAutosubmitCall;
    }

    if (this.hasProp('WebLogonChallengeAutosubmitCall')) {
        window.external.WebLogonChallengeAutosubmitCall = challengeAutosubmitCall;
    }
}

DefaultExternalWebHostImpl.prototype.debugLog = function (msg){
    if (this.hasProp('DebugLog')) {
        window.external.DebugLog(msg);
    }
}

///////////////////////////////////////////////////////////////////////////////
// AndroidExternalWebHostImpl - bridge to the client component that hosts
// browser control
// Android implementation uses calls Android WebView bridge object
///////////////////////////////////////////////////////////////////////////////
AndroidExternalWebHostImpl = function()
{

};

AndroidExternalWebHostImpl.prototype.isAvailable = function () {
    return 'undefined' != typeof(externalAndroidWebHost);
}

AndroidExternalWebHostImpl.prototype.hasWebLogonClearSession = function (){
    return this.isAvailable() && 
           (undefined != externalAndroidWebHost.webLogonClearSession);
}

AndroidExternalWebHostImpl.prototype.webLogonClearSession = function() {
    externalAndroidWebHost.webLogonClearSession();
}

AndroidExternalWebHostImpl.prototype.hasWebLogonResetSession = function (){
    return this.isAvailable() &&
           (undefined != externalAndroidWebHost.webLogonResetSession);
}

AndroidExternalWebHostImpl.prototype.webLogonResetSession = function() {
    externalAndroidWebHost.webLogonResetSession();
}

AndroidExternalWebHostImpl.prototype.hasWebLogonSoftTokenSupport = function() {
    return this.isAvailable() &&
           (undefined != externalAndroidWebHost.hasWebLogonSoftTokenSupport) &&
           externalAndroidWebHost.hasWebLogonSoftTokenSupport();
}

AndroidExternalWebHostImpl.prototype.setWebLogonSoftTokenState = function (val){
    externalAndroidWebHost.setWebLogonSoftTokenState(val);
}

AndroidExternalWebHostImpl.prototype.setWebLogonSoftTokenPIN = function (val){
    externalAndroidWebHost.setWebLogonSoftTokenPIN(val);
}

AndroidExternalWebHostImpl.prototype.getWebLogonSoftTokenPasscode = function (){
    return externalAndroidWebHost.getWebLogonSoftTokenPasscode();
}

AndroidExternalWebHostImpl.prototype.getWebLogonSoftTokenError = function (){
    return externalAndroidWebHost.getWebLogonSoftTokenError();
}

AndroidExternalWebHostImpl.prototype.canRequestWeblogonSoftTokenPIN = function (){
    return externalAndroidWebHost.canRequestWeblogonSoftTokenPIN();
}

AndroidExternalWebHostImpl.prototype.setWebLogonSoftTokenPrompt = function(val){
   externalAndroidWebHost.setWebLogonSoftTokenPrompt(val);
}

AndroidExternalWebHostImpl.prototype.hasWeblogonSoftTokenChallengeResponse = function (){
   return this.isAvailable() && (undefined != externalAndroidWebHost.getWeblogonSoftTokenChallengeResponse);
}

AndroidExternalWebHostImpl.prototype.getWeblogonSoftTokenChallengeResponse = function (){
    return externalAndroidWebHost.getWeblogonSoftTokenChallengeResponse();
}

AndroidExternalWebHostImpl.prototype.hasWebLogonNotifyUser = function () {
    return this.isAvailable() && (undefined != externalAndroidWebHost.webLogonNotifyUser);
}

AndroidExternalWebHostImpl.prototype.WebLogonNotifyUser = function (){
    externalAndroidWebHost.webLogonNotifyUser();
}

AndroidExternalWebHostImpl.prototype.hasWebLogonUserName = function (){
    return this.isAvailable() && (undefined != externalAndroidWebHost.getWebLogonUserName);
}

AndroidExternalWebHostImpl.prototype.getWebLogonUserName = function (){
    return externalAndroidWebHost.getWebLogonUserName();
}

AndroidExternalWebHostImpl.prototype.setWebLogonUserName = function (val){
    externalAndroidWebHost.setWebLogonUserName(val);
}

AndroidExternalWebHostImpl.prototype.hasWebLogonPassword = function (){
    return this.isAvailable() && (undefined != externalAndroidWebHost.getWebLogonPassword);
}

AndroidExternalWebHostImpl.prototype.getWebLogonPassword = function (){
    return externalAndroidWebHost.getWebLogonPassword();
}

AndroidExternalWebHostImpl.prototype.setWebLogonPassword = function (val){
    externalAndroidWebHost.setWebLogonPassword(val);
}

AndroidExternalWebHostImpl.prototype.isWebLogonSavePasswordAvailable = function (){
      return this.isAvailable() &&
             (undefined != externalAndroidWebHost.isWebLogonSavePasswordAvailable) &&
              externalAndroidWebHost.isWebLogonSavePasswordAvailable();
}

AndroidExternalWebHostImpl.prototype.hasWebLogonSavePasswordChecked = function (){
      return this.isAvailable() && (undefined != externalAndroidWebHost.setWebLogonSavePasswordChecked);
}

AndroidExternalWebHostImpl.prototype.getWebLogonSavePasswordChecked = function (val){
      externalAndroidWebHost.getWebLogonSavePasswordChecked();
}

AndroidExternalWebHostImpl.prototype.setWebLogonSavePasswordChecked = function (val){
      externalAndroidWebHost.setWebLogonSavePasswordChecked(val);
}

AndroidExternalWebHostImpl.prototype.hasWebLogonAutoLogon = function (){
      return this.isAvailable() && (undefined != externalAndroidWebHost.getWebLogonAutoLogon);
}

AndroidExternalWebHostImpl.prototype.getWebLogonAutoLogon = function (){
      return externalAndroidWebHost.getWebLogonAutoLogon();
}

AndroidExternalWebHostImpl.prototype.setWebLogonAutoLogon = function (val){
      externalAndroidWebHost.setWebLogonAutoLogon(val);
}

AndroidExternalWebHostImpl.prototype.setWeblogonCallbacks = function (weblogonAutosubmitCall, challengeAutosubmitCall) {
      if(this.isAvailable()){
          if(undefined != externalAndroidWebHost.setWeblogonCallbacks){
               externalAndroidWebHost.setWeblogonCallbacks(weblogonAutosubmitCall, challengeAutosubmitCall);
          }
      }
}

AndroidExternalWebHostImpl.prototype.debugLog = function (msg){
      if(this.isAvailable() && undefined != externalAndroidWebHost.debugLog){
          externalAndroidWebHost.debugLog(msg);
      }
}

///////////////////////////////////////////////////////////////////////////////
// iOSExternalWebHostImpl - bridge to the client component that hosts
// browser control
///////////////////////////////////////////////////////////////////////////////
iOSExternalWebHostImpl = function()
{
    if (navigator.userAgent.match(/F5Access/i) ||
            navigator.userAgent.match(/EdgeClient/i) ||
            navigator.userAgent.match(/EdgePortal/i)) {
        var iframe = document.createElement("IFRAME");
        var src = "f5edgeclient://initialize";
        iframe.setAttribute("src", src);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
};

iOSExternalWebHostImpl.prototype.isAvailable = function () {
    return false;
}

iOSExternalWebHostImpl.prototype.hasWebLogonClearSession = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.hasWebLogonResetSession = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.webLogonResetSession = function() {
}

iOSExternalWebHostImpl.prototype.hasWebLogonSoftTokenSupport = function() {
    return false;
}

iOSExternalWebHostImpl.prototype.setWebLogonSoftTokenState = function (val){
}

iOSExternalWebHostImpl.prototype.setWebLogonSoftTokenPIN = function (val){
}

iOSExternalWebHostImpl.prototype.getWebLogonSoftTokenPasscode = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.getWebLogonSoftTokenError = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.canRequestWeblogonSoftTokenPIN = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.setWebLogonSoftTokenPrompt = function (val) {
}

iOSExternalWebHostImpl.prototype.hasWeblogonSoftTokenChallengeResponse = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.getWeblogonSoftTokenChallengeResponse = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.hasWebLogonNotifyUser = function () {
    return false;
}

iOSExternalWebHostImpl.prototype.WebLogonNotifyUser = function (){
}

iOSExternalWebHostImpl.prototype.hasWebLogonUserName = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.getWebLogonUserName = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.setWebLogonUserName = function (val){
}

iOSExternalWebHostImpl.prototype.hasWebLogonPassword = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.getWebLogonPassword = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.setWebLogonPassword = function (val){
}

iOSExternalWebHostImpl.prototype.isWebLogonSavePasswordAvailable = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.hasWebLogonSavePasswordChecked = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.getWebLogonSavePasswordChecked = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.setWebLogonSavePasswordChecked = function (val){
}

iOSExternalWebHostImpl.prototype.hasWebLogonAutoLogon = function (){
    return false;
}

iOSExternalWebHostImpl.prototype.getWebLogonAutoLogon = function (){
    return null;
}

iOSExternalWebHostImpl.prototype.setWebLogonAutoLogon = function (val){
}

iOSExternalWebHostImpl.prototype.setWeblogonCallbacks = function (weblogonAutosubmitCall, challengeAutosubmitCall){
}

iOSExternalWebHostImpl.prototype.debugLog = function (msg){
}

var mobileOS = getMobileOperatingSystem();

externalWebHost = new DefaultExternalWebHostImpl();

if(mobileOS == 'Android'){
    try{
        externalWebHost = new AndroidExternalWebHostImpl();
    } catch (e){}
}
else if (mobileOS == 'iOS'){
    try{
        externalWebHost = new iOSExternalWebHostImpl();
    } catch (e) {}
}
