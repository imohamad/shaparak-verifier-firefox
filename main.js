//Requirements
var { ToggleButton } = require('sdk/ui/button/toggle'); //for toggle button
var panels = require("sdk/panel"); //for build panel
var self = require("sdk/self"); //for access to local data
var urls = require('sdk/url'); //for access to tabs URL
var notifications = require('sdk/notifications'); //for show notifications
var tabs = require('sdk/tabs'); //for access to tabs content

// ╔═════════════════╗
// ║       vars      ║
// ╚═════════════════╝

var verified = { //button icon 4 size or 3 size
    "16": "./images/verified_icon_128.png",
    "32": "./images/verified_icon_128.png",
    "64": "./images/verified_icon_128.png",
    "128": "./images/verified_icon_128.png"
  };

var notVerified = { //button icon 4 size or 3 size
    "16": "./images/icon_128.png",
    "32": "./images/icon_128.png",
    "64": "./images/icon_128.png",
    "128": "./images/icon_128.png"
  };

var labelVerified = "Verified"; 
var labelNotVerified = "Shaparak Verifier";

// ╔═════════════════╗
// ║    main code    ║
// ╚═════════════════╝

//Toggle Button for popup
var button = ToggleButton({
  id: "shaparak-verifier",
  label: labelNotVerified, //label for show button title
  icon: notVerified,
  disabled: true
});

//tab status
tabs.on('open', function(tab) {
  notVerifierLogo(); //active default icon for button
});

tabs.on('ready', function(tab) {
  var URL = tab.url; //get URL from tab
  isShaparak(URL); //send URL to isShaparak func for chek
});

tabs.on('activate', function(tab) {
  var URL = tab.url; //get URL from tab
  isShaparak(URL); //send URL to isShaparak func for chek
});

tabs.on('deactivate', function(tab) {
  notVerifierLogo(); //active default icon for button
});

tabs.on('close', function(tab) {
  notVerifierLogo(); //active default icon for button 
});

//is shaparak? func! WTF!!!
function isShaparak(chekUrl, tab){
  var hostName = urls.URL(chekUrl).host;
  if (hostName.match(/\.shaparak\.ir$/i)) {
    showNotification(); //show notification for user
    verifierLogo(); //change button icon to verified
  }else{
    notVerifierLogo(); //active default icon for button
  }
}

//show notification func
function showNotification(){
  notifications.notify({
      title: 'سایت معتبر است' ,
      text: 'با خیال راحت پرداخت کنید',
      iconURL: self.data.url('images/verified_icon_128.png')
  });
}

//verifier logo func
function verifierLogo(){
  var btnVerifier = ToggleButton({
  id: "shaparak-verifier",
  label: labelVerified,
  icon: verified,
  onChange: handleChangeVerifier,
});
}

//not verifier logo func
 function notVerifierLogo(){
  var button = ToggleButton({
  id: "shaparak-verifier",
  label: labelNotVerified,
  icon: notVerified,
  disabled: true
});
}
  
//handleChange func for show panel
function handleChangeVerifier(state) {
  if (state.checked) {
    panelVerifier.show({ //show panel
      position: button
    });
  }
}

var panelVerifier = panels.Panel({
  width: 222, //width for panel
  height: 187, //height for panel
  contentURL: self.data.url('popup.html'), //src for content panelVerifier
  onHide: handleHideVerifier //func for hide panel
});

//remove focus from toggle button
function handleHideVerifier() {
  btnVerifier.state('window',
    {
      checked: false
    });
}
