<?php
if(isset($_POST['EMAIL'])) {
 
    $email_to = "isaac@designarmy.com";
    $email_subject = "DC2026 Contact Form Submission";
 
    function died($error) {
        echo $error;
        die();
    }
 
    if(!isset($_POST['EMAIL']) ||
        !isset($_POST['SUBJECT']) ||
        !isset($_POST['BODY'])) {
        died('There appears to be a problem with the form you submitted.');       
    }
 
 
    $email_from = $_POST['EMAIL'];
    $subject = $_POST['SUBJECT'];
    $body = $_POST['BODY'];
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The email address you entered does not appear to be valid.<br />';
  }
 
  if(strlen($body) < 2) {
    $error_message .= 'The message you entered does not appear to be valid.<br />';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Subject: ".clean_string($subject)."\n";
    $email_message .= "Message: ".clean_string($body)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
 
Thank you for contacting us. We will be in touch with you very soon.
 
<?php
 
}
?>

<?php

if($_POST){
    $email = $_POST['EMAIL'];
    $attn = $_POST['SUBJECT'];
    $message = $_POST['BODY'];

//send email
    mail("isaac@designarmy.com", "DC26 Contact Form Submission: ".$attn, $email."\n\n".$message);
}?>