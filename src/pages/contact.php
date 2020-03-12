<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

$email = $_REQUEST['EMAIL'];
$subject = $_REQUEST['SUBJECT'];
$body = $_REQUEST['BODY'];

try {
    // PROD Server settings 
//    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
//    $mail->isSMTP();                                            // Send using SMTP
//    $mail->Host       = 'localhost';                    // Set the SMTP server to send through
//    $mail->SMTPAuth   = false;                                   // Enable SMTP authentication
//    $mail->SMTPAutoTLS = false;
//    $mail->Port       = 25;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
  
    //LOCAL Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'washingtondc2026@gmail.com';                     // SMTP username
    $mail->Password   = '';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('webform@dc2026.org', 'dc2026.org Webform');
    $mail->addAddress('isaac@designarmy.com');
    $mail->addReplyTo($email);


    // Content
    $mail->isHTML(false);                                  // Set email format to HTML
    $mail->Subject = 'DC2026 Contact Form Submission Attn: ' . $subject;
    $mail->Body    = 'New Form Submission' . PHP_EOL . PHP_EOL .
                     'Email: ' . $email . '' . PHP_EOL .
                     'Interested In: ' . $subject . '' . PHP_EOL .
                     'Message: ' . $body . '' . PHP_EOL;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>