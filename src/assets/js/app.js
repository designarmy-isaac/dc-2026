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
    delay: 100,
    disable: 'mobile',
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
      $.ajax({
        url: '//localhost/dc-2026/dist/process.php',
        type: 'POST',
        data: $('#mc-embedded-subscribe-form').serialize(),
        success: function(response, status, xhr) {
          if(response == 200) {
            console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                        'xhr.status = '+xhr.status+ '\n' +
                        'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                        'status = '+status+ '\n' +
                        'response = '+response);
            $('#mc-embedded-subscribe-form').hide();
            $('#signup-header').hide();
            $('.signup-success').show();
          } else {
            console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                        'xhr.status = '+xhr.status+ '\n' +
                        'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                        'status = '+status+ '\n' +
                        'response = '+response);
            $('.signup-error').addClass('show');
          }
        },
        error: function(xhr, status, error) {
          console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                      'xhr.status = '+xhr.status+ '\n' +
                      'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                      'status = '+status+ '\n' +
                      'error = '+error);
          $('.signup-error').addClass('show');
        }
      });
    }
    if ( ev.target.id == 'c-form') {
      var data = {
        name: $("#c-EMAIL").val(),
        email: $("#c-SUBJECT").val(),
        message: $("#c-BODY").val()
      };
      $.ajax({
          type: "POST",
          url: "//localhost/dc-2026/dist/contact.php",
          data: data,
          success: function(response, status, xhr) {
            console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                        'xhr.status = '+xhr.status+ '\n' +
                        'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                        'status = '+status+ '\n' +
                        'response = '+response);
            $('#c-form').hide();
            $('#contact-header').hide();
            $('.contact-success').show();
          },
          error: function(xhr, status, error) {
            console.log('xhr.responseText = '+xhr.responseText+ '\n' +
                        'xhr.status = '+xhr.status+ '\n' +
                        'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
                        'status = '+status+ '\n' +
                        'error = '+error);
            $('.contact-error').addClass('show');
          }
      });
    }
//      window.alert('c-form');
//      $.ajax({
//        url: '//localhost/dc-2026/dist/contact.php',
//        type: 'POST',
//        data: $('#c-form').serialize(),
//        success: function(response, status, xhr) {
//          if(response == 200) {
//            window.alert('Success criteria met');
//            console.log('xhr.responseText = '+xhr.responseText+ '\n' +
//                        'xhr.status = '+xhr.status+ '\n' +
//                        'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
//                        'status = '+status+ '\n' +
//                        'response = '+response);
//            $('#mc-embedded-subscribe-form').hide();
//            $('#signup-header').hide();
//            $('.signup-success').show();
//          } else {
//            window.alert('Success criteria met, but 200 not returned');
//            console.log('xhr.responseText = '+xhr.responseText+ '\n' +
//                        'xhr.status = '+xhr.status+ '\n' +
//                        'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
//                        'status = '+status+ '\n' +
//                        'response = '+response);
//            $('.signup-error').addClass('show');
//          }
//        },
//        error: function(xhr, status, error) {
//          window.alert('Error criteria met.');
//          console.log('xhr.responseText = '+xhr.responseText+ '\n' +
//                      'xhr.status = '+xhr.status+ '\n' +
//                      'xhr.getAllResponseHeaders() = '+xhr.getAllResponseHeaders()+ '\n' +
//                      'status = '+status+ '\n' +
//                      'error = '+error);
//          $('.signup-error').addClass('show');
//        }
//      });
//    }
  });
//  
//  
//  $('.sign-up').validate({
//    highlight: function(element, errorClass) {
//      $(element).parent().addClass(errorClass);
////      console.log('highlight');
//    },
//    unhighlight: function(element, errorClass) {
//      $(element).parent().removeClass(errorClass);
////      console.log('unhighlight');
//    },
//    submitHandler: function(form, event) {
////      console.log('submit');
//      event.preventDefault();
//      $.ajax({
//        url: '/process.php',
//        type: 'POST',
//        data: $(form).serialize(),
//        success: function(response) {
//          if(response === 200) {
////            console.log('success');
//            var height = $('.sign-up').height();
//            $('.sign-up').height(height);
//            $('.sign-up .form-controls').addClass('done');
//            $('.sign-up .success-message').addClass('show');
//            $('.sign-up .error-message').removeClass('show');
//          } else {
//            $('.sign-up .error-message').addClass('show');
//          }
//        },
//        error: function() {
//          $('.sign-up .error-message').text('Error! Try again');
//        }
//      });
//      return false;
//    },
//    // all fields are required
//    rules: {
//      subscribe_email: {
//        required: true,
//        email: true,
//      }
//    }
//  });
//  $('form').foundation('enableValidation');
//  $(document).on("formvalid.zf.abide", function(ev,frm) {pushSubmit();});
//  var dataLocation = $('[data-origin="true"]').data("location"); //grabs the location value from the button that originated the modal opening
//  selectionListener();
//  var selectedLocation = $("[data-location-option='" + dataLocation + "']");
//  selectedLocation.prop("selected", "selected"); // set location to selected
//  $('[data-origin="true"]').attr("data-origin", "false"); // reset originating button

  
  // sign-up form
}
