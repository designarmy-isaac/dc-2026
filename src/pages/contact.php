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
    // Server settings
		$mail->SMTPDebug		= <%-maildebug-%>; 
		$mail->isSMTP();                       
		$mail->Host       	= '<%-mailhost-%>';       
		$mail->SMTPAuth   	= <%-mailauth-%>;             
		$mail->SMTPAutoTLS	= <%-mailautotls-%>;
		$mail->Port       	= <%-mailport-%>;
		$mail->SMTPOptions	= <%-mailoptions-%>;
	

    //Recipients
    $mail->setFrom('webform@dc2026.org', 'dc2026.org Webform');
    $mail->addAddress('dc2026@eventsdc.com');
		$mail->addCC('isaac@designarmy.com');
    $mail->addReplyTo($email);


    // Content
    $mail->isHTML(false);
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