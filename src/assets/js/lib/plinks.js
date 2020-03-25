window.plinks = (function() {
	'use strict';

	var exports = {};

	var isIosDevice = (function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("mac") > -1) {
			return true;
		} else {
			return false;
		}
	})();

	/**
	 * Call plinks.smsLink('myMessage') to get a proper SMS link href
	 * The phone number cannot be pre-populated.
	 */
	exports.smsLink = function(message) {
		var msg = encodeURIComponent(message), href;

		// No more support for iOS 6 + 7
		if(isIosDevice) {
			href = "sms:Choose%20Your%20Recipients&body=" + msg;
		} else {
			href = "sms:?body=" + msg;
		}

		return href
	};

	exports.whatsAppLink = function(message) {
		var msg = encodeURIComponent(message), href;
		href = "whatsapp://send?text=" + msg;

		return href
	};
	
	exports.emailLink = function(subject, message) {
		var sbj = encodeURIComponent(subject), 
				msg = encodeURIComponent(message),
				href;
		href = "mailto:%20?&subject=" + sbj + "&body=" + msg;
		
		return href
	}
	
	exports.twitterLink = function(message) {
		var msg = encodeURIComponent(message), href;
		href = "https://twitter.com/intent/tweet?hashtags=DC2026&original_referer=http%3A%2F%2Fdc2026.org%2F&ref_src=twsrc%5Etfw&related=DC2026&text=" + msg + "&tw_p=tweetbutton";
		
		return href
	}
	
	exports.linkedinLink = function(message) {
		var msg = encodeURIComponent(message), href;
		href = "http://www.linkedin.com/shareArticle?mini=true&url=staging.dc2026.org&title=" + msg;

		return href
	}

	return exports
}).call(this);