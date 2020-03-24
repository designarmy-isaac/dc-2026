import $ from 'jquery';
import 'what-input';
//import validate from 'jquery-validation';
//import 'jquery-modal';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).ready( fn );

function fn() {
  
  Foundation.Abide.defaults.patterns['phone'] = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
  Foundation.Abide.defaults.patterns['zip'] = /^\d{5}$/;
  
  $(document).foundation();
  
/* ===================================
====================================== ANIMATE ON SCROLL (FADE-INS)
=================================== */
  
  AOS.init({
    duration: 400,
    easing: 'ease-out-sine',
		once: true,
//    delay: 100,
//    disable: 'mobile',
  });
    
/* ===================================
====================================== TABS
=================================== */
  
  var $tabPrevious = $('#tab-arrow-previous'),
      $tabNext = $('#tab-arrow-next'),
      $tabs = $('.tab-control'),
      $tabContent = $('.tab-content'),
      $tabImage = $('.tab-image'),
      currentTabNumber = 1;
  
  function openTab(n) {
    var nz = n - 1,
        $newTabControl = $tabs.eq(nz),
        $newTabContent = $tabContent.eq(nz),
        $newTabImage = $tabImage.eq(nz);
    
    currentTabNumber = n;
    
    $tabs.addClass('inactive');           
    $newTabControl.removeClass('inactive');

    $tabImage.addClass('hide');
    $tabContent.addClass('hide');
    $newTabImage.removeClass('hide');
    $newTabContent.removeClass('hide');
    
    if (currentTabNumber === 1) {
        $tabPrevious.addClass('disabled');
        $tabNext.removeClass('disabled');
    } else if (currentTabNumber === 4) {
        $tabPrevious.removeClass('disabled');
        $tabNext.addClass('disabled');
    } else {
        $tabPrevious.removeClass('disabled');
        $tabNext.removeClass('disabled');
    }
    
    return currentTabNumber;
  }
  
  $tabs.click(function() {
    var $e = $(this),                     // clicked tab
        en = $e.attr('data-tab-number');  // clicked tab number
    
    if (en != currentTabNumber) {         // if clicked tab isn't current tab, open the clicked tab
      openTab(en);
    }
  });
  
  $tabPrevious.click(function(){
    if ( $(this).hasClass('disabled') === false ) {
      openTab(currentTabNumber - 1);
    }
  });
  $tabNext.click(function(){
    if ( $(this).hasClass('disabled') === false ) {
      openTab(currentTabNumber + 1);
    }
  });
  
  
      
/* ===================================
====================================== SHARE
=================================== */
  
  var $shareCTAs = $('.share-cta'),
      $posts = $('.post-example');
  
  function showPost(p) {
    $posts.addClass('hidden');
    $('[data-post-channel="' + p + '"]').removeClass('hidden');
  }
  
  $shareCTAs.hover(function() {
    var $e = $(this),        
        eChannel = $e.attr('data-share-channel');
    showPost(eChannel);
  });
  
/* ===================================
====================================== FORMS
=================================== */

$('.signup-opener').on('click', function() {
  $(this).attr("data-origin", "true");
  $.ajax('_signup.html').
    done(function(content) {
      $('#modal').html(content).foundation('open');
      var dataIntent = $('[data-origin="true"]').data("intent"); //grabs the intent value from the button that originated the modal opening
      if ( dataIntent === 'volunteer') {
        $('[data-receive="intent"]').prop("checked", true); // set volunteer checkbox to checked
      }
      $('[data-origin="true"]').attr("data-origin", "false"); // reset originating button
  });
});

$('.contact-opener').on('click', function() {
  $.ajax('_contact.html').
    done(function(content) {
      $('#modal').html(content).foundation('open');
  });
});

$('[data-reveal]').on('open.zf.reveal', function () {
  var options = {liveUpdate: true, validateOnBlur: true},
      form = new Foundation.Abide($('form'), options);
  });
  
  $(document).on("submit", function(ev) {
    ev.preventDefault();
    if ( ev.target.id == 'mc-embedded-subscribe-form') {
      var submitVal = $('#mc-embedded-subscribe').val();      
      $.ajax({
        url: '/process.php',
        type: 'POST',
        data: $('#mc-embedded-subscribe-form').serialize(),
        beforeSend: function() {
          $('#mc-embedded-subscribe').prop('disabled', true).val("Sending...");
        },        
        success: function(response, status, xhr) {
					console.log('xhr.responseText = '+xhr.responseText+ '\n' +
											'xhr.status = '+xhr.status+ '\n' +
											'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
											'status = '+status+ '\n' +
											'response = '+response);
          if(response == 200) {
//						console.log("200");
            $('#mc-embedded-subscribe-form').hide();
            $('#signup-header').hide();
            $('.signup-error').hide();
            $('.signup-success').show();
          } else {
//						console.log("else");
            $('.signup-error').show();
						$('.error-paragraph').hide();
						switch (response) {
							case 0:
//								console.log("switch case 0")
								$('#error-paragraph-connection').show();
								break;
							case 400:
//								console.log("switch case 400")
								$('#error-paragraph-400').show();
								break;
							case 500:
//								console.log("switch case 500")
								$('#error-paragraph-500').show();
								break;
							default:
								$('#error-paragraph').show();
						};
					}
        },
        error: function(xhr, status, error) {
          console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                      'xhr.status = '+xhr.status+ '\n' +
                      'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                      'status = '+status+ '\n' +
                      'error = '+error);
          $('.signup-error').show();
					$('.error-paragraph').hide();
					$('#error-paragraph-connection').show();
        },
        complete: function() {
          $('#mc-embedded-subscribe').prop('disabled', false).val(submitVal);
        }        
      });
    }
    if ( ev.target.id == 'c-form') {
      var datap = $('#c-form').serialize(),
          submitVal = $('#c-SUBMIT').val();
      
      $.ajax({
        type: "POST",
        async: true,
        url: "/contact.php",
        data: datap,
        datatype: 'json',
        cache: true,
        global: false,
        beforeSend: function() {
          $('#c-SUBMIT').prop('disabled', true).val("Sending...");
        },
        success: function(response, status, xhr) {
          console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                      'xhr.status = '+xhr.status+ '\n' +
                      'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                      'status = '+status+ '\n' +
                      'response = '+response);
					if (response.indexOf('Message has been sent') >= 0 ) {
						$('#c-form').hide();
						$('#contact-header').hide();
						$('.contact-error').hide();
						$('.contact-success').show();
					} else {
						$('.contact-error').show();
					}
        },
        error: function(xhr, status, error) {
          console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                      'xhr.status = '+xhr.status+ '\n' +
                      'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                      'status = '+status+ '\n' +
                      'error = '+error);
          $('.contact-error').show();
        },
        complete: function() {
          $('#c-SUBMIT').prop('disabled', false).val(submitVal);
        }
      });
    }
  });
}
