//============================================================
// HTTP request definition
// Baseuri "124.196.28.53"
//============================================================
function getHTTPRequestObject()
{
    var res = null;;
    try {
        res = new XMLHttpRequest();
    }catch(e){ try {
            res = new ActiveXObject('Msxml2.XMLHTTP');
        }catch(e){ try {
                res = new ActiveXObject('Microsoft.XMLHTTP');
            }catch(e){
                res = null;
            }
        }
    }
    return res;
}

//============================================================
// Session Timeout class encapsulation
// p.rqTimeout - number - number of ms after which xhr timeout gonna occur and this.cb.onSessionTimeout would be
// p.rqRepeat - boolean - repeat TIN requests i.e. do single or recurrent check
// p.landingUriCheck - boolean - should we check landing URI or not
// p.onSessionTimeout - function - callback for session timeout/over
// p.onSessionOk - function - callback for session is alive/ok
// p.startnow - boolean - should we put on timer timeout checks immediately
//============================================================
function APMSessionTimeout(p){
    // overall object
    p = typeof(p) == "function" ? {onSessionTimeout: p} : typeof(p) == "object" ? p : {};
    // request
    this.rqTimeout = typeof(p.rqTimeout) == "number" ? p.rqTimout : null;
    this.rqRepeat = typeof(p.rqRepeat) == "boolean" ? p.rqRepeat : true;
    // landing uri
    this.landingUriCheck = typeof(p.landingUriCheck) == "boolean" ? p.landingUriCheck : true;
    // callbacks
    this.cb.onSessionTimeout = typeof(p.onSessionTimeout) == "function" ? p.onSessionTimeout : null;
    this.cb.onSessionOk = typeof(p.onSessionOk) == "function" ? p.onSessionOk : null;
    //
    this.startnow = typeof(p.startnow) == "boolean" ? p.startnow : true;
    if(this.startnow){
        window.setTimeout(function(_this){ return function(){ return _this.check(true) }}(this), this.timoutInterval);
        if(this.landingUriCheck){
            window.setTimeout(function(_this){ return function(){ return _this.getLandingUri() }}(this), this.timoutInterval / 2);
        }
    }
}

APMSessionTimeout.prototype ={
    //
    startnow: true,
    timoutInterval: 30000,
    // request
    rq: null,
    rqTimeout: null,
    rqRepeat: true,
    // landing uri
    landingUriCheck: true,
    landingUri: "/",
    // callbacks
    cb: {
        onSessionTimeout: null,
        onSessionOk: null
    },

    //============================================================
    // Retrieve session time-to-live through timeoutagent-i.php
    //
    //    saveTinValue - indicates whether we are to save TIN
    //                     cookie value or not
    //============================================================
    // rename to rqCreate() ??
    check: function(saveTinValue){
        if(typeof(saveTinValue) != "boolean"){
            // should we actually complain?
            saveTinValue == true;
        }
        //
        this.rq = getHTTPRequestObject();
        if(typeof(this.rqTimeout) == "number"){
            this.rq.timeout = this.rqTimeout;
        }
        this.rq.onreadystatechange = function(_this, _saveTinValue){ return function(){
            _this.rqStatusChange(_saveTinValue);
        } }(this, saveTinValue);
        this.rq.open('GET', '/vdesk/timeoutagent-i.php', true );
        this.rq.send("");
    },

    //============================================================
    // Retrieve session time-to-live through timeoutagent-i.php but don't save TIN valuye
    //============================================================
    // redo to variable this.saveCookie?
    checkWithoutCookie: function(){
        this.check(false);
    },

    //============================================================
    // /vdesk/timeoutagent-i.php handler
    //============================================================
    rqStatusChange: function(saveTinValue){
        if(this.rq.readyState != 4){ return; }
        var expirationTimeout = -1;
        if(this.rq.status < 400 && this.rq.status > 0
            && (m = document.cookie.match(/TIN=(\d+)[;]?/)) != null
            && (expirationTimeout = parseInt(m[1])) > 0)
        {
            if(saveTinValue){
                this.timoutInterval = expirationTimeout;
            }

            if (typeof(this.cb.onSessionOk) == "function"){
                this.cb.onSessionOk();
            }

            if(this.rqRepeat){
                window.setTimeout(function(_this, _saveTinValue){ return function(){
                    _this.check(_saveTinValue);
                }}(this, saveTinValue), this.timoutInterval);
            }
        }else if(this.rq.status >= 400 || this.rq.status == 0 || expirationTimeout == 0){
            if(typeof(this.cb.onSessionTimeout) == "function"){
                this.cb.onSessionTimeout(this.rq.status == 0);
            }
        }
    },

    //============================================================
    // get Landing Uri from /vdesk/landinguri
    //============================================================
    getLandingUri: function(){
        var r = getHTTPRequestObject();
        r.onreadystatechange = function(_this){ return function(){
            if(r.readyState != 4){ return; }
            if(r.status < 400){
                var resN = r.responseXML.getElementsByTagName("res")[0];
                if(resN && resN.getAttribute("type") == 'landing_uri'){
                    _this.landingUri = resN.firstChild.nodeValue;
                }
            }
        }}(this);
        r.open('GET', '/vdesk/landinguri', true);
        r.send("");
    },

    //============================================================
    // Show timeout splash layer
    //============================================================
    showSplashLayer: function(elementId, customizedText){
        var d = document.getElementById(elementId);
        if (d != null) {
            try {
                d.className = 'inspectionHostDIVBig';
                customizedText = customizedText.replace(/\[SESSION_RESTART_URL\]/g, this.landingUri);
                d.innerHTML = customizedText;
                var b = document.getElementsByTagName("body");
                if (b != null) {
                    this.disableAllElements(b[0], d);
                }
            }
            catch (e) {}
        }
    },

    //============================================================
    // Disable all elements on page once and forever :=\
    //============================================================
    disableAllElements: function(elementToDisable, elementToExclude){
        if (typeof(elementToExclude) == "undefined" || elementToExclude == null){ return; }
        if (elementToDisable == null || elementToDisable == elementToExclude){ return; }

        try {
            if (typeof(elementToDisable.disabled) != "undefined" && elementToDisable.tagName.toLowerCase() != "body") {
                elementToDisable.disabled = true;
            }

            if (elementToDisable.tagName.toLowerCase() == "a") {
                elementToDisable.style.cursor = "not-allowed";
                elementToDisable.onclick = function() { return false; };
            }

            if (elementToDisable.childNodes && elementToDisable.childNodes.length > 0) {
                for (var x = 0; x < elementToDisable.childNodes.length; x++) {
                    this.disableAllElements(elementToDisable.childNodes[x], elementToExclude);
                }
            }
        }
        catch(e){}
    }
}
