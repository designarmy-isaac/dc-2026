<?php
$data_email = $_POST['EMAIL'];
$data_fname = $_POST['FNAME'];
$data_lname = $_POST['LNAME'];
$data_phone = $_POST['PHONE'];
$data_zip   = $_POST['ZIP'];
if(isset($_POST['VOLUNTEER']) &&
   $_POST['VOLUNTEER'] == '1') 
{
  $data_volunteer = true;
} else {
  $data_volunteer = false;
}

function syncMailchimp($data_email, $data_fname, $data_lname, $data_zip, $data_phone, $data_volunteer) {
    $apiKey = '<%-mckey-%>';
    $listId = '9dbd6a6ea3';
    $memberId = md5(strtolower($data_email));
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
    $json = json_encode(array(
      'email_address' => $data_email,
      'status'        => 'subscribed',
      'interests'     => array('fd9eb337cd' => $data_volunteer),
      'merge_fields'  => ['FNAME' => $data_fname, 'LNAME' => $data_lname, 'ZIP' => $data_zip, 'PHONE' => $data_phone]
    ));
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    header('Content-Type: application/json');
    exit(json_encode($httpCode));
}
syncMailchimp($data_email, $data_fname, $data_lname, $data_zip, $data_phone, $data_volunteer);
?>
